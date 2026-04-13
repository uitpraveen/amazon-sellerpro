import MonoLabel from "@/components/ui/MonoLabel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import FramedBlock from "@/components/ui/FramedBlock";
import TacticalButton from "@/components/ui/TacticalButton";

export default function HomeCTASection() {
  return (
    <section className="bg-gradient-to-b from-[var(--paper-cool)] to-[var(--signal-soft)]/60">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <RevealOnScroll showLine={false}>
          <FramedBlock
            bracketColor="var(--signal)"
            className="border border-dashed border-[var(--rule)] bg-[var(--paper)] px-6 py-12 sm:px-12 sm:py-20"
          >
            <div className="text-center">
              <MonoLabel prefix="→">FREE REVIEW PROTOCOL // OPEN</MonoLabel>
              <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
                Tired of rejections with no answers?{" "}
                <span className="text-[var(--signal)]">Start here.</span>
              </h2>
              <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-[var(--ink-2)]">
                Submit your compliance documents and Amazon notifications for a
                free review. Our team will go through everything — your
                rejection notices, your existing documents, your case history —
                and come back to you with a clear, honest picture of what is
                wrong and what the path forward looks like.
              </p>
              <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-[var(--ink-2)]">
                No automated responses. No guesswork. A real ex-Amazonian will
                review your case personally. If there is a viable path to
                reinstatement, we will walk you through it — and set up a call
                if needed.
              </p>

              <div className="mt-12 flex flex-col items-center gap-4">
                <TacticalButton href="/free-validation">
                  Submit your documents
                </TacticalButton>
                <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)]">
                  // NO OBLIGATION · WE REVIEW FIRST · THEN TALK
                </p>
              </div>
            </div>
          </FramedBlock>
        </RevealOnScroll>
      </div>
    </section>
  );
}
