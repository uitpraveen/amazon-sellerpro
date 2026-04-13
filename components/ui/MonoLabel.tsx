import { cn } from "@/lib/utils";

export default function MonoLabel({
  children,
  prefix,
  className,
}: {
  children: React.ReactNode;
  prefix?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--ink-3)]",
        className
      )}
    >
      {prefix && <span className="mr-1.5 text-[var(--signal)]">{prefix}</span>}
      {children}
    </span>
  );
}
