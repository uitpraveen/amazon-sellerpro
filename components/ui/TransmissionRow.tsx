export default function TransmissionRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-[var(--rule)] py-3 last:border-b-0">
      <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--ink-3)]">
        {label}
      </span>
      <span className="text-right font-mono text-[12px] uppercase tracking-wider text-[var(--ink)]">
        {value}
      </span>
    </div>
  );
}
