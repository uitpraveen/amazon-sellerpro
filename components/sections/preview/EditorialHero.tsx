"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function EditorialHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--paper-warm)]">
      {/* Decorative fine grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 pt-28 pb-24 lg:px-14 lg:pt-36 lg:pb-32 xl:pt-44">
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-16 flex items-center justify-between border-b border-[var(--ink)]/15 pb-6"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-3)]">
            Est. 2026 · Proxima CPEX LLC
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-3)] sm:inline">
            07 marketplaces · one team
          </span>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Left — Brand moment */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex items-center gap-4"
            >
              <span className="h-px w-10 bg-[var(--ink)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink)]">
                § 01 — Mission
              </span>
            </motion.div>

            <h1 className="font-display mt-10 text-[56px] font-[600] leading-[0.95] tracking-[-0.025em] text-[var(--ink)] sm:text-[76px] lg:text-[104px] xl:text-[116px]">
              <motion.span
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 }}
                className="block"
              >
                Amazon safety
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="block"
              >
                & compliance,{" "}
                <span className="italic text-[var(--signal-deep)]">handled</span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.65 }}
                className="block"
              >
                by people who
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                className="block"
              >
                built the rules.
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-12 grid gap-12 lg:grid-cols-12"
            >
              <p className="text-lg leading-[1.65] text-[var(--ink-2)] lg:col-span-8 lg:text-xl">
                Amazon Safety Pro is led by ex-Amazonians who spent half a
                decade inside Amazon&rsquo;s product safety team — not just
                reading the policies, but writing, enforcing, and refining
                them. We put that insider knowledge to work for sellers like
                you, guiding you from{" "}
                <span className="italic text-[var(--ink)]">restricted</span> to{" "}
                <span className="italic text-[var(--ink)]">reinstated</span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <Link
                href="/free-validation"
                className="group inline-flex cursor-pointer items-center gap-4 bg-[var(--ink)] px-8 py-4 text-[14px] font-medium tracking-wide text-[var(--paper)] transition-all duration-300 hover:bg-[var(--signal-deep)]"
              >
                Submit for free review
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/services"
                className="group inline-flex cursor-pointer items-center gap-2 border-b border-[var(--ink)] pb-1 text-[14px] font-medium text-[var(--ink)] transition-colors hover:border-[var(--signal)] hover:text-[var(--signal)]"
              >
                View services
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right — Editorial numeral display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="relative lg:col-span-4"
          >
            <div className="relative flex h-full flex-col justify-between border-l border-[var(--ink)]/20 pl-8">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-3)]">
                  Global reach
                </span>
                <div className="mt-6">
                  <div className="font-display text-[220px] font-[500] leading-[0.85] tracking-[-0.04em] text-[var(--ink)] sm:text-[280px] lg:text-[240px] xl:text-[300px]">
                    <span className="relative">
                      07
                      <span className="absolute -right-2 top-8 h-3 w-3 rounded-full bg-[var(--signal)]" />
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink)]">
                    Jurisdictions covered
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["US", "CA", "EU", "UK", "IN", "SG", "AU"].map((j) => (
                    <span
                      key={j}
                      className="border border-[var(--ink)]/25 px-2 py-0.5 font-mono text-[10px] tracking-widest text-[var(--ink-2)]"
                    >
                      {j}
                    </span>
                  ))}
                </div>
              </div>

              {/* Credentials stamp */}
              <div className="mt-12 border-t border-[var(--ink)]/20 pt-6">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-3)]">
                    Lead tenure
                  </span>
                  <span className="font-display text-2xl font-[500] text-[var(--ink)]">
                    5<span className="text-[var(--signal)]">+</span>
                    <span className="ml-1 font-sans text-xs font-normal uppercase tracking-widest text-[var(--ink-3)]">
                      YRS
                    </span>
                  </span>
                </div>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[var(--ink-3)]">
                  Inside Amazon product safety
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* TRUSTED BY strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="mt-24 border-t border-[var(--ink)]/15 pt-10"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
            <div className="lg:max-w-[220px] lg:shrink-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-3)]">
                Working knowledge of
              </span>
              <p className="mt-2 font-sans text-sm text-[var(--ink-2)]">
                Every accredited body, every approved lab, every policy page —
                cited correctly, every time.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6 lg:gap-x-14">
              {[
                "CPSC",
                "Health Canada",
                "EU GPSR",
                "Amazon TIC",
                "SGS",
                "Intertek",
                "Bureau Veritas",
                "UL Solutions",
              ].map((org, i) => (
                <motion.span
                  key={org}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 + i * 0.05 }}
                  className="font-display text-lg font-[500] italic text-[var(--ink-3)] transition-colors hover:text-[var(--ink)]"
                >
                  {org}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
