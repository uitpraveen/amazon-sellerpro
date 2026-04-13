"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Home", href: "/v3" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Guide", href: "/safety-guide" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function V3Navbar() {
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
          ? "border-b border-[#1F3D2E]/15 bg-[#F5EDDB]/95 backdrop-blur-md"
          : ""
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12">
        <Link href="/v3" className="group flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#1F3D2E]">
            <span className="font-lora text-lg font-[600] italic text-[#F5EDDB]">
              A
            </span>
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#D97757]" />
          </span>
          <span className="font-lora text-[19px] font-[600] tracking-tight text-[#1F3D2E]">
            Amazon Safety Pro
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-[#1F3D2E]/20 bg-[#F5EDDB]/60 px-2 py-2 backdrop-blur-sm lg:flex">
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-1.5 text-[13px] font-[500] text-[#1F3D2E] transition-colors hover:bg-[#1F3D2E] hover:text-[#F5EDDB]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/free-validation"
            className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#D97757] px-6 py-3 text-[13px] font-[600] text-[#F5EDDB] shadow-[0_4px_0_0_#1F3D2E] transition-all hover:shadow-[0_2px_0_0_#1F3D2E] hover:translate-y-0.5"
          >
            Free Review
            <span>→</span>
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="cursor-pointer rounded-full border border-[#1F3D2E] bg-[#F5EDDB] p-2 text-[#1F3D2E] lg:hidden"
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
            className="overflow-hidden border-t border-[#1F3D2E]/15 bg-[#F5EDDB] lg:hidden"
          >
            <div className="space-y-2 px-6 py-4">
              {NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 font-lora text-base text-[#1F3D2E]"
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
