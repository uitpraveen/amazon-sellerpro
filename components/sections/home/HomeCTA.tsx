"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HomeCTA() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/images/hero/shield-protect.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(27,67,50,0.88)] to-[rgba(27,67,50,0.95)]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2]" style={{ fontFamily: "var(--font-dm-serif)" }}>
            Tired of rejections? Start here.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-[#FAF7F2]/60 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
            Submit your compliance documents for a free review. A real ex-Amazonian will review your case personally.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <Link href="/free-validation" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#B8860B] hover:bg-[#a07609] text-white font-semibold transition-colors" style={{ fontFamily: "var(--font-outfit)" }}>
              Submit your documents <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
