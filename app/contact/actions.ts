"use server";

import { headers } from "next/headers";
import { contactFormSchema } from "@/lib/validation";
import { sendContactLead, type PaymentInfo } from "@/lib/email/contact-lead";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site-config";
import type { ServiceInquiryType } from "@/lib/types";
import { isPaidService } from "@/lib/services-prices";
import { verifyPayPalCapture } from "@/lib/paypal";
import { verifyStripePaymentIntent } from "@/lib/stripe";

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
    amazonMarketplace: formData.get("amazonMarketplace")?.toString() ?? "",
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

  // Honeypot tripped - silently succeed.
  if (parsed.data.website) {
    return { ok: true };
  }

  const paypalCaptureId = formData.get("paypalCaptureId")?.toString() ?? "";
  const paypalOrderId = formData.get("paypalOrderId")?.toString() ?? "";
  const stripePaymentIntentId =
    formData.get("stripePaymentIntentId")?.toString() ?? "";

  let paymentInfo: PaymentInfo | undefined;

  if (isPaidService(parsed.data.inquiryType)) {
    if (stripePaymentIntentId) {
      const verify = await verifyStripePaymentIntent(stripePaymentIntentId);
      if (!verify.ok) {
        return {
          ok: false,
          error: `Payment could not be verified: ${verify.error}`,
        };
      }
      paymentInfo = {
        provider: "stripe",
        reference: stripePaymentIntentId,
        amount: verify.amount,
      };
    } else if (paypalCaptureId) {
      const verify = await verifyPayPalCapture(paypalCaptureId);
      if (!verify.ok) {
        return {
          ok: false,
          error: `Payment could not be verified: ${verify.error}`,
        };
      }
      paymentInfo = {
        provider: "paypal",
        reference: paypalCaptureId,
        secondary: paypalOrderId,
        amount: verify.amount,
      };
    } else {
      return {
        ok: false,
        error:
          "Payment required for this service. Please complete payment to submit.",
      };
    }
  }

  const sent = await sendContactLead(parsed.data, paymentInfo);
  if (!sent.ok) {
    return {
      ok: false,
      error: `We couldn't send your message. Please email us directly at ${siteConfig.contactEmail}.`,
    };
  }

  return { ok: true };
}
