"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import TacticalButton from "@/components/ui/TacticalButton";
import StatusPill from "@/components/ui/StatusPill";

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

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--rule)] bg-[var(--paper)]/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Amazon Safety Pro"
          className="group flex shrink-0 items-baseline gap-2.5"
        >
          <span className="font-mono text-[13px] uppercase tracking-widest text-[var(--signal)]">
            //
          </span>
          <span className="font-sans text-[17px] font-bold tracking-tight text-[var(--ink)]">
            AMAZON SAFETY PRO
          </span>
          <span className="hidden 2xl:inline">
            <StatusPill tone="ok">ACTIVE</StatusPill>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative px-2.5 py-2 font-mono text-[12px] uppercase tracking-[0.12em] transition-colors ${
                  active
                    ? "text-[var(--signal)]"
                    : "text-[var(--ink-2)] hover:text-[var(--signal)]"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute bottom-1 left-2.5 right-2.5 h-px bg-[var(--signal)]"
                    transition={{ duration: 0.25 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 xl:block">
          <TacticalButton href="/free-validation">Free Review</TacticalButton>
        </div>

        {/* Mobile / Tablet hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="cursor-pointer border border-[var(--ink)] p-2 transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)] xl:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile / Tablet menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[var(--rule)] bg-[var(--paper)] xl:hidden"
          >
            <div className="space-y-1 px-6 py-6">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 font-mono text-xs uppercase tracking-[0.15em] ${
                      active ? "text-[var(--signal)]" : "text-[var(--ink-2)]"
                    }`}
                  >
                    <span className="mr-2 text-[var(--signal)]">→</span>
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-6">
                <TacticalButton href="/free-validation">
                  Free Review
                </TacticalButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
