"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function TacticalShell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, visible: false });
  const pathname = usePathname();
  const isAlternate =
    pathname?.startsWith("/preview") ||
    pathname?.startsWith("/v") ||
    false;

  useEffect(() => {
    setMounted(true);
    if (isAlternate) return; // No cursor tracking on editorial pages

    function move(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY, visible: true });
    }
    function leave() {
      setPos((p) => ({ ...p, visible: false }));
    }
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [isAlternate]);

  // For alternate routes, render children without any shell decorations
  if (isAlternate) {
    return <>{children}</>;
  }

  return (
    <div className="paper-grain relative min-h-screen">
      {/* Cursor-following gradient mesh */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 transition-opacity"
        style={{
          background: pos.visible
            ? `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, var(--signal-soft) 0%, transparent 60%)`
            : "transparent",
          opacity: 0.6,
        }}
      />

      {/* Subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          opacity: 0.18,
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Instrument-panel frame */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-1 z-30 border border-[var(--rule)]"
      />

      {/* Corner brackets */}
      <CornerBrackets />

      {/* Page-load signal bar */}
      <AnimatePresence>
        {mounted && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-[var(--signal)]"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

function CornerBrackets() {
  const stroke = "var(--ink)";
  return (
    <>
      <svg
        aria-hidden
        className="pointer-events-none fixed left-2 top-2 z-40"
        width="16"
        height="16"
      >
        <path d="M 0 8 L 0 0 L 8 0" stroke={stroke} strokeWidth="1.5" fill="none" />
      </svg>
      <svg
        aria-hidden
        className="pointer-events-none fixed right-2 top-2 z-40"
        width="16"
        height="16"
      >
        <path d="M 8 0 L 16 0 L 16 8" stroke={stroke} strokeWidth="1.5" fill="none" />
      </svg>
      <svg
        aria-hidden
        className="pointer-events-none fixed bottom-2 left-2 z-40"
        width="16"
        height="16"
      >
        <path d="M 0 8 L 0 16 L 8 16" stroke={stroke} strokeWidth="1.5" fill="none" />
      </svg>
      <svg
        aria-hidden
        className="pointer-events-none fixed bottom-2 right-2 z-40"
        width="16"
        height="16"
      >
        <path d="M 8 16 L 16 16 L 16 8" stroke={stroke} strokeWidth="1.5" fill="none" />
      </svg>
    </>
  );
}
