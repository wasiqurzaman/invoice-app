import { editInvoiceSchema } from "@/app/validationSchemas";
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();
  const {
    id: invoiceId,
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

  const validation = editInvoiceSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

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
    return NextResponse.json({ error: "invalid invoice" }, { status: 404 });

  console.log("found invoice", invoice);

  console.log("body", body);

  try {
    await prisma.item.deleteMany({
      where: { invoiceId: invoice.id },
    });

    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoice.id },
      data: {
        id: invoiceId,
        invoiceNumber,
        clientEmail,
        clientName,
        description,
        createdAt,
        paymentDue,
        paymentTerms,
        status,
        clientAddress: {
          update: {
            where: { invoiceId: invoiceId },
            data: {
              city: clientAddress.city,
              country: clientAddress.country,
              street: clientAddress.street,
              postCode: clientAddress.postCode,
            },
          },
        },
        senderAddress: {
          update: {
            where: { invoiceId: invoiceId },
            data: {
              city: senderAddress.city,
              country: senderAddress.country,
              street: senderAddress.street,
              postCode: senderAddress.postCode,
            },
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
      include: {
        clientAddress: true,
        senderAddress: true,
        items: true,
      },
    });

    return NextResponse.json(updatedInvoice, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error", error.stack);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        invoiceNumber: id,
      },
    });

    if (!invoice)
      return NextResponse.json({ error: "invalid invoice" }, { status: 404 });

    await prisma.item.deleteMany({
      where: {
        invoiceId: invoice.id,
      },
    });

    await prisma.senderAddress.delete({
      where: {
        invoiceId: invoice.id,
      },
    });

    await prisma.clientAddress.delete({
      where: {
        invoiceId: invoice.id,
      },
    });

    await prisma.invoice.delete({
      where: {
        id: invoice.id,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    if (error instanceof Error) {
      console.log("error", error.stack);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
