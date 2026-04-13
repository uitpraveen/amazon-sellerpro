"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function RevealOnScroll({
  children,
  delay = 0,
  className,
  showLine = true,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  showLine?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={className}>
      {showLine && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1], delay }}
          className="mb-8 h-px origin-left bg-[var(--rule)]"
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: delay + 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
