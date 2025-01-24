import { z } from "zod";

export const invoiceSchema = z.object({
  invoiceNumber: z.string(),
  description: z.string(),
  paymentTerms: z.number().min(1).max(30),
  clientName: z.string().min(3),
  clientEmail: z.string().email("Please enter a valid email"),
  status: z.enum(["pending", "paid", "draft"]),
  createdAt: z.string().datetime(),
  paymentDue: z.string().datetime(),
  senderAddress: z.object({
    street: z.string(),
    city: z.string(),
    postCode: z.string(),
    country: z.string(),
  }),
  clientAddress: z.object({
    street: z.string(),
    city: z.string(),
    postCode: z.string(),
    country: z.string(),
  }),
  items: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      price: z.number(),
      total: z.number(),
    })
  ),
  total: z.number(),
});

export const editInvoiceSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  description: z.string().optional(),
  paymentTerms: z.number().min(1).max(30).optional(),
  clientName: z.string().min(3).optional(),
  clientEmail: z.string().email("Please enter a valid email").optional(),
  status: z.enum(["pending", "paid", "draft"]).optional(),
  createdAt: z.string().datetime().optional(),
  paymentDue: z.string().datetime().optional(),
  senderAddress: z
    .object({
      street: z.string(),
      city: z.string(),
      postCode: z.string(),
      country: z.string(),
    })
    .optional(),
  clientAddress: z
    .object({
      street: z.string(),
      city: z.string(),
      postCode: z.string(),
      country: z.string(),
    })
    .optional(),
  items: z.array(
    z
      .object({
        name: z.string(),
        quantity: z.number(),
        price: z.number(),
        total: z.number(),
      })
      .optional()
  ),
  total: z.number().optional(),
});
