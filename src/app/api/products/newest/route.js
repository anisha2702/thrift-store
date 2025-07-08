// /src/app/api/products/newest/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const newestProducts = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 4,
      include: { seller: true },
    });

    return NextResponse.json(newestProducts);
  } catch (error) {
    console.error('Error fetching newest products:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
