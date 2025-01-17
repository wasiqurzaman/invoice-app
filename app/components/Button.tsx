import React, { ButtonHTMLAttributes } from "react";
import { FaPlus } from "react-icons/fa6";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: string;
  children: React.ReactNode;
};

export default function Button({ variant, children, ...props }: ButtonProps) {
  let className = "";

  switch (variant) {
    case "button1":
      className =
        "gap-4 py-2 pl-2 pr-[18px] bg-primary hover:bg-primary-hover text-white";
      break;
    case "button2":
      className =
        "pt-[18px] pb-[15px] px-[24px] bg-primary hover:bg-primary-hover text-white";
      break;
    case "button3":
      className =
        "pt-[18px] pb-[15px] px-[24px] bg-[#F9FAFE] dark:bg-card-2 hover:bg-[#DFE3FA] dark:hover:bg-white text-textCol-3";
      break;
    case "button4":
      className =
        "pt-[18px] pb-[15px] px-[24px] bg-[#373B53] hover:bg-textCol-main dark:hover:bg-card text-textCol-2";
      break;
    case "button5":
      className =
        "pt-[18px] pb-[15px] px-[24px] bg-accent hover:bg-accent-hover text-white";
      break;
    case "button6":
      className =
        "justify-center pt-[18px] pb-[15px] px-[115px] bg-[#F9FAFE] hover:bg-[#DFE3FA] text-textCol-3";
      break;
    default:
      className =
        "pt-[18px] pb-[15px] px-[24px] bg-primary hover:bg-primary-hover text-white";
  }

  return (
    <button
      className={`flex items-center heading-sm  rounded-full transition-all duration-200 ${className}`}
      {...props}
    >
      {variant === "button1" && (
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
          <FaPlus color="#7C5DFA" size={16} className="font-bold" />
        </div>
      )}
      {children}
    </button>
  );
}
