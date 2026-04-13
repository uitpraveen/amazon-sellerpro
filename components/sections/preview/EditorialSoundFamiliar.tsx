"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const REJECTIONS = [
  {
    text: "Your appeal has been rejected. Please review our policies and resubmit.",
    tag: "APPEAL REJECTED",
  },
  {
    text: "We are unable to accept the documents provided. Please submit the correct documentation.",
    tag: "DOCS DECLINED",
  },
  {
    text: "Your product does not meet our safety requirements. Your listing has been removed.",
    tag: "LISTING REMOVED",
  },
];

export default function EditorialSoundFamiliar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[var(--paper-cool)]">
      <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-14 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[var(--ink)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink)]">
                § 02 — Recognition
              </span>
            </div>
            <h2 className="font-display mt-10 text-5xl font-[500] leading-[0.95] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl lg:text-[72px]">
              Sound{" "}
              <span className="italic text-[var(--signal-deep)]">familiar</span>
              ?
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-[var(--ink-2)]">
              If you have been going back and forth with Amazon — submitting
              documents, receiving the same rejection, resubmitting, and
              getting nowhere — you are not alone.
            </p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--ink-2)]">
              Thousands of Amazon sellers face this exact situation every day.
              The rejections are automated. The messages are vague. And no one
              at Amazon is telling you what is actually wrong.
            </p>
            <p className="mt-8 max-w-md font-display text-2xl font-[500] italic leading-snug text-[var(--ink)]">
              The frustration is real. The lost revenue is real. And the clock
              is ticking on your listing.
            </p>
          </div>

          <div ref={ref} className="space-y-5 lg:col-span-7">
            {REJECTIONS.map((r, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: "easeOut",
                }}
                className="group relative border-l-2 border-[var(--alert)] bg-[var(--paper)] p-8 shadow-[6px_6px_0_0_var(--ink)] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_var(--ink)] sm:p-10"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="relative inline-block h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-[var(--alert)]/60" />
                    <span className="relative inline-block h-2 w-2 rounded-full bg-[var(--alert)]" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--alert)]">
                    {r.tag} · NOTICE {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="font-display text-2xl font-[400] italic leading-snug text-[var(--ink)] sm:text-3xl">
                  &ldquo;{r.text}&rdquo;
                </p>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
