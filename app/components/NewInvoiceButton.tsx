"use client";

import Button from "./Button";
import { useRouter } from "next/navigation";

export default function NewInvoiceButton() {
  const router = useRouter();
  return (
    <Button variant="button1" onClick={() => router.push("/invoices/new")}>
      New Invoice
    </Button>
  );
}
