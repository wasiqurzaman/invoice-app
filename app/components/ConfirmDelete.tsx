"use client";

import React from "react";
import Button from "./Button";

export default function ConfirmDelete({
  onDelete,
  onCancel,
  invoiceNumber,
}: {
  invoiceNumber: string;
  onDelete: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed left-[100px] top-0 w-screen h-screen flex justify-center items-center">
      {/* overlay */}
      <div className="fixed w-full h-full top-0 left-0 bg-black opacity-35 z-30"></div>
      <div className="flex flex-col gap-8 p-[48px] bg-card-2 w-[480px] h-[250px] rounded-md z-40">
        <div className="flex flex-col gap-6">
          <h3 className="heading-md">Confirm Deletion</h3>
          <h4 className="text-[14px]">
            Are you sure you want to delete invoice{" "}
            <span>#{invoiceNumber}</span>? This action cannot be undone.
          </h4>
        </div>
        <div className="flex gap-4 mt-auto justify-end">
          <Button variant="button4" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="button5" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
