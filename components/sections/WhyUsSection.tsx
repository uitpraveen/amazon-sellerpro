import MonoLabel from "@/components/ui/MonoLabel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HairlineDivider from "@/components/ui/HairlineDivider";

const REASONS = [
  {
    label: "01 / INSIDER REVIEWS",
    title: "We know what Amazon's team actually looks for",
    body: "Beyond what the policy pages say, we understand how Amazon's compliance reviewers evaluate submissions — what gets approved, what gets rejected, and why. That knowledge directly improves the quality and success rate of every submission we make on your behalf.",
  },
  {
    label: "02 / GAP DETECTION",
    title: "We spot the missing requirement others miss",
    body: "Many sellers are stuck not because their product is unsafe, but because one specific document, one missing test standard, or one incorrectly completed certificate is blocking their case. Our insider knowledge helps us identify that gap quickly — and fix it correctly the first time.",
  },
  {
    label: "03 / DECODE LANGUAGE",
    title: "We decode Amazon's language",
    body: "Amazon's rejection notices are written in precise, technical policy language that is easy to misread. Our team decodes them accurately — so you know exactly what is being asked, not a general guess or a misinterpretation that leads to yet another rejection.",
  },
  {
    label: "04 / REINSTATEMENT PATH",
    title: "We know the reinstatement path",
    body: "Reinstatement is not just about submitting documents — it is about submitting the right documents, structured the right way, through the right channel. Our inside experience means we know exactly how to move a case forward.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="border-b border-[var(--rule)] bg-[var(--paper-cool)]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <RevealOnScroll>
          <MonoLabel prefix="→">SECTION 06 // DIFFERENTIATORS</MonoLabel>
          <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.02em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
            Why Amazon Safety Pro?
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-[var(--ink-2)]">
            Most compliance consultants work from the outside — reading the
            same policy pages you can access yourself. Amazon Safety Pro is
            fundamentally different. Our team spent years working inside
            Amazon&rsquo;s product safety operations, which means we bring a
            level of insight that no amount of external research can replicate.
          </p>
        </RevealOnScroll>

        <div className="mt-16">
          <HairlineDivider />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {REASONS.map((r, i) => (
            <RevealOnScroll
              key={r.label}
              delay={(i % 2) * 0.08}
              showLine={false}
              className="border-l-2 border-[var(--signal)] pl-6"
            >
              <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--signal)]">
                {r.label}
              </span>
              <h3 className="mt-3 text-2xl font-bold text-[var(--ink)]">
                {r.title}
              </h3>
              <p className="mt-3 text-[var(--ink-2)]">{r.body}</p>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mt-20" delay={0.1}>
          <p className="max-w-4xl text-xl leading-relaxed text-[var(--ink-2)]">
            Whether you are a new FBA seller preparing your first product
            launch, a brand owner managing a growing catalog, an importer
            sourcing products for multiple marketplaces, or a manufacturer
            responding to a compliance notice — our team brings the same depth
            of insider knowledge and the same commitment to getting your
            product compliant and your listing active.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
