"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function V2CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#FBF8F0]">
      <div
        ref={ref}
        className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12 lg:py-40"
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center justify-center gap-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8A45C]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C8A45C]">
              — Open a case
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.9 }}
            className="font-playfair text-5xl font-[500] leading-[1.05] tracking-[-0.015em] text-[#0F1B3C] sm:text-6xl lg:text-[80px]"
          >
            Tired of rejections{" "}
            <span className="italic text-[#C8A45C]">with no answers?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 text-[17px] leading-[1.7] text-[#0F1B3C]/75"
          >
            Submit your compliance documents and Amazon notifications for a
            complimentary first review. A principal will go through your case
            personally and return with an honest assessment of what is wrong
            and the path to reinstatement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-14 flex flex-col items-center gap-6"
          >
            <Link
              href="/free-validation"
              className="group inline-flex cursor-pointer items-center gap-4 border border-[#0F1B3C] bg-[#0F1B3C] px-10 py-5 text-[12px] font-medium uppercase tracking-[0.2em] text-[#FBF8F0] transition-all hover:bg-[#C8A45C] hover:text-[#0F1B3C]"
            >
              Submit documents for review
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0F1B3C]/40">
              No obligation · Reviewed by a principal
            </p>
          </motion.div>
        </div>

        {/* Bottom seal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 flex items-center justify-center gap-4"
        >
          <div className="h-px flex-1 max-w-[120px] bg-[#C8A45C]/40" />
          <div className="flex items-center gap-3 border border-[#C8A45C] px-6 py-3">
            <span className="h-2 w-2 rounded-full bg-[#C8A45C]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0F1B3C]">
              Amazon Safety Pro · Compliance Practice
            </span>
            <span className="h-2 w-2 rounded-full bg-[#C8A45C]" />
          </div>
          <div className="h-px flex-1 max-w-[120px] bg-[#C8A45C]/40" />
        </motion.div>
      </div>
    </section>
  );
}
