# Unified Homepage & Theme Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new unified homepage combining V3/V5/V8/minimisetax.com elements, and migrate the entire site's color theme from the current blue-signal tactical palette to the V8 warm cream/gold/green palette.

**Architecture:** The global CSS variables are the single source of truth for the theme. We update `:root` variables in `globals.css` to the V8 palette, then build new homepage section components in `components/sections/home/`. The shared Navbar and Footer get rewritten to match the V8 design. Existing sub-pages (about, services, pricing, contact, safety-guide, free-validation, privacy-policy, terms) use CSS variables so they automatically inherit most color changes, but each needs a pass to replace any hardcoded colors and swap out tactical UI components (MonoLabel, StatusPill, etc.) for the warm theme equivalents.

**Tech Stack:** Next.js 15, React, Tailwind CSS v4, Framer Motion, Lucide React icons, DM Serif Display + Outfit fonts (already loaded in layout.tsx)

---

## File Structure

### New files to create:
```
components/sections/home/HeroSlider.tsx       — multi-slide carousel with auto-rotate
components/sections/home/SoundFamiliar.tsx     — rejection messages section
components/sections/home/ServiceCards.tsx      — 6 service navigation cards
components/sections/home/RestrictedSlider.tsx  — horizontal category carousel
components/sections/home/ProcessFlow.tsx       — vertical timeline (V5 style)
components/sections/home/WhyUs.tsx            — 2x2 numbered grid
components/sections/home/HomeCTA.tsx          — CTA with bg image
```

### Files to modify:
```
app/globals.css                               — update CSS variables to V8 palette
components/layout/Navbar.tsx                  — rewrite to V8 warm style
components/layout/Footer.tsx                  — rewrite to V8 dark brown style
app/page.tsx                                  — replace with new homepage sections
app/about/page.tsx                            — theme migration
app/services/page.tsx                         — theme migration
app/pricing/page.tsx                          — theme migration
app/contact/page.tsx                          — theme migration
app/safety-guide/page.tsx                     — theme migration
app/free-validation/page.tsx                  — theme migration
app/privacy-policy/page.tsx                   — theme migration
app/terms/page.tsx                            — theme migration
components/sections/AboutDossierSection.tsx    — theme migration
components/sections/ContactSplitSection.tsx    — theme migration
components/sections/ServicesGridSection.tsx    — theme migration
components/sections/SafetyGuideTOC.tsx        — theme migration
components/sections/LegalDocumentLayout.tsx    — theme migration
components/ui/MonoLabel.tsx                   — update signal color to gold
components/ui/StatusPill.tsx                  — update signal color to gold/green
components/ui/TacticalButton.tsx              — update to gold/green theme
components/ui/FramedBlock.tsx                 — update border colors
components/ui/HairlineDivider.tsx             — update rule color
components/ui/TransmissionRow.tsx             — update colors
components/ui/RevealOnScroll.tsx              — update accent color if used
```

---

### Task 1: Update Global CSS Variables to V8 Palette

**Files:**
- Modify: `app/globals.css:1-48`

This is the foundation — updating the CSS custom properties swaps the theme site-wide for everything using `var(--xxx)`.

- [ ] **Step 1: Update the `:root` CSS variables**

Replace the color variables in `app/globals.css` lines 3-21 with:

```css
:root {
  --paper: #FAF7F2;
  --paper-edge: #2D2A26;
  --paper-warm: #FAF7F2;
  --paper-cool: #FAF7F2;
  --paper-sage: #FAF7F2;
  --ink: #2D2A26;
  --ink-2: #6B6560;
  --ink-3: #8A8580;
  --rule: #E8E0D4;
  --signal: #B8860B;
  --signal-soft: #F5EED9;
  --signal-deep: #96700A;
  --alert: #9B1C1C;
  --alert-soft: #FEE2E2;
  --ok: #1B4332;
  --ok-soft: #E8F0EC;
  --gold: #B8860B;

  --font-sans: var(--font-outfit), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, "SFMono-Regular", monospace;
  --font-display: var(--font-dm-serif), Georgia, serif;
}
```

Key changes:
- `--paper` family → all `#FAF7F2` (warm cream)
- `--paper-edge` → `#2D2A26` (dark brown, for footer)
- `--ink` → `#2D2A26` (dark brown text)
- `--ink-2` → `#6B6560` (muted body text)
- `--rule` → `#E8E0D4` (warm border)
- `--signal` → `#B8860B` (gold accent replaces blue)
- `--ok` → `#1B4332` (dark green)
- `--font-sans` → Outfit (was Geist)
- `--font-display` → DM Serif Display (was Fraunces)

- [ ] **Step 2: Update selection and scrollbar styles**

The `::selection` and scrollbar styles in `globals.css` use `var(--signal)` and `var(--paper)` — these will automatically pick up the new gold/cream values. No changes needed there.

- [ ] **Step 3: Update the `.signal-link` class**

No changes needed — it already uses `var(--signal)` which is now gold.

- [ ] **Step 4: Verify the dev server still compiles**

Run: `cd /Users/praveen/Documents/deepak/amazon-seller && npm run dev`
Expected: No CSS errors, site loads with new warm colors.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "theme: migrate CSS variables to V8 warm cream/gold/green palette"
```

---

### Task 2: Rewrite Shared Navbar

**Files:**
- Modify: `components/layout/Navbar.tsx`

Replace the current tactical-style navbar with the V8 warm design: gold accent line, centered logo with diamond, uppercase nav links in Outfit, DM Serif logo.

- [ ] **Step 1: Rewrite Navbar.tsx**

```tsx
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
      <div className="hidden md:block">
        <div className="flex items-center justify-center py-5">
          <Link
            href="/"
            className="flex items-center gap-2"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            <span className="text-2xl tracking-wide text-[#2D2A26]">AMAZON</span>
            <span className="text-[#B8860B] text-lg">&#9670;</span>
            <span className="text-2xl tracking-wide text-[#2D2A26]">SAFETY PRO</span>
          </Link>
        </div>
        <nav className="flex items-center justify-center gap-8 pb-4 border-b border-[#E8E0D4]">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-[0.2em] transition-colors ${
                  active
                    ? "text-[#B8860B]"
                    : "text-[#6B6560] hover:text-[#B8860B]"
                }`}
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {link.label}
              </Link>
            );
          })}
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
```

- [ ] **Step 2: Verify navbar renders on all pages**

Run: `open http://localhost:3000` and navigate to Home, About, Services, Pricing, Contact.
Expected: Gold accent line, centered logo, warm styling on all pages.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: rewrite navbar to V8 warm cream/gold style"
```

---

### Task 3: Rewrite Shared Footer

**Files:**
- Modify: `components/layout/Footer.tsx`

Replace the tactical footer with V8-style dark brown footer with gold accent labels and jurisdiction badges.

- [ ] **Step 1: Rewrite Footer.tsx**

```tsx
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const FOOTER_NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Safety Guide", href: "/safety-guide" },
  { label: "Pricing", href: "/pricing" },
  { label: "Free Review", href: "/free-validation" },
  { label: "Contact", href: "/contact" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const JURISDICTIONS = ["US", "CA", "EU", "UK", "IN", "SG", "AU"];

export default function Footer() {
  return (
    <footer className="bg-[#2D2A26] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-14">
          {/* Brand */}
          <div>
            <h4
              className="text-xl text-[#FAF7F2] mb-3"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Amazon Safety Pro
            </h4>
            <p
              className="text-sm text-[#FAF7F2]/50 leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Compliance handled by people who built the rules.
            </p>
            <div className="flex flex-wrap gap-2">
              {JURISDICTIONS.map((j) => (
                <span
                  key={j}
                  className="text-xs px-2.5 py-1 border border-[#B8860B]/30 text-[#B8860B] rounded"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {j}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h5
              className="text-sm uppercase tracking-wider text-[#B8860B] mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Navigation
            </h5>
            <ul className="space-y-2.5">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#FAF7F2]/50 hover:text-[#B8860B] transition-colors"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h5
              className="text-sm uppercase tracking-wider text-[#B8860B] mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Legal & Contact
            </h5>
            <ul className="space-y-2.5">
              {LEGAL.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#FAF7F2]/50 hover:text-[#B8860B] transition-colors"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-sm text-[#FAF7F2]/50 hover:text-[#B8860B] transition-colors"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#FAF7F2]/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-[#FAF7F2]/30"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            &copy; {new Date().getFullYear()} Amazon Safety Pro. All rights reserved.
          </p>
          <p
            className="text-xs text-[#FAF7F2]/30"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Amazon is a trademark of Amazon.com, Inc. We are not affiliated with Amazon.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: rewrite footer to V8 dark brown style with gold accents"
```

---

### Task 4: Build HeroSlider Component

**Files:**
- Create: `components/sections/home/HeroSlider.tsx`

3-slide auto-rotating carousel with dark green overlay on background images, gold accents, stats strip, slide indicators.

- [ ] **Step 1: Create HeroSlider.tsx**

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

const SLIDES = [
  {
    subtitle: "Ex-Amazon Safety Team",
    headline: (
      <>
        Compliance, finally{" "}
        <em className="text-[#B8860B]">in expert hands</em>.
      </>
    ),
    body: "Amazon safety & compliance handled by ex-Amazonians with 5+ years inside the product safety team. From restricted to reinstated.",
    image: "/images/hero/warehouse.jpg",
  },
  {
    subtitle: "ASIN Reinstatement Experts",
    headline: (
      <>
        From Restricted to{" "}
        <em className="text-[#B8860B]">Reinstated</em>.
      </>
    ),
    body: "We've handled hundreds of compliance cases across 7 Amazon marketplaces. Your suspended listing is our priority.",
    image: "/images/hero/shipping.jpg",
  },
  {
    subtitle: "Built by Insiders",
    headline: (
      <>
        We Built the Rules. Now We Help You{" "}
        <em className="text-[#B8860B]">Follow Them</em>.
      </>
    ),
    body: "Our team spent half a decade writing and enforcing Amazon's product safety policies. Now that expertise works for you.",
    image: "/images/hero/amazon-boxes.jpg",
  },
];

const STATS = [
  { value: "5+", label: "Years Inside Amazon" },
  { value: "7", label: "Marketplaces" },
  { value: "<24h", label: "Response Time" },
  { value: "Free", label: "First Review" },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background images */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[current].image}
            alt=""
            fill
            className="object-cover"
            priority={current === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(27,67,50,0.85)] via-[rgba(27,67,50,0.75)] to-[rgba(27,67,50,0.95)]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center pt-24 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-[#B8860B] text-xs tracking-[0.25em] uppercase mb-6"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {SLIDES[current].subtitle}
            </p>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-[#FAF7F2] mb-6"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              {SLIDES[current].headline}
            </h1>

            <p
              className="max-w-2xl mx-auto text-lg sm:text-xl text-[#FAF7F2]/65 mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {SLIDES[current].body}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          <Link
            href="/free-validation"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#B8860B] text-white rounded-full text-sm font-semibold hover:bg-[#a07609] transition-colors"
          >
            Submit for Free Review <ArrowRight size={16} />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#FAF7F2]/30 text-[#FAF7F2] rounded-full text-sm font-medium hover:border-[#FAF7F2]/60 transition-colors"
          >
            View Services
          </Link>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-0 mb-10"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="text-center px-5 sm:px-8">
                <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-[10px] text-[#FAF7F2]/40 mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
              {i < STATS.length - 1 && (
                <div className="hidden sm:block w-px h-10 bg-[#FAF7F2]/15" />
              )}
            </div>
          ))}
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2 justify-center">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-6 h-[3px] rounded-full transition-colors ${
                i === current ? "bg-[#B8860B]" : "bg-[#FAF7F2]/25"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-[#FAF7F2]/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/home/HeroSlider.tsx
git commit -m "feat: add HeroSlider component with 3-slide auto-rotating carousel"
```

---

### Task 5: Build SoundFamiliar Component

**Files:**
- Create: `components/sections/home/SoundFamiliar.tsx`

- [ ] **Step 1: Create SoundFamiliar.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const MESSAGES = [
  "Your appeal has been rejected. Please review our policies and resubmit.",
  "We are unable to accept the documents provided. Please submit the correct documentation.",
  "Your product does not meet our safety requirements. Your listing has been removed.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function SoundFamiliar() {
  return (
    <section className="bg-[#FAF7F2] py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl text-center text-[#2D2A26] mb-14"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          Sound familiar?
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-5"
        >
          {MESSAGES.map((msg, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-start gap-3 bg-white border-l-[3px] border-[#9B1C1C] rounded-r-lg px-6 sm:px-8 py-5"
            >
              <AlertTriangle size={18} className="text-[#9B1C1C] mt-0.5 shrink-0" />
              <p
                className="text-[#2D2A26] text-base sm:text-lg leading-relaxed italic"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                &ldquo;{msg}&rdquo;
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-12 text-center text-[#6B6560] max-w-2xl mx-auto leading-relaxed text-lg"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          If you have been going back and forth with Amazon — submitting documents,
          receiving the same rejection, resubmitting, and getting nowhere — you are
          not alone.
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/home/SoundFamiliar.tsx
git commit -m "feat: add SoundFamiliar section component"
```

---

### Task 6: Build ServiceCards Component

**Files:**
- Create: `components/sections/home/ServiceCards.tsx`

- [ ] **Step 1: Create ServiceCards.tsx**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const SERVICES = [
  {
    icon: "📋",
    title: "CPC Creation",
    desc: "Children's Product Certificates for CPSC compliance",
    href: "/services#cpc",
  },
  {
    icon: "🛡️",
    title: "GCC Creation",
    desc: "General Certificates of Conformity for regulated products",
    href: "/services#gcc",
  },
  {
    icon: "✅",
    title: "Doc Validation",
    desc: "Pre-submission review to catch issues before Amazon does",
    href: "/services#validation",
  },
  {
    icon: "🔄",
    title: "ASIN Reinstatement",
    desc: "Full reinstatement support for suspended listings",
    href: "/services#reinstatement",
  },
  {
    icon: "📄",
    title: "DOC Creation",
    desc: "Declaration of Conformity for all product categories",
    href: "/services#doc",
  },
  {
    icon: "🔍",
    title: "Safety Audit",
    desc: "End-to-end safety documentation assessment",
    href: "/services#audit",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ServiceCards() {
  return (
    <section className="bg-[#FAF7F2] py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-[#B8860B] text-xs tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            What We Do
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A26]"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            Our Services
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map((svc) => (
            <motion.div key={svc.title} variants={fadeUp}>
              <Link
                href={svc.href}
                className="block bg-white border border-[#E8E0D4] rounded-2xl p-7 hover:-translate-y-1 transition-transform duration-300 h-full"
              >
                <span className="text-3xl block mb-4" role="img" aria-hidden>
                  {svc.icon}
                </span>
                <h3
                  className="text-lg text-[#2D2A26] mb-2"
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                >
                  {svc.title}
                </h3>
                <p
                  className="text-sm text-[#6B6560] leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {svc.desc}
                </p>
                <span
                  className="text-sm text-[#B8860B] font-medium"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Learn more &rarr;
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/home/ServiceCards.tsx
git commit -m "feat: add ServiceCards navigation grid component"
```

---

### Task 7: Build RestrictedSlider Component

**Files:**
- Create: `components/sections/home/RestrictedSlider.tsx`

- [ ] **Step 1: Create RestrictedSlider.tsx**

```tsx
"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = [
  { icon: "🧸", name: "Children's Toys", note: "CPSIA, ASTM F963, CPC required" },
  { icon: "🔌", name: "Electronics", note: "FCC, UL certification, GCC required" },
  { icon: "🧴", name: "Cosmetics", note: "FDA compliance, ingredient listing" },
  { icon: "🍼", name: "Baby Products", note: "CPSIA, phthalates testing, CPC" },
  { icon: "🍳", name: "Kitchen Appliances", note: "UL/ETL listing, GCC required" },
  { icon: "👕", name: "Clothing & Textiles", note: "Flammability, CPSIA (children's)" },
  { icon: "💊", name: "Supplements", note: "FDA, cGMP, labeling requirements" },
  { icon: "🔋", name: "Batteries & Chargers", note: "UN38.3, UL certification" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function RestrictedSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 200;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#1B4332] py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <p
            className="text-[#B8860B] text-xs tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Know Your Products
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2]"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            Commonly Restricted Categories
          </h2>
        </motion.div>

        {/* Navigation arrows */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-[#FAF7F2]/20 flex items-center justify-center text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/40 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border border-[#FAF7F2]/20 flex items-center justify-center text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/40 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="min-w-[180px] sm:min-w-[200px] bg-[#FAF7F2]/[0.08] border border-[#FAF7F2]/10 rounded-2xl p-6 text-center snap-start flex-shrink-0"
            >
              <span className="text-4xl block mb-4" role="img" aria-hidden>
                {cat.icon}
              </span>
              <h3
                className="text-sm font-semibold text-[#FAF7F2] mb-2"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                {cat.name}
              </h3>
              <p
                className="text-xs text-[#FAF7F2]/50 leading-relaxed"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {cat.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/home/RestrictedSlider.tsx
git commit -m "feat: add RestrictedSlider horizontal carousel component"
```

---

### Task 8: Build ProcessFlow Component

**Files:**
- Create: `components/sections/home/ProcessFlow.tsx`

- [ ] **Step 1: Create ProcessFlow.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { Search, FileCheck, BookOpen, Eye, MessageSquare, Lock } from "lucide-react";

const STEPS = [
  { num: "01", title: "Understand your product", desc: "We start by learning exactly what you sell, how it is classified, and which regulations apply.", icon: Search },
  { num: "02", title: "Review the compliance notification", desc: "We dissect every line of Amazon's notice to understand what they are actually asking for.", icon: FileCheck },
  { num: "03", title: "Check Amazon's policies", desc: "We cross-reference current internal Amazon policies to ensure nothing has changed since your last submission.", icon: BookOpen },
  { num: "04", title: "Decode existing compliance cases", desc: "We review your past submissions and responses to identify patterns and gaps.", icon: Eye },
  { num: "05", title: "Handle all Amazon communication", desc: "We draft and manage every message to Seller Support on your behalf.", icon: MessageSquare },
  { num: "06", title: "Close documentation gaps", desc: "We prepare or correct every document needed to get your listing reinstated.", icon: Lock },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function ProcessFlow() {
  return (
    <section className="bg-[#FAF7F2] py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-[#B8860B] text-xs tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            How We Work
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A26]"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            Our Process
          </motion.h2>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative">
          <div className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-px bg-[#E8E0D4] sm:-translate-x-px" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-12 sm:space-y-16"
          >
            {STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              const Icon = step.icon;
              return (
                <motion.div key={step.num} variants={fadeUp} className="relative">
                  {/* Dot */}
                  <div className="absolute left-5 sm:left-1/2 w-3 h-3 rounded-full bg-[#B8860B] -translate-x-1/2 top-1.5 z-10 ring-4 ring-[#FAF7F2]" />

                  <div className="sm:grid sm:grid-cols-2 sm:gap-12">
                    <div
                      className={`pl-12 sm:pl-0 ${
                        isLeft ? "sm:text-right sm:pr-12" : "sm:col-start-2 sm:pl-12"
                      }`}
                    >
                      <span
                        className="text-[#B8860B]/60 text-sm font-medium tracking-wider"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        Step {step.num}
                      </span>
                      <h3
                        className="text-xl sm:text-2xl text-[#2D2A26] mt-1 mb-2"
                        style={{ fontFamily: "var(--font-dm-serif)" }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-[#6B6560] leading-relaxed"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        {step.desc}
                      </p>
                    </div>

                    {isLeft ? (
                      <div className="hidden sm:block" />
                    ) : (
                      <div className="hidden sm:block sm:col-start-1 sm:row-start-1" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/home/ProcessFlow.tsx
git commit -m "feat: add ProcessFlow vertical timeline component"
```

---

### Task 9: Build WhyUs Component

**Files:**
- Create: `components/sections/home/WhyUs.tsx`

- [ ] **Step 1: Create WhyUs.tsx**

```tsx
"use client";

import { motion } from "framer-motion";

const REASONS = [
  { num: "01", title: "Insider Reviews", desc: "We know what Amazon's team looks for because we used to be on that team." },
  { num: "02", title: "Gap Detection", desc: "We spot the missing requirement others miss — the one detail that keeps triggering rejections." },
  { num: "03", title: "Decode Language", desc: "We decode Amazon's technical language into clear, actionable steps." },
  { num: "04", title: "Reinstatement Path", desc: "We know how to move a case forward — not just respond, but resolve." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function WhyUs() {
  return (
    <section className="bg-[#FAF7F2] py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A26] mb-16"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          Why Amazon Safety Pro?
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid sm:grid-cols-2 gap-x-16 gap-y-12"
        >
          {REASONS.map((r) => (
            <motion.div key={r.num} variants={fadeUp} className="group">
              <span
                className="text-6xl sm:text-7xl font-light text-[#1B4332]/[0.06] group-hover:text-[#B8860B]/20 transition-colors duration-500 block leading-none"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                {r.num}
              </span>
              <h3
                className="text-xl sm:text-2xl text-[#2D2A26] mt-2 mb-2"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                {r.title}
              </h3>
              <p
                className="text-[#6B6560] leading-relaxed"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {r.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/home/WhyUs.tsx
git commit -m "feat: add WhyUs 2x2 numbered grid component"
```

---

### Task 10: Build HomeCTA Component

**Files:**
- Create: `components/sections/home/HomeCTA.tsx`

- [ ] **Step 1: Create HomeCTA.tsx**

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HomeCTA() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/shield-protect.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(27,67,50,0.88)] to-[rgba(27,67,50,0.95)]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2]"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            Tired of rejections? Start here.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-[#FAF7F2]/60 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Submit your compliance documents for a free review. A real
            ex-Amazonian will review your case personally.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <Link
              href="/free-validation"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#B8860B] hover:bg-[#a07609] text-white font-semibold transition-colors"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Submit your documents <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/home/HomeCTA.tsx
git commit -m "feat: add HomeCTA section with green overlay background"
```

---

### Task 11: Wire Up New Homepage

**Files:**
- Modify: `app/page.tsx`

Replace the current homepage with the new section components.

- [ ] **Step 1: Rewrite app/page.tsx**

```tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/sections/home/HeroSlider";
import SoundFamiliar from "@/components/sections/home/SoundFamiliar";
import ServiceCards from "@/components/sections/home/ServiceCards";
import RestrictedSlider from "@/components/sections/home/RestrictedSlider";
import ProcessFlow from "@/components/sections/home/ProcessFlow";
import WhyUs from "@/components/sections/home/WhyUs";
import HomeCTA from "@/components/sections/home/HomeCTA";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <main>
        <HeroSlider />
        <SoundFamiliar />
        <ServiceCards />
        <RestrictedSlider />
        <ProcessFlow />
        <WhyUs />
        <HomeCTA />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Verify homepage loads and all sections render**

Run: `open http://localhost:3000`
Expected: All 7 sections visible, hero auto-rotates, restricted slider scrolls, animations trigger on scroll.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire up new unified homepage with all sections"
```

---

### Task 12: Migrate UI Utility Components to V8 Theme

**Files:**
- Modify: `components/ui/MonoLabel.tsx`
- Modify: `components/ui/StatusPill.tsx`
- Modify: `components/ui/TacticalButton.tsx`
- Modify: `components/ui/FramedBlock.tsx`
- Modify: `components/ui/HairlineDivider.tsx`
- Modify: `components/ui/TransmissionRow.tsx`

These components are used across sub-pages (services, pricing, safety-guide, free-validation). They reference `var(--signal)` and other CSS vars which are now gold. Since the CSS variables are updated in Task 1, most styling updates automatically. However, any hardcoded blue colors or tactical styling (monospace, uppercase tracking) need to be softened to match the warm theme.

- [ ] **Step 1: Read each UI component and update hardcoded colors**

For each component, check for:
- Any hardcoded blue hex (`#1F40FF`, `#0824A8`, `#E5EAFF`)
- Replace with `var(--signal)` if not already using it, or with direct gold `#B8860B`
- Change monospace fonts to Outfit where it improves readability
- These are small focused edits — the CSS variable changes handle most of it

- [ ] **Step 2: Verify sub-pages render correctly**

Run: Visit `/services`, `/pricing`, `/safety-guide`, `/free-validation`, `/about`, `/contact`, `/privacy-policy`, `/terms`
Expected: Gold accents instead of blue, warm cream backgrounds, no visual artifacts.

- [ ] **Step 3: Commit**

```bash
git add components/ui/
git commit -m "theme: migrate UI utility components to V8 warm palette"
```

---

### Task 13: Migrate About Page

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `components/sections/AboutDossierSection.tsx`

- [ ] **Step 1: Read AboutDossierSection.tsx and update hardcoded colors**

Replace any hardcoded colors (blue accents, cool backgrounds) with V8 palette values. The page uses shared Navbar/Footer which are already updated.

- [ ] **Step 2: Verify about page**

Run: `open http://localhost:3000/about`
Expected: Warm cream background, gold accents, DM Serif headings.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx components/sections/AboutDossierSection.tsx
git commit -m "theme: migrate about page to V8 warm palette"
```

---

### Task 14: Migrate Services Page

**Files:**
- Modify: `app/services/page.tsx`
- Modify: `components/sections/ServicesGridSection.tsx`

- [ ] **Step 1: Update services page hardcoded colors and tactical elements**

Replace `bg-[var(--paper-warm)]`, `bg-[var(--paper-cool)]` with `bg-[#FAF7F2]` (they now resolve to the same value via CSS vars, but verify). Update any tactical UI language (monospace labels like "~/ services") to match the warm editorial tone.

- [ ] **Step 2: Verify services page**

Run: `open http://localhost:3000/services`
Expected: Warm theme, gold accents, service cards match new palette.

- [ ] **Step 3: Commit**

```bash
git add app/services/page.tsx components/sections/ServicesGridSection.tsx
git commit -m "theme: migrate services page to V8 warm palette"
```

---

### Task 15: Migrate Pricing Page

**Files:**
- Modify: `app/pricing/page.tsx`

- [ ] **Step 1: Update pricing page hardcoded colors**

Replace `bg-[var(--paper-cool)]` background references and any hardcoded tactical styling. The CSS variables handle most of it.

- [ ] **Step 2: Verify pricing page**

Run: `open http://localhost:3000/pricing`
Expected: Warm cream background, gold accents.

- [ ] **Step 3: Commit**

```bash
git add app/pricing/page.tsx
git commit -m "theme: migrate pricing page to V8 warm palette"
```

---

### Task 16: Migrate Contact Page

**Files:**
- Modify: `app/contact/page.tsx`
- Modify: `components/sections/ContactSplitSection.tsx`

- [ ] **Step 1: Update contact page and ContactSplitSection hardcoded colors**

- [ ] **Step 2: Verify contact page**

Run: `open http://localhost:3000/contact`
Expected: Warm theme, form inputs with gold focus rings.

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx components/sections/ContactSplitSection.tsx
git commit -m "theme: migrate contact page to V8 warm palette"
```

---

### Task 17: Migrate Safety Guide Page

**Files:**
- Modify: `app/safety-guide/page.tsx`
- Modify: `components/sections/SafetyGuideTOC.tsx`

- [ ] **Step 1: Update safety guide hardcoded colors**

Replace any `--paper-sage` specific overrides or blue accent references.

- [ ] **Step 2: Verify safety guide page**

Run: `open http://localhost:3000/safety-guide`
Expected: Warm cream background, gold TOC accents.

- [ ] **Step 3: Commit**

```bash
git add app/safety-guide/page.tsx components/sections/SafetyGuideTOC.tsx
git commit -m "theme: migrate safety guide page to V8 warm palette"
```

---

### Task 18: Migrate Free Validation Page

**Files:**
- Modify: `app/free-validation/page.tsx`

- [ ] **Step 1: Update free-validation page hardcoded colors**

Update form styling: focus rings to gold, buttons to `#1B4332` or `#B8860B`, progress indicators.

- [ ] **Step 2: Verify free validation page**

Run: `open http://localhost:3000/free-validation`
Expected: Warm theme, gold/green form elements.

- [ ] **Step 3: Commit**

```bash
git add app/free-validation/page.tsx
git commit -m "theme: migrate free validation page to V8 warm palette"
```

---

### Task 19: Migrate Legal Pages (Privacy Policy + Terms)

**Files:**
- Modify: `app/privacy-policy/page.tsx`
- Modify: `app/terms/page.tsx`
- Modify: `components/sections/LegalDocumentLayout.tsx`

- [ ] **Step 1: Update LegalDocumentLayout hardcoded colors**

This is the shared layout for both legal pages. Update heading accents, link colors, section number styling.

- [ ] **Step 2: Verify both legal pages**

Run: Visit `/privacy-policy` and `/terms`
Expected: Warm cream backgrounds, gold section numbers.

- [ ] **Step 3: Commit**

```bash
git add app/privacy-policy/page.tsx app/terms/page.tsx components/sections/LegalDocumentLayout.tsx
git commit -m "theme: migrate legal pages to V8 warm palette"
```

---

### Task 20: Final Visual QA Pass

**Files:** None (verification only)

- [ ] **Step 1: Start dev server and check every page**

Run through each page in order:
1. `/` — homepage: hero slider rotates, all sections animate, restricted slider scrolls
2. `/about` — warm theme, no blue remnants
3. `/services` — service cards, gold accents
4. `/pricing` — warm background, gold CTAs
5. `/contact` — form renders, warm theme
6. `/safety-guide` — TOC works, warm theme
7. `/free-validation` — upload form works, warm theme
8. `/privacy-policy` — legal text readable, warm theme
9. `/terms` — same as privacy policy

- [ ] **Step 2: Check mobile responsiveness**

Test each page at 375px width (iPhone SE):
- Navbar hamburger menu works
- Hero slider readable
- Service cards stack to 1 column
- Restricted slider swipeable
- Timeline left-aligned

- [ ] **Step 3: Fix any visual issues found**

Address any remaining blue colors, broken layouts, or missing animations.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final visual QA fixes for V8 warm theme migration"
```
