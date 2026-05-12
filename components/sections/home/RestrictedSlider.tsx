"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Baby,
  Headphones,
  Sparkles,
  Milk,
  ChefHat,
  Shirt,
  Leaf,
  BatteryCharging,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Category = {
  icon: LucideIcon;
  name: string;
  note: string;
};

const CATEGORIES: Category[] = [
  { icon: Baby, name: "Children's Toys", note: "CPSIA, ASTM F963, CPC required" },
  { icon: Headphones, name: "Electronics", note: "FCC, UL certification, GCC required" },
  { icon: Sparkles, name: "Cosmetics", note: "FDA compliance, ingredient listing" },
  { icon: Milk, name: "Baby Products", note: "CPSIA, phthalates testing, CPC" },
  { icon: ChefHat, name: "Kitchen Appliances", note: "UL/ETL listing, GCC required" },
  { icon: Shirt, name: "Clothing & Textiles", note: "Flammability, CPSIA (children's)" },
  { icon: Leaf, name: "Supplements", note: "FDA, cGMP, labeling requirements" },
  { icon: BatteryCharging, name: "Batteries & Chargers", note: "UN38.3, UL certification" },
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
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
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
