export default function InvoiceStatus({
  status,
}: {
  status: "paid" | "pending" | "draft";
}) {
  return (
    <div
      className={`w-[104px] flex items-center justify-center gap-2 pt-[14px] pb-[11px] rounded-[6px] ${
        status === "paid"
          ? "bg-green-custom/5"
          : status === "pending"
          ? "bg-orange-custom/5"
          : "bg-[#373B53]/5"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          status === "paid"
            ? "bg-green-custom"
            : status === "pending"
            ? "bg-orange-custom"
            : "bg-[#373B53] dark:bg-[#DFE3FA]"
        }`}
      ></div>
      <span
        className={`heading-sm capitalize ${
          status === "paid"
            ? "text-green-custom"
            : status === "pending"
            ? "text-orange-custom"
            : "text-[#373B53] dark:text-[#DFE3FA]"
        }`}
      >
        {status}
      </span>
    </div>
  );
}
