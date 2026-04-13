"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

/* ─── DATA ─── */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Safety Guide", href: "/safety-guide" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const REJECTIONS = [
  "Your appeal has been rejected. Please review our policies and resubmit.",
  "We are unable to accept the documents provided. Please submit the correct documentation.",
  "Your product does not meet our safety requirements. Your listing has been removed.",
];

const PROCESS_STEPS = [
  { num: "01", title: "Understand your product", desc: "We learn exactly what you sell, how it is classified, and which regulations apply." },
  { num: "02", title: "Review compliance notification", desc: "We dissect every line of Amazon's notice to understand what they are actually asking for." },
  { num: "03", title: "Check Amazon's policies", desc: "We cross-reference the latest policy requirements so nothing is missed." },
  { num: "04", title: "Decode compliance cases", desc: "We interpret the case type and map the exact documentation needed to resolve it." },
  { num: "05", title: "Handle Amazon communication", desc: "We craft clear, direct responses that speak Amazon's language." },
  { num: "06", title: "Close documentation gaps", desc: "We identify and fill every gap before resubmission to maximize approval." },
];

const CAPABILITIES = [
  { title: "CPC Creation", desc: "Children's Product Certificates built to CPSC standards, accepted by Amazon on first submission." },
  { title: "DOC/GCC Creation", desc: "Declarations of Conformity and General Certificates of Conformity for regulated products." },
  { title: "Document Validation", desc: "We review your existing documents for errors, gaps, and formatting issues before you submit." },
  { title: "Product Safety Document Validation", desc: "Full safety document audit aligned with Amazon's current requirements and enforcement patterns." },
];

const WHY_US = [
  { num: "01", title: "Insider Reviews", desc: "Our team spent 5+ years inside Amazon's product safety division. We know the review process from the inside." },
  { num: "02", title: "Gap Detection", desc: "We spot the specific documentation gaps that cause rejections, before Amazon does." },
  { num: "03", title: "Decode Language", desc: "Amazon's compliance notices are cryptic. We translate them into clear, actionable steps." },
  { num: "04", title: "Reinstatement Path", desc: "We build a complete reinstatement plan tailored to your product category and case history." },
];

const JURISDICTIONS = ["US", "CA", "EU", "UK", "IN", "SG", "AU"];

/* ─── ANIMATIONS ─── */

const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

/* ─── PAGE ─── */

export default function V11Page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* ══════════ NAVBAR ══════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-white border-b border-black/10" : "bg-transparent"
        }`}
      >
        <div className="border-t border-black" />
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-medium tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Amazon Safety Pro
          </Link>

          <div className="hidden lg:flex items-center gap-8" style={{ fontFamily: "var(--font-inter)" }}>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-medium tracking-[0.15em] uppercase text-black/70 hover:text-black transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <div className="h-px bg-black" />

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-black overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4" style={{ fontFamily: "var(--font-inter)" }}>
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-medium tracking-[0.1em] uppercase text-black/70 hover:text-black"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* ══════════ HERO ══════════ */}
        <section className="pt-32 sm:pt-40 pb-20 px-6">
          <div className="mx-auto max-w-7xl">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              {/* Breadcrumb label */}
              <motion.div variants={fade} className="mb-10">
                <div className="h-px bg-black mb-6" />
                <p
                  className="text-xs tracking-[0.2em] uppercase text-black/50"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Issue No. 01 &mdash; Amazon Compliance
                </p>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="text-5xl sm:text-7xl lg:text-[110px] font-bold leading-[0.95] tracking-tight mb-12"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Compliance,{" "}
                <em className="font-normal">handled.</em>
              </motion.h1>

              {/* Two-column: text + image */}
              <motion.div variants={fade} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                <div className="flex flex-col justify-end">
                  <p
                    className="text-base sm:text-lg text-black/60 leading-relaxed max-w-md mb-8"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Amazon safety and compliance handled by ex-Amazonians with 5+ years
                    inside the product safety team. From restricted to reinstated.
                  </p>
                  <Link
                    href="/free-validation"
                    className="inline-flex items-center gap-2 text-[#E11D48] font-semibold text-sm hover:gap-3 transition-all"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Submit for Free Review <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="relative aspect-[4/3] border border-black">
                  <Image
                    src="/images/hero/warehouse.jpg"
                    alt="Amazon warehouse compliance"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              {/* Stats strip */}
              <motion.div variants={fade}>
                <div className="h-px bg-black mb-6" />
                <p
                  className="text-sm text-black/50 tracking-wide"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  5+ Years&ensp;|&ensp;7 Marketplaces&ensp;|&ensp;&lt;24h Response&ensp;|&ensp;Free Review
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════ SOUND FAMILIAR ══════════ */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-7xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fade}>
                <div className="h-px bg-black mb-10" />
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-14"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Sound familiar?
              </motion.h2>

              <div className="space-y-10 max-w-3xl">
                {REJECTIONS.map((text, i) => (
                  <motion.blockquote
                    key={i}
                    variants={fadeUp}
                    className="border-l-2 border-black pl-6 sm:pl-10"
                  >
                    <p
                      className="text-lg sm:text-xl leading-relaxed italic"
                      style={{ fontFamily: "var(--font-dm-serif)" }}
                    >
                      &ldquo;{text}&rdquo;
                    </p>
                  </motion.blockquote>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════ PROCESS ══════════ */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-7xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fade}>
                <div className="h-px bg-black mb-10" />
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-16"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Our Process
              </motion.h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
                {PROCESS_STEPS.map((step) => (
                  <motion.div
                    key={step.num}
                    variants={fadeUp}
                    className="py-8 border-b border-black/20"
                  >
                    <div className="flex items-start gap-6">
                      <span
                        className="text-3xl sm:text-4xl font-bold text-black/15 shrink-0 leading-none"
                        style={{ fontFamily: "var(--font-dm-serif)" }}
                      >
                        {step.num}
                      </span>
                      <div>
                        <h3
                          className="text-lg font-semibold mb-2"
                          style={{ fontFamily: "var(--font-dm-serif)" }}
                        >
                          {step.title}
                        </h3>
                        <p
                          className="text-sm text-black/55 leading-relaxed"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════ CAPABILITIES ══════════ */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-7xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fade}>
                <div className="h-px bg-black mb-10" />
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-16"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Capabilities
              </motion.h2>

              {/* Horizontal row with vertical dividers */}
              <motion.div variants={fade}>
                <div className="h-px bg-black" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {CAPABILITIES.map((cap, i) => (
                    <div
                      key={i}
                      className={`py-8 px-6 ${
                        i < CAPABILITIES.length - 1 ? "lg:border-r border-b lg:border-b-0 border-black/20" : ""
                      }`}
                    >
                      <h3
                        className="text-base font-semibold mb-3"
                        style={{ fontFamily: "var(--font-dm-serif)" }}
                      >
                        {cap.title}
                      </h3>
                      <p
                        className="text-sm text-black/55 leading-relaxed"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {cap.desc}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-black" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════ WHY US ══════════ */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-7xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fade}>
                <div className="h-px bg-black mb-10" />
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-16"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Why Amazon Safety Pro?
              </motion.h2>

              <div className="space-y-0">
                {WHY_US.map((item) => (
                  <motion.div
                    key={item.num}
                    variants={fadeUp}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-10 border-b border-black/15"
                  >
                    <div className="lg:col-span-1">
                      <span
                        className="text-2xl font-bold text-[#E11D48]"
                        style={{ fontFamily: "var(--font-dm-serif)" }}
                      >
                        {item.num}
                      </span>
                    </div>
                    <div className="lg:col-span-3">
                      <h3
                        className="text-xl font-semibold"
                        style={{ fontFamily: "var(--font-dm-serif)" }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <div className="lg:col-span-8">
                      <p
                        className="text-base text-black/60 leading-relaxed"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════ CTA ══════════ */}
        <section className="py-28 px-6">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2
                variants={fadeUp}
                className="text-6xl sm:text-7xl lg:text-[96px] font-bold leading-[0.95] mb-8"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Start here.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-base text-black/50 max-w-md mx-auto mb-10 leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Submit your compliance documents for a free review. A real ex-Amazonian reviews your case.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  href="/free-validation"
                  className="inline-flex items-center gap-2 text-[#E11D48] font-semibold text-base hover:gap-3 transition-all"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Submit your documents <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="px-6 pb-6" style={{ fontFamily: "var(--font-inter)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="h-px bg-black mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            {/* Left — Brand */}
            <div>
              <p className="text-xs font-medium tracking-[0.3em] uppercase mb-3">
                Amazon Safety Pro
              </p>
              <p className="text-sm text-black/50 mb-4 max-w-sm">
                Compliance handled by people who built the rules.
              </p>
              <p className="text-xs text-black/40">
                Jurisdictions: {JURISDICTIONS.join(" / ")}
              </p>
            </div>

            {/* Right — Links */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 lg:justify-end">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs tracking-[0.1em] uppercase text-black/50 hover:text-black transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/free-validation"
                className="text-xs tracking-[0.1em] uppercase text-black/50 hover:text-black transition-colors"
              >
                Free Review
              </Link>
              <Link
                href="/privacy-policy"
                className="text-xs tracking-[0.1em] uppercase text-[#E11D48] hover:text-[#BE123C] transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-xs tracking-[0.1em] uppercase text-[#E11D48] hover:text-[#BE123C] transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>

          <div className="h-px bg-black mb-6" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-black/40">
              &copy; {new Date().getFullYear()} Amazon Safety Pro. All rights reserved.
            </p>
            <p className="text-xs text-black/30">
              Not affiliated with Amazon. Independent compliance service.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
