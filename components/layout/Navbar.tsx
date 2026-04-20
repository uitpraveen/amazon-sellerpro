"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Shield } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // On homepage, navbar floats over dark hero until scrolled
  const isHomepage = pathname === "/";
  const transparentMode = isHomepage && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-xl shadow-[0_1px_20px_rgba(45,42,38,0.08)]"
            : "bg-transparent"
        }`}
      >
        {/* Gold accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="h-[2px] w-full bg-gradient-to-r from-[#B8860B]/0 via-[#B8860B] to-[#B8860B]/0 origin-center"
        />

        {/* Desktop */}
        <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto px-6 xl:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 py-5 group">
            <div
              className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 ${
                transparentMode
                  ? "bg-[#B8860B] shadow-lg shadow-[#B8860B]/30"
                  : "bg-[#1B4332] shadow-md"
              }`}
            >
              <Shield
                size={18}
                className={transparentMode ? "text-white" : "text-[#B8860B]"}
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-[15px] font-semibold tracking-wide transition-colors duration-300 ${
                  transparentMode ? "text-white" : "text-[#2D2A26]"
                }`}
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Amazon Safety Pro
              </span>
              <span
                className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
                  transparentMode ? "text-[#B8860B]" : "text-[#B8860B]"
                }`}
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Compliance Experts
              </span>
            </div>
          </Link>

          {/* Center Nav */}
          <nav className="flex items-center">
            <div
              className={`flex items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-300 ${
                transparentMode
                  ? "bg-white/10 backdrop-blur-md border border-white/15"
                  : "bg-[#2D2A26]/[0.04]"
              }`}
            >
              {NAV_LINKS.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-[11px] uppercase tracking-[0.15em] rounded-full transition-all duration-200 ${
                      active
                        ? transparentMode
                          ? "text-[#1B4332] bg-[#B8860B] shadow-sm font-semibold"
                          : "text-[#1B4332] bg-white shadow-sm font-semibold"
                        : transparentMode
                        ? "text-white/80 hover:text-white hover:bg-white/15"
                        : "text-[#6B6560] hover:text-[#2D2A26] hover:bg-white/50"
                    }`}
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* CTA */}
          <Link
            href="/free-validation"
            className={`group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
              transparentMode
                ? "bg-[#B8860B] text-white hover:bg-[#a07609] hover:shadow-[#B8860B]/40"
                : "bg-[#1B4332] text-white hover:bg-[#0f2b21] hover:shadow-[#1B4332]/20"
            }`}
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Free Review
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center justify-between px-5 py-3.5">
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-300 ${
                transparentMode ? "bg-[#B8860B]" : "bg-[#1B4332]"
              }`}
            >
              <Shield
                size={16}
                className={transparentMode ? "text-white" : "text-[#B8860B]"}
              />
            </div>
            <span
              className={`text-[15px] font-semibold tracking-wide transition-colors duration-300 ${
                transparentMode ? "text-white" : "text-[#2D2A26]"
              }`}
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Amazon Safety Pro
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              transparentMode
                ? "bg-white/10 backdrop-blur-md border border-white/15 text-white hover:bg-white/20"
                : "bg-[#2D2A26]/[0.04] text-[#2D2A26] hover:bg-[#2D2A26]/[0.08]"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#FAF7F2] flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-3.5">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1B4332]">
                  <Shield size={16} className="text-[#B8860B]" />
                </div>
                <span
                  className="text-[15px] font-semibold text-[#2D2A26]"
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                >
                  Amazon Safety Pro
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2D2A26]/[0.04] text-[#2D2A26]"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col items-center justify-center gap-2 px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-2xl text-[#2D2A26] hover:text-[#B8860B] transition-colors text-center"
                    style={{ fontFamily: "var(--font-dm-serif)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <Link
                  href="/free-validation"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1B4332] text-white rounded-full text-sm font-semibold"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Free Review <ArrowRight size={16} />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
