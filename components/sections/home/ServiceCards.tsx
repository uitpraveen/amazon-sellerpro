"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RotateCcw, ShieldCheck, FileCheck, FileSignature, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
};

const SERVICES: Service[] = [
  {
    icon: RotateCcw,
    title: "ASIN Reinstatement",
    desc: "End-to-end recovery of stranded or suspended ASINs — diagnosis, documentation, submission and follow-up until your listing is live again.",
    href: "/services#asin-reinstatement",
  },
  {
    icon: ShieldCheck,
    title: "Safety Audit",
    desc: "Comprehensive product-safety review covering applicable standards, test reports, labels and packaging — find compliance gaps before Amazon does.",
    href: "/services#safety-validation",
  },
  {
    icon: FileCheck,
    title: "Document Validation",
    desc: "Line-by-line review of your existing test reports, certificates and safety documentation against Amazon's current requirements.",
    href: "/services#document-validation",
  },
  {
    icon: FileSignature,
    title: "Safety Document Creation",
    desc: "CPC, DOC and GCC creation — fully compliant safety documents prepared and structured to meet Amazon's submission standards.",
    href: "/services#cpc-creation",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ServiceCards() {
  return (
    <section className="bg-[#FAF7F2] py-16 sm:py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-[#B8860B] text-xs tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            What We Do
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-4xl lg:text-5xl text-[#2D2A26]"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            Our Services
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid sm:grid-cols-2 gap-5 sm:gap-6"
        >
          {SERVICES.map((svc) => {
            const Icon = svc.icon;
            return (
              <motion.div key={svc.title} variants={fadeUp}>
                <Link
                  href={svc.href}
                  className="group relative block bg-white border border-[#E8E0D4] rounded-2xl p-7 sm:p-9 hover:border-[#B8860B]/40 hover:shadow-lg hover:shadow-[#1B4332]/5 hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 rounded-xl bg-[#1B4332]/[0.04] border border-[#1B4332]/10 flex items-center justify-center text-[#1B4332] group-hover:bg-[#B8860B]/[0.08] group-hover:border-[#B8860B]/30 group-hover:text-[#B8860B] transition-colors duration-300">
                      <Icon size={26} strokeWidth={1.6} />
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-[#B8860B]/40 group-hover:text-[#B8860B] group-hover:translate-x-1 transition-all duration-300 mt-2"
                    />
                  </div>
                  <h3
                    className="text-xl sm:text-2xl text-[#2D2A26] mb-3"
                    style={{ fontFamily: "var(--font-dm-serif)" }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className="text-sm sm:text-[15px] text-[#6B6560] leading-relaxed"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {svc.desc}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
