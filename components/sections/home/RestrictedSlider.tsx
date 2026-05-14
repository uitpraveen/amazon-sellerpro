"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Ban,
  Baby,
  Backpack,
  Sparkles,
  ChefHat,
  Shirt,
  Leaf,
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
  { icon: Ban, name: "Restricted Products", note: "Pre-approval & gating required" },
  { icon: Baby, name: "Children's Toys", note: "CPSIA, ASTM F963, CPC required" },
  { icon: Backpack, name: "Children's Products", note: "CPSIA, CPC, third-party testing" },
  { icon: FeedingBottle, name: "Baby Products", note: "CPSIA, phthalates testing, CPC" },
  { icon: Hairdryer, name: "Electronics", note: "FCC, UL certification, GCC required" },
  { icon: BatteryCharging, name: "Batteries & Chargers", note: "UN38.3, UL certification" },
  { icon: Sparkles, name: "Cosmetics", note: "FDA compliance, ingredient listing" },
  { icon: Leaf, name: "Supplements", note: "FDA, cGMP, labeling requirements" },
  { icon: Shirt, name: "Clothing & Textiles", note: "Flammability, CPSIA (children's)" },
  { icon: ChefHat, name: "Kitchen Appliances", note: "UL/ETL listing, GCC required" },
];

const SAFETY_GUIDE_HREF = "/safety-guide#section-4a";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function RestrictedSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

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

        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <Link
            href={SAFETY_GUIDE_HREF}
            className="group inline-flex items-center gap-2 text-[#B8860B] hover:text-[#FAF7F2] text-sm font-semibold transition-colors"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            View full safety guide
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-[#FAF7F2]/20 flex items-center justify-center text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/40 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-[#FAF7F2]/20 flex items-center justify-center text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/40 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="snap-start flex-shrink-0 min-w-[260px] sm:min-w-[280px]"
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
      </div>
    </section>
  );
}
