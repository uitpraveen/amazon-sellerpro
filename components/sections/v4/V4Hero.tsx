"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, CheckCircle, Clock, Globe, ArrowRight } from "lucide-react";

export default function V4Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0B1120]">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/warehouse.jpg"
          alt="Amazon fulfillment warehouse operations"
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/95 to-[#0B1120]/60" />
      </div>

      {/* Subtle grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-12 lg:pt-40 lg:pb-28">
        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 flex flex-wrap items-center gap-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-[13px] font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Actively Enrolling Sellers
          </span>
          <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-400">
            <Shield className="h-3.5 w-3.5 text-blue-400" />
            Ex-Amazon Safety Team
          </span>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-[14px] font-semibold uppercase tracking-[0.15em] text-blue-400"
            >
              Amazon Product Safety & Compliance
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[48px] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[56px] lg:text-[64px]"
            >
              Your Listings{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Protected
              </span>{" "}
              by the People Who{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Built the Rules
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300"
            >
              Led by ex-Amazonians with 5+ years inside Amazon&rsquo;s product
              safety team. We don&rsquo;t guess what compliance looks like — we
              defined it. Now we put that insider expertise to work for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/free-validation"
                className="group inline-flex cursor-pointer items-center gap-3 rounded-lg bg-blue-500 px-8 py-4 text-[15px] font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-400 hover:shadow-blue-400/30"
              >
                Get Free Case Review
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-600 px-6 py-4 text-[15px] font-medium text-slate-300 transition-all hover:border-slate-400 hover:text-white"
              >
                View Services
              </Link>
            </motion.div>

            {/* Trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-14 grid grid-cols-3 gap-8 border-t border-slate-700/60 pt-8"
            >
              {[
                { icon: Clock, value: "< 24h", label: "Response Time" },
                { icon: Globe, value: "7", label: "Marketplaces" },
                { icon: CheckCircle, value: "Free", label: "First Review" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-start gap-3">
                  <stat.icon className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                  <div>
                    <div className="text-xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-[13px] text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Hero image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 shadow-2xl shadow-blue-500/10">
              <Image
                src="/images/hero/compliance-team.jpg"
                alt="Professional compliance team reviewing documents"
                width={640}
                height={480}
                className="h-[420px] w-full object-cover lg:h-[520px]"
                priority
              />
              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/80 via-transparent to-transparent" />

              {/* Floating stat card on image */}
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-wider text-white/70">
                      Team Experience
                    </p>
                    <p className="mt-1 text-2xl font-bold text-white">
                      5+ Years Inside Amazon
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                    <Shield className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-3xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
