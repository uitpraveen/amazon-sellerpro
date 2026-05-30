import type { ServiceInquiryType } from "@/lib/types";

/**
 * Inquiry types that require payment before submission.
 *
 * Payment is now handled exclusively by PayPal Hosted Buttons on the pricing
 * page (see components/PayPalHostedButton.tsx), so no service is gated behind
 * the in-form custom checkout. Keeping this map empty disables the legacy
 * Stripe/PayPal checkout + server-side verification while leaving the contact
 * form to send all submissions as plain enquiries.
 */
export const SERVICE_PRICES_USD: Partial<Record<ServiceInquiryType, number>> =
  {};

export const CURRENCY = "USD";

export function getServicePrice(
  inquiryType: ServiceInquiryType
): number | null {
  return SERVICE_PRICES_USD[inquiryType] ?? null;
}

export function isPaidService(inquiryType: ServiceInquiryType): boolean {
  return getServicePrice(inquiryType) !== null;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
