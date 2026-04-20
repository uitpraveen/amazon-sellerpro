"use client";

import { motion } from "framer-motion";

const REASONS = [
  { num: "01", title: "Insider Reviews", desc: "We know what Amazon's team looks for because we used to be on that team." },
  { num: "02", title: "Gap Detection", desc: "We spot the missing requirement others miss — the one detail that keeps triggering rejections." },
  { num: "03", title: "Decode Language", desc: "We decode Amazon's technical language into clear, actionable steps." },
  { num: "04", title: "Reinstatement Path", desc: "We know how to move a case forward — not just respond, but resolve." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function WhyUs() {
  return (
    <section className="bg-[#FAF7F2] py-16 sm:py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-2xl sm:text-4xl lg:text-5xl text-[#2D2A26] mb-10 sm:mb-16"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          Why Amazon Safety Pro?
        </motion.h2>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-8 sm:gap-y-12">
          {REASONS.map((r) => (
            <motion.div key={r.num} variants={fadeUp} className="group">
              <span className="text-5xl sm:text-7xl font-light text-[#1B4332]/[0.06] group-hover:text-[#B8860B]/20 transition-colors duration-500 block leading-none" style={{ fontFamily: "var(--font-dm-serif)" }}>
                {r.num}
              </span>
              <h3 className="text-lg sm:text-2xl text-[#2D2A26] mt-2 mb-2" style={{ fontFamily: "var(--font-dm-serif)" }}>{r.title}</h3>
              <p className="text-sm sm:text-base text-[#6B6560] leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>{r.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
