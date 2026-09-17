import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition",
        variant === "primary"
          ? "bg-[var(--brand-dark)] text-white hover:opacity-90"
          : "border border-[var(--brand-border)] bg-white/40 hover:bg-white",
        className
      )}
    >
      {children}
    </Link>
  );
}
