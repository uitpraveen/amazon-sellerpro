"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Ban,
  Baby,
  Backpack,
  Apple,
  Package,
  Hammer,
  XCircle,
  BatteryCharging,
  ArrowRight,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>;

const Hairdryer: IconComponent = ({ size = 24, strokeWidth = 2, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    <path d="M3 5h13a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-6l-1 5H7a1 1 0 0 1-1-1v-4H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    <circle cx="6" cy="9" r="1.5" />
    <path d="M19 7l3-1" />
    <path d="M19 9h3" />
    <path d="M19 11l3 1" />
  </svg>
);

const FeedingBottle: IconComponent = ({ size = 24, strokeWidth = 2, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    <path d="M10.5 4.5V3a1.5 1.5 0 0 1 3 0v1.5" />
    <path d="M9 4.5h6v2.5H9z" />
    <path d="M9 7c0 1-2 2-2 4v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-8c0-2-2-3-2-4" />
    <path d="M13 12h2" />
    <path d="M13 15h2" />
    <path d="M13 18h2" />
  </svg>
);

type Category = {
  icon: IconComponent;
  name: string;
  note: string;
};

const CATEGORIES: Category[] = [
  { icon: Ban, name: "Restricted Products", note: "Pre-Approval & Gating required" },
  { icon: Baby, name: "Children's Toys", note: "CPSIA, ASTM F963, EN 71, CPC and more required" },
  { icon: Backpack, name: "Children's Products", note: "CPSIA, CPC, third party and more required" },
  { icon: FeedingBottle, name: "Baby Products", note: "CPSIA, Lead, Phthalate, CPC and more required" },
  { icon: Hairdryer, name: "Electronics", note: "UL, GCC and more required" },
  { icon: BatteryCharging, name: "Batteries & Chargers", note: "UL, GCC and more required" },
  { icon: Apple, name: "Food & Supplements", note: "FDA compliance, labelling and more required" },
  { icon: Package, name: "Consumables", note: "FDA, GMP registration and more required" },
  { icon: Hammer, name: "Hardline Products", note: "ASTM, UL, GCC and more required" },
  { icon: XCircle, name: "Prohibited Products", note: "Not Permitted for sale in Amazon" },
];

const SAFETY_GUIDE_HREF = "/safety-guide#section-4c-ii";
const AUTO_SLIDE_INTERVAL = 4500;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function RestrictedSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<number>(0); // card width + gap
  const ignoreScrollRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [maxStart, setMaxStart] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Recompute step (card width + gap) and the max valid start index.
  // The max start index is bounded so the rightmost card is never cut off:
  //   maxStart = totalCards − floor(containerWidth / step)
  const recompute = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-slide-card]");
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const step =
      cards.length >= 2 ? cards[1].offsetLeft - cards[0].offsetLeft : cardWidth;
    stepRef.current = step;

    // How many full cards fit at once (≥ 1). Use the rendered scroll width to
    // figure out if the whole list already fits - in which case maxStart = 0.
    const containerWidth = el.clientWidth;
    const totalTrackWidth = el.scrollWidth;
    let visibleCount: number;
    if (totalTrackWidth <= containerWidth + 1) {
      visibleCount = CATEGORIES.length;
    } else {
      visibleCount = Math.max(1, Math.floor(containerWidth / step));
    }
    const newMax = Math.max(0, CATEGORIES.length - visibleCount);
    setMaxStart(newMax);
    setActiveIndex((prev) => Math.min(prev, newMax));
  }, []);

  // Programmatic scroll: bound to [0, maxStart]
  const goToIndex = useCallback(
    (index: number) => {
      const el = scrollRef.current;
      if (!el || stepRef.current === 0) return;
      const clamped = Math.max(0, Math.min(index, maxStart));
      setActiveIndex(clamped);
      // Ignore the next onScroll-driven index update for a tick so the manual
      // click can't briefly flip the active dot to a stale value.
      ignoreScrollRef.current = true;
      el.scrollTo({ left: clamped * stepRef.current, behavior: "smooth" });
      window.setTimeout(() => {
        ignoreScrollRef.current = false;
      }, 600);
    },
    [maxStart]
  );

  const goNext = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev >= maxStart ? 0 : prev + 1;
      const el = scrollRef.current;
      if (el && stepRef.current > 0) {
        ignoreScrollRef.current = true;
        el.scrollTo({ left: next * stepRef.current, behavior: "smooth" });
        window.setTimeout(() => {
          ignoreScrollRef.current = false;
        }, 600);
      }
      return next;
    });
  }, [maxStart]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev <= 0 ? maxStart : prev - 1;
      const el = scrollRef.current;
      if (el && stepRef.current > 0) {
        ignoreScrollRef.current = true;
        el.scrollTo({ left: next * stepRef.current, behavior: "smooth" });
        window.setTimeout(() => {
          ignoreScrollRef.current = false;
        }, 600);
      }
      return next;
    });
  }, [maxStart]);

  // Initial measure + on resize
  useEffect(() => {
    recompute();
    const onResize = () => recompute();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [recompute]);

  // Keep activeIndex in sync with manual scroll, but clamp to maxStart so the
  // dot can never highlight a position past the valid range.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      if (ignoreScrollRef.current) return;
      const step = stepRef.current;
      if (step === 0) return;
      const raw = Math.round(el.scrollLeft / step);
      const clamped = Math.max(0, Math.min(raw, maxStart));
      setActiveIndex((prev) => (prev !== clamped ? clamped : prev));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [maxStart]);

  // Auto-slide - only when there are positions to cycle through
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (maxStart === 0) return;
    const timer = window.setInterval(() => {
      if (isPausedRef.current) return;
      goNext();
    }, AUTO_SLIDE_INTERVAL);
    return () => window.clearInterval(timer);
  }, [goNext, maxStart]);

  const dotCount = maxStart + 1;

  return (
    <section className="bg-[#1B4332] py-20 sm:py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10 sm:mb-14"
        >
          <p
            className="text-[#B8860B] text-xs sm:text-sm tracking-[0.25em] uppercase mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Know Your Products
          </p>
          <h2
            className="text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F2] mb-5"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            Commonly Restricted Categories
          </h2>
          <p
            className="max-w-2xl mx-auto text-[#FAF7F2]/65 text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            These categories trigger Amazon&apos;s safety documentation requirements most frequently. Click any category to learn the exact compliance requirements.
          </p>
        </motion.div>

        {/* Top row: only the "View full safety guide" link */}
        <div className="mb-6 sm:mb-8">
          <Link
            href={SAFETY_GUIDE_HREF}
            className="group inline-flex items-center gap-2 text-[#B8860B] hover:text-[#FAF7F2] text-sm font-semibold transition-colors"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            View full safety guide
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollBehavior: "smooth",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            // resume after a short delay so the user can swipe without immediate auto-advance
            window.setTimeout(() => setIsPaused(false), 1500);
          }}
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                data-slide-card
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                /* Sized so 4 cards (4×280 + 3×24 gap = 1192) fit cleanly
                   inside max-w-7xl (1216 inner width after sm:px-8) without
                   the rightmost card getting cut off. */
                className="flex-shrink-0 w-[260px] sm:w-[280px]"
              >
                <Link
                  href={SAFETY_GUIDE_HREF}
                  className="group block h-full bg-[#FAF7F2]/[0.05] border border-[#FAF7F2]/10 rounded-2xl p-7 sm:p-8 hover:bg-[#FAF7F2]/[0.08] hover:border-[#B8860B]/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl bg-[#FAF7F2]/[0.06] border border-[#FAF7F2]/10 flex items-center justify-center text-[#B8860B] mb-6 group-hover:bg-[#B8860B]/15 group-hover:border-[#B8860B]/40 transition-colors duration-300">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3
                    className="text-lg sm:text-xl font-semibold text-[#FAF7F2] mb-2.5"
                    style={{ fontFamily: "var(--font-dm-serif)" }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    className="text-sm text-[#FAF7F2]/55 leading-relaxed mb-5"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {cat.note}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8860B] group-hover:text-[#FAF7F2] transition-colors"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    Learn more
                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom nav: arrows + counter + dot pagination */}
        {dotCount > 1 && (
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                className="w-11 h-11 rounded-full border border-[#FAF7F2]/20 flex items-center justify-center text-[#FAF7F2]/70 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/40 hover:bg-[#FAF7F2]/5 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <span
                className="text-[#FAF7F2]/60 text-xs tracking-[0.2em] tabular-nums px-1"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {String(activeIndex + 1).padStart(2, "0")} / {String(dotCount).padStart(2, "0")}
              </span>
              <button
                onClick={goNext}
                className="w-11 h-11 rounded-full border border-[#FAF7F2]/20 flex items-center justify-center text-[#FAF7F2]/70 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/40 hover:bg-[#FAF7F2]/5 transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="hidden sm:block h-5 w-px bg-[#FAF7F2]/15" />

            <div className="flex gap-1.5">
              {Array.from({ length: dotCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeIndex
                      ? "w-6 bg-[#B8860B]"
                      : "w-1.5 bg-[#FAF7F2]/25 hover:bg-[#FAF7F2]/45"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
