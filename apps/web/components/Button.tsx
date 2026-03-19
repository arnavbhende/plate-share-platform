import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className = "" }) {
  return (
    <button
      className={`px-4 py-2 rounded-2xl font-semibold ${className}`}
    >
      {children}
    </button>
  );
}
