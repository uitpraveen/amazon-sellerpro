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

  // Honeypot tripped — silently succeed.
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
