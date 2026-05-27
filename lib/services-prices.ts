import type { ServiceInquiryType } from "@/lib/types";

/**
 * Inquiry types that require payment before submission.
 * Only Compliance Document Creation and Product Compliance Assessment
 * have fixed prices; all other services route through Send Enquiry.
 */
export const SERVICE_PRICES_USD: Partial<Record<ServiceInquiryType, number>> = {
  compliance_document_creation: 299,
  product_compliance_assessment: 399,
};

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
