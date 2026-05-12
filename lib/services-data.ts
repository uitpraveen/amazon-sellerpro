import type { ServiceInquiryType } from "@/lib/types";

export interface ServiceDef {
  code: string;
  slug: string;
  number: number;
  title: string;
  shortTitle: string;
  inquiry: ServiceInquiryType;
  what: string;
  who?: string;
  whyMatters?: string;
  includes: string[];
  ctaLabel: string;
  closingNote?: string;
}

export const SERVICES: ServiceDef[] = [
  {
    code: "5e",
    slug: "asin-reinstatement",
    number: 1,
    title: "Reinstate the Stranded ASIN in Amazon",
    shortTitle: "Stranded ASIN Reinstatement",
    inquiry: "stranded_asin_reinstatement",
    what: "A stranded ASIN is a product listing that exists in your Amazon inventory but is not actively listed for sale, typically because of a compliance issue, a missing document, or a policy violation. Stranded ASINs represent lost revenue and, if not resolved promptly, can escalate into broader account issues.",
    whyMatters:
      "Common causes: missing or expired safety documentation; product flagged for a safety or compliance review; listing removed following a dangerous goods classification issue; product category requiring approval or additional documentation.",
    includes: [
      "Diagnosis of the exact reason for the stranded status",
      "Review and remediation of any documentation issues causing the problem",
      "Direct guidance on the correct documentation to upload to resolve the compliance flag",
      "Follow-up support through the reinstatement process until the ASIN is fully active",
    ],
    ctaLabel: "Request ASIN Reinstatement Support",
    closingNote:
      "Our team's insider knowledge gives our clients a significant advantage in the reinstatement process. We know what Amazon's teams look for, because we were those teams.",
  },
  {
    code: "5d",
    slug: "safety-validation",
    number: 2,
    title: "Product Safety Document Validation",
    shortTitle: "Product Safety Doc Validation",
    inquiry: "document_validation",
    what: "Product safety document validation goes a step further than general document validation, specifically assessing whether your product's safety documentation meets the standard required for your product category on Amazon. This service is particularly relevant for sellers who have received an Amazon compliance notice or who want to proactively ensure their documentation will withstand Amazon's review.",
    includes: [
      "Comprehensive review of all product safety documentation including test reports, safety data sheets, and certificates",
      "Assessment against Amazon's specific product safety standards for your category and marketplace",
      "Verification that test reports are issued by accredited laboratories recognized by Amazon",
      "Confirmation that all required standards are tested and passed",
      "Identification of any documentation that would be rejected by Amazon's compliance team",
      "Prioritized action plan for resolving any identified issues",
    ],
    ctaLabel: "Request Product Safety Document Validation",
  },
  {
    code: "5c",
    slug: "document-validation",
    number: 3,
    title: "Document Validation",
    shortTitle: "Document Validation",
    inquiry: "document_validation",
    what: "Document validation is the process of reviewing your existing compliance documentation — test reports, certificates, CPCs, DOCs, GCCs, and other safety records — to ensure they are accurate, complete, and meet Amazon's current requirements.",
    whyMatters:
      "Many sellers discover too late that their existing documentation contains errors, references outdated standards, covers a different product specification than what they are selling, or is simply not structured in a way Amazon accepts. These issues are among the most common triggers for compliance flags and the dreaded automated rejection cycle.",
    includes: [
      "Line-by-line review of your test reports, certificates, and compliance documents",
      "Verification that all referenced standards are current and applicable to your product and marketplace",
      "Review of product labeling to ensure it meets both Amazon's listing requirements and the applicable market regulatory requirements — including warning statements, age grading, tracking labels, manufacturer or importer information, and country-specific labeling obligations",
      "Identification of gaps, errors, or inconsistencies that could trigger an Amazon compliance flag",
      "Written validation report summarizing findings and recommended actions",
      "Option to proceed directly to document correction or creation where issues are identified",
    ],
    ctaLabel: "Request Document Validation",
  },
  {
    code: "5a",
    slug: "cpc-creation",
    number: 4,
    title: "CPC Creation — Children's Product Certificate",
    shortTitle: "CPC Creation",
    inquiry: "cpc_doc_gcc_creation",
    what: "A Children's Product Certificate (CPC) is a document required under the Consumer Product Safety Improvement Act (CPSIA) for all children's products sold in the United States. The CPC certifies that the product has been tested by a CPSC-accepted third-party laboratory and meets all applicable safety standards.",
    who: "Any seller listing a product designed or intended primarily for use by children under 12 years of age on amazon.com is required to have a valid CPC. This includes toys, juvenile products, children's clothing, child care articles, school supplies, and more.",
    includes: [
      "Review of your product to determine applicable CPSIA standards and testing requirements",
      "Guidance on selecting a CPSC-accepted test laboratory",
      "Creation of a fully compliant CPC document referencing the correct standards, test reports, and certifications",
      "Review and validation of existing test reports to ensure they support the CPC claims",
      "Delivery of a CPC ready for submission to Amazon or any US regulatory authority",
    ],
    ctaLabel: "Request CPC Creation",
  },
  {
    code: "5b",
    slug: "doc-gcc-creation",
    number: 5,
    title: "DOC / GCC Creation",
    shortTitle: "DOC / GCC Creation",
    inquiry: "cpc_doc_gcc_creation",
    what: "A Declaration of Conformity (DOC) is a legally binding document in which the manufacturer or importer declares that a product meets all applicable EU directives or regulations. For products sold on Amazon's EU marketplaces, a DOC is required for all CE-marked products. A General Certificate of Conformity (GCC) is required under the CPSIA for general-use consumer products sold in the US. The GCC certifies that the product meets all applicable federal safety rules based on a test of each product or a reasonable testing program.",
    includes: [
      "Identification of all applicable EU directives or US safety rules for your product",
      "Review of existing test reports and technical documentation",
      "Creation of a fully compliant DOC (for EU) or GCC (for US) referencing the correct standards and supporting documentation",
      "Structured to meet Amazon's specific requirements for document submission",
      "Delivery of final document ready for use across all applicable marketplaces",
    ],
    ctaLabel: "Request DOC / GCC Creation",
  },
];
