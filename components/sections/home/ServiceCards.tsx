"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, RotateCcw, FileSearch, ShieldAlert, FileSignature, Megaphone, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
};

const SERVICES: Service[] = [
  {
    icon: Search,
    title: "ASIN Classification Review & Appeal",
    desc: "Your ASIN was restricted - but was Amazon right? We investigate what triggered the classification, review and modify your listing content to remove the block, and submit the appeal to get it reinstated.",
    href: "/services#asin-classification-review",
  },
  {
    icon: RotateCcw,
    title: "Amazon Account Reinstatement",
    desc: "Your Amazon seller account has been suspended and every day offline costs you revenue. We diagnose the suspension, build your appeal, fix your listings, and follow up with Amazon until your account is back live.",
    href: "/services#amazon-account-reinstatement",
  },
  {
    icon: FileSearch,
    title: "Document Review & Remediation",
    desc: "Amazon has told you what's wrong - but the message is unclear and you don't know exactly what to fix. We decode Amazon's rejection, identify precisely what is missing or incorrect in your documents, and remediate them so your next submission meets Amazon's requirements.",
    href: "/services#document-review-remediation",
  },
  {
    icon: ShieldAlert,
    title: "Safety Incident ASIN Reinstatement",
    desc: "A customer safety report has blocked your ASIN. We assess the incident, review what Amazon requires for reinstatement, and guide you through every step to get back live.",
    href: "/services#safety-incident-reinstatement",
  },
  {
    icon: FileSignature,
    title: "Compliance Document Creation",
    desc: "Need a CPC, GCC, or DOC? We create fully compliant safety documents structured exactly to Amazon's submission standards - using your existing test reports and product information.",
    href: "/services#compliance-document-creation",
  },
  {
    icon: Megaphone,
    title: "Amazon Sponsored Ads Management",
    desc: "Get your products in front of ready-to-buy customers. We manage your Sponsored Products, Sponsored Brands, and Sponsored Display campaigns alongside full listing optimisation so your ads convert and your organic rank grows.",
    href: "/services#amazon-sponsored-ads-management",
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
                    className="text-xl sm:text-2xl text-[#2D2A26] mb-3 leading-snug"
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
