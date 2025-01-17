import { promises as fs } from "fs";
import { InvoiceType } from "../page";
import InvoiceStatus from "@/app/components/IncoiceStatus";
import Button from "@/app/components/Button";
import BackButton from "@/app/components/BackButton";
import InvoiceDetails from "@/app/components/InvoiceDetails";
import InvoiceActions from "@/app/components/InvoiceActions";

type Props = {
  params: Promise<{ invoiceId: string }>;
};

export default async function page({ params }: Props) {
  const { invoiceId } = await params;

  const file = await fs.readFile(
    process.cwd() + "/app/data/sample-data.json",
    "utf8"
  );
  const invoices: InvoiceType[] = JSON.parse(file);

  const foundInvoice = invoices.find(invoice => invoice.id === invoiceId);

  console.log("invoice id:", invoiceId);

  return (
    <section className="ml-[100px] flex-1 flex items-center justify-center">
      <div className="flex flex-col gap-[32px] items-center w-[730px] mt-[66px]">
        <BackButton />
        <InvoiceActions invoice={foundInvoice} />
        <InvoiceDetails invoice={foundInvoice!} />
      </div>
    </section>
  );
}
