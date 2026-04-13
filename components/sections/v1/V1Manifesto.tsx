"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const LINES = [
  "We do not guess.",
  "We do not theorize.",
  "We were the team.",
];

export default function V1Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-[#FF4500] text-[#0F0F0F]">
      <div className="relative mx-auto max-w-[1600px] px-6 py-28 lg:px-10 lg:py-40">
        <div ref={ref} className="max-w-[1200px]">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-[3px] w-16 bg-[#0F0F0F]" />
            <span className="font-bricolage text-xs font-[800] uppercase tracking-wider">
              04 / Manifesto
            </span>
          </div>

          <h2 className="font-bricolage text-[64px] font-[900] uppercase leading-[0.82] tracking-[-0.04em] sm:text-[96px] lg:text-[148px]">
            {LINES.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.65, 0, 0.35, 1] }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-14 max-w-2xl border-t-2 border-[#0F0F0F] pt-8 text-xl leading-[1.4]"
          >
            The compliance requirements you are navigating as a seller were, in
            part, written by the person now leading your case. That is the
            difference. That is why it works.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
