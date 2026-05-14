"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const MESSAGES = [
  "Your appeal has been rejected. Please review our policies and resubmit.",
  "We are unable to accept the documents provided. Please submit the correct documentation.",
  "Your product does not meet our safety requirements. Your listing has been removed.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function SoundFamiliar() {
  return (
    <section className="bg-[#FAF7F2] py-16 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl lg:text-5xl text-center text-[#2D2A26] mb-8 sm:mb-14"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          Sound familiar?
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-5"
        >
          {MESSAGES.map((msg, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-start gap-3 bg-white border-l-[3px] border-[#9B1C1C] rounded-r-lg px-4 sm:px-8 py-4 sm:py-5"
            >
              <AlertTriangle size={18} className="text-[#9B1C1C] mt-0.5 shrink-0" />
              <p
                className="text-[#2D2A26] text-base sm:text-lg leading-relaxed italic"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                &ldquo;{msg}&rdquo;
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-8 sm:mt-12 text-center text-[#6B6560] max-w-2xl mx-auto leading-relaxed text-base sm:text-lg"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          If you have been going back and forth with Amazon — submitting documents,
          receiving the same rejection, resubmitting, and getting nowhere — you are
          not alone.
        </motion.p>
      </div>
    </section>
  );
}
