import InvoiceForm from "@/app/components/InvoiceForm";

export default async function InvoiceEditPage({
  params,
}: {
  params: Promise<{ invoiceNum: string }>;
}) {
  const { invoiceNum } = await params;

  const res = await fetch(`http://localhost:3000/api/invoices/${invoiceNum}`);
  const invoice = await res.json();

  return (
    <div>
      <InvoiceForm type="edit" invoice={invoice} />
    </div>
  );
}
