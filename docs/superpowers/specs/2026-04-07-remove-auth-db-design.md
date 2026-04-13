# Amazon Safety Pro — Remove Auth & DB, Refresh Content, Rebuild UI

**Date:** 2026-04-07
**Status:** Approved — ready for implementation plan
**Updated:** 2026-04-07 — added full UI redesign ("Insider Operator, Light" design system) per user request after initial approval.

## Goal

Strip Amazon Safety Pro down to a pure marketing site that exactly mirrors `AmazonSafetyPro_WebsiteContent_Final.docx` and `AmazonSafetyPro_TermsAndConditions_Final.docx`, **and rebuild the entire UI in a new design system** that visually expresses the brand's "ex-Amazonians who built the rules" positioning. No authentication, no database, no client portal. Lead capture via two server-action forms (contact + free document review) that send Resend emails to Deepak. One new page (Terms & Conditions) added from the second docx. The existing interactive self-guide tool is retained but unlinked from primary navigation.

Reference sites shared by Deepak that match this model: avenue7media.com, myamazonguy.com, spottme.com, aeonzspn.com — all are pure marketing sites for Amazon-seller agencies with no client portal.

## Scope

### In scope

- **Delete** all authentication, database, admin, and dashboard code
- **Remove** Supabase and Zustand dependencies
- **Add** Resend dependency for transactional email
- **Rebuild** the entire UI in the "Insider Operator, Light" design system (see Design System section below). This means new typography, colors, layouts, shared atoms, motion system, and per-page rebuilds — not copy swaps inside existing components.
- **Rewrite** copy on every retained marketing page to match the docx verbatim, painted into the new UI
- **Add** a new `/terms` page from the Terms & Conditions docx (inherits the new design system)
- **Reframe** `/pricing` as a "Request a Quote" page (no prices)
- **Implement** two Next.js server actions that send email via Resend
- **Retain** the interactive `/self-guide` decision tree, but remove it from primary nav and link to it only from within the safety guide page (the self-guide tree itself can keep its existing visual treatment for now — restyling it is out of scope)
- **Rebuild** Navbar and Footer in the new design system

### Out of scope

- Payment gateway integration
- Google Analytics / Ads / cookie consent banner (the docx references these under future tracking; documented as future work)
- Filling in placeholder values (`[INSERT BUSINESS EMAIL]`, `[INSERT WEBSITE URL]`, "Last updated" date on the privacy policy) — these go into a `lib/site-config.ts` constants file with `TODO` markers; Deepak supplies actual values before launch
- Any data migration from Supabase (no production data exists)
- Automated test infrastructure (none exists today; introducing it is scope creep for this cleanup)

## Site map

| Route | Docx source | Primary nav? | Notes |
|---|---|---|---|
| `/` | §1 Home Page | Yes | Full copy rewrite |
| `/about` | §3 About Us | Yes | Full copy rewrite |
| `/services` | §5 Services intro + §5a–§5e | Yes | Full rewrite; each service card CTA prefills inquiry type in contact form |
| `/safety-guide` | §4 + §4a + §4b + §4c (i–iv) | Yes | Long-form content page |
| `/pricing` | §5 Services (reframed) + T&C §4 | Yes | "Request a Quote" — service cards without prices, CTA → `/contact` |
| `/free-validation` | §1 + §2 CTAs "Submit your documents for a free review" | Yes (secondary CTA) | Multi-step form; uploads emailed to Deepak |
| `/contact` | §2 Contact Us | Yes | Form with docx-specified fields |
| `/privacy-policy` | §7 Privacy Policy | Footer only | Contains `TODO` placeholders |
| `/terms` | Terms docx (all sections) | Footer only | **New page** |
| `/self-guide` | Not in docx | **Not in nav** | Retained; linked only from inside `/safety-guide` as "Try our interactive checker" |

**Removed routes:** `/auth/login`, `/auth/register`, `/dashboard/*`, `/admin/*`, `/api/notifications/*`

**Primary nav:** Home · About · Services · Safety Guide · Pricing · Free Review · Contact
**Footer:** Privacy Policy · Terms & Conditions · contact email · WhatsApp link

## Architecture

### Stack after cleanup

- Next.js 15 App Router (unchanged)
- React 19 (unchanged)
- Tailwind CSS 4 (unchanged)
- Framer Motion (unchanged)
- **Resend** — single new dependency, used only in server actions
- **Removed:** `@supabase/ssr`, `@supabase/supabase-js`, `zustand`
- **Conditional removal:** Three.js / `@react-three/*` — remove if no retained component imports them; verify in phase 1

No database, no auth layer, no client-side state store.

### Content source of truth

All marketing copy lives directly in React components (TSX), pasted verbatim from the docx. We are not building a CMS or markdown pipeline — the user asked for perfect docx fidelity, and inlining copy keeps it auditable in version control. Long content pages (`/safety-guide`, `/privacy-policy`, `/terms`) are structured into section components so the parent TSX stays scannable, but copy lives inline, not in data files.

### Shared constants — `lib/site-config.ts`

A single pure-data module holds values that appear on multiple pages (legal entity name, contact email, addresses, last-updated dates). All `TODO` placeholders from the docx live in this one file so they're easy to find and replace.

```ts
export const siteConfig = {
  businessName: "Amazon Safety Pro",
  legalEntity: "Proxima CPEX LLC",
  registeredAddress: "Tamil Nadu, India",
  contactEmail: "TODO@amazonsafetypro.com",   // supplied before launch
  websiteUrl: "TODO",                          // supplied before launch
  whatsappNumber: "TODO",                      // supplied before launch
  privacyLastUpdated: "TODO",
  termsLastUpdated: "2026-03-29",              // from docx
  leadInboxEmail: process.env.LEAD_INBOX_EMAIL!, // where form submissions go
};
```

### Form submission flow (contact + free review)

```
Client form component (TSX, "use client")
        │
        │  Progressive enhancement: <form action={serverAction}>
        │  works even without JavaScript.
        ▼
Next.js Server Action  (app/contact/actions.ts, app/free-validation/actions.ts)
        │  1. Parse FormData
        │  2. Validate with zod schema (lib/validation.ts)
        │  3. Honeypot check (reject if filled)
        │  4. IP rate-limit check (lib/rate-limit.ts)
        │  5. Build email via lib/email/templates.ts
        │  6. Send via lib/email/resend.ts → Resend API
        │  7. Return { ok: true } | { ok: false, error, fieldErrors? }
        ▼
Client shows success or error state (no redirect)
```

### File upload constraints (free review form only)

- Accept: PDF, JPG, JPEG, PNG, DOCX (existing `ACCEPTED_FILE_TYPES`)
- Per-file limit: **10 MB**
- Total submission limit: **25 MB** raw input (keeps Resend's ~40 MB attachment cap with headroom for base64 overhead and email body)
- Max file count: **10**
- Client blocks submissions exceeding these caps before upload; server re-validates as a safety net
- Files stream into the server action as `FormData`, are base64-encoded into the Resend `attachments` array in memory, then discarded
- **Nothing is written to disk.** No file storage, no database, no logs containing file content.

### Environment variables

**New:**
```
RESEND_API_KEY=            # Resend account key
RESEND_FROM_EMAIL=         # verified sender, e.g. noreply@amazonsafetypro.com
LEAD_INBOX_EMAIL=          # Deepak's inbox
```

**Removed:** all `SUPABASE_*` and `NEXT_PUBLIC_SUPABASE_*` vars

`middleware.ts` is deleted entirely — its only job was Supabase session refresh.

### Error handling

- **Resend API failure** → server action returns `{ ok: false, error: "We couldn't send your message. Please email us directly at <contactEmail>." }` and the client surfaces the direct email as a fallback. No retries, no queue.
- **Validation failure** → field-level errors returned in the action result; client highlights offending fields.
- **Rate-limit hit** → `{ ok: false, error: "Too many submissions. Please try again in a minute." }`
- **File size exceeded** → field-level error before network submit; server re-validates and returns a clear error if bypassed.

### Testing strategy

- **Manual smoke test** — walk every route in `next dev`, submit both forms against a real Resend test key, confirm emails arrive at the configured inbox
- **Type safety** — `tsc --noEmit` must pass with zero errors after cleanup
- **Lint** — `next lint` must pass
- **Build** — `next build` must succeed (catches dead imports from removed files and validates no stale references remain)
- **Grep gate** — `grep -r supabase src/ app/ lib/ components/` returns no matches

No automated test infra being added. The site is small, the content is static, and introducing a test framework is scope creep for this cleanup.

## Components & file layout

### Files to delete

```
app/auth/                          # login + register pages
app/dashboard/                     # cases list + detail
app/admin/                         # cases + pricing admin
app/api/notifications/             # server route
lib/supabase/                      # client + server + middleware helpers
supabase/                          # migrations + config
store/                             # authStore + notificationStore
middleware.ts                      # Supabase session refresh — no longer needed
lib/mock-data.ts                   # verify: only used by removed pages
```

### Files to rewrite (full copy swap from docx)

```
app/page.tsx                       → §1 Home Page
app/about/page.tsx                 → §3 About Us
app/services/page.tsx              → §5 intro + §5a–§5e
app/safety-guide/page.tsx          → §4 + §4a–§4c (long-form)
app/contact/page.tsx               → §2 Contact Us (header copy)
app/contact/ContactForm.tsx        → docx-specified fields, server action wired
app/free-validation/page.tsx       → keep multi-step shell, rewrite copy, wire to server action
app/pricing/page.tsx               → "Request a Quote" reframe
app/pricing/PricingCards.tsx       → service cards (no prices), CTA → /contact
app/privacy-policy/page.tsx        → §7 Privacy Policy verbatim
```

### Files to add

```
app/terms/page.tsx                 → Terms & Conditions docx (new route)
app/contact/actions.ts             → submitContactForm server action
app/free-validation/actions.ts     → submitFreeReview server action
lib/site-config.ts                 → shared constants + TODO placeholders
lib/email/resend.ts                → thin Resend client wrapper (single export: sendLeadEmail)
lib/email/templates.ts             → pure functions returning { subject, html, text }
lib/rate-limit.ts                  → in-memory token bucket keyed by IP
lib/validation.ts                  → zod schemas for both forms
.env.example                       → updated with Resend vars (Supabase vars removed)
```

### Files to update (touched but not rewritten)

```
components/layout/Navbar.tsx       → remove auth links, remove self-guide link, update nav items
components/layout/Footer.tsx       → add Terms link, update contact info, remove auth links
lib/constants.ts                   → trim to only what marketing pages need
lib/types.ts                       → trim to only types used by remaining code
package.json                       → remove @supabase/*, zustand; add resend
next.config.ts                     → drop any Supabase image domains
app/layout.tsx                     → remove any auth providers / store hydration
```

### Files untouched

- `components/ui/*` — design system primitives
- `components/home/*` — home page sections (copy gets swapped inside, structure stays)
- `components/self-guide/*` — interactive decision tree, retained as-is
- `lib/selfGuideTree.ts` — data file for the tree
- `app/globals.css`, `postcss.config.mjs`, Tailwind config

### Module boundaries

Each unit has one clear purpose and one public interface:

- **`lib/email/resend.ts`** owns the Resend SDK. Nothing else imports `resend` directly. Exports one function: `sendLeadEmail({ subject, html, text, attachments? }) → Promise<Result>`.
- **`lib/email/templates.ts`** — pure functions: `contactEmail(payload)` and `freeReviewEmail(payload)`, each returning `{ subject, html, text }`. Zero side effects.
- **`lib/rate-limit.ts`** — single function `checkRateLimit(ip): { allowed: boolean }`. In-memory `Map`. Stateless across server restarts is acceptable for a low-traffic marketing site.
- **`lib/validation.ts`** — exports two zod schemas, used by both server actions and (optionally) client-side pre-flight checks.
- **Server actions** are thin orchestrators: validate → rate-limit → build email → send → return result. No business logic lives in them.
- **`lib/site-config.ts`** is pure data, no functions. Imported by any page that needs the contact email, legal entity name, etc.

### Verification before deleting

For each file or directory marked for deletion, grep the rest of the codebase for imports. If anything in the keep-list still references it, adjust the design before merging. This check happens in phase 1 (cleanup) before moving forward.

## Implementation order

Each phase ends in a working, type-checking, building app.

1. **Cleanup phase** — delete auth/dashboard/admin/api/supabase/store directories, delete `middleware.ts`, remove deps from `package.json`, run `tsc --noEmit` and `next build`, fix every dead import surfaced. End state: site builds but pages still have old copy.
2. **Infra phase** — add `resend` dep, create `lib/site-config.ts`, `lib/email/*`, `lib/rate-limit.ts`, `lib/validation.ts`, `.env.example`. Nothing wired yet.
3. **Forms phase** — write `app/contact/actions.ts` and `app/free-validation/actions.ts`, wire `ContactForm.tsx` and the free-validation page to them, smoke-test against a Resend test key.
4. **Content phase** — rewrite each marketing page to docx copy, page by page (home → about → services → safety-guide → contact → free-validation → pricing → privacy-policy). One commit per page for digestible review.
5. **New page phase** — add `app/terms/page.tsx`.
6. **Nav/footer phase** — update Navbar and Footer (remove auth, remove self-guide from primary nav, add Terms to footer).
7. **Final pass** — `next build`, manual walkthrough of every route, submit both forms end-to-end against a real Resend key, confirm emails arrive.

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Removing `lib/mock-data.ts` or `store/*` breaks a marketing component that quietly imported them | Phase 1 ends with a clean `tsc --noEmit`; fix anything that surfaces before moving on |
| Resend attachment limit silently exceeded (base64 inflates payload by ~33%) | Server-side cap at 25 MB raw input; reject above that with a clear error |
| Form spam once site goes live | Honeypot field + IP rate-limit. Documented as a known limitation; can add Cloudflare Turnstile later if abuse appears |
| Three.js / R3F deps may or may not be used | Phase 1: grep for `@react-three` and `three` imports in retained files. Drop deps if unused; keep if used in `components/home/*` |
| Privacy / T&C placeholders shipped to production | All `TODO` placeholders live in one file (`lib/site-config.ts`). Add a CI grep that fails if `TODO` remains in that file when `NODE_ENV=production` |
| Docx copy contains smart quotes and em-dashes that break in TSX | Paste via JSX text nodes (not attribute values); use `{`}` for literal braces; visual-diff each page against the docx during content phase |
| Self-guide tree components reference types from removed files | Verify in phase 1; if so, inline whatever types they need into `components/self-guide/` |
| `middleware.ts` currently has demo-mode bypass — deleting it may change routing behavior for any remaining matchers | After deletion, confirm `next build` and manual smoke test pass on all routes |

## Design System — "Insider Operator, Light"

The aesthetic translates the brand's "ex-Amazonians who built the rules" positioning into a visual language. Light theme. Dense typographic hierarchy with heavy use of monospace for tactical/operator details. One saturated accent. Restrained-but-precise motion. The site should feel like an insider's instrument panel — not a generic SaaS marketing page.

### Typography

- **Body / UI:** **Geist Sans** (loaded via `next/font/google`) — replaces Inter everywhere. Weights used: 400, 500, 600, 700, 900.
- **Mono:** **Geist Mono** (same family) — used heavily for labels, section markers, numbers, status pills, file metadata, footer details. The mono/sans alternation is the visual rhythm.
- **Display:** Geist Sans at extreme weights (700–900) and sizes up to 96px. No separate display face.

### Color tokens

```css
--paper:        #F7F7F4   /* warm architectural off-white, never pure white */
--paper-edge:   #EFEEE9   /* card backgrounds, subtle elevation */
--ink:          #0A0E14   /* near-black, primary type */
--ink-2:        #1E2330   /* secondary type */
--ink-3:        #5A6173   /* tertiary, captions, mono labels */
--rule:         #D8D6CF   /* hairline borders, dividers */
--signal:       #1F40FF   /* primary accent — saturated electric blue */
--signal-soft:  #E5EAFF   /* accent background, highlight blocks */
--alert:        #FF5722   /* secondary accent — stat numbers, callouts only */
--ok:           #00875A   /* status pills only, never decoration */
```

One hero accent (`--signal`). `--alert` only on stat numbers and policy callouts. No gradients except a single barely-perceptible mesh in the hero background.

### Tactical visual details

- Section labels in mono caps prefixed `→ 01 — SCOPE` or `[ 01 / 06 ]`
- 1px hairline borders (never 2px)
- Corner brackets `⌐ ¬ └ ┘` framing key UI moments (hero, framed CTA blocks)
- Monospace status pills: `[ ACTIVE ]`, `[ COMPLIANT ]`, `[ FLAGGED ]`
- A 4px page margin with a thin `--rule` border around the entire viewport — gives the whole site an "instrument panel" feel
- A 5% SVG noise overlay on `--paper` for subtle paper grain
- Inline tactical underlines: `text-decoration-style: dashed; text-decoration-color: var(--signal)`
- File-system breadcrumbs in mono: `~ / safety-guide / amazon-tic-policy`
- Stat blocks: oversized mono number in `--alert`, `--signal` underline

### Motion (Framer Motion)

Restrained but precise. Every animation has a reason.

- **Page load** — thin `--signal` bar wipes across the top of the viewport (300ms). Hero headline splits by word, fades and translates up, 0.04s stagger. Mono micro-label types in character-by-character (typewriter, 18ms per char). Background grid pattern fades in last.
- **Scroll reveals** — for each major section, a thin horizontal `--rule` line draws from left to right (`scaleX 0 → 1`, 600ms ease-out), then content above it fades up. Reads like sections being marked complete.
- **Numbers** — every stat counts up from 0 on enter using a spring transform.
- **Service cards** — hover: card lifts 4px, hairline border swaps to `--signal`, the mono `[ 01 ]` bracket characters reveal a slight visual emphasis.
- **Buttons** — primary: `--ink` block with white type. Hover: a small `--signal` square slides in from the left edge, pushing the label right by 8px. The button gains a 1px `--ink` outline offset by 3px (a hard "tactical shadow," no blur).
- **Hero background** — slow custom gradient mesh in `--signal-soft` follows the cursor with 200ms lag. A sparse 32px grid pattern overlay drifts at 4px/s.
- **Custom cursor** on desktop only — a small 12px crosshair, switches to a filled square on interactive elements. Hidden on touch.
- **Page transitions** — same `--signal` bar wipe between routes.
- **Self-guide entry** — when clicking the link from `/safety-guide`, the bracket characters around the CTA close in on the label like a targeting reticle before navigating.

### Layout patterns

- **Hero (`/`)** — Asymmetric 12-col grid. Left (8 cols): mono micro-label `→ AMAZON COMPLIANCE OPS`, 96px headline, mono sub-label, primary CTA. Right (4 cols): a "TRANSMISSION" sidebar with mono key/value pairs (`STATUS: ACTIVE`, `RESPONSE TIME: < 1 BUSINESS DAY`, `JURISDICTIONS: 7`), then a small interactive grid pattern. Top of section: row of `[ ACTIVE ] [ ENROLLING ] [ EX-AMAZONIANS ]` status pills.
- **About** — Dossier layout. Left col (sticky, 4): "RECORD" with registered entity, founded, jurisdictions, lead profile stats. Right col (8): narrative with mono section markers `→ MISSION`, `→ ORIGIN`, `→ TEAM`.
- **Services** — Numbered grid, 5 cards `[ 01 ]`–`[ 05 ]`. Each card: number top-left in mono `--alert`, title, blurb, `→ REQUEST QUOTE` link. Hover expands border to `--signal`.
- **Safety Guide** — Two-col long-form. Sticky left nav (3 cols): mono section numbers `4a / 4b / 4c-i / 4c-ii / 4c-iii / 4c-iv` with active-section highlight that slides on scroll. Right (9 cols): structured prose with framed pull quotes (`⌐ ¬ └ ┘` brackets) and inline tactical callouts. The `/self-guide` CTA is a framed block at the end of §4a.
- **Pricing** — Same numbered card grid as services, plus a "QUOTE PROTOCOL" mono explanation block above and a "REQUEST FREE REVIEW" framed CTA below.
- **Contact** — Split: form left (8 cols), "TRANSMISSION DETAILS" sidebar right (4 cols) with mono response-time stats and the "Why sellers trust us" bullets as a mono checklist.
- **Free Validation** — Single-column form with a top "PAYLOAD MANIFEST" header. File upload renders as a terminal manifest: each file row shows `[ STAGED ]` status, mono filename, mono size, `[ × ]` remove button. Submit button reads `→ TRANSMIT FOR REVIEW`.
- **Privacy / Terms** — Long-form with sticky left nav of section numbers, framed in the same instrument-panel border. Reads like a technical document.
- **Footer** — Full-width strip with corner brackets, mono contact details, mono jurisdiction list, thin `--rule` row of nav links, final mono line: `// PROXIMA CPEX LLC · TAMIL NADU, IN · SINCE 2026`.

### Shared atoms (new files in `components/ui/`)

- `<MonoLabel>` — small uppercase mono label, optional `→` or `[NN]` prefix
- `<StatusPill>` — bracketed mono status indicator
- `<NumberMarker>` — large mono `[ 01 ]` style numerator
- `<FramedBlock>` — wraps children in `⌐ ¬ └ ┘` corner brackets
- `<RevealOnScroll>` — scroll-triggered fade-up + line-draw using Framer Motion
- `<CountUp>` — animated number rendering using Framer Motion `useSpring`
- `<TypeIn>` — character-by-character typewriter effect for mono labels
- `<TacticalButton>` — primary/secondary button in the design system, with hover signal-square animation
- `<HairlineDivider>` — thin animated section divider
- `<TransmissionRow>` — mono key/value row used in hero sidebar and contact sidebar

### Shared chrome

- `<TacticalShell>` (in `app/layout.tsx`) — wraps every page; provides the 4px frame border, custom cursor (desktop only), grain overlay, page-load signal bar, and CSS variable definitions.
- `<Navbar>` (rebuilt) — left logo with mono `// AMAZON SAFETY PRO`, center nav links in mono caps with `→` hover prefix, right primary CTA `→ FREE REVIEW`. No separate Login. Sticky with hairline bottom border.
- `<Footer>` (rebuilt) — see layout pattern above.

### Implementation notes

- All fonts loaded via `next/font/google` (`Geist`, `Geist_Mono`) — zero external font requests, perfect CLS.
- Tailwind 4 with the color tokens defined as CSS custom properties in `app/globals.css`. Tailwind utility classes consume them via `text-[var(--ink)]` style or via custom classes.
- Framer Motion (already installed) is the only motion lib.
- Custom cursor disabled on `(pointer: coarse)` (touch devices) via media query.
- Existing `components/home/ThreeScene.tsx` is retained (it provides hero atmosphere) but its surrounding component structure changes. If integration is awkward, replace it with a CSS-only animated grid pattern instead — judgement call during implementation.
- The interactive `/self-guide` decision tree (`components/self-guide/ChatBot.tsx`) keeps its current visual treatment. Restyling it is explicitly out of scope.

## Definition of done

- Every route in the site map renders without error
- Both forms successfully send email to a real inbox via Resend, including file attachments on the free review form
- `tsc --noEmit`, `next lint`, and `next build` all pass with zero errors
- No references to Supabase, auth, dashboard, or admin remain (`grep -r supabase app/ lib/ components/ store/` returns nothing)
- `lib/site-config.ts` is the only file containing `TODO` placeholders, and they're clearly flagged for Deepak to supply before launch
- Content on every marketing page matches the corresponding docx section verbatim
- Nav and footer match the site map in this spec
