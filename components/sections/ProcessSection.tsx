import MonoLabel from "@/components/ui/MonoLabel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import NumberMarker from "@/components/ui/NumberMarker";

const STEPS = [
  {
    title: "Understand your product",
    body: "We start by thoroughly reviewing your product — its category, intended use, target market, and applicable safety standards — to build a clear picture of what compliance looks like for your specific case.",
  },
  {
    title: "Review the Amazon compliance notification",
    body: "We go through every line of the compliance notification or safety alert Amazon has raised against your product, identifying exactly what has been flagged, why, and what Amazon is asking for.",
  },
  {
    title: "Check Amazon's policies for your product",
    body: "We review the specific Amazon policies applicable to your product category and marketplace to determine whether your product is required to meet additional safety requirements — and precisely what those requirements are.",
  },
  {
    title: "Decode existing compliance cases",
    body: "If you already have an open case with Amazon, we review the full history of Amazon's communications with you — cutting through the automated rejection language to identify exactly what Amazon's compliance team is looking for and where your case is stuck.",
  },
  {
    title: "Handle all Amazon communication and submissions",
    body: "Our team takes over all communication with Amazon on your behalf. We manage the entire appeal and document submission process — ensuring every submission is structured correctly and addresses exactly what Amazon needs to see.",
  },
  {
    title: "Work with you to close documentation gaps",
    body: "Where safety documents are missing or insufficient, we work directly with you to identify what is needed, explain what each document must contain, and guide you through obtaining or completing the required documentation.",
  },
];

export default function ProcessSection() {
  return (
    <section className="border-b border-[var(--rule)] bg-[var(--paper-warm)]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <RevealOnScroll>
          <MonoLabel prefix="→">SECTION 03 // METHOD</MonoLabel>
          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.02em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
            Our process
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-[var(--ink-2)]">
            When you come to Amazon Safety Pro, you are not handing your case
            to a generic consultant. You are working with a team of tenured
            ex-Amazonians who follow a structured, proven approach — the same
            approach used inside Amazon&rsquo;s own compliance operations.
          </p>
        </RevealOnScroll>

        <div className="mt-20 grid gap-px bg-[var(--rule)] md:grid-cols-2">
          {STEPS.map((step, i) => (
            <RevealOnScroll
              key={step.title}
              delay={(i % 2) * 0.08}
              showLine={false}
              className="bg-[var(--paper)] p-8 transition-colors hover:bg-[var(--paper-edge)] sm:p-10"
            >
              <div className="flex items-baseline justify-between">
                <NumberMarker n={i + 1} total={STEPS.length} />
                <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)]">
                  STEP
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold leading-tight text-[var(--ink)] sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-4 text-[var(--ink-2)]">{step.body}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
