"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  CheckCircle,
  ArrowRight,
  ArrowDown,
  Globe,
  Clock,
  Users,
  Award,
  Star,
  Zap,
  ChevronRight,
  FileCheck,
  Search,
  MessageSquare,
  BookOpen,
  Lock,
  Target,
  Eye,
  Route,
  Menu,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Safety Guide", href: "/safety-guide" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Understand your product",
    desc: "We start by learning exactly what you sell, how it is classified, and which regulations apply.",
    icon: Search,
  },
  {
    num: "02",
    title: "Review the compliance notification",
    desc: "We dissect every line of Amazon's notice to understand what they are actually asking for.",
    icon: FileCheck,
  },
  {
    num: "03",
    title: "Check Amazon's policies",
    desc: "We cross-reference current internal Amazon policies to ensure nothing has changed since your last submission.",
    icon: BookOpen,
  },
  {
    num: "04",
    title: "Decode existing compliance cases",
    desc: "We review your past submissions and responses to identify patterns and gaps.",
    icon: Eye,
  },
  {
    num: "05",
    title: "Handle all Amazon communication",
    desc: "We draft and manage every message to Seller Support on your behalf.",
    icon: MessageSquare,
  },
  {
    num: "06",
    title: "Close documentation gaps",
    desc: "We prepare or correct every document needed to get your listing reinstated.",
    icon: Lock,
  },
];

const CAPABILITIES = [
  {
    title: "CPC Creation",
    desc: "Children's Product Certificate — required for all children's products sold on Amazon.",
    icon: FileCheck,
  },
  {
    title: "DOC / GCC Creation",
    desc: "Declaration of Conformity and General Certificate of Conformity for regulated products.",
    icon: Award,
  },
  {
    title: "Document Validation",
    desc: "We review your existing certificates and test reports to ensure they meet Amazon's current requirements.",
    icon: CheckCircle,
  },
  {
    title: "Product Safety Document Validation",
    desc: "End-to-end validation of all safety documentation before submission to Amazon.",
    icon: Shield,
  },
];

const WHY_US = [
  {
    num: "01",
    title: "Insider Reviews",
    desc: "We know what Amazon's team looks for because we used to be on that team.",
  },
  {
    num: "02",
    title: "Gap Detection",
    desc: "We spot the missing requirement others miss — the one detail that keeps triggering rejections.",
  },
  {
    num: "03",
    title: "Decode Language",
    desc: "We decode Amazon's technical language into clear, actionable steps.",
  },
  {
    num: "04",
    title: "Reinstatement Path",
    desc: "We know how to move a case forward — not just respond, but resolve.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
} as const;

export default function V5Page() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen">
      {/* ─── NAVBAR ─── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#1A1A1A]/95 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 lg:h-20">
          <Link
            href="/"
            className="text-white text-xl tracking-tight"
            style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
          >
            Amazon Safety Pro
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#1A1A1A] flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-5 p-2 text-white/60 hover:text-white"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>

            <nav className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl sm:text-4xl text-white/80 hover:text-orange-400 transition-colors"
                    style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <Link
                  href="/free-validation"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                >
                  Free Review <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/warehouse.jpg"
            alt="Amazon warehouse"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center pt-24 pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-orange-400 text-sm tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              Ex-Amazon Compliance Team
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-white tracking-tight"
              style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
            >
              Amazon Compliance,{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Handled</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 sm:h-4 bg-orange-500/60 -z-0" />
              </span>{" "}
              by Insiders
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 sm:mt-8 text-white/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              Amazon safety and compliance handled by ex-Amazonians who spent
              5+ years inside Amazon's product safety team. From restricted to
              reinstated.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              <Link
                href="/free-validation"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#1A1A1A] font-semibold hover:bg-orange-50 transition-colors text-sm"
              >
                Submit for Free Review <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/30 text-white hover:border-white/60 font-medium transition-colors text-sm"
              >
                View Services
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 sm:mt-20 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          >
            {[
              { label: "Years Inside Amazon", value: "5+" },
              { label: "Marketplaces", value: "7" },
              { label: "Response Time", value: "<24h" },
              { label: "First Review", value: "Free" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── SOUND FAMILIAR ─── */}
      <section
        className="py-20 lg:py-28 bg-[#1A1A1A]"
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      >
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight"
              style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
            >
              Sound familiar?
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="space-y-5"
          >
            {[
              "Your appeal has been rejected. Please review our policies and resubmit.",
              "We are unable to accept the documents provided. Please submit the correct documentation.",
              "Your product does not meet our safety requirements. Your listing has been removed.",
            ].map((msg, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white/[0.03] border-l-4 border-orange-500 rounded-r-lg px-6 sm:px-8 py-6"
              >
                <p className="text-white/70 text-base sm:text-lg leading-relaxed italic">
                  &quot;{msg}&quot;
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-12 text-center text-white/50 max-w-2xl mx-auto leading-relaxed text-lg"
          >
            If you have been going back and forth with Amazon — submitting documents,
            receiving the same rejection, resubmitting, and getting nowhere — you are
            not alone.
          </motion.p>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section
        className="py-20 lg:py-28 bg-[#FAFAF9]"
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-orange-500 text-sm tracking-[0.15em] uppercase mb-3"
            >
              How we work
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] tracking-tight"
              style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
            >
              Our Process
            </motion.h2>
          </motion.div>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-px bg-[#1A1A1A]/10 sm:-translate-x-px" />

            <div className="space-y-12 sm:space-y-16">
              {PROCESS_STEPS.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={step.num}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={fadeUp}
                    className="relative"
                  >
                    {/* Dot on timeline */}
                    <div className="absolute left-5 sm:left-1/2 w-2.5 h-2.5 rounded-full bg-orange-500 -translate-x-1/2 top-2 z-10 ring-4 ring-[#FAFAF9]" />

                    <div
                      className={`sm:grid sm:grid-cols-2 sm:gap-12 ${
                        isLeft ? "" : ""
                      }`}
                    >
                      {/* Content side */}
                      <div
                        className={`pl-12 sm:pl-0 ${
                          isLeft
                            ? "sm:text-right sm:pr-12"
                            : "sm:col-start-2 sm:pl-12"
                        }`}
                      >
                        <span className="text-orange-500/60 text-sm font-medium tracking-wider">
                          Step {step.num}
                        </span>
                        <h3
                          className="text-xl sm:text-2xl text-[#1A1A1A] mt-1 mb-2"
                          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
                        >
                          {step.title}
                        </h3>
                        <p className="text-[#1A1A1A]/60 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>

                      {/* Empty opposite side (for alignment) */}
                      {isLeft ? (
                        <div className="hidden sm:block" />
                      ) : (
                        <div className="hidden sm:block sm:col-start-1 sm:row-start-1" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CAPABILITIES ─── */}
      <section
        className="py-20 lg:py-28 bg-[#1A1A1A]"
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight"
              style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
            >
              We also prepare compliance documents
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 gap-5"
          >
            {CAPABILITIES.map((cap) => (
              <motion.div
                key={cap.title}
                variants={fadeUp}
                className="group relative bg-white/[0.03] border border-white/5 rounded-2xl p-8 sm:p-10 overflow-hidden hover:border-orange-500/30 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <cap.icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3
                    className="text-xl text-white mb-3"
                    style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
                  >
                    {cap.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">{cap.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section
        className="py-20 lg:py-28 bg-[#FAFAF9]"
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] tracking-tight"
              style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
            >
              Why Amazon Safety Pro?
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 gap-x-16 gap-y-12"
          >
            {WHY_US.map((item) => (
              <motion.div key={item.num} variants={fadeUp} className="group">
                <span
                  className="text-6xl sm:text-7xl font-light text-[#1A1A1A]/[0.06] group-hover:text-orange-500/20 transition-colors duration-500 block leading-none"
                  style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
                >
                  {item.num}
                </span>
                <h3
                  className="text-xl sm:text-2xl text-[#1A1A1A] mt-2 mb-2"
                  style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#1A1A1A]/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/shield-protect.jpg"
            alt="Shield protection"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight"
              style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
            >
              Tired of rejections? Start here.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-white/60 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              Submit your compliance documents for a free review. A real
              ex-Amazonian will review your case personally.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-8"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              <Link
                href="/free-validation"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors"
              >
                Submit your documents <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        className="bg-[#141414] py-16"
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <p
                className="text-white text-xl mb-3"
                style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
              >
                Amazon Safety Pro
              </p>
              <p className="text-white/40 text-sm leading-relaxed mb-5">
                Compliance handled by people who built the rules.
              </p>
              <div className="flex flex-wrap gap-2">
                {["US", "CA", "EU", "UK", "IN", "SG", "AU"].map((code) => (
                  <span
                    key={code}
                    className="px-2 py-0.5 rounded text-xs bg-white/5 text-white/40"
                  >
                    {code}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/30 mb-4">
                Pages
              </p>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/40 hover:text-orange-400 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/free-validation"
                    className="text-sm text-white/40 hover:text-orange-400 transition-colors"
                  >
                    Free Review
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal + Contact */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/30 mb-4">
                Legal & Contact
              </p>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-white/40 hover:text-orange-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-white/40 hover:text-orange-400 transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:hello@amazonsafetypro.com"
                    className="text-sm text-white/40 hover:text-orange-400 transition-colors"
                  >
                    hello@amazonsafetypro.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/20">
              &copy; {new Date().getFullYear()} Amazon Safety Pro. All rights reserved.
            </p>
            <p className="text-xs text-white/20">
              Amazon is a trademark of Amazon.com, Inc. We are not affiliated with Amazon.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}