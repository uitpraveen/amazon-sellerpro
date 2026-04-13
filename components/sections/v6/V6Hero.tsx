"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Users, MapPin } from "lucide-react";

export default function V6Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden lg:grid lg:grid-cols-2">
      {/* Left — Content panel */}
      <div className="relative flex flex-col justify-center bg-[#0C2340] px-6 py-32 lg:px-16 xl:px-24">
        {/* Decorative corner */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-32 w-32 border-l-2 border-t-2 border-white/10"
        />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="h-px w-8 bg-orange-400" />
          <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-orange-400">
            Ex-Amazon Safety Team
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[44px] font-extrabold leading-[1.08] tracking-tight text-white sm:text-[52px] lg:text-[58px] xl:text-[66px]"
        >
          We Wrote the{" "}
          <span className="text-orange-400">Safety Playbook.</span>
          <br />
          Now We Run It{" "}
          <span className="text-orange-400">for You.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 max-w-lg text-[17px] leading-relaxed text-white/70"
        >
          Amazon Safety Pro is led by tenured ex-Amazonians who spent half a
          decade inside Amazon&rsquo;s product safety team — writing, enforcing,
          and refining the policies that govern your listings today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/free-validation"
            className="group inline-flex cursor-pointer items-center gap-3 rounded-lg bg-orange-500 px-7 py-4 text-[15px] font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-400"
          >
            Get Free Review
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/services"
            className="inline-flex cursor-pointer items-center gap-2 border-b border-white/40 pb-0.5 text-[15px] font-medium text-white/80 transition-colors hover:border-white hover:text-white"
          >
            Our Services
          </Link>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-16 flex flex-wrap gap-8"
        >
          {[
            {
              icon: BadgeCheck,
              value: "5+ Years",
              label: "Inside Amazon",
            },
            { icon: MapPin, value: "7 Regions", label: "Worldwide" },
            { icon: Users, value: "100%", label: "Ex-Amazon Team" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <s.icon className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-[16px] font-bold text-white">{s.value}</p>
                <p className="text-[12px] text-white/50">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right — Full-bleed image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative hidden lg:block"
      >
        <Image
          src="/images/hero/packages.jpg"
          alt="Product packaging and compliance inspection"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
        {/* Subtle gradient blending into left panel */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0C2340] to-transparent" />

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="absolute bottom-10 right-10 max-w-xs rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg"
        >
          <p className="text-[12px] font-medium uppercase tracking-wider text-white/60">
            Trusted Process
          </p>
          <p className="mt-2 text-[18px] font-bold leading-snug text-white">
            From restricted ASIN to fully reinstated — in days, not months.
          </p>
        </motion.div>
      </motion.div>

      {/* Mobile image — shown below content on small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative h-[300px] lg:hidden"
      >
        <Image
          src="/images/hero/packages.jpg"
          alt="Product packaging and compliance inspection"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C2340]/60 to-transparent" />
      </motion.div>
    </section>
  );
}
