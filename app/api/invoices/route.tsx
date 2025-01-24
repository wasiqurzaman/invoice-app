import { NextRequest, NextResponse } from "next/server";
import { invoiceSchema } from "../../validationSchemas";
import prisma from "@/prisma/prismaClient";
import { z } from "zod";
import { generateInvoiceNumber } from "@/app/utils/utils";

type Invoice = z.infer<typeof invoiceSchema>;

export async function POST(request: NextRequest) {
  const body: Invoice = await request.json();
  const {
    clientName,
    clientAddress,
    clientEmail,
    description,
    createdAt,
    paymentDue,
    invoiceNumber,
    items,
    paymentTerms,
    senderAddress,
    status,
    total,
  } = body;

  const validation = invoiceSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newInvoice = await prisma.invoice.create({
    data: {
      clientEmail,
      clientName,
      description,
      invoiceNumber: invoiceNumber || generateInvoiceNumber(),
      createdAt,
      paymentDue,
      paymentTerms,
      status,
      clientAddress: {
        create: {
          city: clientAddress.city,
          country: clientAddress.country,
          street: clientAddress.street,
          postCode: clientAddress.postCode,
        },
      },
      senderAddress: {
        create: {
          city: senderAddress.city,
          country: senderAddress.country,
          street: senderAddress.street,
          postCode: senderAddress.postCode,
        },
      },
      items: {
        create: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
        })),
      },
      total,
    },
  });

  return NextResponse.json(newInvoice, { status: 201 });
}

export async function GET(request: NextRequest) {
  const invoices = await prisma.invoice.findMany({
    include: {
      clientAddress: true,
      senderAddress: true,
      items: true,
    },
  });

  return NextResponse.json(invoices, { status: 200 });
}
