type Tone = "default" | "ok" | "alert" | "signal";

const TONES: Record<Tone, string> = {
  default: "border-[var(--rule)] text-[var(--ink-2)]",
  ok: "border-[var(--ok)] text-[var(--ok)]",
  alert: "border-[var(--alert)] text-[var(--alert)]",
  signal: "border-[var(--signal)] text-[var(--signal)]",
};

export default function StatusPill({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 border px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest ${TONES[tone]}`}
    >
      <span aria-hidden>[</span>
      <span>{children}</span>
      <span aria-hidden>]</span>
    </span>
  );
}
