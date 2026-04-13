"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    title: "Understand your product",
    body: "We review your product, category, intended use, and applicable safety standards to build a clear picture of your compliance position.",
  },
  {
    title: "Review the compliance notification",
    body: "We go through every line of what Amazon has raised — exactly what has been flagged, why, and what they are asking for.",
  },
  {
    title: "Check Amazon's policies",
    body: "We review the specific Amazon policies for your category and marketplace to determine exactly which requirements apply.",
  },
  {
    title: "Decode existing cases",
    body: "If you already have an open case, we cut through the automated rejection language to identify where your case is stuck.",
  },
  {
    title: "Handle all Amazon communication",
    body: "Our team takes over every submission and appeal on your behalf — structured correctly, addressing exactly what Amazon needs.",
  },
  {
    title: "Close documentation gaps",
    body: "We work with you directly to identify what is missing, explain what each document must contain, and guide you through obtaining it.",
  },
];

export default function V1Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden border-y-2 border-[#0F0F0F] bg-[#0F0F0F] text-[#F4F0E8]">
      {/* Giant 03 background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-20 font-bricolage text-[560px] font-[900] leading-none tracking-[-0.05em] text-[#FF4500] opacity-[0.12]"
      >
        03
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 py-28 lg:px-10 lg:py-36">
        <div className="mb-20">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-[3px] w-16 bg-[#FF4500]" />
            <span className="font-bricolage text-xs font-[800] uppercase tracking-wider text-[#FF4500]">
              03 / Our process
            </span>
          </div>
          <h2 className="font-bricolage text-[56px] font-[900] uppercase leading-[0.85] tracking-[-0.03em] text-[#F4F0E8] sm:text-[80px] lg:text-[128px]">
            Structured.{" "}
            <span className="text-[#FF4500]">Proven.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg text-[#F4F0E8]/70">
            The same approach used inside Amazon&rsquo;s own compliance
            operations — now working for sellers like you.
          </p>
        </div>

        <div ref={ref} className="grid gap-px bg-[#F4F0E8]/15 lg:grid-cols-2">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-[#0F0F0F] p-10 transition-colors hover:bg-[#FF4500] hover:text-[#0F0F0F]"
            >
              <div className="flex items-start gap-6">
                <div className="font-bricolage text-[72px] font-[900] leading-none tracking-[-0.03em] text-[#FF4500] transition-colors group-hover:text-[#0F0F0F]">
                  {(i + 1).toString().padStart(2, "0")}
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="font-bricolage text-2xl font-[800] uppercase leading-tight tracking-[-0.01em]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-snug text-[#F4F0E8]/75 group-hover:text-[#0F0F0F]/80">
                    {step.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
