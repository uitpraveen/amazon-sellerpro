export default function NumberMarker({
  n,
  total,
  tone = "alert",
  className,
}: {
  n: number;
  total?: number;
  tone?: "alert" | "ink" | "signal";
  className?: string;
}) {
  const color =
    tone === "alert"
      ? "text-[var(--alert)]"
      : tone === "signal"
        ? "text-[var(--signal)]"
        : "text-[var(--ink)]";
  const label = `${n.toString().padStart(2, "0")}${
    total ? ` / ${total.toString().padStart(2, "0")}` : ""
  }`;
  return (
    <span
      className={`font-mono text-sm tracking-widest ${color} ${className ?? ""}`}
    >
      [ {label} ]
    </span>
  );
}
