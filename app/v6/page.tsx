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
  AlertTriangle,
  MessageSquare,
  Search,
  BookOpen,
  Send,
  Mail,
  Phone,
  MapPin,
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

const font = "font-[family-name:var(--font-jakarta)]";

export default function V6Page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className={`${font} bg-white text-slate-900 min-h-screen`}>
      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-3 left-4 right-4 z-50 h-16 flex items-center justify-between px-6 bg-white/90 backdrop-blur-xl rounded-2xl transition-shadow duration-300 ${
          scrolled ? "shadow-lg" : "shadow-md"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-white text-sm font-bold">
            SP
          </span>
          <span className="font-bold text-base text-slate-900 hidden sm:inline">
            Amazon Safety Pro
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/free-validation"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 to-violet-600 hover:shadow-lg hover:shadow-blue-600/25 transition-all"
          >
            Free Review <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-600"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-2"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/free-validation"
              onClick={() => setMobileOpen(false)}
              className="mt-1 px-4 py-2.5 text-sm font-semibold text-white text-center rounded-xl bg-gradient-to-r from-blue-600 to-violet-600"
            >
              Free Review
            </Link>
          </motion.div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
              <Shield className="w-4 h-4" /> Ex-Amazon Safety Team
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Get Your Amazon Listings{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Back on Track
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-8 leading-relaxed">
              Amazon Safety &amp; Compliance handled by ex-Amazonians who spent 5+ years inside
              Amazon&apos;s product safety team. From restricted to reinstated.
            </p>

            {/* Social Proof Avatars */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm text-slate-500 font-medium">
                Trusted by <strong className="text-slate-900">500+ sellers</strong>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                href="/free-validation"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 to-violet-600 hover:shadow-xl hover:shadow-blue-600/25 transition-all"
              >
                Submit for Free Review <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-slate-700 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                View Services <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              {[
                "5+ Years Inside Amazon",
                "7 Marketplaces",
                "<24h Response",
                "Free First Review",
                "100% Ex-Amazon Team",
              ].map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-sm text-slate-600 shadow-sm"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 rounded-md bg-white border border-slate-200 flex items-center px-3 text-xs text-slate-400">
                    amazonsafetypro.com
                  </div>
                </div>
              </div>
              <div className="relative aspect-[16/9]">
                <Image
                  src="/images/hero/safety-check.jpg"
                  alt="Amazon Safety Compliance Dashboard"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay Stat Cards */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute top-6 left-6 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Status</p>
                      <p className="text-sm font-bold text-green-700">ASIN Reinstated</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute bottom-6 right-6 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Response Time</p>
                      <p className="text-sm font-bold text-blue-700">&lt;24 Hours</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOUND FAMILIAR ── */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Sound familiar?</h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              "Your appeal has been rejected. Please review our policies and resubmit.",
              "We are unable to accept the documents provided. Please submit the correct documentation.",
              "Your product does not meet our safety requirements. Your listing has been removed.",
            ].map((notice, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-6"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-800 leading-relaxed italic">
                    &ldquo;{notice}&rdquo;
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-slate-600 mt-10 max-w-3xl mx-auto leading-relaxed"
          >
            If you have been going back and forth with Amazon — submitting documents, receiving the
            same rejection, resubmitting, and getting nowhere — you are not alone.
          </motion.p>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">Our Process</h2>
            <p className="text-slate-500">Six steps to getting your listings reinstated</p>
          </motion.div>

          {/* Desktop horizontal stepper */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-6 left-[8.33%] right-[8.33%] h-0.5 bg-slate-200" />
              <div className="grid grid-cols-6 gap-4">
                {[
                  { title: "Understand your product", icon: Search },
                  { title: "Review the compliance notification", icon: FileCheck },
                  { title: "Check Amazon's policies", icon: BookOpen },
                  { title: "Decode existing compliance cases", icon: MessageSquare },
                  { title: "Handle all Amazon communication", icon: Send },
                  { title: "Close documentation gaps", icon: Shield },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-white flex items-center justify-center text-sm font-bold relative z-10 shadow-md">
                      {i + 1}
                    </div>
                    <step.icon className="w-5 h-5 text-blue-600 mt-4 mb-2" />
                    <p className="text-sm font-medium text-slate-700 leading-snug">{step.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile vertical stepper */}
          <div className="md:hidden space-y-6">
            {[
              { title: "Understand your product", icon: Search },
              { title: "Review the compliance notification", icon: FileCheck },
              { title: "Check Amazon's policies", icon: BookOpen },
              { title: "Decode existing compliance cases", icon: MessageSquare },
              { title: "Handle all Amazon communication", icon: Send },
              { title: "Close documentation gaps", icon: Shield },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-4"
              >
                <div className="relative flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  {i < 5 && <div className="w-0.5 h-8 bg-slate-200 mt-1" />}
                </div>
                <div className="pt-2">
                  <step.icon className="w-4 h-4 text-blue-600 mb-1" />
                  <p className="text-sm font-medium text-slate-700">{step.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
              We also prepare compliance documents
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "CPC Creation",
                desc: "Children's Product Certificate",
                icon: FileCheck,
                gradient: "from-blue-500 to-blue-700",
              },
              {
                title: "DOC/GCC Creation",
                desc: "Declaration of Conformity",
                icon: Shield,
                gradient: "from-violet-500 to-violet-700",
              },
              {
                title: "Document Validation",
                desc: "Verify your compliance documents meet standards",
                icon: CheckCircle,
                gradient: "from-blue-600 to-violet-600",
              },
              {
                title: "Product Safety Document Validation",
                desc: "Complete safety document review and validation",
                icon: Award,
                gradient: "from-violet-600 to-blue-600",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-1 text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold">Why Amazon Safety Pro?</h2>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                title: "Insider Reviews",
                desc: "We know what Amazon's team looks for because we used to be on that team. Our reviews mirror the exact internal process.",
                image: "/images/hero/compliance-team.jpg",
                icon: Search,
              },
              {
                title: "Gap Detection",
                desc: "We spot the missing requirement others miss. One overlooked field or document can cost you weeks — we catch it first.",
                image: "/images/hero/warehouse.jpg",
                icon: AlertTriangle,
              },
              {
                title: "Decode Language",
                desc: "We decode Amazon's technical language so you understand exactly what is being asked and what you need to provide.",
                image: "/images/hero/professional-team.jpg",
                icon: MessageSquare,
              },
              {
                title: "Reinstatement Path",
                desc: "We know how to move a case forward. Not just respond — but strategically advance it to resolution.",
                image: "/images/hero/shield-protect.jpg",
                icon: Zap,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-10`}
              >
                <div className="flex-1 w-full">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 p-10 sm:p-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Tired of rejections? Start here.
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Submit your compliance documents for a free review. A real ex-Amazonian will review
            your case personally.
          </p>
          <Link
            href="/free-validation"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-blue-700 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all"
          >
            Submit your documents <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-200 bg-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-white text-sm font-bold">
                  SP
                </span>
                <span className="font-bold text-base">Amazon Safety Pro</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Compliance handled by people who built the rules.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">Resources</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/free-validation" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                    Free Review
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>

            {/* Jurisdictions */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">Jurisdictions</h4>
              <div className="flex flex-wrap gap-2">
                {["US", "CA", "EU", "UK", "IN", "SG", "AU"].map((j) => (
                  <span
                    key={j}
                    className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md"
                  >
                    {j}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Amazon Safety Pro. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
