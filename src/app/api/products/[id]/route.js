import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { Readable } from "stream";
import cloudinary from "@/lib/cloudinary";
import busboy from "busboy";

export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

// Utility: Convert request to Node stream for busboy
function parseMultipartForm(req) {
  return new Promise((resolve, reject) => {
    const bb = busboy({ headers: req.headers });
    const fields = {};
    let fileBuffer = null;
    let fileMime = null;

    bb.on("file", (_, file, info) => {
      fileMime = info.mimeType;
      const chunks = [];
      file.on("data", chunk => chunks.push(chunk));
      file.on("end", () => {
        fileBuffer = Buffer.concat(chunks);
      });
    });

    bb.on("field", (key, value) => {
      fields[key] = value;
    });

    bb.on("finish", () => {
      resolve({ fields, fileBuffer, fileMime });
    });

    bb.on("error", (err) => reject(err));

    req.pipe(bb);
  });
}

export async function PUT(req, context) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "seller") {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await context.params; // ✅ await params

  const contentType = req.headers.get("content-type");

  // If editing only text fields (no image upload)
  if (contentType.includes("application/json")) {
    const body = await req.json();
    try {
      const updated = await prisma.product.update({
        where: { id },
        data: {
          title: body.title,
          description: body.description,
          price: parseFloat(body.price),
          location: body.location,
          category: body.category,
        },
      });

      return new Response(JSON.stringify(updated), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Update failed:", err);
      return new Response("Failed to update product", { status: 500 });
    }
  }

  // If image is being updated (multipart/form-data)
  if (contentType.includes("multipart/form-data")) {
    const contentLength = req.headers.get("content-length");
    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const nodeReq = Readable.from(buffer);
    nodeReq.headers = {
      "content-type": contentType,
      "content-length": contentLength || buffer.length,
    };

    try {
      const { fields, fileBuffer, fileMime } = await parseMultipartForm(nodeReq);

      const data = {
        title: fields.title,
        description: fields.description,
        price: parseFloat(fields.price),
        location: fields.location,
        category: fields.category,
      };

      if (fileBuffer) {
        const base64String = fileBuffer.toString("base64");
        const dataURI = `data:${fileMime};base64,${base64String}`;
        const uploadRes = await cloudinary.uploader.upload(dataURI, {
          folder: "products",
        });
        data.image = uploadRes.secure_url;
      }

      const updated = await prisma.product.update({
        where: { id },
        data,
      });

      return new Response(JSON.stringify(updated), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Update failed:", err);
      return new Response("Failed to update product", { status: 500 });
    }
  }

  return new Response("Unsupported content type", { status: 400 });
}


export async function DELETE(_, context) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "seller") {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = context.params;

  try {
    await prisma.product.delete({
      where: { id },
    });

    return new Response("Product deleted", { status: 200 });
  } catch (err) {
    console.error("Delete failed:", err);
    return new Response("Failed to delete product", { status: 500 });
  }
}
