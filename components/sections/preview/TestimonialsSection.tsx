"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PLACEHOLDERS = [
  {
    initial: "M",
    category: "Children's toys · US",
    excerpt:
      "We will add client testimonials here as cases close and sellers authorise their names to be used.",
    status: "Coming soon",
  },
  {
    initial: "A",
    category: "Electronics · EU",
    excerpt:
      "Your feedback will help future sellers understand what our process looks like in practice.",
    status: "Coming soon",
  },
  {
    initial: "R",
    category: "Apparel · CA",
    excerpt:
      "Every card below will be a real reinstated ASIN, with the compliance challenge and the outcome.",
    status: "Coming soon",
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[var(--paper-sage)]">
      <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-14 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[var(--ink)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink)]">
                § 06 — Voices
              </span>
            </div>
            <h2 className="font-display mt-10 text-5xl font-[500] leading-[0.95] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl">
              From the{" "}
              <span className="italic text-[var(--signal-deep)]">
                reinstated
              </span>
              .
            </h2>
            <p className="mt-8 text-[17px] leading-relaxed text-[var(--ink-2)]">
              Our testimonial page is intentionally empty today. We are a new
              brand; authentic quotes from real sellers matter more than
              placeholder marketing copy. This space is reserved for the
              sellers whose listings we bring back.
            </p>
          </div>

          <div ref={ref} className="lg:col-span-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PLACEHOLDERS.map((p, i) => (
                <motion.div
                  key={p.initial}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  className="group relative flex flex-col justify-between border border-dashed border-[var(--ink)]/20 bg-[var(--paper)]/60 p-6 backdrop-blur-sm transition-colors hover:border-[var(--ink)]/40"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div
                        className="font-display flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)]/10 text-xl font-[500] italic text-[var(--ink)]/40"
                        aria-hidden
                      >
                        {p.initial}
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--ink-3)]">
                        {p.status}
                      </span>
                    </div>
                    <p className="mt-6 text-sm leading-relaxed text-[var(--ink-2)]">
                      &ldquo;{p.excerpt}&rdquo;
                    </p>
                  </div>
                  <div className="mt-8 border-t border-dashed border-[var(--ink)]/15 pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink-3)]">
                      {p.category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-3)]">
              // Authentic case studies coming Q2 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
