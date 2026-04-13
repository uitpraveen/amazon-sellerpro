"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
    body: "We review the specific Amazon policies applicable to your product category and marketplace to determine whether your product is required to meet additional safety requirements.",
  },
  {
    title: "Decode existing compliance cases",
    body: "If you already have an open case with Amazon, we review the full history of Amazon's communications with you — cutting through automated rejection language to identify exactly where your case is stuck.",
  },
  {
    title: "Handle all Amazon communication and submissions",
    body: "Our team takes over all communication with Amazon on your behalf. We manage the entire appeal and document submission process — ensuring every submission is structured correctly.",
  },
  {
    title: "Close documentation gaps",
    body: "Where safety documents are missing or insufficient, we work directly with you to identify what is needed, explain what each document must contain, and guide you through obtaining it.",
  },
];

export default function DarkProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-[var(--ink)] text-[var(--paper)]">
      {/* Subtle grid background for dark mode */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--paper) 1px, transparent 1px), linear-gradient(90deg, var(--paper) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top gradient edge */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-40 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at top, var(--signal) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 py-24 lg:px-14 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Left — Section header */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[var(--signal)]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--signal)]">
                  § 03 — Method
                </span>
              </div>

              <h2 className="font-display mt-10 text-5xl font-[500] leading-[0.95] tracking-[-0.02em] text-[var(--paper)] sm:text-6xl lg:text-[80px]">
                A structured,{" "}
                <span className="italic text-[var(--signal)]">proven</span>{" "}
                approach — used inside Amazon&rsquo;s own compliance operations.
              </h2>

              <p className="mt-10 max-w-md text-[17px] leading-relaxed text-[var(--paper)]/70">
                When you come to Amazon Safety Pro, you are not handing your
                case to a generic consultant. You are working with a team of
                tenured ex-Amazonians who follow the same process used at
                Amazon.
              </p>

              <div className="mt-10 inline-flex items-center gap-3 border border-[var(--paper)]/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--paper)]/60">
                <span className="relative inline-block h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[var(--signal)]/60" />
                  <span className="relative inline-block h-2 w-2 rounded-full bg-[var(--signal)]" />
                </span>
                06 steps · live
              </div>
            </div>
          </div>

          {/* Right — Steps */}
          <div ref={ref} className="lg:col-span-7">
            <ol className="space-y-0">
              {STEPS.map((step, i) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: "easeOut",
                  }}
                  className="group grid gap-6 border-b border-[var(--paper)]/10 py-8 last:border-b-0 md:grid-cols-[80px_1fr]"
                >
                  <div className="font-display text-4xl font-[500] leading-none text-[var(--signal)] md:pt-2">
                    {(i + 1).toString().padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-[500] leading-tight tracking-[-0.01em] text-[var(--paper)] md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--paper)]/70">
                      {step.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
