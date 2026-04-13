"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function V3CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#F5EDDB]">
      <div
        ref={ref}
        className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12 lg:py-36"
      >
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[40px] bg-[#1F3D2E] p-10 sm:p-16 lg:p-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-[#D97757]/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-[#F4C430]/15 blur-3xl"
          />

          <div className="relative text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F4C430]/40 bg-[#F4C430]/10 px-4 py-1.5 text-[12px] font-[600] uppercase tracking-wider text-[#F4C430]">
                ✦ Start your case
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.9 }}
              className="font-lora mt-8 text-4xl font-[600] leading-[1.1] tracking-[-0.015em] text-[#F5EDDB] sm:text-5xl lg:text-[68px]"
            >
              Tired of rejections{" "}
              <span className="italic text-[#F4C430]">with no answers</span>?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.7] text-[#F5EDDB]/80"
            >
              Submit your compliance documents and Amazon notifications. A real
              ex-Amazonian will review your case personally and come back to
              you with an honest, friendly assessment of what is wrong and the
              path forward.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-12 flex flex-col items-center gap-4"
            >
              <Link
                href="/free-validation"
                className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#D97757] px-10 py-5 text-[15px] font-[600] text-[#F5EDDB] shadow-[0_6px_0_0_#9F4F36] transition-all hover:translate-y-0.5 hover:shadow-[0_3px_0_0_#9F4F36]"
              >
                Get my free document review
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <p className="text-[12px] font-[500] text-[#F5EDDB]/60">
                ✦ No obligation · We review first, then talk
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
