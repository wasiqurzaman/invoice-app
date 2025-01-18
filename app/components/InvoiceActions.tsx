"use client";

import React from "react";
import InvoiceStatus from "./IncoiceStatus";
import { InvoiceType } from "../invoices/page";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function InvoiceActions({ invoice }: { invoice: InvoiceType }) {
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-between px-8 py-5 shadow-md rounded-[8px] bg-card">
      <div className="flex items-center gap-5">
        <span className="text-textCol-2">Status</span>
        <InvoiceStatus status={invoice?.status} />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="button3"
          onClick={() => router.push(`/invoices/${invoice.invoiceNumber}/edit`)}
        >
          Edit
        </Button>
        <Button variant="button5">Delete</Button>
        <Button variant="button2">Mark as Paid</Button>
      </div>
    </div>
  );
}
