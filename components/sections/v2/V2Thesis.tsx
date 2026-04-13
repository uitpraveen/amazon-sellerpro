"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function V2Thesis() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-[#0F1B3C] text-[#FBF8F0]">
      {/* Gold top border */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />

      {/* Subtle noise texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        ref={ref}
        className="relative mx-auto max-w-[1440px] px-6 py-32 lg:px-12 lg:py-48"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-center justify-center gap-4"
        >
          <span className="h-px w-16 bg-[#C8A45C]" />
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C8A45C]">
            Our conviction
          </span>
          <span className="h-px w-16 bg-[#C8A45C]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-playfair mx-auto max-w-[1200px] text-center text-[48px] font-[500] leading-[1.1] tracking-[-0.015em] text-[#FBF8F0] sm:text-[68px] lg:text-[96px] xl:text-[108px]"
        >
          We know what{" "}
          <span className="italic text-[#C8A45C]">Amazon&rsquo;s teams</span>{" "}
          look for,
          <br />
          because we{" "}
          <span className="italic">
            were those teams
          </span>
          .
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto mt-16 h-px max-w-xs origin-center bg-[#C8A45C]"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto mt-12 max-w-2xl text-center font-playfair text-xl font-[500] italic leading-[1.5] text-[#FBF8F0]/80 sm:text-2xl"
        >
          The compliance requirements you are navigating as a seller were, in
          part, written by the person now leading your case.
        </motion.p>
      </div>

      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />
    </section>
  );
}
