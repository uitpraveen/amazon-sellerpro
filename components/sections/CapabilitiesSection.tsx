import MonoLabel from "@/components/ui/MonoLabel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import FramedBlock from "@/components/ui/FramedBlock";

const CAPS = [
  {
    code: "CPC",
    title: "CPC creation",
    desc: "Children's Product Certificate for US marketplace compliance",
  },
  {
    code: "DOC",
    title: "DOC / GCC creation",
    desc: "Declaration of Conformity and General Certificate of Conformity",
  },
  {
    code: "VAL",
    title: "Document validation",
    desc: "Review of existing compliance documents against Amazon's standards",
  },
  {
    code: "PSD",
    title: "Product safety document validation",
    desc: "Category-specific safety document review for Amazon submissions",
  },
];

export default function CapabilitiesSection() {
  return (
    <section className="border-b border-[var(--rule)] bg-[var(--paper-sage)]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <RevealOnScroll>
          <MonoLabel prefix="→">SECTION 04 // CAPABILITIES</MonoLabel>
          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.02em] text-[var(--ink)] sm:text-4xl lg:text-5xl">
            Where required, our team can also prepare and create the compliance
            documents your product needs.
          </h2>
        </RevealOnScroll>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {CAPS.map((cap, i) => (
            <RevealOnScroll key={cap.code} delay={(i % 2) * 0.06} showLine={false}>
              <FramedBlock className="h-full bg-[var(--paper)] transition-colors hover:bg-[var(--signal-soft)]">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--signal)]">
                    [ {cap.code} ]
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)]">
                    {String(i + 1).padStart(2, "0")} / 04
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-[var(--ink)]">
                  {cap.title}
                </h3>
                <p className="mt-3 text-[var(--ink-2)]">{cap.desc}</p>
              </FramedBlock>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
