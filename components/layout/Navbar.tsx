"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]">
      {/* Gold accent line */}
      <div className="h-0.5 w-full bg-[#B8860B]" />

      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-6 lg:px-10 py-4 border-b border-[#E8E0D4]">
        <Link
          href="/"
          className="flex items-center gap-2"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          <span className="text-xl tracking-wide text-[#2D2A26]">AMAZON</span>
          <span className="text-[#B8860B] text-sm">&#9670;</span>
          <span className="text-xl tracking-wide text-[#2D2A26]">SAFETY PRO</span>
        </Link>

        <nav className="flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-[0.2em] transition-colors ${
                  active ? "text-[#B8860B]" : "text-[#6B6560] hover:text-[#B8860B]"
                }`}
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/free-validation"
            className="inline-flex items-center gap-2 px-5 py-2 bg-[#1B4332] text-white rounded-full text-xs font-medium hover:bg-[#15372a] transition-colors"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Free Review <ArrowRight size={14} />
          </Link>
        </nav>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-5 py-4 border-b border-[#E8E0D4]">
        <Link
          href="/"
          style={{ fontFamily: "var(--font-dm-serif)" }}
          className="text-lg text-[#2D2A26] tracking-wide"
        >
          AMAZON <span className="text-[#B8860B]">&#9670;</span> SAFETY PRO
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-[#2D2A26]"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAF7F2] border-b border-[#E8E0D4] px-5 pb-4 overflow-hidden"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 text-xs uppercase tracking-[0.2em] text-[#6B6560] hover:text-[#B8860B] transition-colors"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/free-validation"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-2 mt-3 px-6 py-2.5 bg-[#1B4332] text-white rounded-full text-xs font-medium"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Free Review <ArrowRight size={14} />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
