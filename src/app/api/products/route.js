import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
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

function parseMultipartForm(req) {
  return new Promise((resolve, reject) => {
    const bb = busboy({ headers: req.headers });
    const fields = {};
    let fileBuffer = null;
    let fileMime = null;

    bb.on("file", (_, file, info) => {
      fileMime = info.mimeType;
      const chunks = [];
      file.on("data", (chunk) => chunks.push(chunk));
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

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "seller") {
    return new Response("Unauthorized", { status: 401 });
  }

  // Convert to Node.js readable stream
  const contentType = req.headers.get("content-type");
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

    if (!fileBuffer) {
      return new Response("Image file is required", { status: 400 });
    }

    const base64String = fileBuffer.toString("base64");
    const dataURI = `data:${fileMime};base64,${base64String}`;

    const uploadRes = await cloudinary.uploader.upload(dataURI, {
      folder: "products",
    });

    const newProduct = await prisma.product.create({
      data: {
        title: fields.title,
        description: fields.description,
        price: parseFloat(fields.price),
        location: fields.location,
        category: fields.category,
         subCategory: fields.subCategory,
        image: uploadRes.secure_url,
        sellerId: session.user.id,
      },
    });

    return new Response(JSON.stringify(newProduct), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Upload error:", err);
    return new Response("Failed to upload product", { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        seller: {
          select: { name: true }, // only return seller name
        },
      },
    });

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return new Response("Failed to fetch products", { status: 500 });
  }
}

