"use client";

import Button from "./Button";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { InvoiceType } from "../invoices/page";
import { MdDelete } from "react-icons/md";
import { z } from "zod";
import { editInvoiceSchema, invoiceSchema } from "../validationSchemas";
import { addDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Props {
  type: "create" | "edit";
  invoice: InvoiceType | undefined;
}

type InvoiceForm = z.infer<typeof invoiceSchema>;

export default function InvoiceForm({ type, invoice }: Props) {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    watch,
  } = useForm<InvoiceForm>({
    defaultValues:
      type === "edit"
        ? {
            ...invoice,
            createdAt: format(new Date(invoice!.createdAt!), "yyyy-MM-dd"),
          }
        : {
            invoiceNumber: "",
            clientEmail: "",
            clientName: "",
            createdAt: "",
            description: "",
            paymentTerms: 1,
            status: "pending",
            paymentDue: "",
            senderAddress: {},
            clientAddress: {},
            items: [
              {
                name: "",
                quantity: 1,
                price: 0,
                total: 0,
              },
            ],
            total: 0,
          },
  });

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control,
  });

  const items = watch(`items`);

  const router = useRouter();

  const onSubmit: SubmitHandler<InvoiceForm> = async data => {
    data.items = data.items.map(item => ({
      ...item,
      total: item.quantity * item.price,
    }));
    data.createdAt = new Date(data.createdAt).toISOString();
    data.paymentDue = addDays(
      new Date(data.createdAt),
      data.paymentTerms
    ).toISOString();
    data.total = data.items.reduce((acc, item) => acc + item.total, 0);
    if (type === "edit") {
      console.log(data);
      const validation = editInvoiceSchema.safeParse(data);
      if (!validation.success) return;
      console.log(validation);

      try {
        const res = await fetch(`/api/invoices/${invoice?.invoiceNumber}`, {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await res.json();
        console.log(responseData);

        // const res = await axios.patch(
        //   `/api/invoices/${invoice?.invoiceNumber}`,
        //   data
        // );
        // console.log(res);
        router.push("/invoices");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await fetch("/api/invoices", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await res.json();
        console.log(responseData);
        router.push("/invoices");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const options = (min: number, max: number) => ({
    required: {
      value: true,
      message: "can't be empty",
    },
    minLength: {
      value: min,
      message: `must be at least ${min} characters`,
    },
    maxLength: {
      value: max,
      message: `can't be more than ${max} chars`,
    },
  });

  return (
    <div className="max-w-[720px] bg-bg ml-[200px] mt-[50px]">
      {type === "create" && (
        <h2 className="heading-md mb-[46px]">New Invoice</h2>
      )}
      {type === "edit" && (
        <h2 className="heading-md mb-[46px]">
          Edit <span>#</span>
          {invoice?.invoiceNumber}
        </h2>
      )}
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-[49px]"
      >
        <div className="flex flex-col gap-[24px]">
          <h3 className="heading-sm text-primary">Bill From</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="street" className="label">
                Street Address
              </label>
              {errors.senderAddress?.street && (
                <p className="text-red-400">
                  {errors.senderAddress.street.message}
                </p>
              )}
            </div>
            <input
              type="text"
              id="street"
              className={`input ${
                errors.senderAddress?.street && "border-red-400"
              }`}
              {...register("senderAddress.street", options(5, 100))}
            />
          </div>
          <div className="flex gap-[24px]">
            <div className="flex flex-col gap-2">
              <label htmlFor="city" className="label">
                City
              </label>
              <input
                type="text"
                className={`input ${
                  errors.senderAddress?.city && "border-red-400"
                }`}
                id="city"
                {...register("senderAddress.city", options(3, 20))}
              />
              {errors.senderAddress?.city && (
                <p className="text-red-400">
                  {errors.senderAddress.city.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="post" className="label">
                Post Code
              </label>
              <input
                type="text"
                className={`input ${
                  errors.senderAddress?.postCode && "border-red-400"
                }`}
                id="post"
                {...register("senderAddress.postCode", options(4, 10))}
              />
              {errors.senderAddress?.postCode && (
                <p className="text-red-400">
                  {errors.senderAddress.postCode.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="country" className="label">
                Country
              </label>
              <input
                type="text"
                className={`input ${
                  errors.senderAddress?.country && "border-red-400"
                }`}
                id="country"
                {...register("senderAddress.country", options(2, 30))}
              />
              {errors.senderAddress?.country && (
                <p className="text-red-400">
                  {errors.senderAddress.country.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[24px]">
          <h3 className="heading-sm text-primary">Bill To</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="client_name" className="label">
                Client&apos;s Name
              </label>
              {errors.clientName && (
                <p className="text-red-400">{errors.clientName.message}</p>
              )}
            </div>
            <input
              type="text"
              className={`input ${errors.clientName && "border-red-400"}`}
              id="client_name"
              {...register("clientName", options(3, 25))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="client_email" className="label">
                Client&apos;s Email
              </label>
              {errors.clientEmail && (
                <p className="text-red-400">{errors.clientEmail.message}</p>
              )}
            </div>
            <input
              type="text"
              className={`input ${errors.clientEmail && "border-red-400"}`}
              id="client_email"
              {...register("clientEmail", {
                required: {
                  value: true,
                  message: "can't be empty",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="stret_adress" className="label">
                Street Address
              </label>
              {errors.clientAddress?.street && (
                <p className="text-red-400">
                  {errors.clientAddress?.street.message}
                </p>
              )}
            </div>
            <input
              type="text"
              className={`input ${
                errors.clientAddress?.street && "border-red-400"
              }`}
              id="stret_adress"
              {...register("clientAddress.street", options(5, 100))}
            />
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="label">
                City
              </label>
              <input
                type="text"
                className={`input ${
                  errors.clientAddress?.city && "border-red-400"
                }`}
                id=""
                {...register("clientAddress.city", options(3, 20))}
              />
              {errors.clientAddress?.city && (
                <p className="text-red-400">
                  {errors.clientAddress?.city.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="label">
                Post Code
              </label>
              <input
                type="text"
                className={`input ${
                  errors.clientAddress?.postCode && "border-red-400"
                }`}
                id=""
                {...register("clientAddress.postCode", options(4, 10))}
              />
              {errors.clientAddress?.postCode && (
                <p className="text-red-400">
                  {errors.clientAddress?.postCode.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="label">
                Country
              </label>
              <input
                type="text"
                className={`input ${
                  errors.clientAddress?.country && "border-red-400"
                }`}
                id=""
                {...register("clientAddress.country", options(3, 30))}
              />
              {errors.clientAddress?.country && (
                <p className="text-red-400">
                  {errors.clientAddress?.country.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-[24px]">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="label">
                Invoice Date
              </label>
              <input
                type="date"
                className={`input ${errors.createdAt && "border-red-400"}`}
                {...register("createdAt", {
                  valueAsDate: true,
                  required: {
                    value: true,
                    message: "can't be empty",
                  },
                })}
              />
              {errors.createdAt && (
                <p className="text-red-400">{errors.createdAt.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="label">
                Payment Terms
              </label>
              <select
                id=""
                className={`input ${errors.paymentTerms && "border-red-400"}`}
                {...register("paymentTerms", {
                  valueAsNumber: true,
                  required: {
                    value: true,
                    message: "can't be empty",
                  },
                })}
              >
                <option value="1">Net 1 Days</option>
                <option value="7">Net 7 Days</option>
                <option value="14">Net 14 Days</option>
                <option value="30">Net 30 Days</option>
              </select>
              {errors.paymentTerms && (
                <p className="text-red-400">{errors.paymentTerms.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="label">
                Project Description
              </label>
              {errors.description && (
                <p className="text-red-400">{errors.description.message}</p>
              )}
            </div>
            <input
              type="text"
              className={`input ${errors.description && "border-red-400"}`}
              {...register("description", options(5, 100))}
            />
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
                  <th className="font-normal py-4 text-right">Total</th>
                  {/* <th className="font-normal py-4 w-[100px]"></th> */}
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr key={field.id} className="heading-sm text-right">
                    <td className="text-textCol-main py-4 text-left">
                      <input
                        type="text"
                        className={`input ${
                          errors.items?.at(index)?.name && "border-red-400"
                        }`}
                        {...register(`items.${index}.name`, {
                          required: {
                            value: true,
                            message: "can't be empty",
                          },
                        })}
                      />
                      {errors.items?.at(index)?.name && (
                        <p className=" text-red-400 font-[13px]">
                          {errors.items.at(index)?.name?.message}
                        </p>
                      )}
                    </td>
                    <td className="text-textCol-3 dark:text-textCol-2 py-4 text-left">
                      <input
                        type="number"
                        className={`input w-[80px] ${
                          errors.items?.at(index)?.quantity && "border-red-400"
                        }`}
                        {...register(`items.${index}.quantity`, {
                          valueAsNumber: true,
                        })}
                      />
                    </td>
                    <td className="text-textCol-3 dark:text-textCol-2 py-4 text-left">
                      <input
                        type="number"
                        step="0.01"
                        min="0.00"
                        className="input w-[80px]"
                        {...register(`items.${index}.price`, {
                          valueAsNumber: true,
                        })}
                      />
                    </td>
                    <td className=" text-textCol-main w-[100px] py-4 text-right">
                      <span>
                        ${" "}
                        {(items[index].price * items[index].quantity).toFixed(
                          2
                        )}
                      </span>
                    </td>
                    <td className="text-textCol-main pt-6 w-[80px] text-right flex items-center justify-end">
                      {fields.length > 1 && (
                        <button type="button" onClick={() => remove(index)}>
                          <MdDelete size={30} color="#cf4545" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex w-full justify-center mt-[18px]">
              <Button
                variant="button6"
                type="button"
                onClick={() =>
                  append({ name: "", price: 0, quantity: 0, total: 0 })
                }
              >
                + Add New Item
              </Button>
            </div>
          </div>
        </div>
      </form>

      <div className="flex gap-2 mt-[40px]">
        {type === "create" && <Button variant="button3">Discard</Button>}
        <div className="flex gap-2 ml-auto">
          {type === "create" ? (
            <Button variant="button4">Save as Draft</Button>
          ) : (
            <Button variant="button3" onClick={() => router.back()}>
              Cancel
            </Button>
          )}
          <Button
            variant="button2"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            {type === "create" ? "Save & Send" : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// function FromSender() {}

// function FormClient() {}

// function FormTimeDescription() {}

// function FormItems({}) {
//   return (
//     <div>
//       <h2 className="text-[18px] font-bold text-[#777F98] tracking-[-0.38px] leading-[32px]">
//         Item List
//       </h2>
//       <div>
//         <table className="w-full">
//           <thead className="mb-[32px] py-4">
//             <tr className="text-body-v font-normal text-textCol-3 dark:text-textCol-2 text-right">
//               <th className="font-normal py-4 text-left">Item Name</th>
//               <th className="font-normal py-4 text-left">QTY.</th>
//               <th className="font-normal py-4 text-left">Price</th>
//               <th className="font-normal py-4 text-left">Total</th>
//               {/* <th className="font-normal py-4 w-[100px]"></th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {fields.map((field, index) => (
//               <tr key={field.id} className="heading-sm text-right">
//                 <td className="text-textCol-main py-4 text-left">
//                   <input
//                     type="text"
//                     className="input w-full"
//                     {...register(`items.${index}.name`)}
//                   />
//                 </td>
//                 <td className="text-textCol-3 dark:text-textCol-2 py-4">
//                   <input
//                     type="number"
//                     className="input w-[100px]"
//                     {...register(`items.${index}.quantity`, {
//                       valueAsNumber: true,
//                     })}
//                   />
//                 </td>
//                 <td className="text-textCol-3 dark:text-textCol-2 py-4">
//                   <input
//                     type="number"
//                     step="0.01"
//                     min="0.00"
//                     className="input w-[100px]"
//                     {...register(`items.${index}.price`, {
//                       valueAsNumber: true,
//                     })}
//                   />
//                 </td>
//                 <td className=" text-textCol-main py-4">
//                   <span>
//                     $ {(items[index].price * items[index].quantity).toFixed(2)}
//                   </span>
//                 </td>
//                 <td className="text-textCol-main pt-6 w-[80px] text-right flex items-center justify-end">
//                   <button type="button" onClick={() => remove(index)}>
//                     <MdDelete size={30} color="#cf4545" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="flex w-full justify-center mt-[18px]">
//           <Button
//             variant="button6"
//             type="button"
//             onClick={() =>
//               append({ name: "", price: 0, quantity: 0, total: 0 })
//             }
//           >
//             + Add New Item
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
