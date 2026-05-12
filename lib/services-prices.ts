import type { ServiceInquiryType } from "@/lib/types";

/**
 * Inquiry types that require payment before submission.
 * Other inquiry types are free (general question, advisory).
 *
 * TODO: Replace placeholder USD prices with real values before launch.
 */
export const SERVICE_PRICES_USD: Partial<Record<ServiceInquiryType, number>> = {
  stranded_asin_reinstatement: 299,
  document_validation: 149,
  cpc_doc_gcc_creation: 399,
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
