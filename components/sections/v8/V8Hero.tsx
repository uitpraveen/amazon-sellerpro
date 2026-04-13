"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Globe, Award } from "lucide-react";

export default function V8Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-12 lg:pt-40 lg:pb-28">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-[13px] font-semibold text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Now Enrolling Amazon Sellers
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="text-[48px] font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-[56px] lg:text-[68px]">
            Amazon Compliance,
            <br />
            <span className="text-emerald-600">Handled by Experts</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-slate-600">
            Led by ex-Amazonians with 5+ years inside the product safety team.
            We wrote the policies that govern your listings — now we use that
            insider knowledge to protect your business.
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
            className="group inline-flex cursor-pointer items-center gap-3 rounded-xl bg-emerald-600 px-8 py-4 text-[15px] font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500"
          >
            Get Free Case Review
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/services"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 px-7 py-4 text-[15px] font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
          >
            Our Services
          </Link>
        </motion.div>

        {/* Three image cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mx-auto mt-20 grid max-w-6xl gap-6 sm:grid-cols-3"
        >
          {[
            {
              src: "/images/hero/professional-team.jpg",
              alt: "Professional compliance team working together",
              icon: Shield,
              title: "Ex-Amazon Team",
              desc: "5+ years inside Amazon's product safety operations",
            },
            {
              src: "/images/hero/shipping.jpg",
              alt: "Amazon product shipping and fulfillment",
              icon: Globe,
              title: "7 Marketplaces",
              desc: "US, CA, EU, UK, India, Singapore & Australia",
            },
            {
              src: "/images/hero/amazon-boxes.jpg",
              alt: "Amazon product boxes ready for compliance review",
              icon: Award,
              title: "Proven Results",
              desc: "From restricted ASIN to fully reinstated, fast",
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 shadow-sm backdrop-blur-sm">
                  <card.icon className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-[17px] font-bold text-slate-900">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slate-500">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mx-auto mt-20 max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-8"
        >
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { icon: Shield, value: "5+", label: "Years Inside Amazon", color: "text-blue-600 bg-blue-100" },
              { icon: Globe, value: "7", label: "Marketplaces Covered", color: "text-emerald-600 bg-emerald-100" },
              { icon: Clock, value: "<24h", label: "Response Time", color: "text-amber-600 bg-amber-100" },
              { icon: Award, value: "Free", label: "First Review", color: "text-purple-600 bg-purple-100" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900">
                  {stat.value}
                </div>
                <div className="mt-1 text-[13px] text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
