import React from "react";
import { InvoiceType } from "../invoices/page";
import { format } from "date-fns";

export default function InvoiceDetails({ invoice }: { invoice: InvoiceType }) {
  return (
    <div className="w-full flex flex-col gap-[44px] p-[48px] bg-card rounded-[8px]">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="heading-sm-v">
              <span className="text-[#888EB0]">#</span>
              <span className="text-textCol-main">{invoice?.id}</span>
            </div>
            <span className="text-textCol-3 dark:text-textCol-2">
              {invoice?.description}
            </span>
          </div>
          <div className="flex flex-col items-end text-body-v text-textCol-3 dark:text-textCol-2">
            <span>{invoice?.senderAddress.street}</span>
            <span>{invoice?.senderAddress.city}</span>
            <span>{invoice?.senderAddress.postCode}</span>
            <span>{invoice?.senderAddress.country}</span>
          </div>
        </div>

        <div className="flex justify-between">
          {/* invoice date */}
          <div className="flex flex-col gap-[31px]">
            <div className="flex flex-col gap-3">
              <span className="text-textCol-3 dark:text-textCol-2">
                Invoice Date
              </span>
              <span className="heading-sm-v2">
                {format(new Date(invoice?.createdAt), "dd MMM yyyy")}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-textCol-3 dark:text-textCol-2">
                Invoice Due
              </span>
              <span className="heading-sm-v2">
                {format(new Date(invoice?.paymentDue), "dd MMM yyyy")}
              </span>
            </div>
          </div>
          {/* bill to */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3">
              <span className="text-textCol-3 dark:text-textCol-2">
                Bill To
              </span>
              <span className="heading-sm-v2">{invoice?.clientName}</span>
            </div>
            <div className="flex flex-col text-body-v text-textCol-3 dark:text-textCol-2">
              <span>{invoice?.clientAddress.street}</span>
              <span>{invoice?.clientAddress.city}</span>
              <span>{invoice?.clientAddress.postCode}</span>
              <span>{invoice?.clientAddress.country}</span>
            </div>
          </div>
          {/* sent to */}
          <div className="flex flex-col gap-3">
            <span className="text-textCol-3 dark:text-textCol-2">Send to</span>
            <span className="heading-sm-v2">{invoice?.clientEmail}</span>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="flex flex-col w-full bg-card-2  rounded-[8px]">
        <div className="py-8 px-8">
          <table className="w-full">
            <thead className="mb-[32px] py-4">
              <tr className="text-body-v font-normal text-textCol-3 dark:text-textCol-2 text-right">
                <th className="font-normal py-4 text-left">Item Name</th>
                <th className="font-normal py-4">QTY.</th>
                <th className="font-normal py-4">Price</th>
                <th className="font-normal py-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice?.items.map(item => (
                <tr key={item.name} className="heading-sm text-right">
                  <td className="text-textCol-main py-4 text-left">
                    {item.name}
                  </td>
                  <td className="text-textCol-3 dark:text-textCol-2 py-4">
                    {item.quantity}
                  </td>
                  <td className="text-textCol-3 dark:text-textCol-2 py-4">
                    $ {item.price.toFixed(2)}
                  </td>
                  <td className=" text-textCol-main py-4">
                    $ {item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between pt-[27px] pb-[21px] px-8 text-body-v font-normal text-white bg-[#373B53] dark:bg-[#0C0E16] rounded-b-[8px]">
          <span className="text-left">Amount Due</span>
          <span className="heading-md leading-[32px] text-right">
            ${invoice?.total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
