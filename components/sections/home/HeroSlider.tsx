"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

const SLIDES = [
  {
    subtitle: "Ex-Amazon Safety Team",
    headline: <>Compliance, finally <em className="text-[#B8860B]">in expert hands</em>.</>,
    body: "Amazon safety & compliance handled by ex-Amazonians with 5+ years inside the product safety team. From restricted to reinstated.",
    image: "/images/hero/warehouse.jpg",
  },
  {
    subtitle: "ASIN Reinstatement Experts",
    headline: <>From Restricted to <em className="text-[#B8860B]">Reinstated</em>.</>,
    body: "We've handled hundreds of compliance cases across 7 Amazon marketplaces. Your suspended listing is our priority.",
    image: "/images/hero/shipping.jpg",
  },
  {
    subtitle: "Built by Insiders",
    headline: <>We Built the Rules. Now We Help You <em className="text-[#B8860B]">Follow Them</em>.</>,
    body: "Our team spent half a decade writing and enforcing Amazon's product safety policies. Now that expertise works for you.",
    image: "/images/hero/amazon-boxes.jpg",
  },
];

const STATS = [
  { value: "5+", label: "Years Inside Amazon" },
  { value: "7", label: "Marketplaces" },
  { value: "<24h", label: "Response Time" },
  { value: "Free", label: "First Review" },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[current].image}
            alt=""
            fill
            className="object-cover"
            priority={current === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(27,67,50,0.85)] via-[rgba(27,67,50,0.75)] to-[rgba(27,67,50,0.95)]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center pt-24 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-[#B8860B] text-xs tracking-[0.25em] uppercase mb-6"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {SLIDES[current].subtitle}
            </p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-[#FAF7F2] mb-6"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              {SLIDES[current].headline}
            </h1>
            <p
              className="max-w-2xl mx-auto text-lg sm:text-xl text-[#FAF7F2]/65 mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {SLIDES[current].body}
            </p>
          </motion.div>
        </AnimatePresence>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          <Link
            href="/free-validation"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#B8860B] text-white rounded-full text-sm font-semibold hover:bg-[#a07609] transition-colors"
          >
            Submit for Free Review <ArrowRight size={16} />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#FAF7F2]/30 text-[#FAF7F2] rounded-full text-sm font-medium hover:border-[#FAF7F2]/60 transition-colors"
          >
            View Services
          </Link>
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-0 mb-10"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="text-center px-5 sm:px-8">
                <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-[10px] text-[#FAF7F2]/40 mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
              {i < STATS.length - 1 && (
                <div className="hidden sm:block w-px h-10 bg-[#FAF7F2]/15" />
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2 justify-center">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-6 h-[3px] rounded-full transition-colors ${
                i === current ? "bg-[#B8860B]" : "bg-[#FAF7F2]/25"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-[#FAF7F2]/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
