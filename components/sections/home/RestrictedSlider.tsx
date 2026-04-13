"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = [
  { icon: "🧸", name: "Children's Toys", note: "CPSIA, ASTM F963, CPC required" },
  { icon: "🔌", name: "Electronics", note: "FCC, UL certification, GCC required" },
  { icon: "🧴", name: "Cosmetics", note: "FDA compliance, ingredient listing" },
  { icon: "🍼", name: "Baby Products", note: "CPSIA, phthalates testing, CPC" },
  { icon: "🍳", name: "Kitchen Appliances", note: "UL/ETL listing, GCC required" },
  { icon: "👕", name: "Clothing & Textiles", note: "Flammability, CPSIA (children's)" },
  { icon: "💊", name: "Supplements", note: "FDA, cGMP, labeling requirements" },
  { icon: "🔋", name: "Batteries & Chargers", note: "UN38.3, UL certification" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function RestrictedSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <section className="bg-[#1B4332] py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <p className="text-[#B8860B] text-xs tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
            Know Your Products
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2]" style={{ fontFamily: "var(--font-dm-serif)" }}>
            Commonly Restricted Categories
          </h2>
        </motion.div>

        <div className="flex justify-end gap-2 mb-6">
          <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-[#FAF7F2]/20 flex items-center justify-center text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/40 transition-colors" aria-label="Scroll left">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-[#FAF7F2]/20 flex items-center justify-center text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/40 transition-colors" aria-label="Scroll right">
            <ChevronRight size={18} />
          </button>
        </div>

        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="min-w-[180px] sm:min-w-[200px] bg-[#FAF7F2]/[0.08] border border-[#FAF7F2]/10 rounded-2xl p-6 text-center snap-start flex-shrink-0"
            >
              <span className="text-4xl block mb-4" role="img" aria-hidden>{cat.icon}</span>
              <h3 className="text-sm font-semibold text-[#FAF7F2] mb-2" style={{ fontFamily: "var(--font-dm-serif)" }}>{cat.name}</h3>
              <p className="text-xs text-[#FAF7F2]/50 leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>{cat.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
