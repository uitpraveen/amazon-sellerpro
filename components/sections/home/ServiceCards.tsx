"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const SERVICES = [
  { icon: "📋", title: "CPC Creation", desc: "Children's Product Certificates for CPSC compliance", href: "/services#cpc" },
  { icon: "🛡️", title: "GCC Creation", desc: "General Certificates of Conformity for regulated products", href: "/services#gcc" },
  { icon: "✅", title: "Doc Validation", desc: "Pre-submission review to catch issues before Amazon does", href: "/services#validation" },
  { icon: "🔄", title: "ASIN Reinstatement", desc: "Full reinstatement support for suspended listings", href: "/services#reinstatement" },
  { icon: "📄", title: "DOC Creation", desc: "Declaration of Conformity for all product categories", href: "/services#doc" },
  { icon: "🔍", title: "Safety Audit", desc: "End-to-end safety documentation assessment", href: "/services#audit" },
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
    <section className="bg-[#FAF7F2] py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-14"
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
            className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A26]"
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
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map((svc) => (
            <motion.div key={svc.title} variants={fadeUp}>
              <Link
                href={svc.href}
                className="block bg-white border border-[#E8E0D4] rounded-2xl p-7 hover:-translate-y-1 transition-transform duration-300 h-full"
              >
                <span className="text-3xl block mb-4" role="img" aria-hidden>{svc.icon}</span>
                <h3
                  className="text-lg text-[#2D2A26] mb-2"
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                >
                  {svc.title}
                </h3>
                <p
                  className="text-sm text-[#6B6560] leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {svc.desc}
                </p>
                <span
                  className="text-sm text-[#B8860B] font-medium"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Learn more &rarr;
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
