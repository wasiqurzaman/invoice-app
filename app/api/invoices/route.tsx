import { NextRequest, NextResponse } from "next/server";
import { invoiceSchema } from "../../validationSchemas";
import prisma from "@/prisma/prismaClient";
import { z } from "zod";

type Invoice = z.infer<typeof invoiceSchema>;

export async function POST(request: NextRequest) {
  const body: Invoice = await request.json();
  console.log(body.items);
  const validation = invoiceSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newInvoice = await prisma.invoice.create({
    data: {
      clientEmail: body.clientEmail,
      clientName: body.clientName,
      description: body.description,
      invoiceId: body.invoiceId,
      createdAt: body.createdAt,
      paymentDue: body.paymentDue,
      paymentTerms: body.paymentTerms,
      status: body.status,
      clientAddress: {
        create: {
          city: body.clientAddress.city,
          country: body.clientAddress.country,
          street: body.clientAddress.street,
          postCode: body.clientAddress.postCode,
        },
      },
      senderAddress: {
        create: {
          city: body.senderAddress.city,
          country: body.senderAddress.country,
          street: body.senderAddress.street,
          postCode: body.senderAddress.postCode,
        },
      },
      items: {
        create: body.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
        })),
      },
      total: body.total,
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
