import type { ServiceInquiryType } from "@/lib/types";

/**
 * PayPal Hosted Button IDs for the fixed-price services. The button (and its
 * price) is configured in the PayPal dashboard; here we just map each paid
 * service to its button so the pricing cards and the contact form render the
 * same button. See components/PayPalHostedButton.tsx for the renderer.
 */
export const PAYPAL_HOSTED_BUTTON_IDS: Partial<
  Record<ServiceInquiryType, string>
> = {
  compliance_document_creation: "8ZNE9YPHP2LLL",
  product_compliance_assessment: "5HDSEULJT3SRJ",
};

export function getHostedButtonId(
  inquiryType: ServiceInquiryType
): string | undefined {
  return PAYPAL_HOSTED_BUTTON_IDS[inquiryType];
}
