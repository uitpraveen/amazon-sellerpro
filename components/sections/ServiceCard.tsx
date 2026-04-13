import Link from "next/link";
import type { ServiceDef } from "@/lib/services-data";
import FramedBlock from "@/components/ui/FramedBlock";
import NumberMarker from "@/components/ui/NumberMarker";

export default function ServiceCard({ service }: { service: ServiceDef }) {
  return (
    <FramedBlock className="group h-full bg-[var(--paper)] transition-all duration-300 hover:bg-[var(--signal-soft)]/30">
      <div className="flex items-baseline justify-between">
        <NumberMarker n={service.number} total={5} />
        <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)]">
          [ {service.code.toUpperCase()} ]
        </span>
      </div>

      <h3 className="mt-6 text-2xl font-bold leading-tight text-[var(--ink)]">
        {service.title}
      </h3>

      <div className="mt-4">
        <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)]">
          → WHAT IT IS
        </span>
        <p className="mt-2 text-[var(--ink-2)]">{service.what}</p>
      </div>

      {service.who && (
        <div className="mt-6">
          <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)]">
            → WHO NEEDS IT
          </span>
          <p className="mt-2 text-[var(--ink-2)]">{service.who}</p>
        </div>
      )}

      {service.whyMatters && (
        <div className="mt-6">
          <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--alert)]">
            → WHY IT MATTERS
          </span>
          <p className="mt-2 text-[var(--ink-2)]">{service.whyMatters}</p>
        </div>
      )}

      <div className="mt-6">
        <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--signal)]">
          → SCOPE OF WORK
        </span>
        <ul className="mt-3 space-y-2">
          {service.includes.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm leading-relaxed text-[var(--ink-2)]"
            >
              <span className="mt-1 font-mono text-[var(--signal)]">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {service.closingNote && (
        <p className="mt-6 border-l-2 border-[var(--signal)] pl-4 text-sm italic text-[var(--ink-2)]">
          {service.closingNote}
        </p>
      )}

      <div className="mt-8 border-t border-dashed border-[var(--rule)] pt-6">
        <Link
          href={`/contact?inquiry=${service.inquiry}`}
          className="group/btn inline-flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-widest text-[var(--ink)] transition-colors hover:text-[var(--signal)]"
        >
          <span className="inline-block h-2 w-2 bg-[var(--ink)] transition-colors group-hover/btn:bg-[var(--signal)]" />
          {service.ctaLabel}
          <span className="transition-transform group-hover/btn:translate-x-1">→</span>
        </Link>
      </div>
    </FramedBlock>
  );
}
