import { HTMLAttributes, ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

export default function Badge({ children, className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-white/70 px-2.5 py-1 text-xs font-medium text-gray-800 backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
