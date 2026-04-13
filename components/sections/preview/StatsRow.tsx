"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "@/components/ui/CountUp";

const STATS = [
  {
    value: 5,
    prefix: "",
    suffix: "+",
    label: "Years inside Amazon product safety",
    sub: "Lead tenure",
  },
  {
    value: 7,
    prefix: "0",
    suffix: "",
    label: "Marketplaces covered globally",
    sub: "US · CA · EU · UK · IN · SG · AU",
  },
  {
    value: 100,
    prefix: "",
    suffix: "%",
    label: "Team of past, tenured Amazonians",
    sub: "Every case reviewed by an insider",
  },
  {
    value: 1,
    prefix: "<",
    suffix: "",
    label: "Business day response, guaranteed",
    sub: "No automated replies",
  },
];

export default function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="border-y border-[var(--ink)]/15 bg-[var(--paper)]">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-14 lg:py-28">
        <div className="mb-12 flex items-center gap-4">
          <span className="h-px w-10 bg-[var(--ink)]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink)]">
            § 02 — By the numbers
          </span>
        </div>

        <div
          ref={ref}
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="group relative lg:border-l lg:border-[var(--ink)]/15 lg:px-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <div className="font-display text-[96px] font-[500] leading-none tracking-[-0.03em] text-[var(--ink)] lg:text-[112px]">
                {stat.prefix}
                <CountUp to={stat.value} duration={1.8} />
                <span className="text-[var(--signal)]">{stat.suffix}</span>
              </div>
              <p className="mt-6 max-w-[260px] text-[15px] leading-snug text-[var(--ink-2)]">
                {stat.label}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink-3)]">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
