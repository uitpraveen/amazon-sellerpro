"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BaseProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  arrow?: boolean;
}

interface ButtonProps extends BaseProps {
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  href?: never;
}

interface LinkProps extends BaseProps {
  href: string;
  type?: never;
  onClick?: never;
  disabled?: never;
}

export default function TacticalButton(props: ButtonProps | LinkProps) {
  const { children, variant = "primary", className, arrow = true } = props;

  const base = cn(
    "group relative inline-flex cursor-pointer items-center gap-3 px-7 py-3.5 font-mono text-[12px] font-medium uppercase tracking-[0.15em] transition-colors",
    variant === "primary"
      ? "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--signal)]"
      : "border border-[var(--ink)] text-[var(--ink)] hover:border-[var(--signal)] hover:text-[var(--signal)]",
    className
  );

  const inner = (
    <>
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[6px] origin-bottom bg-[var(--signal)]"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
      <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-2">
        {children}
      </span>
      {arrow && <span className="relative z-10">→</span>}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 translate-x-[3px] translate-y-[3px] border border-[var(--ink)]"
      />
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={base}>
        {inner}
      </Link>
    );
  }
  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(base, props.disabled && "opacity-60")}
    >
      {inner}
    </button>
  );
}
