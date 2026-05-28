import MonoLabel from "@/components/ui/MonoLabel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import FramedBlock from "@/components/ui/FramedBlock";

export default function RestoredSection() {
  return (
    <section className="border-b border-[var(--rule)] bg-[var(--paper)]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <RevealOnScroll>
          <MonoLabel prefix="→">SECTION 05 // OUTCOME</MonoLabel>
          <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.02em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
            From restricted to reinstated.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll className="mt-12">
          <p className="max-w-3xl text-lg leading-relaxed text-[var(--ink-2)]">
            Once your documentation is in order, we don&rsquo;t stop there. Our
            team navigates the entire reinstatement path on your behalf - from
            identifying the correct reinstatement route for your stranded ASIN,
            to managing the submission and follow-up with Amazon until your
            listing is fully active again. Our team&rsquo;s insider knowledge
            gives our clients a significant advantage in the reinstatement
            process.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-16" showLine={false} delay={0.1}>
          <FramedBlock
            bracketColor="var(--signal)"
            className="bg-[var(--ink)] text-[var(--paper)]"
          >
            <div className="text-center">
              <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--signal)]">
                // SIGNAL · CORE THESIS
              </span>
              <p className="mx-auto mt-6 max-w-3xl text-2xl font-bold leading-snug sm:text-3xl lg:text-4xl">
                We know what Amazon&rsquo;s teams look for, because{" "}
                <span className="text-[var(--signal)]">
                  we were those teams.
                </span>
              </p>
            </div>
          </FramedBlock>
        </RevealOnScroll>
      </div>
    </section>
  );
}
