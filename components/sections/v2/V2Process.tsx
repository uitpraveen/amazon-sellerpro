"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    title: "Understand your product",
    body: "A thorough review of the product, its category, intended use, and the safety standards that apply in your marketplace.",
  },
  {
    title: "Review Amazon's compliance notice",
    body: "A line-by-line reading of the notification or safety alert to identify exactly what has been flagged and what Amazon expects.",
  },
  {
    title: "Verify marketplace policies",
    body: "Review of the specific Amazon policies applicable to your product category and marketplace.",
  },
  {
    title: "Decode open compliance cases",
    body: "Analysis of the full case history with Amazon, cutting through automated language to identify exactly where the case is stuck.",
  },
  {
    title: "Manage submissions & appeals",
    body: "We take over all Amazon communication — managing the entire appeal and document submission process on your behalf.",
  },
  {
    title: "Close documentation gaps",
    body: "Direct guidance on what safety documents are needed and how to obtain them — we work with you until the gap is closed.",
  },
];

export default function V2Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="border-y border-[#C8A45C]/30 bg-[#FBF8F0]">
      <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12 lg:py-40">
        <div className="mb-16 max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8A45C]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C8A45C]">
              — Our method
            </span>
          </div>
          <h2 className="font-playfair text-5xl font-[500] leading-[1.05] tracking-[-0.015em] text-[#0F1B3C] sm:text-6xl lg:text-[72px]">
            A structured, proven approach to every{" "}
            <span className="italic">case</span>.
          </h2>
          <p className="mt-8 max-w-2xl text-[17px] leading-[1.7] text-[#0F1B3C]/70">
            When you retain Amazon Safety Pro, you work with a team of tenured
            ex-Amazonians who apply the same framework used inside
            Amazon&rsquo;s own compliance operations.
          </p>
        </div>

        <div ref={ref} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative border border-[#0F1B3C]/15 bg-[#FBF8F0] p-10 transition-all hover:border-[#C8A45C] hover:bg-[#FBF8F0]"
            >
              <div className="mb-6 flex items-baseline justify-between">
                <span className="font-playfair text-5xl font-[500] italic leading-none text-[#C8A45C]">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#0F1B3C]/40">
                  Step {i + 1} of 6
                </span>
              </div>
              <h3 className="font-playfair text-2xl font-[500] leading-snug tracking-[-0.005em] text-[#0F1B3C]">
                {step.title}
              </h3>
              <div className="mt-4 h-px w-12 bg-[#C8A45C]" />
              <p className="mt-5 text-[14px] leading-[1.7] text-[#0F1B3C]/70">
                {step.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
