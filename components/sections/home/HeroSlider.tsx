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
    primaryCta: { label: "Submit for Free Review", href: "/free-validation" },
    secondaryCta: { label: "View Services", href: "/services" },
  },
  {
    subtitle: "ASIN Reinstatement Experts",
    headlineParts: ["From Restricted to", "Reinstated."],
    body: "We've handled hundreds of compliance cases across 7 Amazon marketplaces. Your suspended listing is our priority.",
    image: "/images/hero/shipping.jpg",
    primaryCta: { label: "Submit for Free Review", href: "/free-validation" },
    secondaryCta: { label: "View Services", href: "/services" },
  },
  {
    subtitle: "Interactive Self-Guide",
    headlineParts: ["Not sure what", "you need?"],
    body: "Walk through our interactive Self-Guide and identify in minutes exactly what compliance requirements apply to your product.",
    image: "/images/hero/self-guide.png",
    primaryCta: { label: "Open Self-Guide", href: "/self-guide" },
    secondaryCta: { label: "Read Safety Guide", href: "/safety-guide" },
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
    <section
      className="relative w-full flex flex-col overflow-hidden"
      // Divide by --ui-scale so that after the document zoom on Windows high-DPI
      // the hero still fills the full visual viewport (calc resolves to 100svh
      // when --ui-scale is 1, i.e. Mac/normal displays).
      style={{ height: "calc(100svh / var(--ui-scale, 1))" }}
    >
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
          {/* Center darkening for text legibility (radial - lets edges show warehouse warmth) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_42%,rgba(10,31,21,0.7)_0%,rgba(10,31,21,0.4)_70%,transparent_100%)]" />
          {/* Edge vignette for focus */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10,31,21,0.65)_100%)]" />
          {/* Subtle brand green tint for cohesion */}
          <div className="absolute inset-0 bg-[#1B4332]/25 mix-blend-multiply" />
          {/* Warm gold accent glow at top to add richness */}
          <div className="absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(ellipse_50%_50%_at_50%_30%,rgba(184,134,11,0.18),transparent_70%)] mix-blend-screen pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Main content - fluid centred zone that absorbs leftover space */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full min-h-0">
        <div
          className="max-w-7xl mx-auto w-full text-center"
          style={{
            paddingLeft: "clamp(1rem, 4vw, 2.5rem)",
            paddingRight: "clamp(1rem, 4vw, 2.5rem)",
            paddingTop: "clamp(4.5rem, 10vh, 7rem)",
            paddingBottom: "clamp(0.5rem, 2vh, 1.5rem)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="flex flex-col items-center"
              style={{ gap: "clamp(0.5rem, 1.6vh, 1.25rem)" }}
            >
              {/* Subtitle with line */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex items-center justify-center"
                style={{ gap: "clamp(0.75rem, 1.5vw, 1rem)" }}
              >
                <div className="h-px bg-[#B8860B]" style={{ width: "clamp(1.25rem, 2vw, 2rem)" }} />
                <p
                  className="text-[#B8860B] uppercase font-medium"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: "clamp(0.625rem, 1vw, 0.75rem)",
                    letterSpacing: "clamp(0.22em, 0.3vw, 0.3em)",
                  }}
                >
                  {SLIDES[current].subtitle}
                </p>
                <div className="h-px bg-[#B8860B]" style={{ width: "clamp(1.25rem, 2vw, 2rem)" }} />
              </motion.div>

              {/* Headline - two stacked lines with overflow clip for slide animation */}
              <div className="flex flex-col" style={{ gap: "clamp(0.125rem, 0.4vh, 0.5rem)" }}>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    className="text-[#FAF7F2]"
                    style={{
                      fontFamily: "var(--font-dm-serif)",
                      fontSize: "clamp(1.75rem, min(5.5vw, 6vh), 4.5rem)",
                      lineHeight: 1.05,
                    }}
                  >
                    {SLIDES[current].headlineParts[0]}
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                    style={{
                      fontFamily: "var(--font-dm-serif)",
                      fontSize: "clamp(1.75rem, min(5.5vw, 6vh), 4.5rem)",
                      lineHeight: 1.05,
                    }}
                  >
                    <em className="text-[#B8860B]">{SLIDES[current].headlineParts[1]}</em>
                  </motion.h1>
                </div>
              </div>

              {/* Body */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="max-w-2xl mx-auto text-[#FAF7F2]/70 leading-relaxed"
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: "clamp(0.8125rem, min(1.4vw, 1.8vh), 1.125rem)",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem",
                }}
              >
                {SLIDES[current].body}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center w-full sm:w-auto"
                style={{
                  fontFamily: "var(--font-outfit)",
                  gap: "clamp(0.5rem, 1vw, 0.875rem)",
                  maxWidth: "22rem",
                }}
              >
                <Link
                  href={SLIDES[current].primaryCta.href}
                  className="group inline-flex items-center justify-center gap-2 bg-[#B8860B] text-white rounded-full font-semibold hover:bg-[#a07609] transition-all duration-300 shadow-lg shadow-[#B8860B]/20 hover:shadow-xl hover:shadow-[#B8860B]/30 whitespace-nowrap"
                  style={{
                    paddingLeft: "clamp(1.25rem, 2.5vw, 2rem)",
                    paddingRight: "clamp(1.25rem, 2.5vw, 2rem)",
                    paddingTop: "clamp(0.625rem, 1.2vh, 0.875rem)",
                    paddingBottom: "clamp(0.625rem, 1.2vh, 0.875rem)",
                    fontSize: "clamp(0.75rem, 1vw, 0.875rem)",
                  }}
                >
                  {SLIDES[current].primaryCta.label}
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 shrink-0"
                  />
                </Link>
                <Link
                  href={SLIDES[current].secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 border border-[#FAF7F2]/25 text-[#FAF7F2] rounded-full font-medium hover:bg-[#FAF7F2]/10 hover:border-[#FAF7F2]/40 transition-all duration-300 backdrop-blur-sm whitespace-nowrap"
                  style={{
                    paddingLeft: "clamp(1.25rem, 2.5vw, 2rem)",
                    paddingRight: "clamp(1.25rem, 2.5vw, 2rem)",
                    paddingTop: "clamp(0.625rem, 1.2vh, 0.875rem)",
                    paddingBottom: "clamp(0.625rem, 1.2vh, 0.875rem)",
                    fontSize: "clamp(0.75rem, 1vw, 0.875rem)",
                  }}
                >
                  {SLIDES[current].secondaryCta.label}
                </Link>
              </motion.div>

              {/* Stats - prominent glass card row inside hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="max-w-4xl w-full"
                style={{ marginTop: "clamp(0.25rem, 1vh, 0.75rem)" }}
              >
                <div className="relative">
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#B8860B]/60 to-transparent" />
                  <div
                    className="bg-[#FAF7F2]/[0.04] backdrop-blur-md border border-[#FAF7F2]/10 rounded-2xl grid grid-cols-2 sm:grid-cols-4"
                    style={{
                      fontFamily: "var(--font-outfit)",
                      paddingLeft: "clamp(0.875rem, 2vw, 2rem)",
                      paddingRight: "clamp(0.875rem, 2vw, 2rem)",
                      paddingTop: "clamp(0.625rem, 1.2vh, 1rem)",
                      paddingBottom: "clamp(0.625rem, 1.2vh, 1rem)",
                      rowGap: "clamp(0.625rem, 1.5vh, 1rem)",
                    }}
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
                          className="font-bold text-[#FAF7F2] leading-none"
                          style={{
                            fontFamily: "var(--font-dm-serif)",
                            fontSize: "clamp(1.125rem, min(2.4vw, 3vh), 2rem)",
                            marginBottom: "clamp(0.125rem, 0.4vh, 0.4rem)",
                          }}
                        >
                          <span className="text-[#B8860B]">{stat.value}</span>
                        </p>
                        <p
                          className="text-[#FAF7F2]/55 uppercase leading-tight"
                          style={{
                            fontSize: "clamp(0.5rem, 0.7vw, 0.65rem)",
                            letterSpacing: "clamp(0.16em, 0.22vw, 0.22em)",
                          }}
                        >
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

      {/* Bottom - arrows + progress bars, fixed footprint */}
      <div className="relative z-10 flex-shrink-0">
        <div
          className="flex justify-center items-center"
          style={{
            gap: "clamp(0.625rem, 1vw, 0.875rem)",
            paddingBottom: "clamp(0.375rem, 0.8vh, 0.75rem)",
          }}
        >
          <button
            onClick={prev}
            className="rounded-full border border-[#FAF7F2]/15 flex items-center justify-center text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/30 hover:bg-[#FAF7F2]/5 transition-all backdrop-blur-sm"
            aria-label="Previous slide"
            style={{
              width: "clamp(2rem, 2.6vw, 2.5rem)",
              height: "clamp(2rem, 2.6vw, 2.5rem)",
            }}
          >
            <ChevronLeft size={15} />
          </button>
          <span
            className="text-[#FAF7F2]/55 tabular-nums"
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "clamp(0.625rem, 0.9vw, 0.75rem)",
              letterSpacing: "0.2em",
            }}
          >
            {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
          <button
            onClick={next}
            className="rounded-full border border-[#FAF7F2]/15 flex items-center justify-center text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/30 hover:bg-[#FAF7F2]/5 transition-all backdrop-blur-sm"
            aria-label="Next slide"
            style={{
              width: "clamp(2rem, 2.6vw, 2.5rem)",
              height: "clamp(2rem, 2.6vw, 2.5rem)",
            }}
          >
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Progress bars */}
        <div className="flex">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="flex-1 bg-[#FAF7F2]/10 cursor-pointer"
              aria-label={`Go to slide ${i + 1}`}
              style={{ height: "clamp(2px, 0.35vh, 3px)" }}
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
