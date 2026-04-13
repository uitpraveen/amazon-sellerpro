"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    icon: "🔍",
    title: "Understand your product",
    body: "We start by getting to know your product — its category, intended use, target market, and applicable safety standards. No assumptions, no shortcuts.",
  },
  {
    icon: "📋",
    title: "Review the compliance notice",
    body: "We read every line of Amazon's notification together with you, identifying exactly what has been flagged, why, and what they actually need.",
  },
  {
    icon: "📚",
    title: "Check the policies",
    body: "We review the specific Amazon policies for your category and marketplace to identify exactly which requirements apply to your case.",
  },
  {
    icon: "🧩",
    title: "Decode existing cases",
    body: "If you already have an open case, we cut through the automated language and identify exactly where things are stuck.",
  },
  {
    icon: "✉️",
    title: "Handle Amazon for you",
    body: "Our team takes over all the back-and-forth with Amazon — every appeal and submission, structured exactly the way they need.",
  },
  {
    icon: "✓",
    title: "Close the gaps together",
    body: "Where documents are missing, we walk you through what each one needs to contain — and stay with you until they are in good shape.",
  },
];

export default function V3Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#FAF5E6]">
      <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12 lg:py-36">
        <div className="mb-20 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#D97757]/15 px-4 py-1.5 text-[12px] font-[600] uppercase tracking-wider text-[#D97757]">
            ✦ Our process
          </span>
          <h2 className="font-lora mt-6 text-5xl font-[600] leading-[1.05] tracking-[-0.015em] text-[#1F3D2E] sm:text-6xl lg:text-[72px]">
            A friendly,{" "}
            <span className="italic text-[#D97757]">structured</span> approach.
          </h2>
          <p className="mt-6 text-[18px] leading-[1.7] text-[#1F3D2E]/75">
            When you come to us, you&rsquo;re not handing your case to a
            faceless consultant. You&rsquo;re working with a team of tenured
            ex-Amazonians who follow the same proven approach used inside
            Amazon&rsquo;s own compliance operations.
          </p>
        </div>

        <div ref={ref} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative rounded-3xl border border-[#1F3D2E]/15 bg-[#F5EDDB] p-8 transition-all hover:-translate-y-1 hover:border-[#D97757]/40 hover:shadow-[0_8px_0_0_#1F3D2E]/15"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1F3D2E] text-2xl">
                  <span aria-hidden>{step.icon}</span>
                </div>
                <span className="font-lora text-3xl font-[600] italic text-[#1F3D2E]/30">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-lora mt-7 text-2xl font-[600] leading-snug text-[#1F3D2E]">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#1F3D2E]/70">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
