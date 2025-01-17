"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      className="flex items-center gap-6 self-start"
      onClick={() => router.back()}
    >
      <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.342.886L2.114 5.114l4.228 4.228"
          stroke="#9277FF"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
        />
      </svg>
      <span className="heading-sm">Go back</span>
    </button>
  );
}
