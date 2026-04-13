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
