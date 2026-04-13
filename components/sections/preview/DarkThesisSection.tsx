"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function DarkThesisSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--signal-deep)",
        color: "var(--paper)",
      }}
    >
      {/* Gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--signal-deep) 0%, #050A3E 100%)",
        }}
      />

      {/* Noise texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        ref={ref}
        className="relative mx-auto max-w-[1440px] px-6 py-28 lg:px-14 lg:py-40"
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-12 bg-[var(--paper)]/60" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--paper)]/60">
            § 04 — Thesis
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
          className="font-display mt-14 max-w-[1100px] text-[44px] font-[500] leading-[1.05] tracking-[-0.02em] text-[var(--paper)] sm:text-[64px] lg:text-[92px] xl:text-[108px]"
        >
          We know what{" "}
          <span className="italic">Amazon&rsquo;s teams</span> look for,
          because{" "}
          <span className="relative inline-block">
            <span className="relative z-10 italic">we were those teams.</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, delay: 1.4, ease: [0.65, 0, 0.35, 1] }}
              className="absolute -bottom-2 left-0 right-0 h-[6px] origin-left bg-[var(--signal)]"
            />
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-20 grid gap-12 md:grid-cols-3"
        >
          <div className="border-l border-[var(--paper)]/20 pl-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--paper)]/50">
              Policy authorship
            </span>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper)]/80">
              The compliance requirements you are navigating were, in part,
              written by the person now leading your case.
            </p>
          </div>
          <div className="border-l border-[var(--paper)]/20 pl-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--paper)]/50">
              Operational insight
            </span>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper)]/80">
              We understand how Amazon&rsquo;s compliance reviewers evaluate
              submissions — what gets approved, what gets rejected, and why.
            </p>
          </div>
          <div className="border-l border-[var(--paper)]/20 pl-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--paper)]/50">
              Reinstatement path
            </span>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper)]/80">
              We know exactly how to move a flagged or suppressed ASIN through
              Amazon&rsquo;s verification process as efficiently as possible.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
