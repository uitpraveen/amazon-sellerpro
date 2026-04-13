"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function V1CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden border-y-2 border-[#0F0F0F] bg-[#F4F0E8] text-[#0F0F0F]">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-10 font-bricolage text-[520px] font-[900] leading-none tracking-[-0.05em] text-[#FF4500] opacity-[0.08]"
      >
        05
      </div>

      <div
        ref={ref}
        className="relative mx-auto max-w-[1600px] px-6 py-28 lg:px-10 lg:py-40"
      >
        <div className="mb-10 flex items-center gap-4">
          <span className="h-[3px] w-16 bg-[#FF4500]" />
          <span className="font-bricolage text-xs font-[800] uppercase tracking-wider">
            05 / Start here
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.6 }}
          className="font-bricolage max-w-[1200px] text-[64px] font-[900] uppercase leading-[0.85] tracking-[-0.03em] sm:text-[96px] lg:text-[136px]"
        >
          Tired of rejections <span className="text-[#FF4500]">with no answers?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 max-w-2xl text-xl leading-[1.4] text-[#0F0F0F]/80"
        >
          Submit your compliance documents and Amazon notifications. A real
          ex-Amazonian will review your case personally and come back with a
          clear, honest picture of what is wrong and the path forward.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <Link
            href="/free-validation"
            className="group inline-flex cursor-pointer items-center gap-3 border-2 border-[#0F0F0F] bg-[#FF4500] px-10 py-5 font-bricolage text-sm font-[900] uppercase tracking-wider text-[#0F0F0F] transition-all hover:bg-[#0F0F0F] hover:text-[#FF4500]"
            style={{ boxShadow: "8px 8px 0 0 #0F0F0F" }}
          >
            Submit documents
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <span className="font-bricolage text-xs font-[700] uppercase tracking-wider text-[#0F0F0F]/60">
            No obligation · We review first · Then talk
          </span>
        </motion.div>
      </div>
    </section>
  );
}
