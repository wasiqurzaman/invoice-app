"use client";

import React, { useState } from "react";
import Button from "./Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { InvoiceType } from "../invoices/page";
import { MdDelete } from "react-icons/md";

interface Props {
  type: "create" | "edit";
  invoice: InvoiceType | undefined;
}

export default function InvoiceForm({ type, invoice }: Props) {
  const { register, handleSubmit } = useForm<InvoiceType>({
    defaultValues: { ...invoice },
  });

  const onSubmit: SubmitHandler<InvoiceType> = data => {
    console.log(data);
  };

  const [items, setItems] = useState(invoice?.items);

  return (
    <div className="max-w-[720px] bg-bg ml-[200px] mt-[50px]">
      {type === "create" && (
        <h2 className="heading-md mb-[46px]">New Invoice</h2>
      )}
      {type === "edit" && (
        <h2 className="heading-md mb-[46px]">
          Edit <span>#</span>
          {invoice.id}
        </h2>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-[49px]"
      >
        <div className="flex flex-col gap-[24px]">
          <h3 className="heading-sm text-primary">Bill From</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="street" className="label">
              Street Address
            </label>
            <input
              type="text"
              id="street"
              className="input"
              {...register("senderAddress.street")}
            />
          </div>
          <div className="flex gap-[24px]">
            <div className="flex flex-col gap-2">
              <label htmlFor="city" className="label">
                City
              </label>
              <input
                type="text"
                className="input"
                id="city"
                {...register("senderAddress.city")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="post" className="label">
                Post Code
              </label>
              <input
                type="text"
                className="input"
                id="post"
                {...register("senderAddress.postCode")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="country" className="label">
                Country
              </label>
              <input
                type="text"
                className="input"
                id="country"
                {...register("senderAddress.country")}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[24px]">
          <h3 className="heading-sm text-primary">Bill To</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="client_name" className="label">
              Client&apos;s Name
            </label>
            <input
              type="text"
              className="input"
              id="client_name"
              {...register("clientName")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="client_email" className="label">
              Client&apos;s Email
            </label>
            <input
              type="text"
              className="input"
              id="client_email"
              {...register("clientEmail")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="stret_adress" className="label">
              Street Address
            </label>
            <input
              type="text"
              className="input"
              id="stret_adress"
              {...register("clientAddress.street")}
            />
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="label">
                City
              </label>
              <input
                type="text"
                className="input"
                id=""
                {...register("clientAddress.city")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="label">
                Post Code
              </label>
              <input
                type="text"
                className="input"
                id=""
                {...register("clientAddress.postCode")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="label">
                Country
              </label>
              <input
                type="text"
                className="input"
                id=""
                {...register("clientAddress.country")}
              />
            </div>
          </div>
          <div className="flex gap-[24px]">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="label">
                Invoice Date
              </label>
              <input type="date" className="input" {...register("createdAt")} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="label">
                Payment Terms
              </label>
              <select id="" className="input" {...register("paymentTerms")}>
                <option value="Net 1 Days">Net 1 Days</option>
                <option value="Net 7 Days">Net 7 Days</option>
                <option value="Net 14 Days">Net 14 Days</option>
                <option value="Net 30 Days">Net 30 Days</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="label">
              Project Description
            </label>
            <input type="text" className="input" {...register("description")} />
          </div>
        </div>
        <div>
          <h2 className="text-[18px] font-bold text-[#777F98] tracking-[-0.38px] leading-[32px]">
            Item List
          </h2>
          <div>
            <table className="w-full">
              <thead className="mb-[32px] py-4">
                <tr className="text-body-v font-normal text-textCol-3 dark:text-textCol-2 text-right">
                  <th className="font-normal py-4 text-left">Item Name</th>
                  <th className="font-normal py-4 text-left">QTY.</th>
                  <th className="font-normal py-4 text-left">Price</th>
                  <th className="font-normal py-4 text-left">Total</th>
                  {/* <th className="font-normal py-4 w-[100px]"></th> */}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="heading-sm text-right">
                    <td className="text-textCol-main py-4 text-left">
                      <input
                        type="text"
                        className="input w-full"
                        {...register(`items[${index}].name`)}
                      />
                    </td>
                    <td className="text-textCol-3 dark:text-textCol-2 py-4">
                      <input
                        type="number"
                        className="input w-[100px]"
                        {...register(`items[${index}].quantity`)}
                      />
                    </td>
                    <td className="text-textCol-3 dark:text-textCol-2 py-4">
                      <input
                        type="text"
                        className="input w-[100px]"
                        {...register(`items[${index}].price`)}
                      />
                    </td>
                    <td className=" text-textCol-main py-4">
                      <span>{items[index].total}</span>
                    </td>
                    <td className="text-textCol-main pt-6 w-[80px] text-right flex items-center justify-end">
                      <button>
                        <MdDelete size={30} color="#cf4545" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Button
          variant="button6"
          onClick={() => setItems(items => items.concat(1))}
        >
          + Add New Item
        </Button>

        <div className="flex gap-2">
          <Button variant="button3">Discard</Button>
          <Button variant="button3">Cancel</Button>
          <Button variant="button4">Save as Draft</Button>
          <Button variant="button2" type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
