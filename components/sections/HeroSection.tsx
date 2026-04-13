"use client";

import { motion } from "framer-motion";
import MonoLabel from "@/components/ui/MonoLabel";
import StatusPill from "@/components/ui/StatusPill";
import TacticalButton from "@/components/ui/TacticalButton";
import FramedBlock from "@/components/ui/FramedBlock";
import TransmissionRow from "@/components/ui/TransmissionRow";
import TypeIn from "@/components/ui/TypeIn";

const HEADLINE = [
  "Amazon",
  "Safety",
  "&",
  "Compliance",
  "—",
  "Handled",
  "by",
  "People",
  "Who",
  "Built",
  "the",
  "Rules.",
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--rule)] bg-[var(--paper-cool)]">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-12 lg:pt-40 lg:pb-32">
        {/* Status pill row */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 flex flex-wrap items-center gap-3"
        >
          <StatusPill tone="ok">ACTIVE</StatusPill>
          <StatusPill tone="signal">EX-AMAZONIANS</StatusPill>
          <StatusPill>ENROLLING SELLERS</StatusPill>
          <span className="ml-auto hidden font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)] sm:inline">
            ~/ amazon-safety-pro / home
          </span>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left — Brand moment */}
          <div className="lg:col-span-8">
            <MonoLabel prefix="→">
              <TypeIn text="AMAZON COMPLIANCE OPS // 001" startDelay={300} />
            </MonoLabel>

            <h1 className="mt-6 font-sans text-[44px] font-black leading-[0.98] tracking-[-0.02em] text-[var(--ink)] sm:text-[64px] lg:text-[88px]">
              {HEADLINE.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.45 + i * 0.05,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className={`inline-block whitespace-pre ${
                    i >= 9 ? "text-[var(--signal)]" : ""
                  }`}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="mt-10 max-w-2xl text-lg leading-relaxed text-[var(--ink-2)] sm:text-xl"
            >
              Amazon Safety Pro is led by ex-Amazonians who spent half a decade
              inside Amazon&rsquo;s product safety team — not just reading the
              policies, but writing, enforcing, and refining them. We know
              exactly what Amazon&rsquo;s compliance team looks for because we
              were that team. Now we put that insider knowledge to work for
              sellers like you — guiding you from restricted to reinstated.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.55 }}
              className="mt-10"
            >
              <TacticalButton href="/free-validation">
                Submit for free review
              </TacticalButton>
            </motion.div>
          </div>

          {/* Right — Transmission sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="lg:col-span-4"
          >
            <FramedBlock className="bg-[var(--paper-edge)]/60 backdrop-blur-sm">
              <MonoLabel prefix="→">TRANSMISSION</MonoLabel>
              <div className="mt-4 space-y-0">
                <TransmissionRow label="Status" value="Active" />
                <TransmissionRow label="Response" value="< 1 Business Day" />
                <TransmissionRow label="Jurisdictions" value="07" />
                <TransmissionRow label="Lead" value="Tenured Ex-Amazonian" />
                <TransmissionRow label="First Review" value="Free" />
              </div>

              {/* Animated pulse grid */}
              <div className="mt-6 grid grid-cols-12 gap-1">
                {Array.from({ length: 36 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="aspect-square border border-[var(--rule)]"
                    initial={{ backgroundColor: "transparent" }}
                    animate={{
                      backgroundColor: [
                        "transparent",
                        "var(--signal-soft)",
                        "transparent",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      delay: 2 + (i % 12) * 0.1 + Math.floor(i / 12) * 0.15,
                      repeat: Infinity,
                      repeatDelay: 5,
                    }}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-[var(--ink-3)]">
                <span>SCAN</span>
                <span className="text-[var(--signal)]">● LIVE</span>
              </div>
            </FramedBlock>
          </motion.div>
        </div>
      </div>

      {/* Decorative drift grid */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px] opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse, black 0%, transparent 70%)",
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
