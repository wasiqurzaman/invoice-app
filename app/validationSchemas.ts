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
