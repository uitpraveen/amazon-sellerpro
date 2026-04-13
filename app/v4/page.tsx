"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  CheckCircle,
  ArrowRight,
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
    title: "Insider Reviews",
    desc: "We know what Amazon's team looks for because we used to be on that team.",
    icon: Eye,
    color: "from-blue-500/20 to-blue-600/5",
  },
  {
    title: "Gap Detection",
    desc: "We spot the missing requirement others miss — the one detail that keeps triggering rejections.",
    icon: Target,
    color: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    title: "Decode Language",
    desc: "We decode Amazon's technical language into clear, actionable steps.",
    icon: MessageSquare,
    color: "from-purple-500/20 to-purple-600/5",
  },
  {
    title: "Reinstatement Path",
    desc: "We know how to move a case forward — not just respond, but resolve.",
    icon: Route,
    color: "from-orange-500/20 to-orange-600/5",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

export default function V4Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#0B1120] text-white"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      {/* ─── NAVBAR ─── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-18">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-500" />
            <span className="font-semibold text-lg tracking-tight">
              Amazon Safety Pro
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-1.5 rounded-full text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link
              href="/free-validation"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm font-medium transition-colors"
            >
              Free Review <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-slate-300"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-[#0B1120]/95 backdrop-blur-xl border-b border-white/5 px-4 pb-6 pt-2"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block py-3 text-slate-300 hover:text-white border-b border-white/5 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/free-validation"
              className="mt-4 block text-center px-5 py-2.5 rounded-lg bg-blue-500 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Free Review
            </Link>
          </motion.div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
                <Shield className="w-3.5 h-3.5" /> Ex-Amazon Compliance Team
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight"
              >
                Your Listings{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Protected
                </span>{" "}
                by the People Who{" "}
                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Built the Rules
                </span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-6 text-slate-400 text-lg leading-relaxed max-w-xl"
              >
                Amazon safety and compliance handled by ex-Amazonians who spent
                5+ years inside Amazon's product safety team. From restricted to
                reinstated.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/free-validation"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 font-medium transition-colors"
                >
                  Submit for Free Review <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium transition-colors"
                >
                  View Services
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/images/hero/compliance-team.jpg"
                  alt="Amazon compliance team at work"
                  width={640}
                  height={440}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />
              </div>

              {/* Glassmorphic stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 left-4 right-4 sm:left-6 sm:right-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-4"
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-400">5+</p>
                    <p className="text-xs text-slate-400 mt-0.5">Years Inside Amazon</p>
                  </div>
                  <div className="border-x border-white/10">
                    <p className="text-2xl font-bold text-emerald-400">100%</p>
                    <p className="text-xs text-slate-400 mt-0.5">Ex-Amazon Team</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-400">Free</p>
                    <p className="text-xs text-slate-400 mt-0.5">First Review</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Trust metrics bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { icon: Clock, label: "Response Time", value: "<24 hours" },
              { icon: Globe, label: "Marketplaces", value: "7 regions" },
              { icon: Star, label: "First Review", value: "Always free" },
            ].map((m) => (
              <div
                key={m.label}
                className="flex items-center gap-4 px-6 py-4 rounded-xl bg-[#131B2E] border border-white/5"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <m.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">{m.label}</p>
                  <p className="text-white font-semibold">{m.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── SOUND FAMILIAR ─── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold tracking-tight"
            >
              Sound familiar?
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-3xl mx-auto space-y-4"
          >
            {[
              "Your appeal has been rejected. Please review our policies and resubmit.",
              "We are unable to accept the documents provided. Please submit the correct documentation.",
              "Your product does not meet our safety requirements. Your listing has been removed.",
            ].map((msg, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-[#131B2E] border-l-4 border-red-500/80 rounded-r-xl px-6 py-5"
              >
                <div className="flex items-start gap-3">
                  <span className="text-red-500/60 font-mono text-xs mt-1 shrink-0">
                    NOTICE {i + 1}
                  </span>
                  <p className="text-slate-300 font-mono text-sm leading-relaxed">
                    &quot;{msg}&quot;
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 text-center text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            If you have been going back and forth with Amazon — submitting documents,
            receiving the same rejection, resubmitting, and getting nowhere — you are
            not alone.
          </motion.p>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="py-20 lg:py-28 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-3">
              How we work
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold tracking-tight"
            >
              Our Process
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-5"
          >
            {PROCESS_STEPS.map((step) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                className="flex gap-5 bg-[#131B2E] border border-white/5 rounded-xl p-6 hover:border-blue-500/30 transition-colors group"
              >
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full border-2 border-blue-500/40 flex items-center justify-center text-blue-400 text-sm font-bold group-hover:bg-blue-500/10 transition-colors">
                    {step.num}
                  </div>
                </div>
                <div className="border-l border-blue-500/20 pl-5">
                  <h3 className="font-semibold text-white mb-1.5">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CAPABILITIES ─── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-emerald-400 text-sm font-medium tracking-wider uppercase mb-3">
              Documentation
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold tracking-tight"
            >
              We also prepare compliance documents
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {CAPABILITIES.map((cap) => (
              <motion.div
                key={cap.title}
                variants={fadeUp}
                className="bg-[#131B2E] border border-white/5 rounded-xl p-6 hover:border-blue-500/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-5 group-hover:bg-blue-500/20 transition-colors">
                  <cap.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{cap.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {cap.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="py-20 lg:py-28 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold tracking-tight"
            >
              Why Amazon Safety Pro?
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto"
          >
            {WHY_US.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="relative overflow-hidden bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} pointer-events-none`}
                />
                <div className="relative">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-10 sm:p-16 text-center"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] pointer-events-none" />
            <motion.h2
              variants={fadeUp}
              className="relative text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Tired of rejections? Start here.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="relative text-blue-100 text-lg max-w-xl mx-auto mb-8"
            >
              Submit your compliance documents for a free review. A real
              ex-Amazonian will review your case personally.
            </motion.p>
            <motion.div variants={fadeUp} className="relative">
              <Link
                href="/free-validation"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
              >
                Submit your documents <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/5 bg-[#070B15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-white">Amazon Safety Pro</span>
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                Compliance handled by people who built the rules.
              </p>
              <div className="flex flex-wrap gap-2">
                {["US", "CA", "EU", "UK", "IN", "SG", "AU"].map((code) => (
                  <span
                    key={code}
                    className="px-2 py-0.5 rounded text-xs bg-white/5 text-slate-400"
                  >
                    {code}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-4">
                Navigation
              </p>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-4">
                Resources
              </p>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/free-validation"
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    Free Review
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-4">
                Contact
              </p>
              <a
                href="mailto:hello@amazonsafetypro.com"
                className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
              >
                hello@amazonsafetypro.com
              </a>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} Amazon Safety Pro. All rights reserved.
            </p>
            <p className="text-xs text-slate-600">
              Amazon is a trademark of Amazon.com, Inc. We are not affiliated with Amazon.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}