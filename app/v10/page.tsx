"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  CheckCircle,
  ArrowRight,
  Globe,
  Clock,
  Users,
  Star,
  Search,
  FileCheck,
  MessageSquare,
  BookOpen,
  Eye,
  Route,
  Menu,
  X,
  FileText,
  ShieldCheck,
  BadgeCheck,
  HeartHandshake,
  Sparkles,
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

const HERO_IMAGES = [
  { src: "/images/hero/professional-team.jpg", alt: "Professional compliance team", badge: "5+ Years", badgeColor: "bg-teal-600 text-white" },
  { src: "/images/hero/packages.jpg", alt: "Amazon product packages", badge: "7 Markets", badgeColor: "bg-[#F97066] text-white" },
  { src: "/images/hero/amazon-boxes.jpg", alt: "Amazon shipping boxes", badge: "Free Review", badgeColor: "bg-teal-600 text-white" },
];

const REJECTIONS = [
  "Your appeal has been rejected. Please review our policies and resubmit.",
  "We are unable to accept the documents provided. Please submit the correct documentation.",
  "Your product does not meet our safety requirements. Your listing has been removed.",
];

const PROCESS_STEPS = [
  { num: "01", title: "Understand your product", desc: "We learn exactly what you sell, how it is classified, and which regulations apply.", icon: Search },
  { num: "02", title: "Review compliance notification", desc: "We dissect every line of Amazon's notice to understand what they are actually asking for.", icon: FileCheck },
  { num: "03", title: "Check Amazon's policies", desc: "We cross-reference the latest policy requirements so nothing is missed.", icon: BookOpen },
  { num: "04", title: "Decode compliance cases", desc: "We interpret the case type and map the exact documentation needed to resolve it.", icon: Eye },
  { num: "05", title: "Handle Amazon communication", desc: "We craft clear, direct responses that speak Amazon's language.", icon: MessageSquare },
  { num: "06", title: "Close documentation gaps", desc: "We identify and fill every gap before resubmission to maximize approval.", icon: Route },
];

const CAPABILITIES = [
  { title: "CPC Creation", desc: "Children's Product Certificates built to CPSC standards, accepted by Amazon on first submission.", icon: FileText },
  { title: "DOC/GCC Creation", desc: "Declarations of Conformity and General Certificates of Conformity for regulated products.", icon: ShieldCheck },
  { title: "Document Validation", desc: "We review your existing documents for errors, gaps, and formatting issues before you submit.", icon: BadgeCheck },
  { title: "Product Safety Document Validation", desc: "Full safety document audit aligned with Amazon's current requirements and enforcement patterns.", icon: Shield },
];

const WHY_US = [
  { title: "Insider Reviews", desc: "Our team spent 5+ years inside Amazon's product safety division. We know the review process from the inside.", icon: Users },
  { title: "Gap Detection", desc: "We spot the specific documentation gaps that cause rejections, before Amazon does.", icon: Search },
  { title: "Decode Language", desc: "Amazon's compliance notices are cryptic. We translate them into clear, actionable steps.", icon: MessageSquare },
  { title: "Reinstatement Path", desc: "We build a complete reinstatement plan tailored to your product category and case history.", icon: Route },
];

const JURISDICTIONS = ["US", "CA", "EU", "UK", "IN", "SG", "AU"];

/* ─── ANIMATIONS ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
} as const;

/* ─── PAGE ─── */

export default function V10Page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FEFEFE]" style={{ fontFamily: "var(--font-nunito)" }}>
      {/* ══════════ NAVBAR ══════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4">
        <div
          className={`mx-auto max-w-7xl rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${
            scrolled ? "bg-white/95 shadow-lg backdrop-blur-sm" : "bg-white shadow-md"
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white">
              <Shield className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold text-gray-900">Amazon Safety Pro</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link
              href="/free-validation"
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-teal-700 transition-colors"
            >
              Free Review <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full hover:bg-teal-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mx-auto max-w-7xl mt-2 rounded-3xl bg-white shadow-lg p-6 space-y-2"
            >
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-gray-700 font-semibold hover:bg-teal-50 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/free-validation"
                className="block mt-4 text-center rounded-full bg-teal-600 px-6 py-3 text-white font-bold"
              >
                Free Review
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* ══════════ HERO ══════════ */}
        <section className="pt-32 pb-20 px-4 sm:px-6">
          <div className="mx-auto max-w-7xl text-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.p variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-sm font-semibold text-teal-700 mb-6">
                <Sparkles className="h-4 w-4" /> Ex-Amazonian Compliance Experts
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Amazon Compliance?{" "}
                <span className="text-teal-600">We&apos;ve Got You Covered.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Safety and compliance handled by ex-Amazonians with 5+ years inside the product safety team. From restricted to reinstated.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/free-validation"
                  className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-8 py-3.5 text-base font-bold text-white hover:bg-teal-700 shadow-lg shadow-teal-200 transition-all hover:shadow-xl hover:shadow-teal-200"
                >
                  Submit for Free Review <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#F97066] px-8 py-3.5 text-base font-bold text-[#F97066] hover:bg-[#FFF1F0] transition-colors"
                >
                  Our Services
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero image cards */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {HERO_IMAGES.map((img, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="relative rounded-3xl overflow-hidden shadow-lg shadow-gray-200/60 group"
                >
                  <div className="aspect-[4/3] relative">
                    <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <span className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold ${img.badgeColor}`}>
                    {img.badge}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm font-semibold text-gray-500"
            >
              {[
                { icon: Clock, label: "<24h Response" },
                { icon: Globe, label: "7 Marketplaces" },
                { icon: Users, label: "5+ Years Inside Amazon" },
                { icon: Star, label: "Free First Review" },
              ].map((stat, i) => (
                <span key={i} className="flex items-center gap-2">
                  <stat.icon className="h-4 w-4 text-teal-500" />
                  {stat.label}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════ SOUND FAMILIAR ══════════ */}
        <section className="py-20 px-4 sm:px-6 bg-[#FFF1F0]">
          <div className="mx-auto max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Sound <span className="text-[#F97066]">familiar?</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-3 text-gray-600">
                These are real rejection messages Amazon sellers receive every day.
              </motion.p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-5">
              {REJECTIONS.map((text, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl p-6 border-l-4 border-[#F97066] shadow-sm"
                >
                  <p className="text-gray-700 font-medium italic leading-relaxed">&ldquo;{text}&rdquo;</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════ PROCESS ══════════ */}
        <section className="py-20 px-4 sm:px-6 bg-[#FEFEFE]">
          <div className="mx-auto max-w-6xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Our <span className="text-teal-600">Process</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-3 text-gray-600 max-w-xl mx-auto">
                A proven six-step system built from years inside Amazon&apos;s product safety team.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {PROCESS_STEPS.map((step) => (
                <motion.div
                  key={step.num}
                  variants={fadeUp}
                  whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)", transition: { duration: 0.25 } }}
                  className="bg-white rounded-2xl p-6 border border-teal-100 shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white text-sm font-bold">
                      {step.num}
                    </span>
                    <step.icon className="h-5 w-5 text-teal-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════ CAPABILITIES ══════════ */}
        <section className="py-20 px-4 sm:px-6 bg-[#F0FDFA]">
          <div className="mx-auto max-w-6xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                What We <span className="text-teal-600">Deliver</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-3 text-gray-600 max-w-xl mx-auto">
                Compliance documents and validation services that Amazon actually accepts.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {CAPABILITIES.map((cap, i) => (
                <motion.div key={i} variants={scaleIn} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-teal-100">
                  <div className="h-2 bg-gradient-to-r from-teal-500 to-teal-400" />
                  <div className="p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 mb-5">
                      <cap.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{cap.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{cap.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════ WHY US ══════════ */}
        <section className="py-20 px-4 sm:px-6 bg-[#FEFEFE]">
          <div className="mx-auto max-w-6xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Why <span className="text-teal-600">Us</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-3 text-gray-600 max-w-xl mx-auto">
                The difference between another rejection and a reinstated listing.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {WHY_US.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white mx-auto mb-5">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════ CTA ══════════ */}
        <section className="py-20 px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-teal-500 to-teal-600 px-8 py-16 sm:px-16 text-center text-white shadow-xl shadow-teal-200"
          >
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Tired of rejections?{" "}
              <span className="underline decoration-white/40 underline-offset-4">Start here.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-teal-100 max-w-xl mx-auto">
              Submit your documents for a free review. A real ex-Amazonian reviews your case.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <Link
                href="/free-validation"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-teal-700 hover:bg-teal-50 transition-colors shadow-lg"
              >
                Submit your documents <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white">
                  <Shield className="h-5 w-5" />
                </span>
                <span className="text-lg font-bold text-gray-900">Amazon Safety Pro</span>
              </Link>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Compliance handled by people who built the rules.
              </p>
              <div className="flex flex-wrap gap-2">
                {JURISDICTIONS.map((j) => (
                  <span key={j} className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                    {j}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Navigation</h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-gray-600 hover:text-teal-600 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/free-validation" className="text-sm text-teal-600 font-semibold hover:text-teal-700 transition-colors">
                    Free Review
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-teal-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-600 hover:text-teal-600 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Amazon Safety Pro. All rights reserved.
            </p>
            <p className="text-xs text-gray-400">
              Not affiliated with Amazon. We are an independent compliance service.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
