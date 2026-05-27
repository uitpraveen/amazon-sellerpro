"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const BULLETS = [
  "Half a decade inside Amazon’s product safety team — our group lead",
  "100% team of past, tenured Amazonians",
  "Serving FBA sellers, brand owners, importers and manufacturers",
  "One clear path: from restricted to reinstated — we handle every step",
];

export default function DifferenceClosing() {
  return (
    <>
      {/* The Amazon Safety Pro difference — bullet band */}
      <section className="bg-[#FAF7F2] py-20 sm:py-24 md:py-28 border-t border-[#E8E0D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center mb-12 sm:mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-[#B8860B] text-xs sm:text-sm tracking-[0.25em] uppercase mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Why It Matters
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A26] leading-[1.15]"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              The Amazon Safety Pro difference
            </motion.h2>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid sm:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-7 sm:gap-y-9"
          >
            {BULLETS.map((b, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                className="flex items-start gap-4"
              >
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#B8860B]/40 bg-white shadow-[0_1px_2px_rgba(45,42,38,0.04)]">
                  <Check size={15} strokeWidth={2.4} className="text-[#B8860B]" />
                </span>
                <p
                  className="text-base sm:text-lg leading-relaxed text-[#2D2A26]"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {b}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Tired of rejections — full closing CTA */}
      <section
        className="relative overflow-hidden py-20 sm:py-24 md:py-32"
        style={{ background: "#2D2A26" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(184,134,11,0.14),transparent_60%)] pointer-events-none" />
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-[#B8860B]/60 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-[#B8860B] text-xs sm:text-sm tracking-[0.25em] uppercase mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Free Compliance Review
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2] leading-[1.15] mb-7"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Tired of rejections with no answers? Start here.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-[#FAF7F2]/75 leading-relaxed mb-5 max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Submit your case details for the review. Our team will go through everything &mdash; your rejection notices, your existing documents, your case history &mdash; and come back to you with a clear, honest picture of what is wrong and what the path forward looks like.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-[#FAF7F2]/75 leading-relaxed mb-10 max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              No automated responses. No guesswork. A real ex-Amazonian will review your case personally. If there is a viable path to reinstatement, we will walk you through it &mdash; and set up a call if needed.
            </motion.p>

            <motion.div variants={fadeUp} className="flex justify-center mb-5">
              <Link
                href="/free-validation"
                className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 rounded-full bg-[#B8860B] hover:bg-[#a07609] text-[#FAF7F2] font-semibold transition-colors min-h-[44px] shadow-lg shadow-black/20"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Submit your case details for the review
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-sm text-[#FAF7F2]/55 italic"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              No obligation. We review first, then talk.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
