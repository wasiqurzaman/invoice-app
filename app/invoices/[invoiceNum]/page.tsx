import { InvoiceType } from "../page";
import BackButton from "@/app/components/BackButton";
import InvoiceDetails from "@/app/components/InvoiceDetails";
import InvoiceActions from "@/app/components/InvoiceActions";

type Props = {
  params: Promise<{ invoiceNum: string }>;
};

export default async function page({ params }: Props) {
  const { invoiceNum } = await params;

  const res = await fetch(`http://localhost:3000/api/invoices/${invoiceNum}`);
  const invoice: InvoiceType = await res.json();

  console.log("invoice number:", invoiceNum);

  return (
    <section className="ml-[100px] flex-1 flex items-center justify-center">
      <div className="flex flex-col gap-[32px] items-center w-[730px] mt-[66px]">
        <BackButton />
        <InvoiceActions invoice={invoice} />
        <InvoiceDetails invoice={invoice} />
      </div>
    </section>
  );
}
