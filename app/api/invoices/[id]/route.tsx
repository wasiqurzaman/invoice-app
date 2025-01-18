import prisma from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const invoice = await prisma.invoice.findUnique({
    where: {
      invoiceNumber: id,
    },
    include: {
      clientAddress: true,
      senderAddress: true,
      items: true,
    },
  });

  if (!invoice)
    return NextResponse.json({ error: "invoice not found" }, { status: 400 });

  return NextResponse.json(invoice, { status: 200 });
}
