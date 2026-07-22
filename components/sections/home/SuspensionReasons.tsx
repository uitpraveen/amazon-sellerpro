"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileQuestion,
  AlertTriangle,
  Copyright,
  Link2,
  Layers,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Reason = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const REASONS: Reason[] = [
  {
    icon: FileQuestion,
    title: "Inauthentic Product Complaints",
    desc: "Amazon cannot verify your product's authenticity or supply chain documentation.",
  },
  {
    icon: AlertTriangle,
    title: "Safety Complaints",
    desc: "A customer reported your product caused injury or a safety incident.",
  },
  {
    icon: Copyright,
    title: "IP Infringement",
    desc: "A brand owner filed a trademark, copyright, or patent complaint against your listing.",
  },
  {
    icon: Link2,
    title: "Related Accounts",
    desc: "Amazon detected a connection to a previously suspended or deactivated account.",
  },
  {
    icon: Layers,
    title: "Repeat ASIN Violations",
    desc: "Multiple listings flagged for the same issue, escalated to account level.",
  },
  {
    icon: HelpCircle,
    title: "Other Violations",
    desc: "Not sure what triggered your suspension? Submit for a free case review.",
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

export default function SuspensionReasons() {
  return (
    <section className="bg-[#FAF7F2] py-16 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
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
            Account Suspensions
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-4xl lg:text-5xl text-[#2D2A26] mb-5"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            Common Reasons for Account Suspension
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="max-w-2xl mx-auto text-[#6B6560] text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            These are the most common reasons Amazon suspends seller accounts. If
            any of these apply to your situation, we can help.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                variants={fadeUp}
                className="bg-white border border-[#E8E0D4] rounded-2xl p-7 sm:p-8 h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-[#1B4332]/[0.04] border border-[#1B4332]/10 flex items-center justify-center text-[#1B4332] mb-5">
                  <Icon size={26} strokeWidth={1.6} />
                </div>
                <h3
                  className="text-xl sm:text-2xl text-[#2D2A26] mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                >
                  {reason.title}
                </h3>
                <p
                  className="text-sm sm:text-[15px] text-[#6B6560] leading-relaxed"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {reason.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-10 sm:mt-12 text-center"
        >
          <Link
            href="/contact?inquiry=amazon_account_reinstatement"
            className="group inline-flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#daa520] text-[#1f1c19] px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase transition-colors"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Get a free case review
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
