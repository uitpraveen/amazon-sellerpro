"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function V3Thesis() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-[#1F3D2E] text-[#F5EDDB]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-[#D97757]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#F4C430]/15 blur-3xl"
      />

      <div
        ref={ref}
        className="relative mx-auto max-w-[1440px] px-6 py-32 lg:px-12 lg:py-44"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F4C430]/40 px-4 py-1.5 text-[12px] font-[600] uppercase tracking-wider text-[#F4C430]">
            ✦ Why we&rsquo;re different
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.9 }}
          className="font-lora mx-auto mt-10 max-w-5xl text-center text-[44px] font-[600] leading-[1.1] tracking-[-0.015em] text-[#F5EDDB] sm:text-[64px] lg:text-[88px] xl:text-[100px]"
        >
          We know what{" "}
          <span className="italic text-[#F4C430]">Amazon&rsquo;s teams</span>{" "}
          look for, because{" "}
          <span className="relative inline-block">
            <span className="relative z-10 italic">we were those teams</span>
            <motion.svg
              aria-hidden
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.2, delay: 1.2 }}
              viewBox="0 0 500 30"
              className="absolute -bottom-4 left-0 right-0 w-full"
            >
              <motion.path
                d="M 5 18 Q 125 4, 250 12 T 495 8"
                stroke="#D97757"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
            </motion.svg>
          </span>
          .
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-3"
        >
          {[
            {
              title: "We wrote the rules",
              body: "The compliance requirements you are navigating were, in part, written by the person now leading your case.",
              icon: "✎",
            },
            {
              title: "We enforced them",
              body: "We understand how Amazon's compliance reviewers actually evaluate submissions — what passes and what gets rejected.",
              icon: "⚖",
            },
            {
              title: "We know the path back",
              body: "Reinstatement is not just about documents — it's about the right documents, structured correctly, through the right channel.",
              icon: "↺",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-[#F5EDDB]/20 bg-[#F5EDDB]/5 p-7 backdrop-blur-sm"
            >
              <div className="font-lora text-3xl text-[#F4C430]" aria-hidden>
                {item.icon}
              </div>
              <h3 className="font-lora mt-4 text-xl font-[600] text-[#F5EDDB]">
                {item.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-[#F5EDDB]/75">
                {item.body}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
