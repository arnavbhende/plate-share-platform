import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`w-full rounded-2xl bg-[#2E7D32] px-4 py-3 font-semibold text-white shadow-md transition hover:bg-[#1B5E20] disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
