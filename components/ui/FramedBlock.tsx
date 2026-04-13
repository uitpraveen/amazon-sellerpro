import { cn } from "@/lib/utils";

export default function FramedBlock({
  children,
  className,
  bracketColor = "var(--ink)",
}: {
  children: React.ReactNode;
  className?: string;
  bracketColor?: string;
}) {
  return (
    <div className={cn("relative px-6 py-6 sm:px-8 sm:py-8", className)}>
      <Bracket position="tl" color={bracketColor} />
      <Bracket position="tr" color={bracketColor} />
      <Bracket position="bl" color={bracketColor} />
      <Bracket position="br" color={bracketColor} />
      {children}
    </div>
  );
}

function Bracket({
  position,
  color,
}: {
  position: "tl" | "tr" | "bl" | "br";
  color: string;
}) {
  const pos = {
    tl: "left-0 top-0",
    tr: "right-0 top-0 rotate-90",
    bl: "left-0 bottom-0 -rotate-90",
    br: "right-0 bottom-0 rotate-180",
  }[position];
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      className={`pointer-events-none absolute ${pos}`}
    >
      <path d="M 0 8 L 0 0 L 8 0" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}
