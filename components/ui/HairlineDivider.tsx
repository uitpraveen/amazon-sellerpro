"use client";

import { motion } from "framer-motion";

export default function HairlineDivider({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        className="h-px flex-1 origin-left bg-[var(--rule)]"
      />
      {label && (
        <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--ink-3)]">
          {label}
        </span>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: 0.05 }}
        className="h-px flex-1 origin-right bg-[var(--rule)]"
      />
    </div>
  );
}
