"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Work", href: "/v1" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Guide", href: "/safety-guide" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function V1Navbar() {
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
      className={`fixed left-0 right-0 top-0 z-30 transition-all duration-200 ${
        scrolled
          ? "border-b-2 border-[#0F0F0F] bg-[#F4F0E8]"
          : "border-b-2 border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 lg:px-10">
        <Link href="/v1" className="group">
          <span className="font-bricolage text-[20px] font-[800] uppercase tracking-[-0.02em] leading-none text-[#0F0F0F]">
            Safety Pro
            <span className="ml-1 inline-block h-2 w-2 bg-[#FF4500]" />
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-bricolage text-[13px] font-[600] uppercase tracking-wide text-[#0F0F0F] transition-colors hover:text-[#FF4500]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/free-validation"
            className="group relative inline-flex cursor-pointer items-center gap-2 border-2 border-[#0F0F0F] bg-[#FF4500] px-5 py-2.5 font-bricolage text-[13px] font-[700] uppercase tracking-wide text-[#0F0F0F] transition-all hover:bg-[#0F0F0F] hover:text-[#FF4500]"
            style={{ boxShadow: "4px 4px 0 0 #0F0F0F" }}
          >
            Free Review →
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="cursor-pointer border-2 border-[#0F0F0F] bg-[#FF4500] p-2 lg:hidden"
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
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t-2 border-[#0F0F0F] bg-[#F4F0E8] lg:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 font-bricolage text-sm font-[700] uppercase tracking-wide text-[#0F0F0F]"
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
