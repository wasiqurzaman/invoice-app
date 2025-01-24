"use client";

import React, { useState } from "react";
import InvoiceStatus from "./IncoiceStatus";
import { InvoiceType } from "../invoices/page";
import { useRouter } from "next/navigation";
import Button from "./Button";
import axios from "axios";
import ConfirmDelete from "./ConfirmDelete";

export default function InvoiceActions({ invoice }: { invoice: InvoiceType }) {
  const router = useRouter();

  const deleteInvoice = async () => {
    try {
      await axios.delete(`/api/invoices/${invoice.invoiceNumber}`);
      router.push("/invoices");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async () => {
    try {
      await axios.patch(`/api/invoices/${invoice.invoiceNumber}`, {
        ...invoice,
        status: "paid",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const [isDeleting, setIsDeleting] = useState(false);

  const cancelDelete = () => {
    setIsDeleting(false);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between px-8 py-5 shadow-md rounded-[8px] bg-card">
        <div className="flex items-center gap-5">
          <span className="text-textCol-2">Status</span>
          <InvoiceStatus status={invoice?.status} />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="button3"
            onClick={() =>
              router.push(`/invoices/${invoice.invoiceNumber}/edit`)
            }
          >
            Edit
          </Button>
          <Button variant="button5" onClick={() => setIsDeleting(true)}>
            Delete
          </Button>
          <Button variant="button2" onClick={updateStatus}>
            Mark as Paid
          </Button>
        </div>
      </div>
      {isDeleting && (
        <ConfirmDelete
          onDelete={deleteInvoice}
          onCancel={cancelDelete}
          invoiceNumber={invoice.invoiceNumber}
        />
      )}
    </>
  );
}
