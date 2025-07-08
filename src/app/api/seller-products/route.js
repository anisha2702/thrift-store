import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "seller") {
    return new Response("Unauthorized", { status: 401 });
  }

  const products = await prisma.product.findMany({
    where: {
      seller: {
        email: session.user.email,
      },
    },
  });

  return new Response(JSON.stringify(products));
}
