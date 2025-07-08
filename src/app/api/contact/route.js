// For App Router (route.js in /api/contact) using Next.js 13+
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { phone } = body;

  if (!phone) {
    return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
  }

  const contact = await prisma.contact.create({
    data: { phone },
  });

  return NextResponse.json({ message: "Saved successfully", contact });
}
