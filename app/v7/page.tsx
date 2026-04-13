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
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/services" },
  { label: "SAFETY GUIDE", href: "/safety-guide" },
  { label: "PRICING", href: "/pricing" },
  { label: "CONTACT", href: "/contact" },
];

const fontHeading = "font-[family-name:var(--font-syne)]";
const fontBody = "font-[family-name:var(--font-outfit)]";

export default function V7Page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className={`${fontBody} bg-white text-slate-900 min-h-screen`}>
      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? "border-b-2 border-black" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 lg:px-8">
          <Link
            href="/"
            className={`${fontHeading} text-lg font-extrabold uppercase tracking-wider`}
          >
            AMAZON SAFETY PRO
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${fontHeading} text-xs font-bold tracking-[0.15em] text-black hover:text-orange-500 transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/free-validation"
              className={`${fontHeading} hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-[0.1em] uppercase bg-orange-500 text-black hover:bg-orange-400 transition-colors`}
            >
              FREE REVIEW <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-white border-b-2 border-black p-4"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`${fontHeading} block py-3 text-sm font-bold tracking-[0.1em] text-black hover:text-orange-500`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/free-validation"
              onClick={() => setMobileOpen(false)}
              className={`${fontHeading} block mt-2 py-3 text-sm font-bold tracking-[0.1em] text-center bg-orange-500 text-black`}
            >
              FREE REVIEW
            </Link>
          </motion.div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="pt-16 min-h-screen flex flex-col lg:flex-row">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1
              className={`${fontHeading} text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold uppercase leading-[0.95] tracking-tight mb-8`}
            >
              WE WROTE
              <br />
              THE SAFETY
              <br />
              PLAYBOOK.
              <br />
              <span className="text-orange-500">NOW WE RUN</span>
              <br />
              <span className="text-orange-500">IT FOR YOU.</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-lg mb-8 leading-relaxed">
              Amazon Safety &amp; Compliance handled by ex-Amazonians who spent 5+ years inside
              Amazon&apos;s product safety team. From restricted to reinstated.
            </p>

            <Link
              href="/free-validation"
              className={`${fontHeading} relative inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] bg-orange-500 text-black hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform`}
              style={{ boxShadow: "4px 4px 0px 0px #000" }}
            >
              SUBMIT FOR FREE REVIEW <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Right Image */}
        <div className="flex-1 relative min-h-[400px] lg:min-h-0">
          <Image
            src="/images/hero/packages.jpg"
            alt="Amazon packages and compliance"
            fill
            className="object-cover"
            priority
          />
          {/* Floating Stats Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-72 bg-slate-900/95 backdrop-blur text-white p-5"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "5+", label: "Years Inside Amazon" },
                { value: "7", label: "Marketplaces" },
                { value: "<24h", label: "Response Time" },
                { value: "100%", label: "Ex-Amazon Team" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className={`${fontHeading} text-xl font-extrabold text-orange-500`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOUND FAMILIAR ── */}
      <section className="py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${fontHeading} text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase mb-12`}
          >
            SOUND FAMILIAR?
          </motion.h2>

          <div className="space-y-6">
            {[
              "Your appeal has been rejected. Please review our policies and resubmit.",
              "We are unable to accept the documents provided. Please submit the correct documentation.",
              "Your product does not meet our safety requirements. Your listing has been removed.",
            ].map((notice, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="border-l-4 border-orange-500 pl-6 py-4"
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`${fontHeading} text-4xl font-extrabold text-orange-500 leading-none shrink-0`}
                  >
                    {i + 1}
                  </span>
                  <p className="text-lg text-slate-700 italic leading-relaxed">
                    &ldquo;{notice}&rdquo;
                  </p>
                </div>
              </motion.blockquote>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-600 mt-10 text-lg max-w-3xl leading-relaxed"
          >
            If you have been going back and forth with Amazon — submitting documents, receiving the
            same rejection, resubmitting, and getting nowhere — you are not alone.
          </motion.p>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 px-4 sm:px-8 bg-[#0F172A]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${fontHeading} text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-white mb-14`}
          >
            OUR PROCESS
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-700">
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
                className="bg-[#0F172A] p-8 group hover:bg-slate-800 transition-colors"
              >
                <span
                  className={`${fontHeading} text-3xl font-extrabold text-orange-500 block mb-4`}
                >
                  0{i + 1}
                </span>
                <step.icon className="w-6 h-6 text-slate-400 mb-3 group-hover:text-orange-500 transition-colors" />
                <p className="text-white font-semibold text-lg">{step.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${fontHeading} text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase mb-12`}
          >
            WE ALSO PREPARE
            <br />
            COMPLIANCE DOCUMENTS
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "CPC Creation",
                desc: "Children's Product Certificate",
                icon: FileCheck,
              },
              {
                title: "DOC/GCC Creation",
                desc: "Declaration of Conformity",
                icon: Shield,
              },
              {
                title: "Document Validation",
                desc: "Verify your compliance documents meet standards",
                icon: CheckCircle,
              },
              {
                title: "Product Safety Document Validation",
                desc: "Complete safety document review and validation",
                icon: Award,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="border-2 border-black p-8 group hover:bg-orange-500 transition-colors cursor-default"
              >
                <item.icon className="w-8 h-8 text-orange-500 mb-4 group-hover:text-black transition-colors" />
                <h3
                  className={`${fontHeading} text-xl font-bold uppercase mb-2 group-hover:text-black`}
                >
                  {item.title}
                </h3>
                <p className="text-slate-600 group-hover:text-black/70 transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 px-4 sm:px-8 bg-white border-t-2 border-black">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${fontHeading} text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase mb-16`}
          >
            WHY AMAZON SAFETY PRO?
          </motion.h2>

          <div className="space-y-16">
            {[
              {
                num: "01",
                title: "Insider Reviews",
                desc: "We know what Amazon's team looks for because we used to be on that team. Our reviews mirror the exact internal process.",
              },
              {
                num: "02",
                title: "Gap Detection",
                desc: "We spot the missing requirement others miss. One overlooked field or document can cost you weeks — we catch it first.",
              },
              {
                num: "03",
                title: "Decode Language",
                desc: "We decode Amazon's technical language so you understand exactly what is being asked and what you need to provide.",
              },
              {
                num: "04",
                title: "Reinstatement Path",
                desc: "We know how to move a case forward. Not just respond — but strategically advance it to resolution.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col sm:flex-row items-start gap-6 sm:gap-10"
              >
                <span
                  className={`${fontHeading} text-7xl sm:text-8xl lg:text-[120px] font-extrabold text-orange-500 leading-none shrink-0`}
                >
                  {item.num}
                </span>
                <div className="pt-2 sm:pt-4 lg:pt-8">
                  <h3
                    className={`${fontHeading} text-2xl lg:text-3xl font-bold uppercase mb-3`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed max-w-xl">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-8 bg-orange-500">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2
            className={`${fontHeading} text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold uppercase text-black mb-6 leading-tight`}
          >
            TIRED OF REJECTIONS?
            <br />
            START HERE.
          </h2>
          <p className="text-black/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Submit your compliance documents for a free review. A real ex-Amazonian will review
            your case personally.
          </p>
          <Link
            href="/free-validation"
            className={`${fontHeading} relative inline-flex items-center gap-3 px-10 py-4 text-base font-bold uppercase tracking-[0.1em] bg-black text-white hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform`}
            style={{ boxShadow: "4px 4px 0px 0px #C2410C" }}
          >
            SUBMIT YOUR DOCUMENTS <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black text-white py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-14">
            {/* Brand */}
            <div>
              <p
                className={`${fontHeading} text-lg font-extrabold uppercase tracking-wider mb-4`}
              >
                AMAZON SAFETY PRO
              </p>
              <p className="text-slate-400 leading-relaxed">
                Compliance handled by people who built the rules.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {["US", "CA", "EU", "UK", "IN", "SG", "AU"].map((j) => (
                  <span
                    key={j}
                    className={`${fontHeading} px-2.5 py-1 text-xs font-bold tracking-wider border border-slate-700 text-slate-400`}
                  >
                    {j}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4
                className={`${fontHeading} text-xs font-bold uppercase tracking-[0.15em] text-orange-500 mb-5`}
              >
                NAVIGATION
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`${fontHeading} text-sm tracking-wider text-slate-400 hover:text-orange-500 transition-colors`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4
                className={`${fontHeading} text-xs font-bold uppercase tracking-[0.15em] text-orange-500 mb-5`}
              >
                RESOURCES
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/free-validation"
                    className={`${fontHeading} text-sm tracking-wider text-slate-400 hover:text-orange-500 transition-colors`}
                  >
                    FREE REVIEW
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className={`${fontHeading} text-sm tracking-wider text-slate-400 hover:text-orange-500 transition-colors`}
                  >
                    PRIVACY POLICY
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className={`${fontHeading} text-sm tracking-wider text-slate-400 hover:text-orange-500 transition-colors`}
                  >
                    TERMS
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Amazon Safety Pro. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy-policy"
                className="text-xs text-slate-500 hover:text-orange-500 transition-colors uppercase tracking-wider"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-slate-500 hover:text-orange-500 transition-colors uppercase tracking-wider"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
