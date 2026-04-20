"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    subtitle: "Ex-Amazon Safety Team",
    headlineParts: ["Compliance, finally", "in expert hands."],
    body: "Amazon safety & compliance handled by ex-Amazonians with 5+ years inside the product safety team. From restricted to reinstated.",
    image: "/images/hero/warehouse.jpg",
  },
  {
    subtitle: "ASIN Reinstatement Experts",
    headlineParts: ["From Restricted to", "Reinstated."],
    body: "We've handled hundreds of compliance cases across 7 Amazon marketplaces. Your suspended listing is our priority.",
    image: "/images/hero/shipping.jpg",
  },
  {
    subtitle: "Built by Insiders",
    headlineParts: ["We Built the Rules.", "Now We Help You Follow Them."],
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

const SLIDE_DURATION = 6000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  // Auto-advance timer
  useEffect(() => {
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [next]);

  // Progress bar animation
  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / SLIDE_DURATION, 1);
      setProgress(pct);
      if (pct < 1) raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [current]);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background images with Ken Burns zoom */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 8, ease: "linear" } }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[current].image}
            alt=""
            fill
            className="object-cover scale-105"
            priority={current === 0}
            sizes="100vw"
          />
          {/* Multi-layer overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f15]/80 via-[#1B4332]/60 to-[#0a1f15]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f15]/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative corner accents — hidden on mobile */}
      <div className="absolute inset-0 z-[1] pointer-events-none hidden md:block">
        <div className="absolute top-24 left-8 w-20 h-[1px] bg-gradient-to-r from-[#B8860B]/40 to-transparent" />
        <div className="absolute top-24 left-8 w-[1px] h-20 bg-gradient-to-b from-[#B8860B]/40 to-transparent" />
        <div className="absolute bottom-32 right-8 w-20 h-[1px] bg-gradient-to-l from-[#B8860B]/40 to-transparent" />
        <div className="absolute bottom-32 right-8 w-[1px] h-20 bg-gradient-to-t from-[#B8860B]/40 to-transparent" />
      </div>

      {/* Slide number indicator — desktop only */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group flex items-center gap-3"
          >
            <span
              className={`text-sm font-medium transition-all duration-300 ${
                i === current
                  ? "text-[#B8860B] scale-110"
                  : "text-[#FAF7F2]/30 group-hover:text-[#FAF7F2]/60"
              }`}
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              0{i + 1}
            </span>
            <div
              className={`h-[2px] transition-all duration-300 ${
                i === current
                  ? "w-8 bg-[#B8860B]"
                  : "w-4 bg-[#FAF7F2]/20 group-hover:w-6 group-hover:bg-[#FAF7F2]/40"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full">
        <div className="max-w-5xl mx-auto w-full px-5 sm:px-8 text-center pt-28 pb-40 sm:pb-48">
          <AnimatePresence mode="wait">
            <motion.div key={current} className="space-y-0">
              {/* Subtitle with line */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8"
              >
                <div className="h-[1px] w-6 sm:w-8 bg-[#B8860B]" />
                <p
                  className="text-[#B8860B] text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-medium"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {SLIDES[current].subtitle}
                </p>
                <div className="h-[1px] w-6 sm:w-8 bg-[#B8860B]" />
              </motion.div>

              {/* Headline — two lines with staggered animation */}
              <div className="overflow-hidden mb-2">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  className="text-[2rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.1] sm:leading-[1.05] text-[#FAF7F2]"
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                >
                  {SLIDES[current].headlineParts[0]}
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-6 sm:mb-8">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                  className="text-[2rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.1] sm:leading-[1.05]"
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                >
                  <em className="text-[#B8860B]">{SLIDES[current].headlineParts[1]}</em>
                </motion.h1>
              </div>

              {/* Body */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="max-w-2xl mx-auto text-sm sm:text-lg text-[#FAF7F2]/65 mb-8 sm:mb-10 leading-relaxed px-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {SLIDES[current].body}
              </motion.p>

              {/* CTAs — stack on mobile, side-by-side on desktop */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                <Link
                  href="/free-validation"
                  className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#B8860B] text-white rounded-full text-[13px] sm:text-sm font-semibold hover:bg-[#a07609] transition-all duration-300 shadow-lg shadow-[#B8860B]/20 hover:shadow-xl hover:shadow-[#B8860B]/30 whitespace-nowrap"
                >
                  Submit for Free Review
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 shrink-0"
                  />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 border border-[#FAF7F2]/25 text-[#FAF7F2] rounded-full text-[13px] sm:text-sm font-medium hover:bg-[#FAF7F2]/10 hover:border-[#FAF7F2]/40 transition-all duration-300 backdrop-blur-sm whitespace-nowrap"
                >
                  View Services
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom section — stats + navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        {/* Stats bar */}
        <div className="border-t border-[#FAF7F2]/10 bg-[#0a1f15]/50 backdrop-blur-md">
          <div
            className="max-w-6xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-3"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {/* Stats — 4 column grid on mobile, horizontal on desktop */}
            <div className="grid grid-cols-4 gap-2 sm:flex sm:items-center sm:gap-0 flex-1 sm:flex-none">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="flex items-center justify-center">
                  <div className="text-center px-1 sm:px-6 min-w-0">
                    <p className="text-base sm:text-2xl font-bold text-white leading-none">
                      {stat.value}
                    </p>
                    <p className="text-[8px] sm:text-[9px] text-[#FAF7F2]/40 mt-1 sm:mt-1.5 uppercase tracking-[0.1em] sm:tracking-[0.15em] leading-tight">
                      {stat.label}
                    </p>
                  </div>
                  {i < STATS.length - 1 && (
                    <div className="hidden sm:block w-px h-8 bg-[#FAF7F2]/10" />
                  )}
                </div>
              ))}
            </div>

            {/* Arrow navigation — desktop only */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-[#FAF7F2]/15 flex items-center justify-center text-[#FAF7F2]/50 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/30 hover:bg-[#FAF7F2]/5 transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-[#FAF7F2]/15 flex items-center justify-center text-[#FAF7F2]/50 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/30 hover:bg-[#FAF7F2]/5 transition-all"
                aria-label="Next slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Progress bars */}
        <div className="flex">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="flex-1 h-1 sm:h-[3px] bg-[#FAF7F2]/10 cursor-pointer"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div
                className="h-full transition-none pointer-events-none"
                style={{
                  width: i === current ? `${progress * 100}%` : i < current ? "100%" : "0%",
                  backgroundColor: i === current ? "#B8860B" : i < current ? "#B8860B" : "transparent",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
