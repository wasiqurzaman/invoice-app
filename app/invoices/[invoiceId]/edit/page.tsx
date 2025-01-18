import InvoiceForm from "@/app/components/InvoiceForm";
import React from "react";
import { promises as fs } from "fs";
import { cwd } from "process";

export default async function InvoiceEditPage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { invoiceId } = await params;

  const file = await fs.readFile(
    process.cwd() + "/app/data/sample-data.json",
    "utf8"
  );

  const invoices = JSON.parse(file);
  const foundInvoice = invoices.find(invoice => invoice.id === invoiceId);
  return (
    <div>
      <InvoiceForm type="edit" invoice={foundInvoice} />
    </div>
  );
}
