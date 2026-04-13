"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap, Globe2, ShieldCheck } from "lucide-react";

export default function V7Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50">
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-12 lg:pt-40 lg:pb-28">
        {/* Top social proof */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="flex -space-x-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-indigo-600 text-[10px] font-bold text-white"
              >
                {["D", "S", "R", "A"][i]}
              </div>
            ))}
          </div>
          <span className="text-[14px] text-slate-600">
            Trusted by <strong className="text-slate-900">500+</strong> Amazon
            sellers worldwide
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="text-[46px] font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-[56px] lg:text-[68px]">
            Get Your Amazon Listings{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Back on Track
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-slate-600">
            Product safety compliance handled by ex-Amazonians who spent 5+ years
            inside the safety team. From ASIN suspension to full reinstatement —
            we know the process because we built it.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/free-validation"
            className="group inline-flex cursor-pointer items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 text-[15px] font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/30"
          >
            Start Free Review
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/services"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-[15px] font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-400 hover:shadow-md"
          >
            View All Services
          </Link>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            "Free first review",
            "< 24h response",
            "7 marketplaces",
            "Ex-Amazon team",
          ].map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-slate-600 shadow-sm ring-1 ring-slate-200"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              {f}
            </span>
          ))}
        </motion.div>

        {/* Floating hero image card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/60">
            {/* Browser chrome */}
            <div className="mb-3 flex items-center gap-2 rounded-t-xl bg-slate-100 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="ml-4 flex-1 rounded-md bg-white px-4 py-1.5 text-[12px] text-slate-400">
                amazonsafetypro.com/dashboard
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/images/hero/safety-check.jpg"
                alt="Professional compliance review dashboard"
                width={1000}
                height={560}
                className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[440px]"
                priority
              />
              {/* Overlay cards on the image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Floating metric cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="absolute bottom-6 left-6 flex items-center gap-3 rounded-xl bg-white/95 px-5 py-3 shadow-lg backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-900">
                    ASIN Reinstated
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Case resolved in 3 business days
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute right-6 top-6 flex items-center gap-3 rounded-xl bg-white/95 px-5 py-3 shadow-lg backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-900">
                    Response Time
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Under 24 hours guaranteed
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom trust logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-[12px] font-medium uppercase tracking-[0.15em] text-slate-400">
            Working knowledge of
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {["CPSC", "Health Canada", "EU GPSR", "Amazon TIC", "SGS", "Intertek", "UL Solutions"].map(
              (org) => (
                <span
                  key={org}
                  className="text-[16px] font-semibold text-slate-300 transition-colors hover:text-slate-500"
                >
                  {org}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
