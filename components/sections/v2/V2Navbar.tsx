"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Practice", href: "/v2" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/safety-guide" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function V2Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#C8A45C]/40 bg-[#FBF8F0]/95 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-6 lg:px-12">
        <Link href="/v2" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center border border-[#0F1B3C] bg-[#0F1B3C] text-[#C8A45C]">
            <span className="font-playfair text-xl font-[600] italic">A</span>
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-playfair text-base font-[600] tracking-[-0.01em] text-[#0F1B3C]">
              Amazon Safety Pro
            </span>
            <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.2em] text-[#C8A45C]">
              Compliance · Advisory
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-[13px] font-medium text-[#0F1B3C] transition-colors hover:text-[#C8A45C]"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C8A45C] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/free-validation"
            className="inline-flex cursor-pointer items-center gap-3 border border-[#0F1B3C] bg-[#0F1B3C] px-6 py-3 text-[12px] font-medium uppercase tracking-[0.15em] text-[#FBF8F0] transition-all hover:bg-[#C8A45C] hover:text-[#0F1B3C]"
          >
            Consult now
            <span>→</span>
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="cursor-pointer border border-[#0F1B3C] p-2 text-[#0F1B3C] lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#C8A45C]/40 bg-[#FBF8F0] lg:hidden"
          >
            <div className="space-y-3 px-6 py-6">
              {NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 font-playfair text-lg text-[#0F1B3C]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
