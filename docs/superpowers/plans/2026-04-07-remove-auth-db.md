# Amazon Safety Pro — Cleanup, Content Refresh, and UI Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strip Amazon Safety Pro to a pure marketing site, refresh all content from the docx files verbatim, **and rebuild the entire UI in the "Insider Operator, Light" design system** defined in the spec.

**Architecture:** Next.js 15 App Router + Tailwind 4 + Framer Motion. Two server actions (contact + free review) call Resend via a thin wrapper. New design system: Geist Sans + Geist Mono, light tactical color palette, shared atoms in `components/ui/`, instrument-panel chrome via a `<TacticalShell>` wrapper in `app/layout.tsx`. All copy verbatim from the two docx files.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Resend, zod, Geist + Geist Mono via `next/font/google`. Three.js / @react-three are retained but their usage may shrink.

---

## Project conventions for this plan

**No git repository.** This project is not under version control (`git status` would fail). The "commit" checkpoints in the standard plan template are replaced with **verification checkpoints**: run the type-checker and build commands and confirm zero errors before moving on.

**No automated test framework exists** and the spec explicitly excludes adding one. Verification per task is:
1. `npx tsc --noEmit` — zero errors
2. `npm run lint` — zero errors (when affected)
3. `npm run build` — succeeds (run at end of each phase, not every task)
4. Manual smoke test — run `npm run dev` and visit affected routes

**Reference documents** (project root):
- `AmazonSafetyPro_WebsiteContent_Final.docx` — sections numbered §1–§7
- `AmazonSafetyPro_TermsAndConditions_Final.docx` — sections numbered 1–16

The executing engineer must extract text from these docx files (e.g., `unzip -p file.docx word/document.xml | python3 -c "import sys,re; t=sys.stdin.read(); t=re.sub(r'</w:p>','\n',t); t=re.sub(r'<[^>]+>','',t); print(t)"`) for content pages. Section references in tasks below point to these documents.

**Verbatim content rule:** Copy from the docx must be reproduced exactly — the same wording, the same paragraph order, the same headings. Smart quotes (`'` `'` `"` `"`), em dashes (`—`), and right-arrow (`→`) characters in the docx must be preserved. Do not paraphrase, abbreviate, or "improve" the copy.

---

## File structure after implementation

**Deleted directories/files:**
```
app/auth/
app/dashboard/
app/admin/
app/api/notifications/
lib/supabase/
lib/mock-data.ts
supabase/
store/
middleware.ts
components/layout/AdminSidebar.tsx
components/layout/DashboardSidebar.tsx
components/layout/DashboardTopbar.tsx
```

**New files:**
```
lib/site-config.ts
lib/email/resend.ts
lib/email/templates.ts
lib/rate-limit.ts
lib/validation.ts
app/contact/actions.ts
app/free-validation/actions.ts
app/terms/page.tsx
.env.example
```

**Rewritten files:** all retained marketing pages, `lib/constants.ts`, `lib/types.ts`, `package.json`, Navbar, Footer.

**Untouched:** `components/ui/*`, `components/home/*` (copy swapped inside, structure preserved), `components/self-guide/ChatBot.tsx`, `lib/selfGuideTree.ts`, `lib/utils.ts`, Tailwind/PostCSS config, `app/globals.css`.

---

# Phase 1 — Cleanup

**Goal:** Delete all auth/DB/admin/dashboard code and dead supporting files. End state: site builds and type-checks but pages still have old copy.

## Task 1.1: Verify no marketing-side imports of doomed modules

**Files:**
- Read-only verification

- [ ] **Step 1: Grep for cross-imports**

Run from project root:
```bash
grep -rln "mock-data\|@/store\|@/lib/supabase\|authStore\|notificationStore" \
  app/page.tsx app/about app/services app/safety-guide app/pricing \
  app/contact app/free-validation app/privacy-policy app/self-guide \
  app/layout.tsx components/home components/ui components/self-guide \
  components/layout/Navbar.tsx components/layout/Footer.tsx \
  lib/constants.ts lib/types.ts lib/utils.ts lib/selfGuideTree.ts 2>/dev/null
```
Expected: **no output**. If any path appears, stop and update the plan to inline whatever is needed before deleting.

- [ ] **Step 2: Verify Three.js usage to confirm deps stay**

Run:
```bash
grep -rln "@react-three\|from \"three\"" components app
```
Expected: only `components/home/ThreeScene.tsx`. Confirms `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` deps must be retained.

- [ ] **Verification checkpoint:** Both greps produce expected output. Proceed to Task 1.2.

## Task 1.2: Delete auth, dashboard, admin route directories

**Files:**
- Delete: `app/auth/`, `app/dashboard/`, `app/admin/`, `app/api/notifications/`

- [ ] **Step 1: Delete the directories**

```bash
rm -rf app/auth app/dashboard app/admin app/api/notifications
```

- [ ] **Step 2: Check whether `app/api/` is now empty and remove if so**

```bash
ls app/api 2>/dev/null && rmdir app/api 2>/dev/null
```
Expected: `app/api` no longer exists.

- [ ] **Verification checkpoint:** `ls app` shows: `about contact free-validation globals.css layout.tsx page.tsx pricing privacy-policy safety-guide self-guide services` (no `auth`, `dashboard`, `admin`, `api`).

## Task 1.3: Delete Supabase, store, mock-data, middleware

**Files:**
- Delete: `lib/supabase/`, `lib/mock-data.ts`, `supabase/`, `store/`, `middleware.ts`

- [ ] **Step 1: Delete files and directories**

```bash
rm -rf lib/supabase lib/mock-data.ts supabase store middleware.ts
```

- [ ] **Verification checkpoint:** `ls lib` shows: `constants.ts selfGuideTree.ts types.ts utils.ts`. No `supabase` or `store` directories at the project root.

## Task 1.4: Delete admin/dashboard layout components

**Files:**
- Delete: `components/layout/AdminSidebar.tsx`, `components/layout/DashboardSidebar.tsx`, `components/layout/DashboardTopbar.tsx`

- [ ] **Step 1: Delete the files**

```bash
rm components/layout/AdminSidebar.tsx \
   components/layout/DashboardSidebar.tsx \
   components/layout/DashboardTopbar.tsx
```

- [ ] **Verification checkpoint:** `ls components/layout` shows only `Footer.tsx Navbar.tsx`.

## Task 1.5: Trim `lib/constants.ts` of dead exports

**Files:**
- Modify: `lib/constants.ts`

- [ ] **Step 1: Replace file contents**

Replace the entire file with:
```ts
export const APP_NAME = "Amazon Safety Pro";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Safety Guide", href: "/safety-guide" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const ACCEPTED_FILE_EXTENSIONS = ".pdf,.jpg,.jpeg,.png,.doc,.docx";

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB per file
export const MAX_TOTAL_UPLOAD_SIZE = 25 * 1024 * 1024; // 25 MB total per submission
export const MAX_FILE_COUNT = 10;
```

- [ ] **Verification checkpoint:** Run `npx tsc --noEmit`. Any errors here will be from files still importing the deleted constants — those files are part of deleted directories and should already be gone. If errors remain, the offending file is in the keep list and needs to be updated.

## Task 1.6: Trim `lib/types.ts` of dead types

**Files:**
- Modify: `lib/types.ts`

- [ ] **Step 1: Replace file contents**

Replace the entire file with:
```ts
// Types kept after the auth/DB removal cleanup.
// Add new types here only when a retained component or server action needs them.

export type ServiceInquiryType =
  | "product_safety_compliance_advice"
  | "cpc_doc_gcc_creation"
  | "document_validation"
  | "stranded_asin_reinstatement"
  | "general_question";

export const SERVICE_INQUIRY_LABELS: Record<ServiceInquiryType, string> = {
  product_safety_compliance_advice: "Product safety compliance advice",
  cpc_doc_gcc_creation: "CPC / DOC / GCC document creation",
  document_validation: "Document validation",
  stranded_asin_reinstatement: "Stranded ASIN reinstatement",
  general_question: "General question",
};
```

The old `Profile`, `Case`, `Package`, etc. types are deleted — no retained code references them.

- [ ] **Verification checkpoint:** Run `npx tsc --noEmit`. Should pass (or surface remaining import errors that point to other files needing cleanup in subsequent tasks).

## Task 1.7: Remove dead deps from `package.json`

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Edit dependencies block**

Remove these lines from the `dependencies` block:
```json
"@supabase/ssr": "^0.9.0",
"@supabase/supabase-js": "^2.100.0",
"zustand": "^5.0.12",
```

Add this line to the `dependencies` block:
```json
"resend": "^4.0.0",
```

Add this line to the `dependencies` block (used in Task 2.5 for validation):
```json
"zod": "^3.23.8",
```

- [ ] **Step 2: Reinstall**

```bash
rm -rf node_modules package-lock.json
npm install
```

Expected: completes without errors. `node_modules/resend` and `node_modules/zod` exist; `node_modules/@supabase` and `node_modules/zustand` do not.

- [ ] **Verification checkpoint:** Run `ls node_modules | grep -E '@supabase|zustand|resend|zod'`. Expected: `resend` and `zod` only.

## Task 1.8: Phase 1 build verification

- [ ] **Step 1: Type-check**

```bash
npx tsc --noEmit
```
Expected: zero errors. If errors appear, they identify a leftover import that must be fixed before proceeding.

- [ ] **Step 2: Build**

```bash
npm run build
```
Expected: build succeeds. Pages still show old copy — that's fine. This phase only validates the cleanup didn't break anything.

- [ ] **Step 3: Smoke test the dev server**

```bash
npm run dev
```
Visit `http://localhost:3000`, `/about`, `/services`, `/safety-guide`, `/pricing`, `/contact`, `/free-validation`, `/privacy-policy`, `/self-guide`. Each renders without 500 errors. Stop the dev server.

- [ ] **Verification checkpoint:** All pages render. Phase 1 complete.

---

# Phase 2 — Infrastructure (site-config, email, validation, rate-limit)

**Goal:** Build the supporting modules that the server actions will compose. Nothing wired into pages yet.

## Task 2.1: Create `lib/site-config.ts`

**Files:**
- Create: `lib/site-config.ts`

- [ ] **Step 1: Write the file**

```ts
/**
 * Single source of truth for site-wide values.
 * All TODO placeholders below must be filled by Deepak before launch.
 * The CI grep in `npm run build` (see scripts) fails the build if any TODO
 * remains in this file when NODE_ENV=production.
 */
export const siteConfig = {
  businessName: "Amazon Safety Pro",
  legalEntity: "Proxima CPEX LLC",
  registeredAddress: "Tamil Nadu, India",

  // TODO: replace before launch
  contactEmail: "TODO@amazonsafetypro.com",
  websiteUrl: "TODO",
  whatsappNumber: "TODO",
  privacyLastUpdated: "TODO",

  // From the docx; do not change without updating the source document.
  termsLastUpdated: "2026-03-29",

  // Read at runtime in server actions only — never imported into client code.
  leadInboxEmail: process.env.LEAD_INBOX_EMAIL ?? "",
} as const;

export type SiteConfig = typeof siteConfig;
```

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes.

## Task 2.2: Create `lib/email/resend.ts`

**Files:**
- Create: `lib/email/resend.ts`

- [ ] **Step 1: Write the file**

```ts
import { Resend } from "resend";

export interface LeadEmailAttachment {
  filename: string;
  content: Buffer; // raw bytes; Resend SDK base64-encodes internally
}

export interface SendLeadEmailInput {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: LeadEmailAttachment[];
}

export type SendLeadEmailResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

let cachedClient: Resend | null = null;

function getClient(): Resend {
  if (!cachedClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("RESEND_API_KEY is not set");
    }
    cachedClient = new Resend(key);
  }
  return cachedClient;
}

export async function sendLeadEmail(
  input: SendLeadEmailInput
): Promise<SendLeadEmailResult> {
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.LEAD_INBOX_EMAIL;

  if (!from || !to) {
    return {
      ok: false,
      error: "Email service is not configured. Please contact us directly.",
    };
  }

  try {
    const client = getClient();
    const response = await client.emails.send({
      from,
      to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo: input.replyTo,
      attachments: input.attachments?.map((a) => ({
        filename: a.filename,
        content: a.content,
      })),
    });

    if (response.error) {
      return { ok: false, error: response.error.message };
    }
    return { ok: true, id: response.data?.id ?? "" };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { ok: false, error: message };
  }
}
```

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes.

## Task 2.3: Create `lib/email/templates.ts`

**Files:**
- Create: `lib/email/templates.ts`

- [ ] **Step 1: Write the file**

```ts
import { SERVICE_INQUIRY_LABELS, type ServiceInquiryType } from "@/lib/types";

export interface ContactEmailPayload {
  fullName: string;
  businessName: string;
  email: string;
  phone?: string;
  amazonSellerId?: string;
  productCategory: string;
  inquiryType: ServiceInquiryType;
  message: string;
}

export interface FreeReviewEmailPayload {
  fullName: string;
  businessName: string;
  email: string;
  phone?: string;
  amazonSellerId?: string;
  productCategory: string;
  productDescription: string;
  fileSummaries: Array<{ name: string; sizeKb: number }>;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(label: string, value: string | undefined): string {
  if (!value) return "";
  return `<tr><td style="padding:4px 12px 4px 0;color:#475569;font-weight:600;">${escapeHtml(
    label
  )}</td><td style="padding:4px 0;color:#1e293b;">${escapeHtml(value)}</td></tr>`;
}

export function contactEmail(p: ContactEmailPayload): RenderedEmail {
  const inquiryLabel = SERVICE_INQUIRY_LABELS[p.inquiryType];
  const subject = `New contact form: ${p.fullName} — ${inquiryLabel}`;

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#1e293b;max-width:640px;">
      <h2 style="color:#2563EB;margin:0 0 16px;">New contact form submission</h2>
      <table style="border-collapse:collapse;font-size:14px;">
        ${row("Full name", p.fullName)}
        ${row("Business", p.businessName)}
        ${row("Email", p.email)}
        ${row("Phone", p.phone)}
        ${row("Amazon Seller ID / URL", p.amazonSellerId)}
        ${row("Product category", p.productCategory)}
        ${row("Inquiry type", inquiryLabel)}
      </table>
      <h3 style="margin-top:24px;color:#475569;">Message</h3>
      <p style="white-space:pre-wrap;">${escapeHtml(p.message)}</p>
    </div>
  `.trim();

  const text = [
    "New contact form submission",
    "",
    `Full name: ${p.fullName}`,
    `Business: ${p.businessName}`,
    `Email: ${p.email}`,
    p.phone ? `Phone: ${p.phone}` : null,
    p.amazonSellerId ? `Amazon Seller ID / URL: ${p.amazonSellerId}` : null,
    `Product category: ${p.productCategory}`,
    `Inquiry type: ${inquiryLabel}`,
    "",
    "Message:",
    p.message,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

export function freeReviewEmail(p: FreeReviewEmailPayload): RenderedEmail {
  const subject = `Free review request: ${p.fullName} — ${p.productCategory}`;

  const fileList = p.fileSummaries
    .map((f) => `<li>${escapeHtml(f.name)} (${f.sizeKb.toFixed(0)} KB)</li>`)
    .join("");

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#1e293b;max-width:640px;">
      <h2 style="color:#2563EB;margin:0 0 16px;">New free document review request</h2>
      <table style="border-collapse:collapse;font-size:14px;">
        ${row("Full name", p.fullName)}
        ${row("Business", p.businessName)}
        ${row("Email", p.email)}
        ${row("Phone", p.phone)}
        ${row("Amazon Seller ID / URL", p.amazonSellerId)}
        ${row("Product category", p.productCategory)}
      </table>
      <h3 style="margin-top:24px;color:#475569;">Product description</h3>
      <p style="white-space:pre-wrap;">${escapeHtml(p.productDescription)}</p>
      <h3 style="margin-top:24px;color:#475569;">Attached files (${p.fileSummaries.length})</h3>
      <ul>${fileList}</ul>
    </div>
  `.trim();

  const text = [
    "New free document review request",
    "",
    `Full name: ${p.fullName}`,
    `Business: ${p.businessName}`,
    `Email: ${p.email}`,
    p.phone ? `Phone: ${p.phone}` : null,
    p.amazonSellerId ? `Amazon Seller ID / URL: ${p.amazonSellerId}` : null,
    `Product category: ${p.productCategory}`,
    "",
    "Product description:",
    p.productDescription,
    "",
    `Attached files (${p.fileSummaries.length}):`,
    ...p.fileSummaries.map((f) => `- ${f.name} (${f.sizeKb.toFixed(0)} KB)`),
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}
```

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes.

## Task 2.4: Create `lib/rate-limit.ts`

**Files:**
- Create: `lib/rate-limit.ts`

- [ ] **Step 1: Write the file**

```ts
/**
 * In-memory token-bucket rate limiter keyed by IP.
 * Stateless across server restarts — acceptable for a low-traffic marketing site.
 * Limits: 5 submissions per IP per 10 minutes.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

interface Bucket {
  count: number;
  windowStart: number;
}

const buckets = new Map<string, Bucket>();

export function checkRateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now - bucket.windowStart >= WINDOW_MS) {
    buckets.set(ip, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { allowed: false };
  }

  bucket.count += 1;
  return { allowed: true };
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
```

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes.

## Task 2.5: Create `lib/validation.ts`

**Files:**
- Create: `lib/validation.ts`

- [ ] **Step 1: Write the file**

```ts
import { z } from "zod";
import {
  MAX_FILE_COUNT,
  MAX_FILE_SIZE,
  MAX_TOTAL_UPLOAD_SIZE,
  ACCEPTED_FILE_TYPES,
} from "@/lib/constants";

export const contactFormSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  businessName: z.string().trim().min(1, "Business name is required").max(160),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  amazonSellerId: z.string().trim().max(200).optional().or(z.literal("")),
  productCategory: z.string().trim().min(1, "Product category is required").max(120),
  inquiryType: z.enum([
    "product_safety_compliance_advice",
    "cpc_doc_gcc_creation",
    "document_validation",
    "stranded_asin_reinstatement",
    "general_question",
  ]),
  message: z.string().trim().min(10, "Please describe your issue").max(5000),
  // Honeypot — must be empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const freeReviewFormSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  businessName: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  amazonSellerId: z.string().trim().max(200).optional().or(z.literal("")),
  productCategory: z.string().trim().min(1).max(120),
  productDescription: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type FreeReviewFormInput = z.infer<typeof freeReviewFormSchema>;

export interface FileValidationError {
  reason: string;
}

export function validateUploadedFiles(
  files: File[]
): { ok: true } | { ok: false; error: string } {
  if (files.length === 0) {
    return { ok: false, error: "Please attach at least one document." };
  }
  if (files.length > MAX_FILE_COUNT) {
    return { ok: false, error: `You can attach up to ${MAX_FILE_COUNT} files.` };
  }
  let total = 0;
  for (const f of files) {
    if (!ACCEPTED_FILE_TYPES.includes(f.type)) {
      return {
        ok: false,
        error: `${f.name} is not an accepted file type (PDF, JPG, PNG, DOC, DOCX).`,
      };
    }
    if (f.size > MAX_FILE_SIZE) {
      return { ok: false, error: `${f.name} exceeds the 10 MB per-file limit.` };
    }
    total += f.size;
  }
  if (total > MAX_TOTAL_UPLOAD_SIZE) {
    return { ok: false, error: "Total upload size exceeds the 25 MB limit." };
  }
  return { ok: true };
}
```

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes.

## Task 2.6: Create `.env.example`

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Write the file**

```
# Resend transactional email
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@amazonsafetypro.com
LEAD_INBOX_EMAIL=
```

- [ ] **Verification checkpoint:** File exists. Phase 2 complete.

---

# Phase 3 — Forms (server actions + wiring)

**Goal:** Wire the contact form and free-validation form to the new server actions. Both forms send email via Resend on submit.

## Task 3.1: Create `app/contact/actions.ts`

**Files:**
- Create: `app/contact/actions.ts`

- [ ] **Step 1: Write the server action**

```ts
"use server";

import { headers } from "next/headers";
import { contactFormSchema } from "@/lib/validation";
import { contactEmail } from "@/lib/email/templates";
import { sendLeadEmail } from "@/lib/email/resend";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site-config";
import type { ServiceInquiryType } from "@/lib/types";

export type ContactActionResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      fieldErrors?: Partial<Record<string, string>>;
    };

export async function submitContactForm(
  _prev: ContactActionResult | null,
  formData: FormData
): Promise<ContactActionResult> {
  const h = await headers();
  const ip = getClientIp(h);

  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return {
      ok: false,
      error: "Too many submissions. Please try again in a few minutes.",
    };
  }

  const raw = {
    fullName: formData.get("fullName")?.toString() ?? "",
    businessName: formData.get("businessName")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    amazonSellerId: formData.get("amazonSellerId")?.toString() ?? "",
    productCategory: formData.get("productCategory")?.toString() ?? "",
    inquiryType: (formData.get("inquiryType")?.toString() ??
      "general_question") as ServiceInquiryType,
    message: formData.get("message")?.toString() ?? "",
    website: formData.get("website")?.toString() ?? "",
  };

  const parsed = contactFormSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      error: "Please correct the errors below and try again.",
      fieldErrors,
    };
  }

  // Honeypot tripped — silently succeed to avoid signaling bots.
  if (parsed.data.website) {
    return { ok: true };
  }

  const rendered = contactEmail({
    fullName: parsed.data.fullName,
    businessName: parsed.data.businessName,
    email: parsed.data.email,
    phone: parsed.data.phone || undefined,
    amazonSellerId: parsed.data.amazonSellerId || undefined,
    productCategory: parsed.data.productCategory,
    inquiryType: parsed.data.inquiryType,
    message: parsed.data.message,
  });

  const result = await sendLeadEmail({
    subject: rendered.subject,
    html: rendered.html,
    text: rendered.text,
    replyTo: parsed.data.email,
  });

  if (!result.ok) {
    return {
      ok: false,
      error: `We couldn't send your message. Please email us directly at ${siteConfig.contactEmail}.`,
    };
  }
  return { ok: true };
}
```

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes.

## Task 3.2: Rewrite `app/contact/ContactForm.tsx`

**Files:**
- Modify: `app/contact/ContactForm.tsx` (full rewrite)

- [ ] **Step 1: Replace the file**

```tsx
"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactActionResult } from "./actions";
import { SERVICE_INQUIRY_LABELS, type ServiceInquiryType } from "@/lib/types";

const INQUIRY_OPTIONS: ServiceInquiryType[] = [
  "product_safety_compliance_advice",
  "cpc_doc_gcc_creation",
  "document_validation",
  "stranded_asin_reinstatement",
  "general_question",
];

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState<
    ContactActionResult | null,
    FormData
  >(submitContactForm, null);

  if (state?.ok) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-green-900">
        <h3 className="text-lg font-semibold">Thanks — we&apos;ve got your message.</h3>
        <p className="mt-2 text-sm">
          A member of our team will respond within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <Field
        label="Full name"
        name="fullName"
        required
        error={state?.fieldErrors?.fullName}
      />
      <Field
        label="Business name / Company"
        name="businessName"
        required
        error={state?.fieldErrors?.businessName}
      />
      <Field
        label="Email address"
        name="email"
        type="email"
        required
        error={state?.fieldErrors?.email}
      />
      <Field
        label="Phone number (optional)"
        name="phone"
        type="tel"
        error={state?.fieldErrors?.phone}
      />
      <Field
        label="Amazon Seller ID or Store URL (optional)"
        name="amazonSellerId"
        error={state?.fieldErrors?.amazonSellerId}
      />
      <Field
        label="Product category (e.g. Toys, Electronics, Apparel)"
        name="productCategory"
        required
        error={state?.fieldErrors?.productCategory}
      />

      <div>
        <label className="block text-sm font-medium text-[#1E293B]">
          Type of inquiry <span className="text-red-500">*</span>
        </label>
        <select
          name="inquiryType"
          required
          defaultValue="general_question"
          className="mt-1 block w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#1E293B] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
        >
          {INQUIRY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {SERVICE_INQUIRY_LABELS[opt]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1E293B]">
          Message / describe your issue <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={6}
          className="mt-1 block w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#1E293B] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
        />
        {state?.fieldErrors?.message && (
          <p className="mt-1 text-xs text-red-600">{state.fieldErrors.message}</p>
        )}
      </div>

      {state?.ok === false && !state.fieldErrors && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1D4ED8] disabled:opacity-60"
      >
        {isPending ? "Sending..." : "Submit →"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#1E293B]">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-1 block w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#1E293B] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
```

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes.

## Task 3.3: Create `app/free-validation/actions.ts`

**Files:**
- Create: `app/free-validation/actions.ts`

- [ ] **Step 1: Write the server action**

```ts
"use server";

import { headers } from "next/headers";
import { freeReviewFormSchema, validateUploadedFiles } from "@/lib/validation";
import { freeReviewEmail } from "@/lib/email/templates";
import { sendLeadEmail } from "@/lib/email/resend";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site-config";

export type FreeReviewActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<string, string>> };

export async function submitFreeReview(
  _prev: FreeReviewActionResult | null,
  formData: FormData
): Promise<FreeReviewActionResult> {
  const h = await headers();
  const ip = getClientIp(h);

  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return {
      ok: false,
      error: "Too many submissions. Please try again in a few minutes.",
    };
  }

  const raw = {
    fullName: formData.get("fullName")?.toString() ?? "",
    businessName: formData.get("businessName")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    amazonSellerId: formData.get("amazonSellerId")?.toString() ?? "",
    productCategory: formData.get("productCategory")?.toString() ?? "",
    productDescription: formData.get("productDescription")?.toString() ?? "",
    website: formData.get("website")?.toString() ?? "",
  };

  const parsed = freeReviewFormSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      error: "Please correct the errors below and try again.",
      fieldErrors,
    };
  }

  if (parsed.data.website) {
    return { ok: true };
  }

  const fileEntries = formData.getAll("documents");
  const files: File[] = fileEntries.filter(
    (entry): entry is File => entry instanceof File && entry.size > 0
  );

  const fileCheck = validateUploadedFiles(files);
  if (!fileCheck.ok) {
    return { ok: false, error: fileCheck.error };
  }

  const attachments = await Promise.all(
    files.map(async (f) => ({
      filename: f.name,
      content: Buffer.from(await f.arrayBuffer()),
    }))
  );

  const rendered = freeReviewEmail({
    fullName: parsed.data.fullName,
    businessName: parsed.data.businessName,
    email: parsed.data.email,
    phone: parsed.data.phone || undefined,
    amazonSellerId: parsed.data.amazonSellerId || undefined,
    productCategory: parsed.data.productCategory,
    productDescription: parsed.data.productDescription,
    fileSummaries: files.map((f) => ({ name: f.name, sizeKb: f.size / 1024 })),
  });

  const result = await sendLeadEmail({
    subject: rendered.subject,
    html: rendered.html,
    text: rendered.text,
    replyTo: parsed.data.email,
    attachments,
  });

  if (!result.ok) {
    return {
      ok: false,
      error: `We couldn't send your submission. Please email us directly at ${siteConfig.contactEmail}.`,
    };
  }
  return { ok: true };
}
```

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes.

## Task 3.4: Rewrite `app/free-validation/page.tsx` to use the server action

**Files:**
- Modify: `app/free-validation/page.tsx` (full rewrite of the form portion)

- [ ] **Step 1: Read the current file**

Read the current `app/free-validation/page.tsx` to capture its layout/styling. The new file preserves the same overall visual structure (Navbar, hero with copy, multi-step shell) but replaces the simulated submit with a real `<form action={serverAction}>`.

- [ ] **Step 2: Replace with new implementation**

```tsx
"use client";

import { useActionState, useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, FileText, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatFileSize } from "@/lib/utils";
import {
  ACCEPTED_FILE_EXTENSIONS,
  MAX_FILE_SIZE,
  MAX_TOTAL_UPLOAD_SIZE,
  MAX_FILE_COUNT,
} from "@/lib/constants";
import { submitFreeReview, type FreeReviewActionResult } from "./actions";

export default function FreeValidationPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [clientError, setClientError] = useState<string | null>(null);
  const [state, formAction, isPending] = useActionState<
    FreeReviewActionResult | null,
    FormData
  >(submitFreeReview, null);

  function addFiles(newFiles: FileList | null) {
    if (!newFiles) return;
    setClientError(null);
    const merged = [...files, ...Array.from(newFiles)];
    if (merged.length > MAX_FILE_COUNT) {
      setClientError(`You can attach up to ${MAX_FILE_COUNT} files.`);
      return;
    }
    let total = 0;
    for (const f of merged) {
      if (f.size > MAX_FILE_SIZE) {
        setClientError(`${f.name} exceeds the 10 MB per-file limit.`);
        return;
      }
      total += f.size;
    }
    if (total > MAX_TOTAL_UPLOAD_SIZE) {
      setClientError("Total upload size exceeds the 25 MB limit.");
      return;
    }
    setFiles(merged);
  }

  function removeFile(idx: number) {
    setFiles(files.filter((_, i) => i !== idx));
  }

  function handleSubmit(formData: FormData) {
    formData.delete("documents");
    files.forEach((f) => formData.append("documents", f));
    formAction(formData);
  }

  if (state?.ok) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-600" />
            <h1 className="text-2xl font-bold text-green-900">
              Thanks — your documents are on their way to our team.
            </h1>
            <p className="mt-3 text-green-800">
              A real ex-Amazonian will review your case personally and come back
              to you with a clear, honest picture of what is wrong and what the
              path forward looks like.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-[#1E293B] sm:text-4xl">
            Submit your documents for a free review
          </h1>
          <p className="mt-3 text-lg text-[#475569]">
            No automated responses. No guesswork. A real ex-Amazonian will review
            your case personally. No obligation. We review first, then talk.
          </p>
        </motion.div>

        <form action={handleSubmit} className="mt-10 space-y-5" noValidate>
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            aria-hidden="true"
          />

          <Field label="Full name" name="fullName" required error={state?.fieldErrors?.fullName} />
          <Field label="Business name" name="businessName" required error={state?.fieldErrors?.businessName} />
          <Field label="Email address" name="email" type="email" required error={state?.fieldErrors?.email} />
          <Field label="Phone number (optional)" name="phone" type="tel" error={state?.fieldErrors?.phone} />
          <Field label="Amazon Seller ID or Store URL (optional)" name="amazonSellerId" error={state?.fieldErrors?.amazonSellerId} />
          <Field label="Product category" name="productCategory" required error={state?.fieldErrors?.productCategory} />

          <div>
            <label className="block text-sm font-medium text-[#1E293B]">
              Describe your situation <span className="text-red-500">*</span>
            </label>
            <textarea
              name="productDescription"
              required
              rows={5}
              placeholder="Tell us about your product, the rejection notices you've received, and any case history."
              className="mt-1 block w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#1E293B] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
            />
            {state?.fieldErrors?.productDescription && (
              <p className="mt-1 text-xs text-red-600">{state.fieldErrors.productDescription}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E293B]">
              Attach your compliance documents and Amazon notifications
            </label>
            <p className="mt-1 text-xs text-[#64748B]">
              PDF, JPG, PNG, DOC, DOCX. Up to {MAX_FILE_COUNT} files,
              10 MB each, 25 MB total.
            </p>
            <label className="mt-2 flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-6 py-8 transition-colors duration-200 hover:border-[#2563EB] hover:bg-[#F1F5F9]">
              <Upload className="mr-2 h-5 w-5 text-[#475569]" />
              <span className="text-sm font-medium text-[#475569]">Choose files</span>
              <input
                type="file"
                multiple
                accept={ACCEPTED_FILE_EXTENSIONS}
                className="hidden"
                onChange={(e) => addFiles(e.target.files)}
              />
            </label>

            {files.length > 0 && (
              <ul className="mt-3 space-y-2">
                {files.map((f, i) => (
                  <li
                    key={`${f.name}-${i}`}
                    className="flex items-center justify-between rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm"
                  >
                    <span className="flex items-center gap-2 text-[#1E293B]">
                      <FileText className="h-4 w-4 text-[#475569]" />
                      {f.name}
                      <span className="text-xs text-[#64748B]">({formatFileSize(f.size)})</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="cursor-pointer text-[#64748B] transition-colors duration-200 hover:text-red-600"
                      aria-label={`Remove ${f.name}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {clientError && <p className="mt-2 text-xs text-red-600">{clientError}</p>}
          </div>

          {state?.ok === false && !state.fieldErrors && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="cursor-pointer rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1D4ED8] disabled:opacity-60"
          >
            {isPending ? "Sending..." : "Submit for free review →"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#1E293B]">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-1 block w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#1E293B] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
```

- [ ] **Step 3: Verify `formatFileSize` exists in `lib/utils.ts`**

Run `grep formatFileSize lib/utils.ts`. If absent, add this export to `lib/utils.ts`:
```ts
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
```

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes. `npm run build` succeeds. Phase 3 complete.

## Task 3.5: Phase 3 smoke test

- [ ] **Step 1: Set environment variables**

Create `.env.local` (gitignored, not committed):
```
RESEND_API_KEY=<test key from resend.com>
RESEND_FROM_EMAIL=onboarding@resend.dev
LEAD_INBOX_EMAIL=<your test inbox>
```

- [ ] **Step 2: Run dev server, submit both forms**

```bash
npm run dev
```
Visit `/contact`, fill in valid data, submit. Expect: success message renders, email arrives in `LEAD_INBOX_EMAIL`.
Visit `/free-validation`, fill in valid data, attach a small PDF, submit. Expect: success message renders, email with attachment arrives.

- [ ] **Verification checkpoint:** Both forms work end-to-end. Phase 3 complete.

---

# Phase 4 — Design system foundation

**Goal:** Build the typography, color tokens, shared atoms, and tactical chrome that every page in Phase 5 will compose. End state: design system files exist and the home page renders a placeholder using the new system, even if other pages still show old copy.

## Task 4.1: Install Geist via `next/font/google` and define color tokens

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Update `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TacticalShell from "@/components/layout/TacticalShell";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
  weight: ["400", "500", "600", "700", "900"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Amazon Safety Pro — Compliance handled by people who built the rules",
  description:
    "Amazon product safety and ASIN reinstatement, led by ex-Amazonians who built the rules.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="bg-[var(--paper)] text-[var(--ink)] antialiased">
        <TacticalShell>{children}</TacticalShell>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Replace `app/globals.css`**

```css
@import "tailwindcss";

:root {
  --paper: #F7F7F4;
  --paper-edge: #EFEEE9;
  --ink: #0A0E14;
  --ink-2: #1E2330;
  --ink-3: #5A6173;
  --rule: #D8D6CF;
  --signal: #1F40FF;
  --signal-soft: #E5EAFF;
  --alert: #FF5722;
  --ok: #00875A;

  --font-sans: var(--font-geist), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, "SFMono-Regular", monospace;
}

@theme inline {
  --color-paper: var(--paper);
  --color-paper-edge: var(--paper-edge);
  --color-ink: var(--ink);
  --color-ink-2: var(--ink-2);
  --color-ink-3: var(--ink-3);
  --color-rule: var(--rule);
  --color-signal: var(--signal);
  --color-signal-soft: var(--signal-soft);
  --color-alert: var(--alert);
  --color-ok: var(--ok);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
}

html, body {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

/* Paper grain overlay — applied to body via TacticalShell */
.paper-grain::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  opacity: 0.05;
  mix-blend-mode: multiply;
}

/* Custom cursor — desktop only */
@media (hover: hover) and (pointer: fine) {
  body.tactical-cursor {
    cursor: none;
  }
}

/* Inline tactical link underline */
.signal-link {
  text-decoration: underline;
  text-decoration-style: dashed;
  text-decoration-color: var(--signal);
  text-underline-offset: 4px;
}
.signal-link:hover {
  color: var(--signal);
}

/* Selection */
::selection {
  background: var(--signal);
  color: var(--paper);
}

/* Scrollbar — minimal */
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: var(--paper); }
::-webkit-scrollbar-thumb { background: var(--rule); border-radius: 0; }
::-webkit-scrollbar-thumb:hover { background: var(--ink-3); }
```

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes (will fail if `TacticalShell` doesn't exist yet — that's fine; it's created in Task 4.2).

## Task 4.2: Create `<TacticalShell>` chrome wrapper

**Files:**
- Create: `components/layout/TacticalShell.tsx`

- [ ] **Step 1: Write the file**

`<TacticalShell>` is the root visual chrome for every page. It provides:
- The 4px instrument-panel frame border around the viewport
- The grain overlay
- The page-load `--signal` bar wipe at the top
- The custom crosshair cursor (desktop only)
- The cursor-tracking gradient mesh in the background

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TacticalShell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, hover: false });

  useEffect(() => {
    setMounted(true);
    document.body.classList.add("tactical-cursor");

    function move(e: MouseEvent) {
      setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }));
    }
    function over(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, label");
      setCursor((c) => ({ ...c, hover: !!interactive }));
    }
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.body.classList.remove("tactical-cursor");
    };
  }, []);

  return (
    <div className="paper-grain relative min-h-screen">
      {/* Cursor-following gradient mesh */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-60 transition-opacity"
        style={{
          background: `radial-gradient(600px circle at ${cursor.x}px ${cursor.y}px, var(--signal-soft) 0%, transparent 60%)`,
        }}
      />

      {/* Instrument-panel frame */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-1 z-30 border border-[var(--rule)]"
      />
      {/* Corner brackets */}
      <CornerBrackets />

      {/* Page-load signal bar */}
      <AnimatePresence>
        {mounted && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-[var(--signal)]"
          />
        )}
      </AnimatePresence>

      {/* Custom crosshair cursor */}
      <div
        aria-hidden
        className="pointer-events-none fixed z-50 hidden md:block"
        style={{
          left: cursor.x,
          top: cursor.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {cursor.hover ? (
          <div className="h-3 w-3 bg-[var(--signal)]" />
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="7" y1="0" x2="7" y2="14" stroke="var(--ink)" strokeWidth="1" />
            <line x1="0" y1="7" x2="14" y2="7" stroke="var(--ink)" strokeWidth="1" />
          </svg>
        )}
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

function CornerBrackets() {
  const stroke = "var(--ink)";
  return (
    <>
      {/* Top-left */}
      <svg
        aria-hidden
        className="pointer-events-none fixed left-2 top-2 z-40"
        width="16"
        height="16"
      >
        <path d="M 0 8 L 0 0 L 8 0" stroke={stroke} strokeWidth="1.5" fill="none" />
      </svg>
      {/* Top-right */}
      <svg
        aria-hidden
        className="pointer-events-none fixed right-2 top-2 z-40"
        width="16"
        height="16"
      >
        <path d="M 8 0 L 16 0 L 16 8" stroke={stroke} strokeWidth="1.5" fill="none" />
      </svg>
      {/* Bottom-left */}
      <svg
        aria-hidden
        className="pointer-events-none fixed bottom-2 left-2 z-40"
        width="16"
        height="16"
      >
        <path d="M 0 8 L 0 16 L 8 16" stroke={stroke} strokeWidth="1.5" fill="none" />
      </svg>
      {/* Bottom-right */}
      <svg
        aria-hidden
        className="pointer-events-none fixed bottom-2 right-2 z-40"
        width="16"
        height="16"
      >
        <path d="M 8 16 L 16 16 L 16 8" stroke={stroke} strokeWidth="1.5" fill="none" />
      </svg>
    </>
  );
}
```

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes.

## Task 4.3: Build shared design-system atoms

**Files:**
- Create: `components/ui/MonoLabel.tsx`
- Create: `components/ui/StatusPill.tsx`
- Create: `components/ui/NumberMarker.tsx`
- Create: `components/ui/FramedBlock.tsx`
- Create: `components/ui/RevealOnScroll.tsx`
- Create: `components/ui/CountUp.tsx`
- Create: `components/ui/TypeIn.tsx`
- Create: `components/ui/TacticalButton.tsx`
- Create: `components/ui/HairlineDivider.tsx`
- Create: `components/ui/TransmissionRow.tsx`

- [ ] **Step 1: `components/ui/MonoLabel.tsx`**

```tsx
import { cn } from "@/lib/utils";

export default function MonoLabel({
  children,
  prefix,
  className,
}: {
  children: React.ReactNode;
  prefix?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-3)]",
        className
      )}
    >
      {prefix && <span className="mr-1.5 text-[var(--signal)]">{prefix}</span>}
      {children}
    </span>
  );
}
```

If `lib/utils.ts` doesn't already export `cn`, add:
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
(`clsx` and `tailwind-merge` are already in `package.json`.)

- [ ] **Step 2: `components/ui/StatusPill.tsx`**

```tsx
type Tone = "default" | "ok" | "alert" | "signal";

const TONES: Record<Tone, string> = {
  default: "border-[var(--rule)] text-[var(--ink-2)]",
  ok: "border-[var(--ok)] text-[var(--ok)]",
  alert: "border-[var(--alert)] text-[var(--alert)]",
  signal: "border-[var(--signal)] text-[var(--signal)]",
};

export default function StatusPill({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${TONES[tone]}`}
    >
      <span>[</span>
      <span>{children}</span>
      <span>]</span>
    </span>
  );
}
```

- [ ] **Step 3: `components/ui/NumberMarker.tsx`**

```tsx
export default function NumberMarker({
  n,
  total,
  tone = "alert",
}: {
  n: number;
  total?: number;
  tone?: "alert" | "ink" | "signal";
}) {
  const color =
    tone === "alert" ? "text-[var(--alert)]" : tone === "signal" ? "text-[var(--signal)]" : "text-[var(--ink)]";
  const label = `${n.toString().padStart(2, "0")}${total ? ` / ${total.toString().padStart(2, "0")}` : ""}`;
  return (
    <span className={`font-mono text-xs tracking-widest ${color}`}>
      [ {label} ]
    </span>
  );
}
```

- [ ] **Step 4: `components/ui/FramedBlock.tsx`**

```tsx
import { cn } from "@/lib/utils";

export default function FramedBlock({
  children,
  className,
  bracketColor = "var(--ink)",
}: {
  children: React.ReactNode;
  className?: string;
  bracketColor?: string;
}) {
  return (
    <div className={cn("relative px-6 py-6", className)}>
      <Bracket position="tl" color={bracketColor} />
      <Bracket position="tr" color={bracketColor} />
      <Bracket position="bl" color={bracketColor} />
      <Bracket position="br" color={bracketColor} />
      {children}
    </div>
  );
}

function Bracket({
  position,
  color,
}: {
  position: "tl" | "tr" | "bl" | "br";
  color: string;
}) {
  const pos = {
    tl: "left-0 top-0",
    tr: "right-0 top-0 rotate-90",
    bl: "left-0 bottom-0 -rotate-90",
    br: "right-0 bottom-0 rotate-180",
  }[position];
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      className={`pointer-events-none absolute ${pos}`}
    >
      <path d="M 0 8 L 0 0 L 8 0" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}
```

- [ ] **Step 5: `components/ui/RevealOnScroll.tsx`**

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function RevealOnScroll({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1], delay }}
        className="mb-6 h-px origin-left bg-[var(--rule)]"
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: delay + 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 6: `components/ui/CountUp.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useSpring, useTransform } from "framer-motion";

export default function CountUp({
  to,
  duration = 1.4,
  suffix = "",
  className,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  const spring = useSpring(0, {
    stiffness: 60,
    damping: 14,
    duration: duration * 1000,
  });
  const rounded = useTransform(spring, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView) spring.set(to);
  }, [inView, to, spring]);

  useEffect(() => {
    return rounded.on("change", (v) => setDisplay(v));
  }, [rounded]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 7: `components/ui/TypeIn.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";

export default function TypeIn({
  text,
  speed = 18,
  className,
  startDelay = 0,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
}) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const start = setTimeout(() => {
      function step() {
        setShown((s) => {
          if (s >= text.length) return s;
          id = setTimeout(step, speed);
          return s + 1;
        });
      }
      step();
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(id);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={className}>
      {text.slice(0, shown)}
      <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-[var(--signal)]" />
    </span>
  );
}
```

- [ ] **Step 8: `components/ui/TacticalButton.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BaseProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

interface ButtonProps extends BaseProps {
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  href?: never;
}

interface LinkProps extends BaseProps {
  href: string;
  type?: never;
  onClick?: never;
  disabled?: never;
}

export default function TacticalButton(props: ButtonProps | LinkProps) {
  const { children, variant = "primary", className } = props;

  const base = cn(
    "group relative inline-flex items-center gap-3 px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors",
    variant === "primary"
      ? "bg-[var(--ink)] text-[var(--paper)]"
      : "border border-[var(--ink)] text-[var(--ink)]",
    className
  );

  const inner = (
    <>
      {/* Sliding signal square */}
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 h-full w-2 bg-[var(--signal)]"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.2 }}
      />
      <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-2">
        {children}
      </span>
      <span className="relative z-10">→</span>
      {/* Hard-shadow outline (offset 3px) */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 translate-x-[3px] translate-y-[3px] border border-[var(--ink)]"
      />
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={base}>
        {inner}
      </Link>
    );
  }
  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(base, props.disabled && "opacity-60")}
    >
      {inner}
    </button>
  );
}
```

- [ ] **Step 9: `components/ui/HairlineDivider.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";

export default function HairlineDivider({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        className="h-px flex-1 origin-left bg-[var(--rule)]"
      />
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-3)]">
          {label}
        </span>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: 0.05 }}
        className="h-px flex-1 origin-right bg-[var(--rule)]"
      />
    </div>
  );
}
```

- [ ] **Step 10: `components/ui/TransmissionRow.tsx`**

```tsx
export default function TransmissionRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-[var(--rule)] py-2 last:border-b-0">
      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-3)]">
        {label}
      </span>
      <span className="font-mono text-xs text-[var(--ink)]">{value}</span>
    </div>
  );
}
```

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes for all atoms. Run `npm run build` to confirm. Phase 4 complete.

---

# Phase 5 — Page rebuilds

**Goal:** Rebuild every retained marketing page using the design system from Phase 4. Content is verbatim from the docx files. Each page composes shared atoms, applies the layout pattern from the spec, and uses Framer Motion for the prescribed reveals.

**Method for every page rebuild:**
1. Extract the relevant docx section (`unzip -p ... | python3 -c "..."` from Phase 4 of the original plan, kept in conventions section above).
2. Decompose the page into sections matching the spec's "Layout patterns."
3. Compose each section from shared atoms (`<MonoLabel>`, `<NumberMarker>`, `<FramedBlock>`, etc.) plus inline JSX.
4. Wrap visible sections in `<RevealOnScroll>` for the line-draw + fade-up entry.
5. Replace any deleted home components that won't be reused. Old components in `components/home/*` should be deleted and replaced with new section components in `components/sections/`, named after their role (`HeroSection`, `ProcessSection`, etc.).
6. Run `npx tsc --noEmit` and visit the page in dev for a visual diff.

## Task 5.0: Delete legacy home components

**Files:**
- Delete: `components/home/Hero.tsx`, `HowItWorks.tsx`, `SelfGuideCTA.tsx`, `ServicesGrid.tsx`, `Stats.tsx`, `TrustBadges.tsx`
- Keep: `components/home/ThreeScene.tsx` (decision deferred to Task 5.1)

- [ ] **Step 1: Delete the files**

```bash
rm components/home/Hero.tsx components/home/HowItWorks.tsx \
   components/home/SelfGuideCTA.tsx components/home/ServicesGrid.tsx \
   components/home/Stats.tsx components/home/TrustBadges.tsx
```

- [ ] **Step 2: Create `components/sections/` directory**

```bash
mkdir -p components/sections
```

- [ ] **Verification checkpoint:** `ls components/home` shows only `ThreeScene.tsx`. `tsc --noEmit` will currently fail because `app/page.tsx` still imports the deleted components — fixed in Task 5.1.

## Task 5.1: Rebuild `/` (home)

**Files:**
- Modify: `app/page.tsx`
- Create: `components/sections/HeroSection.tsx`
- Create: `components/sections/SoundFamiliarSection.tsx`
- Create: `components/sections/ProcessSection.tsx`
- Create: `components/sections/CapabilitiesSection.tsx`
- Create: `components/sections/RestoredSection.tsx`
- Create: `components/sections/WhyUsSection.tsx`
- Create: `components/sections/DifferenceSection.tsx`
- Create: `components/sections/HomeCTASection.tsx`

**Source:** §1 Home Page from `AmazonSafetyPro_WebsiteContent_Final.docx`

- [ ] **Step 1: Extract §1 docx text** (see Phase 4 method in original plan).

- [ ] **Step 2: Build `HeroSection`**

The hero is the brand moment. Asymmetric 12-col grid. Left 8 cols: status pill row, mono micro-label `→ AMAZON COMPLIANCE OPS`, the 96px headline ("Amazon Safety & Compliance — Handled by People Who Built the Rules."), the sub-paragraph ("Amazon Safety Pro is led by ex-Amazonians..."), CTA button "Submit your documents for a free review". Right 4 cols: a `<FramedBlock>` titled "TRANSMISSION" with `<TransmissionRow>` items: `STATUS / ACTIVE`, `RESPONSE TIME / < 1 BUSINESS DAY`, `JURISDICTIONS / 7`, `LEAD / TENURED EX-AMAZONIAN`. Below it, a small SVG grid pattern that drifts slowly using Framer Motion.

Hero animation orchestration:
- `<TypeIn>` for the mono micro-label (starts 200ms after mount)
- Headline split by word, each `motion.span` with `initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}` and stagger 0.05s, starting at 400ms
- Sub-paragraph fades in at 1.2s
- CTA fades + slides up at 1.4s
- Status pills fade in at 100ms each, starting at 0ms
- Right column TRANSMISSION block fades in at 1.0s
- All on first mount, not scroll-triggered (this is above the fold)

- [ ] **Step 3: Build remaining home sections**

Each home section uses `<RevealOnScroll>` and follows the same composition style. Render them top to bottom in `app/page.tsx`:
1. `<HeroSection />`
2. `<SoundFamiliarSection />` — three rejection quotes in a stacked layout, each in its own `<FramedBlock>` with bracket color `--alert`. Below: the "If you have been going back and forth..." paragraph, then the bridge "This is exactly where we come in." paragraph.
3. `<ProcessSection />` — heading "OUR PROCESS" via `<HairlineDivider label="OUR PROCESS" />`. Six numbered steps `[ 01 ]` to `[ 06 ]` rendered as a 2-col grid with `<NumberMarker>` and the verbatim docx text for each step.
4. `<CapabilitiesSection />` — the "Where required, our team can also prepare and create..." paragraph plus the four bulleted services (CPC, DOC/GCC, Document validation, Product safety document validation). Render as a 2x2 grid of cards with mono labels.
5. `<RestoredSection />` — the "From restricted to reinstated" paragraph, full-width, centered, with a large pull-quote treatment for the closing line "We know what Amazon's teams look for, because we were those teams."
6. `<WhyUsSection />` — heading via `<HairlineDivider label="WHY AMAZON SAFETY PRO" />`. Four sub-sections from §1 ("We know what Amazon's team actually looks for", "We spot the missing requirement", "We decode Amazon's language", "We know the reinstatement path"), each with a mono micro-label and body paragraph in a 2-col grid.
7. `<DifferenceSection />` — the four-bullet "The Amazon Safety Pro difference" list, each row with a `<NumberMarker>` and verbatim text.
8. `<HomeCTASection />` — full-width framed CTA: heading "Tired of rejections with no answers? Start here.", the two paragraphs from §1's final block, primary `<TacticalButton href="/free-validation">` "Submit your documents for a free review", italic mono "// NO OBLIGATION. WE REVIEW FIRST, THEN TALK." below.

Compose `app/page.tsx`:
```tsx
import HeroSection from "@/components/sections/HeroSection";
import SoundFamiliarSection from "@/components/sections/SoundFamiliarSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import RestoredSection from "@/components/sections/RestoredSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import DifferenceSection from "@/components/sections/DifferenceSection";
import HomeCTASection from "@/components/sections/HomeCTASection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SoundFamiliarSection />
        <ProcessSection />
        <CapabilitiesSection />
        <RestoredSection />
        <WhyUsSection />
        <DifferenceSection />
        <HomeCTASection />
      </main>
      <Footer />
    </>
  );
}
```

(Navbar and Footer get rebuilt in Phase 6; for now they may still have old styles, that's acceptable.)

- [ ] **Step 4: Decision on `ThreeScene.tsx`**

Run `grep -r "ThreeScene" components/sections app/page.tsx`. If no references, delete `components/home/ThreeScene.tsx` and remove `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` from `package.json` (the new hero uses an SVG grid pattern, not a 3D scene). If you decide to keep a 3D atmosphere element, integrate it into `HeroSection` instead.

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes. `npm run dev`, visit `/`, every section visible, hero animations play once, scroll reveals trigger as you scroll, no console errors.

## Task 5.2: Rebuild `/about`

**Files:**
- Modify: `app/about/page.tsx`
- Create: `components/sections/AboutDossierSection.tsx`

**Source:** §3 About Us — "Who We Are", "Why We Started Amazon Safety Pro", "What Our Team Brings" (4 sub-sections), "Our Mission"

- [ ] **Step 1: Extract §3 docx.**

- [ ] **Step 2: Build the dossier layout**

`app/about/page.tsx`:
```tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutDossierSection from "@/components/sections/AboutDossierSection";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutDossierSection />
      </main>
      <Footer />
    </>
  );
}
```

`AboutDossierSection`:
- Two-column layout (`grid lg:grid-cols-12`).
- **Left (4 cols, sticky):** A `<FramedBlock>` titled "RECORD" with `<TransmissionRow>`s:
  - `ENTITY / PROXIMA CPEX LLC`
  - `BRAND / AMAZON SAFETY PRO`
  - `LOCATION / TAMIL NADU, IN`
  - `LED BY / TENURED EX-AMAZONIAN`
  - `EXPERIENCE / 5+ YRS INSIDE AMAZON`
  - `JURISDICTIONS / 7`
  Below the framed block: `<MonoLabel prefix="→">FILE OPENED 2026</MonoLabel>`.
- **Right (8 cols):** Four narrative sections, each with `<HairlineDivider label="..."/>` and verbatim docx prose:
  - `→ MISSION` — paragraph from "Our Mission" + the mission quote rendered as a `<FramedBlock>` pull quote
  - `→ ORIGIN` — "Why We Started Amazon Safety Pro" paragraphs verbatim
  - `→ TEAM` — "What Our Team Brings" four sub-sections, each with a `<NumberMarker>` + sub-heading + body
  - `→ INTRODUCTION` — "Who We Are" intro paragraphs, ending with the "We are Amazon Safety Pro..." quote in a `<FramedBlock>`
- Below the grid: a full-width `<RevealOnScroll>` CTA section with the "Submit your documents for a free review →" button.

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes; visit `/about`, dossier renders, sticky left column behaves correctly on scroll.

## Task 5.3: Rebuild `/services`

**Files:**
- Modify: `app/services/page.tsx`
- Create: `components/sections/ServicesIntroSection.tsx`
- Create: `components/sections/ServiceCard.tsx`
- Create: `components/sections/ServicesGridSection.tsx`

**Source:** §5 Services intro + §5a–§5e

- [ ] **Step 1: Extract §5 docx.**

- [ ] **Step 2: Build the services components**

`ServicesIntroSection`: hero block with `<MonoLabel prefix="→">SERVICES // 05</MonoLabel>`, 72px headline "Services", verbatim §5 intro paragraph, status pills row.

`ServiceCard`: takes `{ number, title, blurb, what, who?, includes, inquiry }` props. Renders:
- `<NumberMarker n={number} total={5} />` top-left
- Service title (h3, large sans)
- "What is..." paragraph
- "Who needs..." paragraph (if present)
- "What our ... service includes" — verbatim bulleted list, each bullet prefixed with mono `→`
- `<TacticalButton href={`/contact?inquiry=${inquiry}`}>` "Request Quote"
- Wrapped in a `<FramedBlock>` that lifts on hover (border swaps to `--signal`)

`ServicesGridSection`: maps over an array of 5 service definitions sourced from §5a–§5e and renders one `<ServiceCard>` per item, each in its own `<RevealOnScroll>` with a stagger delay based on index.

The 5 services with their `inquiry` values:
1. CPC Creation → `cpc_doc_gcc_creation`
2. DOC / GCC Creation → `cpc_doc_gcc_creation`
3. Document Validation → `document_validation`
4. Product Safety Document Validation → `document_validation`
5. Reinstate Stranded ASIN → `stranded_asin_reinstatement`

**The full body text for each service must be pasted verbatim from §5a–§5e — including the "What is...", "Who needs...", and "What our ... service includes" bulleted lists. Do not paraphrase.**

- [ ] **Step 3: Update `ContactForm` to read `?inquiry=` query param** (same as the original plan's Task 4.3 — wrap in `<Suspense>` because of `useSearchParams`).

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes; visit `/services`, all five cards render with full content, clicking a Request Quote button lands on `/contact` with the matching inquiry pre-selected.

## Task 5.4: Rebuild `/safety-guide`

**Files:**
- Modify: `app/safety-guide/page.tsx`
- Create: `components/sections/SafetyGuideLayout.tsx`
- Create: `components/sections/SafetyGuideTOC.tsx`

**Source:** §4 + §4a + §4b (US, Canada, EU) + §4c i–iv (full TIC subsection)

This is the longest content page (~5,000 words). Extreme content fidelity required.

- [ ] **Step 1: Extract §4 docx.**

- [ ] **Step 2: Build `SafetyGuideTOC`**

A sticky left nav (3 cols) with mono section markers and active-section highlight:
```
[ 4a ] WHAT IS PRODUCT SAFETY
[ 4b ] GLOBAL POLICIES
[ 4c·i ] PRODUCTS REQUIRING DOCS
[ 4c·ii ] RESTRICTED PRODUCTS
[ 4c·iii ] DANGEROUS GOODS
[ 4c·iv ] AMAZON TIC POLICY
```
Use `IntersectionObserver` to detect the in-view section and apply `--signal` text color + a left bar highlight.

- [ ] **Step 3: Build `SafetyGuideLayout`**

12-col grid: 3-col TOC (sticky, top-24), 9-col content. Each major section (`#section-4a`, `#section-4b`, etc.) is a `<RevealOnScroll>` with verbatim docx body. Sub-sections use `<HairlineDivider label="..."/>`. Examples (mermaid tails, mouth tape) get rendered as `<FramedBlock>` callouts. The TIC numbered process steps render as a numbered list with `<NumberMarker>` for each step.

At the end of §4a (after "real-world cases" paragraph), insert a framed CTA block linking to `/self-guide`:
```tsx
<FramedBlock bracketColor="var(--signal)" className="my-12">
  <MonoLabel prefix="→">INTERACTIVE TOOL</MonoLabel>
  <h3 className="mt-3 text-2xl font-semibold">
    Try our interactive Product Safety checker
  </h3>
  <p className="mt-2 text-[var(--ink-2)]">
    Walk through a quick decision tree to identify what compliance requirements
    apply to your product.
  </p>
  <TacticalButton href="/self-guide" variant="secondary" className="mt-6">
    Open Self-Guide
  </TacticalButton>
</FramedBlock>
```
**This is the only link to `/self-guide` in the entire site.**

- [ ] **Step 4: Verbatim content paste**

For each section §4a, §4b, §4c·i, §4c·ii, §4c·iii, §4c·iv, paste the full text from the docx. The TIC section especially has many specifics — TRF ID, ASTM F963-23, TIC providers list (SGS, Bureau Veritas, Intertek, UL Solutions, NSF International, Mérieux NutriSciences) — none can be omitted or paraphrased.

`app/safety-guide/page.tsx`:
```tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SafetyGuideLayout from "@/components/sections/SafetyGuideLayout";

export default function SafetyGuidePage() {
  return (
    <>
      <Navbar />
      <main>
        <SafetyGuideLayout />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes; every paragraph from §4 visible; TOC highlights the in-view section as you scroll; CTA block links to `/self-guide`.

## Task 5.5: Rebuild `/pricing` as Request a Quote

**Files:**
- Modify: `app/pricing/page.tsx`
- Delete: `app/pricing/PricingCards.tsx` (replaced by `ServicesGridSection` from Task 5.3)

- [ ] **Step 1: Rewrite the page**

```tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HairlineDivider from "@/components/ui/HairlineDivider";
import MonoLabel from "@/components/ui/MonoLabel";
import FramedBlock from "@/components/ui/FramedBlock";
import TacticalButton from "@/components/ui/TacticalButton";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ServicesGridSection from "@/components/sections/ServicesGridSection";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-12">
        <RevealOnScroll>
          <MonoLabel prefix="→">QUOTE PROTOCOL</MonoLabel>
          <h1 className="mt-4 max-w-4xl font-sans text-5xl font-black leading-[1.05] tracking-tight text-[var(--ink)] sm:text-6xl">
            Request a Quote
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--ink-2)]">
            Our services are offered on a fixed-fee or hourly basis, agreed and
            communicated to you in writing prior to engagement. Tell us about
            your case and we&rsquo;ll come back with a quotation tailored to
            your specific situation.
          </p>
        </RevealOnScroll>

        <div className="mt-16">
          <HairlineDivider label="AVAILABLE SERVICES" />
        </div>

        <div className="mt-12">
          <ServicesGridSection />
        </div>

        <RevealOnScroll className="mt-24">
          <FramedBlock bracketColor="var(--signal)" className="text-center">
            <MonoLabel prefix="→">FREE FIRST REVIEW</MonoLabel>
            <h2 className="mt-3 text-3xl font-semibold">
              Not sure which service you need?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[var(--ink-2)]">
              Submit your documents for a free review and our team will guide you.
            </p>
            <div className="mt-8 flex justify-center">
              <TacticalButton href="/free-validation">
                Submit for a free review
              </TacticalButton>
            </div>
          </FramedBlock>
        </RevealOnScroll>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes; visit `/pricing`, all five service cards render, no prices shown.

## Task 5.6: Rebuild `/contact`

**Files:**
- Modify: `app/contact/page.tsx`
- Create: `components/sections/ContactSplitSection.tsx`
- Modify: `app/contact/ContactForm.tsx` (restyle in design system; functional behavior from Phase 3 is preserved)

**Source:** §2 Contact Us

- [ ] **Step 1: Extract §2 docx.**

- [ ] **Step 2: Restyle `ContactForm.tsx`**

Keep the server-action wiring, `useActionState`, honeypot, and field structure from Phase 3. Replace all visual styling: every input becomes a paper-edged box with hairline border, focus state swaps border to `--signal`, labels are `<MonoLabel>` style, the submit button is a `<TacticalButton type="submit">` reading "TRANSMIT MESSAGE". The success state replaces the form with a `<FramedBlock>` showing `[ TRANSMITTED ]` status pill and confirmation copy.

- [ ] **Step 3: Build `ContactSplitSection`**

12-col grid:
- **Left (8 cols):** `<MonoLabel prefix="→">CONTACT // 02</MonoLabel>`, 64px headline "Get in Touch — We're Ready for Your Case", verbatim §2 intro paragraph, then `<ContactForm />` wrapped in `<Suspense>`.
- **Right (4 cols, sticky):** A `<FramedBlock>` titled "TRANSMISSION DETAILS" with `<TransmissionRow>`s: `RESPONSE / < 1 BUSINESS DAY`, `REVIEWED BY / EX-AMAZONIAN`, `CONFIDENTIALITY / STRICT`, `FIRST REVIEW / FREE`. Below it, the "Why sellers trust us" three bullets rendered as a mono checklist:
  ```
  [✓] RESPONSE WITHIN 1 BUSINESS DAY
  [✓] STRICT CONFIDENTIALITY ON ALL SELLER AND PRODUCT INFORMATION
  [✓] NO OBLIGATION — YOUR FIRST DOCUMENT REVIEW IS FREE
  ```

`app/contact/page.tsx`:
```tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSplitSection from "@/components/sections/ContactSplitSection";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactSplitSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes; submit a test message, email arrives.

## Task 5.7: Rebuild `/free-validation`

**Files:**
- Modify: `app/free-validation/page.tsx`

**Source:** §1 Home Page final CTA block ("Tired of rejections...") plus the existing form behavior from Phase 3.4

- [ ] **Step 1: Restyle the page**

Preserve the server action wiring from Phase 3.4 (`useActionState`, `submitFreeReview`, file validation, honeypot). Replace styling:
- Page header: `<MonoLabel prefix="→">FREE REVIEW PROTOCOL</MonoLabel>`, 64px headline "Tired of rejections with no answers? Start here.", the two §1 paragraphs verbatim, italic mono "// NO OBLIGATION. WE REVIEW FIRST, THEN TALK." below.
- Form section in a `<FramedBlock>` titled "PAYLOAD MANIFEST"
- Each form field uses the same styling pattern from Task 5.6 (mono labels, hairline-border inputs, focus signal)
- Upload zone: a dashed `--rule` border box with mono caps label "STAGE FILES FOR TRANSMISSION", icon, and click-to-upload behavior. On file add, files render as a manifest table:
  ```
  [STAGED] filename.pdf            128 KB    [×]
  [STAGED] another.docx            245 KB    [×]
  ```
  Each row uses `<StatusPill tone="ok">STAGED</StatusPill>`, mono filename, mono size from `formatFileSize`, and a remove button. Total size and count rendered below the manifest in a `<TransmissionRow>` style: `MANIFEST / 2 FILES · 373 KB`.
- Submit button: `<TacticalButton type="submit">` reading "TRANSMIT FOR REVIEW"
- Success state: replaces the page main with a `<FramedBlock>` showing `[ TRANSMITTED ]` pill, success heading, and confirmation copy from §1 ("If there is a viable path to reinstatement, we will walk you through it...").

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes; submit form with a small PDF, email arrives with attachment.

## Task 5.8: Rebuild `/privacy-policy`

**Files:**
- Modify: `app/privacy-policy/page.tsx`
- Create: `components/sections/LegalDocumentLayout.tsx` (reusable for `/terms` too)

**Source:** §7 Privacy Policy (sections 1–13)

- [ ] **Step 1: Extract §7 docx.**

- [ ] **Step 2: Build `LegalDocumentLayout`**

A reusable component that wraps a long-form legal document in the design system:
- Left sticky TOC (3 cols) with mono section numbers and active-section IntersectionObserver highlight (same pattern as Task 5.4 `SafetyGuideTOC`)
- Right (9 cols) long-form prose
- Each numbered section: `<RevealOnScroll>`, `<MonoLabel prefix="[NN]">{label}</MonoLabel>`, h2 title, body paragraphs, sub-sections with `<HairlineDivider>`, bullet lists with mono `→` prefix
- Page header: title, "Last updated:" in mono, optional legal-review note in a `<FramedBlock bracketColor="var(--alert)">`

```tsx
// components/sections/LegalDocumentLayout.tsx
"use client";

export interface LegalSection {
  id: string;
  number: string;
  title: string;
  body: React.ReactNode;
}

export default function LegalDocumentLayout({
  pageTitle,
  lastUpdated,
  warning,
  sections,
}: {
  pageTitle: string;
  lastUpdated: string;
  warning?: string;
  sections: LegalSection[];
}) {
  // Implementation: render header, TOC, sections grid as described above
  // (full implementation per the patterns established in Task 5.4)
}
```

- [ ] **Step 3: Compose `app/privacy-policy/page.tsx`**

Build the `sections` array of all 13 §7 subsections as React fragments containing verbatim docx prose. Replace `[INSERT BUSINESS EMAIL]`/`[INSERT WEBSITE URL]`/`[INSERT DATE]` with `{siteConfig.contactEmail}`/`{siteConfig.websiteUrl}`/`{siteConfig.privacyLastUpdated}`. Pass `warning="Legal review recommended: This policy covers 7 jurisdictions. We recommend having a qualified legal professional review this document before publishing."` and `lastUpdated={siteConfig.privacyLastUpdated}` as props.

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes; all 13 sections present verbatim; sticky TOC works; contact placeholders read from `siteConfig`.

## Task 5.9: Phase 5 build verification

- [ ] **Step 1: Type-check + lint + build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all three pass.

- [ ] **Step 2: Smoke-test every retained route in dev**

Visit `/`, `/about`, `/services`, `/safety-guide`, `/pricing`, `/contact`, `/free-validation`, `/privacy-policy`, `/self-guide`. Each renders without console errors. Visual check: every page uses the new design system; no leftover old styling on these pages.

---

# Phase 6 — Terms page + Navbar/Footer rebuild

## Task 6.1: Create `/terms`

**Files:**
- Create: `app/terms/page.tsx`

**Source:** `AmazonSafetyPro_TermsAndConditions_Final.docx` — sections 1–16 + closing legal note

- [ ] **Step 1: Extract the full T&C docx.**

- [ ] **Step 2: Compose using `LegalDocumentLayout`**

```tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LegalDocumentLayout, { type LegalSection } from "@/components/sections/LegalDocumentLayout";
import { siteConfig } from "@/lib/site-config";

export default function TermsPage() {
  const sections: LegalSection[] = [
    { id: "about-us", number: "01", title: "About Us", body: <>...</> },
    { id: "scope", number: "02", title: "Scope of Services", body: <>...</> },
    // ... all 16 sections
  ];

  return (
    <>
      <Navbar />
      <main>
        <LegalDocumentLayout
          pageTitle="Terms and Conditions of Service"
          lastUpdated={siteConfig.termsLastUpdated}
          warning="Legal review recommended: These Terms cover clients across 7 jurisdictions. We strongly recommend having a qualified legal professional review and validate this document before it is published or relied upon."
          sections={sections}
        />
      </main>
      <Footer />
    </>
  );
}
```

Each section's `body` contains verbatim T&C copy with sub-sections rendered as headings + paragraphs. Replace `[INSERT BUSINESS EMAIL]` and `[INSERT WEBSITE URL]` with `{siteConfig.contactEmail}` and `{siteConfig.websiteUrl}`. Use `{siteConfig.legalEntity}` and `{siteConfig.registeredAddress}` where the docx names "Proxima CPEX LLC" / "Tamil Nadu, India".

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes; visit `/terms`, all 16 sections present verbatim, TOC works.

## Task 6.2: Rebuild `components/layout/Navbar.tsx`

**Files:**
- Modify: `components/layout/Navbar.tsx` (full rebuild)

- [ ] **Step 1: Replace the file**

```tsx
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

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--rule)] bg-[var(--paper)]/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-baseline gap-3"
          aria-label="Amazon Safety Pro"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-3)] group-hover:text-[var(--signal)]">
            //
          </span>
          <span className="font-sans text-base font-bold tracking-tight text-[var(--ink)]">
            AMAZON SAFETY PRO
          </span>
          <StatusPill tone="ok">ACTIVE</StatusPill>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-[var(--ink-2)] transition-colors hover:text-[var(--signal)]"
              >
                <span className="mr-1 text-[var(--ink-3)] group-hover:text-[var(--signal)]">→</span>
                {link.label}
                {active && (
                  <span className="absolute bottom-1 left-3 right-3 h-px bg-[var(--signal)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <TacticalButton href="/free-validation">Free Review</TacticalButton>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-none border border-[var(--ink)] p-2 lg:hidden"
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
            className="overflow-hidden border-t border-[var(--rule)] bg-[var(--paper)] lg:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 font-mono text-xs uppercase tracking-widest text-[var(--ink-2)]"
                >
                  → {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <TacticalButton href="/free-validation">Free Review</TacticalButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes; navbar renders the new design across all routes; active route highlight works; mobile menu opens.

## Task 6.3: Rebuild `components/layout/Footer.tsx`

**Files:**
- Modify: `components/layout/Footer.tsx` (full rebuild)

- [ ] **Step 1: Replace the file**

```tsx
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import MonoLabel from "@/components/ui/MonoLabel";
import HairlineDivider from "@/components/ui/HairlineDivider";

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
    <footer className="relative mt-32 border-t border-[var(--rule)] bg-[var(--paper-edge)]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        {/* Top — brand + transmission */}
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <MonoLabel prefix="//">AMAZON SAFETY PRO</MonoLabel>
            <h3 className="mt-3 max-w-md text-2xl font-bold leading-tight text-[var(--ink)]">
              Compliance handled by people who built the rules.
            </h3>
          </div>

          <div className="lg:col-span-3">
            <MonoLabel>TRANSMISSION</MonoLabel>
            <ul className="mt-3 space-y-2 font-mono text-xs text-[var(--ink-2)]">
              <li>EMAIL · {siteConfig.contactEmail}</li>
              {siteConfig.whatsappNumber !== "TODO" && (
                <li>
                  WHATSAPP ·{" "}
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}`}
                    className="signal-link"
                  >
                    {siteConfig.whatsappNumber}
                  </a>
                </li>
              )}
              <li>RESPONSE · &lt; 1 BUSINESS DAY</li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <MonoLabel>JURISDICTIONS</MonoLabel>
            <div className="mt-3 flex flex-wrap gap-2">
              {JURISDICTIONS.map((j) => (
                <span
                  key={j}
                  className="border border-[var(--rule)] px-2 py-0.5 font-mono text-[10px] tracking-widest text-[var(--ink-2)]"
                >
                  {j}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hairline divider */}
        <div className="my-12">
          <HairlineDivider />
        </div>

        {/* Nav links */}
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <MonoLabel>NAVIGATION</MonoLabel>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {FOOTER_NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-mono text-[11px] uppercase tracking-widest text-[var(--ink-2)] hover:text-[var(--signal)]"
                  >
                    → {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <MonoLabel>LEGAL</MonoLabel>
            <ul className="mt-4 space-y-2">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-mono text-[11px] uppercase tracking-widest text-[var(--ink-2)] hover:text-[var(--signal)]"
                  >
                    → {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom mono line */}
        <div className="mt-16 border-t border-[var(--rule)] pt-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-3)]">
            // {siteConfig.legalEntity} · {siteConfig.registeredAddress} · SINCE 2026 ·
            ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Verification checkpoint:** `npx tsc --noEmit` passes; footer renders on every page in the new design system.

---

# Phase 7 — Final verification

## Task 7.1: Full type-check, lint, build

- [ ] **Step 1: Run all three**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: zero errors.

## Task 7.2: Grep gates

- [ ] **Step 1:** No references to removed systems

```bash
grep -rln "supabase\|@supabase\|authStore\|notificationStore\|@/store\|@/lib/supabase\|mock-data" \
  app components lib 2>/dev/null
```
Expected: no output.

- [ ] **Step 2:** All TODO placeholders only in `lib/site-config.ts`

```bash
grep -rn "TODO" app components lib --include="*.ts" --include="*.tsx" 2>/dev/null
```
Expected: every match in `lib/site-config.ts`.

## Task 7.3: End-to-end manual smoke test

- [ ] **Step 1:** `.env.local` set with real Resend credentials.
- [ ] **Step 2:** `npm run dev` and visit every route in the site map.
- [ ] **Step 3:** Walkthrough checklist:

| Route | Check |
|---|---|
| `/` | Hero animations play, all sections render with §1 content, scroll reveals work |
| `/about` | Dossier layout, sticky left record, narrative right matches §3 |
| `/services` | Five service cards from §5a–§5e, Request Quote prefills inquiry |
| `/safety-guide` | All §4 content, sticky TOC scrolls, `/self-guide` CTA present |
| `/pricing` | Five service cards, no prices, free review CTA |
| `/contact` | Split layout, form submits, email arrives, success state correct |
| `/free-validation` | Manifest upload UI, form submits with attachment, email arrives |
| `/privacy-policy` | All 13 sections from §7 with sticky TOC |
| `/terms` | All 16 sections from T&C docx with sticky TOC |
| `/self-guide` | Decision tree still works (not in nav) |

- [ ] **Step 4:** Form failure modes
- Empty `fullName` → field error
- 6 submissions in a row → 6th returns "Too many submissions"
- 11 MB file → client blocks
- No files on free review → "Please attach at least one document"

## Task 7.4: Definition of done

- [ ] All routes render
- [ ] Both forms send Resend email (with attachment on free review)
- [ ] tsc + lint + build clean
- [ ] No supabase/auth/dashboard references
- [ ] All TODOs in `lib/site-config.ts` only
- [ ] All page content matches docx verbatim
- [ ] Every page uses the new design system
- [ ] Custom cursor works on desktop
- [ ] Page-load signal bar plays on every route
- [ ] Scroll reveals trigger correctly
- [ ] Navbar shows active route, mobile menu works
- [ ] Footer present on every page

---

## Self-review notes (for the executor)

- **Phase 5 tasks are content-heavy.** The executor must extract docx text and paste it verbatim into JSX. The plan describes structure, not every paragraph — embedding all docx text would balloon the plan to 80K+ chars.
- **Order matters in Phase 4:** Task 4.1 references `TacticalShell` which is created in Task 4.2. Run them in order; the type-check checkpoint at the end of Task 4.1 will fail until Task 4.2 completes.
- **`ServicesGridSection`** in Task 5.3 is reused by `/pricing` in Task 5.5 — do not duplicate the data.
- **`LegalDocumentLayout`** in Task 5.8 is reused by `/terms` in Task 6.1 — do not duplicate the layout component.
- **`ContactForm.tsx`** is touched twice: Phase 3 wires the server action; Task 5.6 restyles it. Preserve the wiring during the restyle.
- **No git commits** — verification checkpoints are type-check + build + manual smoke test.

