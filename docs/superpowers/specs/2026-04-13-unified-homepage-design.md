# Unified Homepage Design — Amazon Safety Pro

**Date:** 2026-04-13
**Approach:** B — V3 Warm + Green Overlay Slider
**Status:** Approved

## Overview

Combine the best elements from V3, V5, and V8 prototypes plus minimisetax.com's hero slider pattern into a single production homepage. The existing V3/V5/V8 route pages remain untouched; this design targets the main `/` route.

## Color Palette (V8 base)

| Token | Hex | Usage |
|-------|-----|-------|
| Cream | `#FAF7F2` | Page background, light text on dark |
| Gold | `#B8860B` | Accents, CTAs, active indicators |
| Dark Green | `#1B4332` | Hero overlay, restricted products bg, CTA bg |
| Dark Brown | `#2D2A26` | Body text, footer bg |
| Muted Text | `#6B6560` | Secondary/body copy |
| Border | `#E8E0D4` | Card/section borders |
| Error Red | `#9B1C1C` | "Sound Familiar" rejection accent |

## Typography

- **Headings:** DM Serif Display (existing `--font-dm-serif`)
- **Body:** Outfit (existing `--font-outfit`)
- Cards use 16px rounded corners (V3 style)

## Page Sections (top to bottom)

### 1. Navbar
- Source: V8
- Sticky, cream background `#FAF7F2`
- Gold accent line (2px) at very top
- Centered logo: "AMAZON ◆ SAFETY PRO" in DM Serif
- Uppercase nav links with wide tracking: Home, About, Services, Safety Guide, Pricing, Contact
- Mobile: hamburger menu with slide-down nav

### 2. Hero Slider (3 slides, auto-rotate every 5s)
- Source: minimisetax.com pattern + V5 full-bleed image + V3 warm copy tone
- Full-viewport-height section
- Each slide: background image with dark green `rgba(27,67,50,0.85)` to `rgba(27,67,50,0.95)` gradient overlay
- Slide content (centered):
  - Small uppercase subtitle in gold
  - Large DM Serif headline in cream
  - Body text in cream/60% opacity
  - Two CTA buttons: primary gold pill ("Submit for Free Review →"), secondary outline pill ("View Services")
- Stats strip below CTAs: "5+ Years Inside | 7 Marketplaces | <24h Response | Free First Review"
- Bottom: slide indicator dots (gold active, cream/25% inactive)
- Slide content:
  - **Slide 1:** "Compliance, finally *in expert hands*." — main value prop
  - **Slide 2:** "From Restricted to *Reinstated*." — reinstatement focus
  - **Slide 3:** "We Built the Rules. Now We Help You *Follow Them*." — credibility
- Background images: use existing `/images/hero/warehouse.jpg`, `/images/hero/shipping.jpg`, `/images/hero/amazon-boxes.jpg` (or placeholders if missing)
- Scroll indicator at bottom (animated arrow)

### 3. Sound Familiar
- Source: V5 style adapted to V8 palette
- Cream background
- Heading: "Sound familiar?" in DM Serif
- 3 rejection message cards:
  - White background, red left border (3px, `#9B1C1C`)
  - Italic quoted text
  - Rounded right corners (8px)
- Optional follow-up paragraph in muted text

### 4. Service Navigation Cards
- Source: V3 card style
- Cream background section
- Section label: "What We Do" (gold uppercase)
- Heading: "Our Services" in DM Serif
- 2-column grid (responsive: 1 col on mobile)
- 6 cards, each:
  - White background, `#E8E0D4` border, 16px border-radius
  - Emoji icon (placeholder)
  - DM Serif title
  - Short description in muted text
  - "Learn more →" link in gold
  - Hover: slight lift (`translateY(-4px)`)
- Services:
  1. CPC Creation — Children's Product Certificates for CPSC compliance
  2. GCC Creation — General Certificates of Conformity for regulated products
  3. Doc Validation — Pre-submission review to catch issues before Amazon does
  4. ASIN Reinstatement — Full reinstatement support for suspended listings
  5. DOC Creation — Declaration of Conformity for all product categories
  6. Safety Audit — End-to-end safety documentation assessment
- Each card links to the corresponding service detail (href placeholder for now)

### 5. Restricted Products Slider
- Source: New (Deepak's request), placeholder content
- Dark green `#1B4332` background section
- Section label: "Know Your Products" (gold uppercase)
- Heading: "Commonly Restricted Categories" in DM Serif, cream text
- Horizontal scrolling carousel (CSS scroll-snap or library)
- Cards: semi-transparent background `rgba(250,247,242,0.08)`, 16px radius, centered
  - Large emoji icon
  - Category name in DM Serif
  - Brief compliance note in muted cream
- Placeholder categories:
  1. Children's Toys — CPSIA, ASTM F963, CPC required
  2. Electronics — FCC, UL certification, GCC required
  3. Cosmetics — FDA compliance, ingredient listing
  4. Baby Products — CPSIA, phthalates testing, CPC
  5. Kitchen Appliances — UL/ETL listing, GCC
  6. Clothing & Textiles — flammability, CPSIA (children's)
  7. Supplements — FDA, cGMP, labeling requirements
  8. Batteries & Chargers — UN38.3, UL certification
- Navigation: left/right arrows + swipe on mobile
- Content is placeholder; Deepak will provide final categories and details later

### 6. Process Flow
- Source: V5 vertical timeline
- Cream background
- Section label: "How We Work" (gold uppercase)
- Heading: "Our Process" in DM Serif
- Vertical timeline with:
  - Thin vertical line in `#E8E0D4`
  - Gold dots (12px) at each step with cream ring
  - Step label ("Step 01") in gold
  - Step title in DM Serif
  - Description in muted text
- Desktop: alternating left/right (V5 pattern)
- Mobile: all left-aligned
- 6 steps (same as existing):
  1. Understand your product
  2. Review the compliance notification
  3. Check Amazon's policies
  4. Decode existing compliance cases
  5. Handle all Amazon communication
  6. Close documentation gaps

### 7. Why Us
- Source: V5 layout with V8 palette
- Cream background
- Heading: "Why Amazon Safety Pro?" in DM Serif, left-aligned
- 2x2 grid on desktop, single column on mobile
- Each item:
  - Large faded number (`rgba(27,67,50,0.06)`) — hover transitions to `rgba(184,134,11,0.2)`
  - Title in DM Serif
  - Description in muted text
- 4 items:
  1. Insider Reviews
  2. Gap Detection
  3. Decode Language
  4. Reinstatement Path

### 8. CTA
- Source: V5 CTA with V8 colors
- Full-width section with background image + dark green overlay
- Centered text: "Tired of rejections? Start here." in DM Serif, cream
- Subtitle in cream/60%
- Gold pill button: "Submit your documents →"

### 9. Footer
- Source: V8
- Dark brown `#2D2A26` background
- 3-column grid: Brand + jurisdictions | Page links | Legal links
- Jurisdiction badges: bordered gold text (US, CA, EU, UK, IN, SG, AU)
- Bottom bar: copyright + Amazon disclaimer
- Gold section labels

## Component Architecture

The homepage will be built as a single page component at `app/page.tsx` (or replace current content), composed of these section components:

```
app/page.tsx                          — page shell, imports all sections
components/sections/home/
  Navbar.tsx                          — sticky navbar (reused from V8 with minor tweaks)
  HeroSlider.tsx                      — multi-slide carousel with auto-rotate
  SoundFamiliar.tsx                   — rejection messages
  ServiceCards.tsx                    — 6 service navigation cards
  RestrictedProductsSlider.tsx        — horizontal category carousel
  ProcessFlow.tsx                     — vertical timeline
  WhyUs.tsx                           — 2x2 numbered grid
  CTA.tsx                             — call-to-action with bg image
  Footer.tsx                          — site footer
```

All components are client components (need framer-motion animations). No new dependencies needed — framer-motion, next/image, next/link, lucide-react are already installed.

## Existing Images

Available in `/public/images/hero/`:
- `warehouse.jpg` — for hero slide 1
- `shipping.jpg` — for hero slide 2
- `amazon-boxes.jpg` — for hero slide 3
- `professional-team.jpg` — available as alternate
- `shield-protect.jpg` — for CTA background

## Responsive Behavior

- **Desktop (md+):** 2-col service grid, alternating timeline, 2x2 why-us grid, centered navbar links
- **Mobile (<md):** 1-col service grid, left-aligned timeline, stacked why-us, hamburger menu
- Hero slider: reduced font sizes, stacked CTAs on mobile
- Restricted products: touch-swipe horizontal scroll

## Animations

- Framer Motion `fadeUp` variants on scroll (viewport-triggered, `once: true`)
- Hero slider: crossfade transitions between slides
- Service cards: hover lift
- Stats: counter animation on first view (optional)
- Scroll indicator: bouncing arrow

## What This Does NOT Cover

- Individual service detail pages (future work)
- Contact form / free validation form (existing pages stay)
- About, Pricing, Safety Guide pages (unchanged)
- Final restricted product categories (Deepak will provide)
