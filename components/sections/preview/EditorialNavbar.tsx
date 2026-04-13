"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Home", href: "/preview" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Guide", href: "/safety-guide" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function EditorialNavbar() {
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
          ? "border-b border-[var(--ink)]/15 bg-[var(--paper)]/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-6 px-6 lg:px-14">
        {/* Wordmark */}
        <Link href="/preview" aria-label="Amazon Safety Pro" className="group">
          <span className="font-display text-[22px] font-[600] italic tracking-[-0.01em] text-[var(--ink)] transition-colors group-hover:text-[var(--signal-deep)]">
            Amazon Safety Pro
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 lg:flex">
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-[13px] font-medium tracking-wide text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--signal)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            href="/free-validation"
            className="group inline-flex cursor-pointer items-center gap-3 bg-[var(--ink)] px-6 py-3 text-[13px] font-medium text-[var(--paper)] transition-all duration-300 hover:bg-[var(--signal-deep)]"
          >
            Free review
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="cursor-pointer border border-[var(--ink)] p-2 transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)] lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[var(--ink)]/15 bg-[var(--paper)] lg:hidden"
          >
            <div className="space-y-3 px-6 py-6">
              {NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-base font-medium text-[var(--ink)]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/free-validation"
                  className="inline-flex cursor-pointer items-center gap-3 bg-[var(--ink)] px-6 py-3 text-[13px] font-medium text-[var(--paper)]"
                >
                  Free review →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
