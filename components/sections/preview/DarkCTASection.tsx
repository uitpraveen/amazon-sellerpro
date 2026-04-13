"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function DarkCTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-[var(--ink)] text-[var(--paper)]">
      {/* Radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, var(--signal-deep) 0%, transparent 70%)",
        }}
      />
      {/* Grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--paper) 1px, transparent 1px), linear-gradient(90deg, var(--paper) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div
        ref={ref}
        className="relative mx-auto max-w-[1440px] px-6 py-28 lg:px-14 lg:py-40"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-12 bg-[var(--signal)]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--signal)]">
            § 07 — Open a case
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="font-display mt-12 max-w-[1100px] text-5xl font-[500] leading-[0.95] tracking-[-0.02em] text-[var(--paper)] sm:text-6xl lg:text-[92px] xl:text-[108px]"
        >
          Tired of rejections{" "}
          <span className="italic text-[var(--signal)]">with no answers</span>?
          Start here.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-20"
        >
          <div className="lg:col-span-7">
            <p className="text-[18px] leading-[1.7] text-[var(--paper)]/80">
              Submit your compliance documents and Amazon notifications for a
              free review. Our team will go through everything — your
              rejection notices, your existing documents, your case history —
              and come back to you with a clear, honest picture of what is
              wrong and what the path forward looks like.
            </p>
            <p className="mt-6 text-[18px] leading-[1.7] text-[var(--paper)]/80">
              No automated responses. No guesswork. A real ex-Amazonian will
              review your case personally. If there is a viable path to
              reinstatement, we will walk you through it — and set up a call
              if needed.
            </p>

            <div className="mt-14 flex flex-wrap items-center gap-8">
              <Link
                href="/free-validation"
                className="group relative inline-flex cursor-pointer items-center gap-4 bg-[var(--signal)] px-10 py-5 text-[14px] font-medium tracking-wide text-[var(--paper)] transition-all duration-300 hover:bg-[var(--paper)] hover:text-[var(--ink)]"
              >
                Submit documents for free review
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex cursor-pointer items-center gap-2 border-b border-[var(--paper)]/40 pb-1 text-[14px] font-medium text-[var(--paper)]/80 transition-colors hover:border-[var(--signal)] hover:text-[var(--signal)]"
              >
                Or contact us directly
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-[var(--paper)]/15 p-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--paper)]/50">
                What you get
              </span>
              <ul className="mt-6 space-y-5">
                {[
                  "Complete case review by a tenured ex-Amazonian",
                  "Clear diagnosis of what Amazon flagged and why",
                  "Documented path to reinstatement, with timelines",
                  "Response within one business day",
                  "Zero obligation to engage beyond the free review",
                ].map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-4 text-[15px] leading-snug text-[var(--paper)]/85"
                  >
                    <span className="mt-1 font-mono text-[10px] text-[var(--signal)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-[var(--paper)]/15 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--paper)]/50">
                  No obligation · We review first · Then talk
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
