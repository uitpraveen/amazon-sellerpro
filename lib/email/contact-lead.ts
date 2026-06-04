import { contactEmail, contactConfirmationEmail } from "@/lib/email/templates";
import { sendLeadEmail, sendEmail } from "@/lib/email/resend";
import { siteConfig } from "@/lib/site-config";
import { getServicePrice, formatPrice } from "@/lib/services-prices";
import type { ContactFormInput } from "@/lib/validation";

export interface PaymentInfo {
  provider: "paypal" | "stripe";
  reference: string;
  secondary?: string;
  amount: string;
}

export type SendLeadResult = { ok: true } | { ok: false; error: string };

/**
 * Renders and sends the admin lead email (with payment info appended when
 * present) plus the best-effort customer confirmation. Shared by the contact
 * server action (non-paid enquiries) and the PayPal capture route (paid), so
 * the payment capture and the lead notification happen in one server step.
 */
export async function sendContactLead(
  data: ContactFormInput,
  paymentInfo?: PaymentInfo
): Promise<SendLeadResult> {
  const expectedAmount = getServicePrice(data.inquiryType);
  const rendered = contactEmail({
    fullName: data.fullName,
    businessName: data.businessName,
    email: data.email,
    phone: data.phone || undefined,
    amazonSellerId: data.amazonSellerId || undefined,
    amazonMarketplace: data.amazonMarketplace || undefined,
    productCategory: data.productCategory,
    inquiryType: data.inquiryType,
    message: paymentInfo
      ? `${data.message}\n\n---\nPayment: ${
          expectedAmount != null ? formatPrice(expectedAmount) : "USD"
        } via ${paymentInfo.provider === "stripe" ? "Stripe" : "PayPal"}\n${
          paymentInfo.provider === "stripe"
            ? `PaymentIntent: ${paymentInfo.reference}`
            : `Order ID: ${paymentInfo.secondary ?? ""}\nCapture ID: ${paymentInfo.reference}`
        }`
      : data.message,
  });

  const result = await sendLeadEmail({
    subject: rendered.subject,
    html: rendered.html,
    text: rendered.text,
    replyTo: data.email,
  });
  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  // Courtesy acknowledgement to the customer. Best-effort: a failure here must
  // not fail the submission, since the lead has already reached the inbox.
  const confirmation = contactConfirmationEmail({
    fullName: data.fullName,
    inquiryType: data.inquiryType,
    message: data.message,
  });
  const ack = await sendEmail({
    to: data.email,
    subject: confirmation.subject,
    html: confirmation.html,
    text: confirmation.text,
    replyTo: siteConfig.contactEmail,
  });
  if (!ack.ok) {
    console.error("Contact confirmation email failed:", ack.error);
  }

  return { ok: true };
}

/**
 * Fallback used when a payment was captured but the accompanying form data
 * failed validation. Ensures a captured payment is never silently lost - the
 * admin still gets an alert with the reference and whatever raw data exists.
 */
export async function sendPaymentCapturedAlert(input: {
  captureId: string;
  orderId: string;
  amount: string;
  rawForm: Record<string, string>;
}): Promise<SendLeadResult> {
  const lines = Object.entries(input.rawForm)
    .filter(([k]) => k !== "website")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  const text = [
    "PAYMENT CAPTURED - form data failed validation",
    "",
    `Amount: ${input.amount} USD`,
    `Order ID: ${input.orderId}`,
    `Capture ID: ${input.captureId}`,
    "",
    "Submitted fields:",
    lines || "(none)",
    "",
    "Please follow up with the customer using the details above.",
  ].join("\n");

  return sendLeadEmail({
    subject: `⚠ Payment captured (${input.captureId}) - incomplete form`,
    html: `<pre style="font-family:ui-monospace,monospace;font-size:13px;white-space:pre-wrap;">${text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</pre>`,
    text,
    replyTo: input.rawForm.email || undefined,
  });
}
