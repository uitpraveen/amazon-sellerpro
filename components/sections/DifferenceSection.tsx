import MonoLabel from "@/components/ui/MonoLabel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import NumberMarker from "@/components/ui/NumberMarker";

const ROWS = [
  "Half a decade inside Amazon's product safety team — our group lead",
  "100% team of past, tenured Amazonians",
  "Serving FBA sellers, brand owners, importers and manufacturers",
  "One clear path: from restricted to reinstated — we handle every step",
];

export default function DifferenceSection() {
  return (
    <section className="border-b border-[var(--rule)] bg-[var(--paper-warm)]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <RevealOnScroll>
          <MonoLabel prefix="→">SECTION 07 // DELTA</MonoLabel>
          <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.02em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
            The Amazon Safety Pro difference
          </h2>
        </RevealOnScroll>

        <ul className="mt-16 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
          {ROWS.map((row, i) => (
            <RevealOnScroll key={row} delay={i * 0.06} showLine={false}>
              <li className="group flex items-start gap-6 py-8 transition-colors hover:bg-[var(--paper-edge)] sm:gap-12">
                <NumberMarker n={i + 1} total={ROWS.length} className="shrink-0 pt-1" />
                <p className="flex-1 text-xl leading-snug text-[var(--ink)] sm:text-2xl">
                  {row}
                </p>
                <span className="hidden shrink-0 self-center font-mono text-[var(--signal)] opacity-0 transition-opacity group-hover:opacity-100 sm:inline">
                  →
                </span>
              </li>
            </RevealOnScroll>
          ))}
        </ul>
      </div>
    </section>
  );
}
