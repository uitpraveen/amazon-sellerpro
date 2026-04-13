"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Shield,
  CheckCircle,
  ArrowRight,
  Globe,
  Clock,
  Users,
  Award,
  FileCheck,
  AlertTriangle,
  Search,
  BookOpen,
  Send,
  Mail,
  Phone,
  MapPin,
  Lock,
  Target,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Safety Guide", href: "/safety-guide" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── NAVBAR ─── */
function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]">
      {/* Gold accent line */}
      <div className="h-0.5 w-full bg-[#B8860B]" />

      {/* Desktop */}
      <div className="hidden md:block">
        <div className="flex items-center justify-center py-5">
          <Link href="/" className="flex items-center gap-2" style={{ fontFamily: "var(--font-dm-serif)" }}>
            <span className="text-2xl tracking-wide text-[#2D2A26]">AMAZON</span>
            <span className="text-[#B8860B] text-lg">&#9670;</span>
            <span className="text-2xl tracking-wide text-[#2D2A26]">SAFETY PRO</span>
          </Link>
        </div>
        <nav className="flex items-center justify-center gap-8 pb-4 border-b border-[#E8E0D4]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] text-[#6B6560] hover:text-[#B8860B] transition-colors"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-5 py-4 border-b border-[#E8E0D4]">
        <Link href="/" style={{ fontFamily: "var(--font-dm-serif)" }} className="text-lg text-[#2D2A26] tracking-wide">
          AMAZON <span className="text-[#B8860B]">&#9670;</span> SAFETY PRO
        </Link>
        <button onClick={() => setOpen(!open)} className="text-[#2D2A26]">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-[#FAF7F2] border-b border-[#E8E0D4] px-5 pb-4"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-xs uppercase tracking-[0.2em] text-[#6B6560] hover:text-[#B8860B]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {link.label}
            </Link>
          ))}
        </motion.nav>
      )}
    </header>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="bg-[#FAF7F2] pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs uppercase tracking-[0.25em] text-[#B8860B] mb-6"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Est. 2026 &middot; Ex-Amazon Safety Team
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-4xl md:text-6xl lg:text-7xl leading-tight text-[#2D2A26] mb-6"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          Compliance, Finally in{" "}
          <em className="text-[#B8860B] italic">Expert Hands</em>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-[#6B6560] mb-10 leading-relaxed"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Amazon Safety &amp; Compliance handled by ex-Amazonians with 5+ years inside
          the product safety team. From restricted to reinstated.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/free-validation"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1B4332] text-white rounded-md text-sm font-medium hover:bg-[#15372a] transition-colors"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Submit for Free Review <ArrowRight size={16} />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm text-[#B8860B] border-b border-[#B8860B] pb-0.5 hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Explore Our Services <ChevronRight size={14} />
          </Link>
        </motion.div>

        {/* Overlapping image cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="relative flex items-center justify-center h-[260px] md:h-[340px] mb-16"
        >
          <div className="absolute w-[220px] md:w-[300px] h-[160px] md:h-[220px] -rotate-6 -translate-x-24 md:-translate-x-36 border-2 border-[#E8E0D4] rounded-xl overflow-hidden shadow-lg">
            <Image src="/images/hero/professional-team.jpg" alt="Professional team" fill className="object-cover" />
          </div>
          <div className="absolute w-[240px] md:w-[320px] h-[170px] md:h-[240px] z-10 border-2 border-[#E8E0D4] rounded-xl overflow-hidden shadow-xl">
            <Image src="/images/hero/shipping.jpg" alt="Shipping" fill className="object-cover" />
          </div>
          <div className="absolute w-[220px] md:w-[300px] h-[160px] md:h-[220px] rotate-6 translate-x-24 md:translate-x-36 border-2 border-[#E8E0D4] rounded-xl overflow-hidden shadow-lg">
            <Image src="/images/hero/amazon-boxes.jpg" alt="Amazon boxes" fill className="object-cover" />
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-0"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {[
            { value: "5+", label: "Years Inside Amazon" },
            { value: "7", label: "Marketplaces" },
            { value: "<24h", label: "Response Time" },
            { value: "Free", label: "First Review" },
          ].map((stat, i, arr) => (
            <div key={stat.label} className="flex items-center">
              <div className="text-center px-6 md:px-10">
                <p className="text-2xl md:text-3xl font-semibold text-[#2D2A26]">{stat.value}</p>
                <p className="text-xs text-[#6B6560] mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
              {i < arr.length - 1 && (
                <div className="hidden md:block w-px h-10 bg-[#B8860B]/40" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SOUND FAMILIAR ─── */
function SoundFamiliar() {
  const notices = [
    "Your appeal has been rejected. Please review our policies and resubmit.",
    "We are unable to accept the documents provided. Please submit the correct documentation.",
    "Your product does not meet our safety requirements. Your listing has been removed.",
  ];

  return (
    <section className="bg-[#FAF7F2] py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-5">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl text-center text-[#2D2A26] mb-14"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          Sound familiar?
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-5"
        >
          {notices.map((notice, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-start gap-4 bg-white border border-[#E8E0D4] rounded-lg p-5 md:p-6"
            >
              <div className="w-1 self-stretch bg-[#9B1C1C] rounded-full shrink-0" />
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-[#9B1C1C] mt-0.5 shrink-0" />
                <p className="text-[#2D2A26] md:text-lg leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
                  &ldquo;{notice}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PROCESS ─── */
function Process() {
  const steps = [
    { title: "Understand your product", icon: Search },
    { title: "Review compliance notification", icon: FileCheck },
    { title: "Check Amazon's policies", icon: BookOpen },
    { title: "Decode compliance cases", icon: Target },
    { title: "Handle Amazon communication", icon: Send },
    { title: "Close documentation gaps", icon: Lock },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-5">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl text-center text-[#2D2A26] mb-16"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          Our Process
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-0"
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="flex items-center gap-6 py-6">
                <span
                  className="text-3xl md:text-4xl font-light text-[#B8860B] w-12 text-right shrink-0"
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-3">
                  <step.icon size={20} className="text-[#B8860B]" />
                  <h3
                    className="text-lg md:text-xl text-[#2D2A26]"
                    style={{ fontFamily: "var(--font-dm-serif)" }}
                  >
                    {step.title}
                  </h3>
                </div>
              </div>
              {i < steps.length - 1 && <div className="h-px bg-[#B8860B]/20 ml-[4.5rem]" />}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CAPABILITIES ─── */
function Capabilities() {
  const items = [
    { title: "CPC Creation", desc: "Children's Product Certificates built to CPSC standards with full traceability.", icon: FileCheck },
    { title: "DOC / GCC Creation", desc: "Declarations of Conformity and General Certificates of Conformity for all product categories.", icon: Shield },
    { title: "Document Validation", desc: "Pre-submission review to catch issues before Amazon does.", icon: CheckCircle },
    { title: "Product Safety Document Validation", desc: "End-to-end safety document assessment aligned with Amazon's internal requirements.", icon: Award },
  ];

  return (
    <section className="bg-[#FAF7F2] py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-5">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl text-center text-[#2D2A26] mb-14"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          Our Capabilities
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white rounded-lg p-7 border border-[#E8E0D4] border-t-2 border-t-[#B8860B]"
            >
              <item.icon size={24} className="text-[#B8860B] mb-4" />
              <h3
                className="text-xl text-[#2D2A26] mb-2"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                {item.title}
              </h3>
              <p className="text-[#6B6560] leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── WHY US ─── */
function WhyUs() {
  const reasons = [
    { num: "01", title: "Insider Reviews", desc: "Your documents are reviewed by people who used to approve or reject them at Amazon." },
    { num: "02", title: "Gap Detection", desc: "We spot the exact compliance gaps Amazon's automated systems flag before you submit." },
    { num: "03", title: "Decode Language", desc: "Amazon's compliance notifications are cryptic. We translate them into clear action steps." },
    { num: "04", title: "Reinstatement Path", desc: "We build a clear roadmap from suspended listing to fully reinstated and compliant ASIN." },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-5">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl text-center text-[#2D2A26] mb-16"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          Why Us
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-10"
        >
          {reasons.map((r, i) => (
            <motion.div key={i} variants={fadeUp} className="flex items-start gap-6 md:gap-10">
              <span
                className="text-5xl md:text-6xl font-light text-[#B8860B] leading-none shrink-0"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                {r.num}
              </span>
              <div>
                <h3
                  className="text-xl md:text-2xl text-[#2D2A26] mb-2"
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                >
                  {r.title}
                </h3>
                <p className="text-[#6B6560] leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
                  {r.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section className="bg-[#1B4332] py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-5 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl text-[#FAF7F2] mb-5"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          Tired of rejections? Start here.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-lg text-[#FAF7F2]/70 mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Submit your documents for a free review. A real ex-Amazonian reviews your case.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link
            href="/free-validation"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#B8860B] text-white rounded-md text-base font-medium hover:bg-[#a07609] transition-colors"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Submit your documents <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  const jurisdictions = ["US", "CA", "EU", "UK", "IN", "SG", "AU"];

  return (
    <footer className="bg-[#2D2A26] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-14">
          {/* Brand */}
          <div>
            <h4
              className="text-xl text-[#FAF7F2] mb-3"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Amazon Safety Pro
            </h4>
            <p className="text-sm text-[#FAF7F2]/50 leading-relaxed mb-5" style={{ fontFamily: "var(--font-outfit)" }}>
              Compliance handled by people who built the rules.
            </p>
            <div className="flex flex-wrap gap-2">
              {jurisdictions.map((j) => (
                <span
                  key={j}
                  className="text-xs px-2.5 py-1 border border-[#B8860B]/30 text-[#B8860B] rounded"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {j}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="text-sm uppercase tracking-wider text-[#B8860B] mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
              Navigation
            </h5>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#FAF7F2]/50 hover:text-[#B8860B] transition-colors"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="text-sm uppercase tracking-wider text-[#B8860B] mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
              Legal
            </h5>
            <ul className="space-y-2.5">
              <li>
                <Link href="/free-validation" className="text-sm text-[#FAF7F2]/50 hover:text-[#B8860B] transition-colors" style={{ fontFamily: "var(--font-outfit)" }}>
                  Free Review
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-[#FAF7F2]/50 hover:text-[#B8860B] transition-colors" style={{ fontFamily: "var(--font-outfit)" }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[#FAF7F2]/50 hover:text-[#B8860B] transition-colors" style={{ fontFamily: "var(--font-outfit)" }}>
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#FAF7F2]/10 pt-8 text-center">
          <p className="text-xs text-[#FAF7F2]/30" style={{ fontFamily: "var(--font-outfit)" }}>
            &copy; {new Date().getFullYear()} Amazon Safety Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ─── */
export default function V8Page() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]" style={{ fontFamily: "var(--font-outfit)" }}>
      <Navbar />
      <main>
        <Hero />
        <SoundFamiliar />
        <Process />
        <Capabilities />
        <WhyUs />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}