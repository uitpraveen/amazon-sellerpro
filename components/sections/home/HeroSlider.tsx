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
    body: "Amazon safety & compliance handled by ex-Amazonians who spent years inside the product safety team. From restricted to reinstated.",
    image: "/images/hero/packages.jpg",
  },
  {
    subtitle: "ASIN Reinstatement Experts",
    headlineParts: ["From Restricted to", "Reinstated."],
    body: "We've handled hundreds of compliance cases across 7 Amazon marketplaces. Your suspended listing is our priority.",
    image: "/images/hero/shipping.jpg",
  },
];

const STATS = [
  { value: "5+", label: "Years Inside Amazon" },
  { value: "7", label: "Global Marketplaces" },
  { value: "<24h", label: "Response Time" },
  { value: "Free", label: "First Review" },
];

const SLIDE_DURATION = 12000;

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

  useEffect(() => {
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [next]);

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
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 14, ease: "linear" } }}
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
          {/* Top + bottom dark for nav and stats card */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f15]/85 via-[#0a1f15]/40 to-[#0a1f15]/95" />
          {/* Center darkening for text legibility (radial — lets edges show warehouse warmth) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_42%,rgba(10,31,21,0.7)_0%,rgba(10,31,21,0.4)_70%,transparent_100%)]" />
          {/* Edge vignette for focus */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10,31,21,0.65)_100%)]" />
          {/* Subtle brand green tint for cohesion */}
          <div className="absolute inset-0 bg-[#1B4332]/25 mix-blend-multiply" />
          {/* Warm gold accent glow at top to add richness */}
          <div className="absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(ellipse_50%_50%_at_50%_30%,rgba(184,134,11,0.18),transparent_70%)] mix-blend-screen pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full">
        <div className="max-w-5xl mx-auto w-full px-5 sm:px-8 text-center pt-28 pb-44 sm:pb-52">
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

              {/* Headline */}
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
                className="max-w-2xl mx-auto text-sm sm:text-lg text-[#FAF7F2]/70 mb-8 sm:mb-10 leading-relaxed px-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {SLIDES[current].body}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto mb-12 sm:mb-16"
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

              {/* Stats — prominent glass card row inside hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="max-w-4xl mx-auto"
              >
                <div className="relative">
                  {/* Top accent line */}
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#B8860B]/60 to-transparent" />
                  <div
                    className="bg-[#FAF7F2]/[0.04] backdrop-blur-md border border-[#FAF7F2]/10 rounded-2xl px-4 sm:px-8 py-5 sm:py-7 grid grid-cols-2 sm:grid-cols-4 gap-y-5 sm:gap-y-0"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {STATS.map((stat, i) => (
                      <div
                        key={stat.label}
                        className={`flex flex-col items-center text-center ${
                          i < STATS.length - 1
                            ? "sm:border-r sm:border-[#FAF7F2]/10"
                            : ""
                        }`}
                      >
                        <p
                          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FAF7F2] leading-none mb-1.5 sm:mb-2"
                          style={{ fontFamily: "var(--font-dm-serif)" }}
                        >
                          <span className="text-[#B8860B]">{stat.value}</span>
                        </p>
                        <p className="text-[9px] sm:text-[10px] text-[#FAF7F2]/55 uppercase tracking-[0.18em] sm:tracking-[0.22em] leading-tight">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom — minimal nav + progress */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        {/* Arrow nav — desktop only */}
        <div className="hidden sm:flex justify-end items-center gap-2 px-8 pb-3">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-[#FAF7F2]/15 flex items-center justify-center text-[#FAF7F2]/50 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/30 hover:bg-[#FAF7F2]/5 transition-all backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-[#FAF7F2]/15 flex items-center justify-center text-[#FAF7F2]/50 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/30 hover:bg-[#FAF7F2]/5 transition-all backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
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
