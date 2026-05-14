"use client";

import { motion } from "framer-motion";

const REASONS = [
  {
    num: "01",
    title: "We know what Amazon's team actually looks for",
    desc: "Beyond what the policy pages say, we understand how Amazon's compliance reviewers evaluate submissions — what gets approved, what gets rejected, and why. That knowledge directly improves the quality and success rate of every submission we make on your behalf.",
  },
  {
    num: "02",
    title: "We spot the missing requirement others miss",
    desc: "Many sellers are stuck not because their product is unsafe, but because one specific document, one missing test standard, or one incorrectly completed certificate is blocking their case. Our insider knowledge helps us identify that gap quickly — and fix it correctly the first time.",
  },
  {
    num: "03",
    title: "We decode Amazon's language",
    desc: "Amazon's rejection notices are written in precise, technical policy language that is easy to misread. Our team decodes them accurately — so you know exactly what is being asked, not a general guess or a misinterpretation that leads to yet another rejection.",
  },
  {
    num: "04",
    title: "We know the reinstatement path",
    desc: "Reinstatement is not just about submitting documents — it is about submitting the right documents, structured the right way, through the right channel. Our inside experience means we know exactly how to move a case forward.",
  },
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
    <section className="bg-[#FAF7F2] py-16 sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-12 sm:mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-[#B8860B] text-xs sm:text-sm tracking-[0.25em] uppercase mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            The Insider Difference
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A26] mb-6 leading-[1.15]"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            Why Amazon Safety Pro?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-[#6B6560] leading-relaxed max-w-3xl"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Most compliance consultants work from the outside — reading the same policy pages you can access yourself. Amazon Safety Pro is fundamentally different. Our team spent years working inside Amazon&apos;s product safety operations, which means we bring a level of insight that no amount of external research can replicate.
          </motion.p>
        </motion.div>

        {/* Reasons grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid sm:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-10 sm:gap-y-14"
        >
          {REASONS.map((r) => (
            <motion.div key={r.num} variants={fadeUp} className="group relative">
              <div className="flex items-baseline gap-4 mb-4">
                <span
                  className="text-5xl sm:text-6xl lg:text-7xl font-light leading-none text-[#B8860B]/30 group-hover:text-[#B8860B]/60 transition-colors duration-500"
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                >
                  {r.num}
                </span>
                <div className="flex-1 h-px bg-[#E8E0D4] group-hover:bg-[#B8860B]/30 transition-colors duration-500" />
              </div>
              <h3
                className="text-xl sm:text-2xl text-[#2D2A26] mb-3 leading-snug"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                {r.title}
              </h3>
              <p
                className="text-sm sm:text-base text-[#6B6560] leading-relaxed"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {r.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-[#E8E0D4]"
        >
          <p
            className="text-base sm:text-lg text-[#2D2A26] leading-relaxed max-w-3xl mx-auto text-center italic"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            Whether you are a new FBA seller preparing your first product launch, a brand owner managing a growing catalog, an importer sourcing products for multiple marketplaces, or a manufacturer responding to a compliance notice — our team brings the same depth of insider knowledge and the same commitment to getting your product compliant and your listing active.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
