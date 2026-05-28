import MonoLabel from "@/components/ui/MonoLabel";
import FramedBlock from "@/components/ui/FramedBlock";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HairlineDivider from "@/components/ui/HairlineDivider";

const REJECTIONS = [
  "Your appeal has been rejected. Please review our policies and resubmit.",
  "We are unable to accept the documents provided. Please submit the correct documentation.",
  "Your product does not meet our safety requirements. Your listing has been removed.",
];

export default function SoundFamiliarSection() {
  return (
    <section className="border-b border-[var(--rule)] bg-[var(--paper)]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <RevealOnScroll>
          <MonoLabel prefix="→">SECTION 02 // RECOGNITION</MonoLabel>
          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.02em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
            Sound familiar?
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-[var(--ink-2)]">
            If any of these look familiar, you are in the right place.
          </p>
        </RevealOnScroll>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {REJECTIONS.map((quote, i) => (
            <RevealOnScroll key={i} delay={i * 0.08} showLine={false}>
              <FramedBlock
                bracketColor="var(--alert)"
                className="h-full bg-[var(--paper)]"
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="inline-block h-2 w-2 bg-[var(--alert)]" />
                  <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--alert)]">
                    REJECTED · NOTICE {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="font-mono text-sm leading-relaxed text-[var(--ink)]">
                  &ldquo;{quote}&rdquo;
                </p>
              </FramedBlock>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mt-20" delay={0.1}>
          <div className="grid gap-12 lg:grid-cols-2">
            <p className="text-lg leading-relaxed text-[var(--ink-2)]">
              If you have been going back and forth with Amazon - submitting
              documents, receiving the same rejection, resubmitting, and getting
              nowhere - you are not alone. Thousands of Amazon sellers face this
              exact situation every day. The rejections are automated. The
              messages are vague. And no one at Amazon is telling you what is
              actually wrong or what you actually need to do to fix it.
            </p>
            <p className="text-lg leading-relaxed text-[var(--ink-2)]">
              The frustration is real. The lost revenue is real. And the clock
              is ticking on your listing.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-24">
          <HairlineDivider label="THIS IS EXACTLY WHERE WE COME IN" />
        </div>

        <RevealOnScroll className="mt-12" showLine={false}>
          <p className="max-w-4xl text-xl leading-relaxed text-[var(--ink)] lg:text-2xl">
            At Amazon Safety Pro, we do what Amazon&rsquo;s automated system
            cannot - we read between the lines. Our team of ex-Amazonians knows
            how to decode the rejection notices, identify the specific gap that
            is causing them, and build a response that actually addresses what
            Amazon&rsquo;s compliance team needs to see.{" "}
            <span className="text-[var(--ink-3)]">
              No more guessing. No more resubmitting the same documents hoping
              for a different result. Just a clear picture of the problem and a
              direct path to resolving it.
            </span>
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
