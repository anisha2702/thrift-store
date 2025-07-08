import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { name, email, password, role } = body;

  if (!name || !email || !password || !role) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return new Response(JSON.stringify({ error: "Email already exists" }), {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return new Response(JSON.stringify({ message: "User registered", user: newUser }));
}
