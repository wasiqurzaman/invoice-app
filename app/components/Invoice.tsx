import React from "react";
import { InvoiceType } from "../invoices/page";
import { format } from "date-fns";
import InvoiceStatus from "./IncoiceStatus";
import Link from "next/link";

export default function Invoice({ invoice }: { invoice: InvoiceType }) {
  return (
    <Link
      href={`/invoices/${invoice.invoiceNumber}`}
      className="w-full h-[72px] pl-[32px] pr-[24px] py-[16px] bg-card flex items-center justify-between rounded-[8px] gap-10 shadow-sm"
    >
      <div>
        <span className="heading-sm text-textCol-3">#</span>
        <span className="heading-sm">{invoice.invoiceNumber}</span>
      </div>
      <span className="text-textCol-2">
        Due {format(new Date(invoice.paymentDue), "dd MMM yyyy")}
      </span>
      <span className="text-textCol-2">{invoice.clientName}</span>
      <p className="heading-sm-v">$ {invoice.total.toFixed(2)}</p>
      <div className="flex items-center gap-5">
        <InvoiceStatus status={invoice.status} />
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 1l4 4-4 4"
            stroke="#7C5DFA"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </div>
    </Link>
  );
}
