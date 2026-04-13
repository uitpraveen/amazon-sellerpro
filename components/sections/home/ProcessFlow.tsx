"use client";

import { motion } from "framer-motion";
import { Search, FileCheck, BookOpen, Eye, MessageSquare, Lock } from "lucide-react";

const STEPS = [
  { num: "01", title: "Understand your product", desc: "We start by learning exactly what you sell, how it is classified, and which regulations apply.", icon: Search },
  { num: "02", title: "Review the compliance notification", desc: "We dissect every line of Amazon's notice to understand what they are actually asking for.", icon: FileCheck },
  { num: "03", title: "Check Amazon's policies", desc: "We cross-reference current internal Amazon policies to ensure nothing has changed since your last submission.", icon: BookOpen },
  { num: "04", title: "Decode existing compliance cases", desc: "We review your past submissions and responses to identify patterns and gaps.", icon: Eye },
  { num: "05", title: "Handle all Amazon communication", desc: "We draft and manage every message to Seller Support on your behalf.", icon: MessageSquare },
  { num: "06", title: "Close documentation gaps", desc: "We prepare or correct every document needed to get your listing reinstated.", icon: Lock },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function ProcessFlow() {
  return (
    <section className="bg-[#FAF7F2] py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-[#B8860B] text-xs tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
            How We Work
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A26]" style={{ fontFamily: "var(--font-dm-serif)" }}>
            Our Process
          </motion.h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-px bg-[#E8E0D4] sm:-translate-x-px" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-12 sm:space-y-16">
            {STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={step.num} variants={fadeUp} className="relative">
                  <div className="absolute left-5 sm:left-1/2 w-3 h-3 rounded-full bg-[#B8860B] -translate-x-1/2 top-1.5 z-10 ring-4 ring-[#FAF7F2]" />
                  <div className="sm:grid sm:grid-cols-2 sm:gap-12">
                    <div className={`pl-12 sm:pl-0 ${isLeft ? "sm:text-right sm:pr-12" : "sm:col-start-2 sm:pl-12"}`}>
                      <span className="text-[#B8860B]/60 text-sm font-medium tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>Step {step.num}</span>
                      <h3 className="text-xl sm:text-2xl text-[#2D2A26] mt-1 mb-2" style={{ fontFamily: "var(--font-dm-serif)" }}>{step.title}</h3>
                      <p className="text-[#6B6560] leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>{step.desc}</p>
                    </div>
                    {isLeft ? <div className="hidden sm:block" /> : <div className="hidden sm:block sm:col-start-1 sm:row-start-1" />}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
