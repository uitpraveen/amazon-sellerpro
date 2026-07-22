// Types kept after the auth/DB removal cleanup.
// Add new types here only when a retained component or server action needs them.

export type ServiceInquiryType =
  | "asin_classification_review"
  | "amazon_account_reinstatement"
  | "document_review_remediation"
  | "safety_incident_reinstatement"
  | "compliance_document_creation"
  | "product_compliance_assessment"
  | "amazon_sponsored_ads_management"
  | "testing_guidance"
  | "not_sure_need_advice"
  | "general_question";

export const SERVICE_INQUIRY_LABELS: Record<ServiceInquiryType, string> = {
  asin_classification_review: "ASIN Classification Review & Appeal",
  amazon_account_reinstatement: "Amazon Account Reinstatement",
  document_review_remediation: "Document Review & Remediation",
  safety_incident_reinstatement: "Safety Incident ASIN Reinstatement",
  compliance_document_creation: "Compliance Document Creation (CPC / GCC / DOC)",
  product_compliance_assessment: "Product Compliance Assessment",
  amazon_sponsored_ads_management: "Amazon Sponsored Ads Management",
  testing_guidance: "Testing Guidance (Coming Soon)",
  not_sure_need_advice: "Not sure - need advice",
  general_question: "General question",
};

export const AMAZON_MARKETPLACES = [
  { value: "us", label: "United States (amazon.com)" },
  { value: "ca", label: "Canada (amazon.ca)" },
  { value: "uk", label: "United Kingdom (amazon.co.uk)" },
  { value: "de", label: "Germany (amazon.de)" },
  { value: "fr", label: "France (amazon.fr)" },
  { value: "it", label: "Italy (amazon.it)" },
  { value: "es", label: "Spain (amazon.es)" },
  { value: "nl", label: "Netherlands (amazon.nl)" },
  { value: "se", label: "Sweden (amazon.se)" },
  { value: "pl", label: "Poland (amazon.pl)" },
  { value: "in", label: "India (amazon.in)" },
  { value: "sg", label: "Singapore (amazon.sg)" },
  { value: "au", label: "Australia (amazon.com.au)" },
] as const;

export type AmazonMarketplace = typeof AMAZON_MARKETPLACES[number]["value"];
