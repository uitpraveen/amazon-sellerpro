"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CAPS = [
  {
    code: "01",
    title: "CPC creation",
    desc: "Children's Product Certificate for US marketplace compliance. Reviewed against CPSIA and CPSC-approved test data.",
  },
  {
    code: "02",
    title: "DOC / GCC creation",
    desc: "Declaration of Conformity for EU marketplaces and General Certificate of Conformity for US general-use products.",
  },
  {
    code: "03",
    title: "Document validation",
    desc: "Line-by-line review of existing compliance documents against Amazon's current requirements and standards.",
  },
  {
    code: "04",
    title: "Product safety document validation",
    desc: "Category-specific safety document review covering test reports, SDS, labeling, and packaging evidence.",
  },
  {
    code: "05",
    title: "Stranded ASIN reinstatement",
    desc: "Diagnosis and remediation of compliance issues causing stranded ASINs, with direct follow-up through resolution.",
  },
];

export default function EditorialCapabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[var(--paper-warm)]">
      <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-14 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[var(--ink)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink)]">
                § 05 — Capabilities
              </span>
            </div>
            <h2 className="font-display mt-10 text-5xl font-[500] leading-[0.95] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl lg:text-[72px]">
              Five{" "}
              <span className="italic text-[var(--signal-deep)]">
                engagements
              </span>
              , one team.
            </h2>
            <p className="mt-8 max-w-md text-[17px] leading-relaxed text-[var(--ink-2)]">
              Every engagement is delivered by the same ex-Amazonian team —
              reviewed, structured, and submitted exactly as Amazon expects.
            </p>
            <div className="mt-12">
              <a
                href="/services"
                className="group inline-flex cursor-pointer items-center gap-3 border-b border-[var(--ink)] pb-2 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--signal)] hover:text-[var(--signal)]"
              >
                View full services
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>

          <div ref={ref} className="lg:col-span-7">
            <ul className="divide-y divide-[var(--ink)]/15 border-y border-[var(--ink)]/15">
              {CAPS.map((cap, i) => (
                <motion.li
                  key={cap.code}
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: "easeOut",
                  }}
                  className="group grid cursor-pointer gap-6 py-8 transition-colors md:grid-cols-[60px_1fr_auto] md:gap-10"
                >
                  <div className="font-display text-3xl font-[500] leading-none text-[var(--ink-3)] transition-colors group-hover:text-[var(--signal)]">
                    {cap.code}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-[500] leading-tight tracking-[-0.01em] text-[var(--ink)] sm:text-3xl">
                      {cap.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--ink-2)]">
                      {cap.desc}
                    </p>
                  </div>
                  <div className="hidden items-center md:flex">
                    <span className="font-mono text-2xl text-[var(--ink-3)] transition-all duration-300 group-hover:translate-x-2 group-hover:text-[var(--signal)]">
                      →
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
