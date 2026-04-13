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
  Sparkles,
  Zap,
  Eye,
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
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── NAVBAR ─── */
function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav className="max-w-4xl mx-auto bg-[#18181B]/70 backdrop-blur-xl border border-[#27272A] rounded-2xl px-5 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center">
            <Shield size={14} className="text-white" />
          </div>
          <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-manrope)" }}>
            SafetyPro
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-[#A1A1AA] hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Mobile */}
        <div className="flex items-center gap-3">
          <Link
            href="/free-validation"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] hover:opacity-90 transition-opacity"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Free Review
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden text-white">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mt-2 bg-[#18181B]/90 backdrop-blur-xl border border-[#27272A] rounded-2xl p-5 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm text-[#A1A1AA] hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/free-validation"
            className="mt-3 block text-center px-4 py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Free Review
          </Link>
        </motion.div>
      )}
    </header>
  );
}

/* ─── HERO ─── */
function Hero() {
  const stats = [
    { value: "5+ yrs", label: "Inside Amazon" },
    { value: "7", label: "Marketplaces" },
    { value: "<24h", label: "Response" },
    { value: "Free", label: "First Review" },
  ];

  return (
    <section className="relative bg-[#09090B] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Glowing orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#8B5CF6]/20 to-[#06B6D4]/20 blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-[#27272A] bg-[#18181B]/60 text-xs text-[#A1A1AA]" style={{ fontFamily: "var(--font-manrope)" }}>
            <Sparkles size={12} className="text-[#8B5CF6]" />
            Ex-Amazon Safety Team &middot; 5+ Years Experience
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white mb-6"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Your Amazon Listings,{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
              Protected by Insiders
            </span>
          </h1>

          <p
            className="max-w-2xl mx-auto text-lg md:text-xl text-[#A1A1AA] mb-10 leading-relaxed"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Amazon Safety &amp; Compliance handled by ex-Amazonians with 5+ years inside
            the product safety team. From restricted to reinstated.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/free-validation"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] hover:opacity-90 transition-opacity shadow-lg shadow-[#8B5CF6]/25"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Submit for Free Review <ArrowRight size={16} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-xl border border-[#27272A] hover:border-[#3F3F46] transition-colors"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              View Services <ChevronRight size={16} />
            </Link>
          </div>
        </motion.div>

        {/* Hero image with floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative w-full h-[280px] md:h-[420px] rounded-2xl overflow-hidden border border-[#27272A] shadow-2xl shadow-[#8B5CF6]/10">
            <Image src="/images/hero/warehouse.jpg" alt="Warehouse operations" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/60 to-transparent" />
          </div>

          {/* Floating stat badges */}
          {stats.map((stat, i) => {
            const positions = [
              "top-4 left-4 md:top-6 md:left-6",
              "top-4 right-4 md:top-6 md:right-6",
              "bottom-4 left-4 md:bottom-6 md:left-6",
              "bottom-4 right-4 md:bottom-6 md:right-6",
            ];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className={`absolute ${positions[i]} bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 text-center`}
              >
                <p className="text-base md:text-lg font-bold text-white" style={{ fontFamily: "var(--font-manrope)" }}>
                  {stat.value}
                </p>
                <p className="text-[10px] md:text-xs text-[#A1A1AA]" style={{ fontFamily: "var(--font-manrope)" }}>
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
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
    <section className="bg-[#09090B] py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-5">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold text-center text-white mb-14"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Sound familiar?
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {notices.map((notice, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-start gap-4 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl p-5 md:p-6"
            >
              <AlertTriangle size={20} className="text-[#EF4444] mt-0.5 shrink-0" />
              <p
                className="text-[#FCA5A5] md:text-lg font-mono leading-relaxed"
              >
                &ldquo;{notice}&rdquo;
              </p>
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
    { title: "Understand your product", desc: "Deep dive into your product category, materials, and target market.", icon: Search },
    { title: "Review compliance notification", desc: "Analyze the exact notification Amazon sent and identify the core issue.", icon: Eye },
    { title: "Check Amazon's policies", desc: "Cross-reference with current Amazon safety policies and requirements.", icon: BookOpen },
    { title: "Decode compliance cases", desc: "Translate Amazon's internal language into actionable requirements.", icon: Target },
    { title: "Handle Amazon communication", desc: "Draft and manage all communication with Amazon's compliance team.", icon: Send },
    { title: "Close documentation gaps", desc: "Prepare and submit every document needed for full reinstatement.", icon: Lock },
  ];

  return (
    <section className="bg-[#09090B] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold text-center text-white mb-16"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Our Process
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 border-t-2 border-t-[#8B5CF6] hover:border-t-[#06B6D4] transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-2xl font-extrabold bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <step.icon size={18} className="text-[#A1A1AA]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-manrope)" }}>
                {step.title}
              </h3>
              <p className="text-sm text-[#71717A] leading-relaxed" style={{ fontFamily: "var(--font-manrope)" }}>
                {step.desc}
              </p>
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
    <section className="bg-[#18181B] py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-5">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold text-center text-white mb-14"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Capabilities
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-5"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative bg-[#09090B] rounded-xl p-7 border border-[#27272A] overflow-hidden group hover:border-[#8B5CF6]/40 transition-colors"
            >
              {/* Gradient border accent */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]" />

              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#8B5CF6]/20 to-[#06B6D4]/20 flex items-center justify-center mb-4">
                <item.icon size={20} className="text-[#8B5CF6]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-manrope)" }}>
                {item.title}
              </h3>
              <p className="text-sm text-[#71717A] leading-relaxed" style={{ fontFamily: "var(--font-manrope)" }}>
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
    { title: "Insider Reviews", desc: "Your documents are reviewed by people who used to approve or reject them at Amazon.", icon: Users },
    { title: "Gap Detection", desc: "We spot the exact compliance gaps Amazon's automated systems flag before you submit.", icon: Search },
    { title: "Decode Language", desc: "Amazon's compliance notifications are cryptic. We translate them into clear action steps.", icon: Zap },
    { title: "Reinstatement Path", desc: "We build a clear roadmap from suspended listing to fully reinstated and compliant ASIN.", icon: Target },
  ];

  return (
    <section className="bg-[#09090B] py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-5">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold text-center text-white mb-16"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Why Us
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-[#18181B] border border-[#27272A] rounded-xl p-7 hover:border-[#8B5CF6]/30 transition-colors"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center mb-5">
                <r.icon size={22} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-manrope)" }}>
                {r.title}
              </h3>
              <p className="text-[#71717A] leading-relaxed" style={{ fontFamily: "var(--font-manrope)" }}>
                {r.desc}
              </p>
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
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] to-[#06B6D4]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="relative max-w-3xl mx-auto px-5 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold text-white mb-5"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Tired of rejections? Start here.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-lg text-white/80 mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-manrope)" }}
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
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#09090B] text-white rounded-xl text-base font-semibold hover:bg-[#18181B] transition-colors shadow-2xl shadow-black/30"
            style={{ fontFamily: "var(--font-manrope)" }}
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
    <footer className="bg-[#09090B] border-t border-[#27272A] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center">
                <Shield size={14} className="text-white" />
              </div>
              <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-manrope)" }}>
                Amazon Safety Pro
              </span>
            </div>
            <p className="text-sm text-[#71717A] leading-relaxed mb-4" style={{ fontFamily: "var(--font-manrope)" }}>
              Compliance handled by people who built the rules.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {jurisdictions.map((j) => (
                <span
                  key={j}
                  className="text-[10px] px-2 py-0.5 rounded bg-[#18181B] text-[#A1A1AA] border border-[#27272A]"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {j}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-4" style={{ fontFamily: "var(--font-manrope)" }}>
              Navigation
            </h5>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#71717A] hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-4" style={{ fontFamily: "var(--font-manrope)" }}>
              Resources
            </h5>
            <ul className="space-y-2.5">
              <li>
                <Link href="/free-validation" className="text-sm text-[#71717A] hover:text-white transition-colors" style={{ fontFamily: "var(--font-manrope)" }}>
                  Free Review
                </Link>
              </li>
              <li>
                <Link href="/safety-guide" className="text-sm text-[#71717A] hover:text-white transition-colors" style={{ fontFamily: "var(--font-manrope)" }}>
                  Safety Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-4" style={{ fontFamily: "var(--font-manrope)" }}>
              Legal
            </h5>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy-policy" className="text-sm text-[#71717A] hover:text-white transition-colors" style={{ fontFamily: "var(--font-manrope)" }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[#71717A] hover:text-white transition-colors" style={{ fontFamily: "var(--font-manrope)" }}>
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#27272A] pt-8 text-center">
          <p className="text-xs text-[#52525B]" style={{ fontFamily: "var(--font-manrope)" }}>
            &copy; {new Date().getFullYear()} Amazon Safety Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ─── */
export default function V9Page() {
  return (
    <div className="min-h-screen bg-[#09090B]" style={{ fontFamily: "var(--font-manrope)" }}>
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