import { promises as fs } from "fs";
import Invoice from "../components/Invoice";
import Image from "next/image";
import Button from "../components/Button";

export type InvoiceType = {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: "paid" | "pending" | "draft";
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: [
    {
      name: string;
      quantity: number;
      price: number;
      total: number;
    }
  ];
  total: number;
};

export default async function page() {
  const file = await fs.readFile(
    process.cwd() + "/app/data/sample-data.json",
    "utf8"
  );
  const invoices: InvoiceType[] = JSON.parse(file);

  return (
    <section className="flex-1 flex flex-col gap-[64px] justify-center items-center">
      <div className="max-w-[730px] w-[80%] flex items-center justify-between mt-[77px]">
        <div className="flex flex-col gap-[6px]">
          <h1 className="heading-lg">Invoices</h1>
          <p className="text-body text-textCol-2">
            {invoices.length !== 0
              ? `There are ${invoices.length} total invoices`
              : "No invoices"}
          </p>
        </div>
        <div className="flex items-center gap-10">
          <select name="" id="" className="heading-sm capitalize py-3 px-2">
            <option value="">Filter by status</option>
            <option value="pending" className="capitalize">
              paid
            </option>
            <option value="pending">pending</option>
            <option value="pending">draft</option>
          </select>
          <Button variant="button1">New Invoice</Button>
        </div>
      </div>

      {invoices.length === 0 && (
        <div className="max-w-[240px] flex flex-col gap-[66px]">
          <Image
            src="/assets/illustration-empty.svg"
            alt="empty icon"
            width={240}
            height={200}
          />
          <div className="flex flex-col gap-6 items-center text-center">
            <h2 className="heading-md">There is nothing here</h2>
            <p className="text-textCol-2">
              Create an invoice by clicking the{" "}
              <span className="font-bold">New Invoice</span> button and get
              started
            </p>
          </div>
        </div>
      )}

      {invoices.length > 0 && (
        <div className="flex flex-col gap-4 max-w-[730px] w-[80%]">
          {invoices.map(invoice => (
            <Invoice key={invoice.id} invoice={invoice} />
          ))}
        </div>
      )}
    </section>
  );
}
