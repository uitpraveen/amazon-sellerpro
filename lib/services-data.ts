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
  badge?: string;
  comingSoon?: boolean;
}

export const SERVICES: ServiceDef[] = [
  {
    code: "01",
    slug: "asin-classification-review",
    number: 1,
    title: "ASIN Classification Review & Appeal",
    shortTitle: "ASIN Classification Review & Appeal",
    inquiry: "asin_classification_review",
    what: "An ASIN classification review is an investigation into why Amazon has restricted or blocked your listing based on how it has classified your product. Amazon's automated systems sometimes misclassify products - triggering compliance requirements, gating, or outright restrictions that do not apply to your product. This service identifies exactly what caused the classification, corrects the listing content, and appeals the restriction on your behalf.",
    whyMatters:
      "A misclassified ASIN means lost revenue from a listing that should never have been blocked. Common triggers include incorrect product type classification, keywords or claims that flag your listing as a controlled or restricted product, and listing content that unintentionally signals a product category with stricter compliance requirements. Left unresolved, a misclassification can escalate into broader account health issues.",
    includes: [
      "Identify the product type and cross-reference with Amazon's policies to determine if the product is controlled or restricted",
      "Investigate what triggered the classification or restriction",
      "Review the product detail page and its content to identify any incorrect claims or keywords causing the block",
      "Modify the listing content to remove the compliance trigger",
      "Handle the appeal submission to Amazon",
      "Follow up until the restriction is lifted",
    ],
    ctaLabel: "Send Enquiry",
  },
  {
    code: "02",
    slug: "amazon-account-reinstatement",
    number: 2,
    title: "Amazon Account Reinstatement",
    shortTitle: "Amazon Account Reinstatement",
    inquiry: "amazon_account_reinstatement",
    badge: "Most Requested",
    what: "Amazon account reinstatement is the process of recovering selling privileges after Amazon suspends or deactivates a seller account. Unlike an ASIN-level suspension, which affects a single listing, an account suspension removes all selling privileges across every listing at once, freezing revenue, stranding FBA inventory, and in most cases placing a hold on account funds for up to 90 days. Amazon Safety Pro manages the full reinstatement process: we diagnose the exact enforcement trigger, identify the root cause, prepare a compliant Plan of Action (POA), fix listing content where needed, submit the appeal, and follow up (including escalation) until the account is reinstated. We do not use generic templates. Every case is built around your specific Performance Notification and account history.",
    whyMatters:
      "Every day your account is suspended, you are losing revenue, losing sales rank, and accumulating FBA storage fees on inventory you cannot sell. Amazon freezes account funds for up to 90 days following deactivation. Most sellers who attempt their own appeal fail on the first submission, and every failed appeal makes the next one harder, because Amazon's review team compares every message in your case log against what was previously submitted. A single inconsistency can derail reinstatement. Getting it right the first time, or stabilizing a damaged case log, requires experience with how Amazon's enforcement teams actually evaluate appeals.",
    includes: [
      "Review the Amazon Performance Notification and account suspension details",
      "Full diagnosis of the enforcement trigger and suspension type",
      "Root cause analysis identifying exactly what caused the suspension",
      "Review of any prior appeals submitted, identifying contradictions or gaps in the case log",
      "Preparation of a tailored, evidence-based Plan of Action (POA) addressing root cause, corrective actions, and preventive measures",
      "Evidence and document gathering: invoices, test reports, supplier documentation, and authorization letters as applicable",
      "Listing content review and fixes (title, bullet points, description, and backend keywords) where content contributed to the suspension",
      "Submission of the appeal through the correct channel in Seller Central",
      "Active follow up with Amazon throughout the review process",
      "Escalation where required, if the initial submission stalls or is rejected",
      "Account health monitoring available as an optional add-on upon request",
    ],
    ctaLabel: "Send Enquiry",
  },
  {
    code: "03",
    slug: "document-review-remediation",
    number: 3,
    title: "Document Review & Remediation",
    shortTitle: "Document Review & Remediation",
    inquiry: "document_review_remediation",
    what: "Document Review & Remediation is a structured review of your existing compliance documents that Amazon has rejected - combined with a clear remediation plan to get them accepted. Many sellers find themselves in a cycle of repeated rejections without understanding exactly what Amazon needs. This service breaks that cycle.",
    whyMatters:
      "Amazon's rejection messages tell you something is wrong - but they rarely tell you exactly what to fix. Sellers can spend weeks resubmitting documents that continue to fail because the underlying issue has not been properly identified. The cost is real: stranded inventory, lost sales, and mounting frustration with no clear path forward.",
    includes: [
      "Review the case submitted to Amazon",
      "Decode the blurb/rejection message received from Amazon to understand exactly what was flagged",
      "Identify what is needed to resolve the rejection",
      "Line-by-line review of the seller's existing submitted documents",
      "Identify exactly what is missing or incorrect in the documents",
      "Advise the seller on what is needed to remediate - seller obtains the required documents",
      "Review the remediated documents once received from the seller",
      "Resubmit to Amazon",
      "Follow up with Amazon until the case is resolved",
    ],
    ctaLabel: "Send Enquiry",
  },
  {
    code: "04",
    slug: "safety-incident-reinstatement",
    number: 4,
    title: "Safety Incident ASIN Reinstatement",
    shortTitle: "Safety Incident ASIN Reinstatement",
    inquiry: "safety_incident_reinstatement",
    what: "A safety incident ASIN reinstatement is a specialist service for sellers whose ASIN has been suppressed following a customer-reported safety incident. This is fundamentally different from a standard compliance block - Amazon treats customer safety reports with the highest level of scrutiny, and the reinstatement process is significantly more demanding. This service manages the full reinstatement process from initial assessment through to resolution.",
    whyMatters:
      "When a customer reports a safety incident involving your product, Amazon acts swiftly - suppressing the ASIN and initiating an investigation. The consequences go beyond a single listing: unresolved safety incidents can lead to account-level action, inventory destruction, and regulatory referrals. Speed and precision in your response are critical. This is not a situation where a standard appeal template will work.",
    includes: [
      "Review the Amazon message on the ASIN suppression",
      "Review the product and details received from Amazon regarding the safety incident",
      "Review and remediate documentation",
      "Submit reinstatement appeal",
      "Follow up with Amazon until ASIN is back live",
    ],
    ctaLabel: "Send Enquiry",
  },
  {
    code: "05",
    slug: "compliance-document-creation",
    number: 5,
    title: "Compliance Document Creation",
    shortTitle: "Compliance Document Creation",
    inquiry: "compliance_document_creation",
    what: "Compliance Document Creation covers the preparation of the core safety documents required to list and sell on Amazon - the Children's Product Certificate (CPC), the General Certificate of Conformity (GCC), and the Declaration of Conformity (DOC). These documents must be accurate, complete, and structured to Amazon's exact submission standards. Errors or omissions in these documents are among the most common causes of compliance flags and listing suppression.",
    whyMatters:
      "Many sellers receive test reports from their labs or manufacturers but do not have the compliance documents Amazon actually requires for submission. Others have documents that were created incorrectly - referencing the wrong standards, missing required fields, or not structured in a format Amazon accepts. Getting these documents right the first time saves significant time, cost, and disruption to your business.",
    includes: [
      "Review product type and applicable standards",
      "Review existing test reports and any other necessary documents from the seller",
      "Create CPC, GCC, or DOC as required",
      "Structure documents to Amazon's submission standards",
      "Deliver final documents ready for submission",
    ],
    ctaLabel: "Pay & Submit",
  },
  {
    code: "06",
    slug: "product-compliance-assessment",
    number: 6,
    title: "Product Compliance Assessment",
    shortTitle: "Product Compliance Assessment",
    inquiry: "product_compliance_assessment",
    what: "A Product Compliance Assessment is a proactive review of your product against Amazon's compliance requirements - before problems arise. This service is designed for sellers who are unsure what Amazon classifies their product as, what compliance requirements apply, or what documentation they need to list without issues. We check, classify, and tell you exactly what you need.",
    whyMatters:
      "Many sellers list products on Amazon without fully understanding how Amazon classifies them or what compliance requirements apply. This is one of the most common reasons listings get flagged after launch - the seller listed correctly in their view, but Amazon's classification triggers requirements they were not aware of. A proactive compliance assessment eliminates this risk before it becomes a problem.",
    includes: [
      "Check the product type and what Amazon classifies it as",
      "Cross-reference with Amazon's policies to determine what is required",
      "Check if any additional compliance steps are required for the product type",
      "Advise the seller on what documents are needed for listing",
    ],
    ctaLabel: "Pay & Submit",
  },
  {
    code: "07",
    slug: "amazon-sponsored-ads-management",
    number: 7,
    title: "Amazon Sponsored Ads Management",
    shortTitle: "Amazon Sponsored Ads Management",
    inquiry: "amazon_sponsored_ads_management",
    what: "Amazon Sponsored Ads Management is a fully managed advertising and listing optimisation service for Amazon sellers. It covers the three core Amazon advertising formats (Sponsored Products, Sponsored Brands, and Sponsored Display) alongside full listing optimisation, so your product pages convert the traffic your ads generate. Advertising without optimised listings wastes budget: a well-structured campaign driving traffic to a poorly written listing will not convert. We address both at once, building and managing campaigns that reach the right buyers while ensuring your listing content (title, bullet points, description, and keywords) is structured to convert that traffic into sales. This is a monthly retainer service. We take full ownership of your Amazon advertising account, monitor performance continuously, and adjust campaigns based on data so your spend works harder over time, not just at launch.",
    whyMatters:
      "Amazon's marketplace is increasingly competitive. Without active advertising, new and existing products struggle to gain visibility against established competitors with stronger sales history and review counts. At the same time, running ads without proper listing optimisation means paying to send buyers to a product page that does not convert. A managed approach that combines targeted advertising with conversion-optimised listings compounds results: better ad performance drives more sales, more sales improve organic rank, and better organic rank reduces long-term dependence on paid ads.",
    includes: [
      "Campaign setup and structure for Sponsored Products, Sponsored Brands, and Sponsored Display",
      "Keyword research and targeting strategy to identify high-converting search terms for your category",
      "Bid management and budget optimisation to maximise return on ad spend (ROAS)",
      "Negative keyword management to eliminate wasted spend on irrelevant search terms",
      "Campaign performance monitoring: weekly review of impressions, clicks, conversion rate, ACoS, and ROAS",
      "A/B testing of ad creatives, targeting strategies, and bid levels",
      "Monthly performance reporting with clear metrics and recommendations",
      "Product title, bullet point, description, and backend keyword optimisation",
      "Keyword gap analysis to capture search terms competitors rank for that your listing is missing",
      "Ongoing listing and campaign updates as Amazon's algorithm and category trends evolve",
    ],
    ctaLabel: "Send Enquiry",
  },
  {
    code: "08",
    slug: "testing-guidance",
    number: 8,
    title: "Testing Guidance",
    shortTitle: "Testing Guidance",
    inquiry: "testing_guidance",
    badge: "Coming Soon",
    comingSoon: true,
    what: "Testing Guidance is a specialist advisory service to help sellers understand exactly what testing their product requires, which standards apply, and which laboratory is best suited for their specific product type and target marketplace. Knowing what to test - and where - can save significant time and cost, and ensures your test reports will be accepted by Amazon.",
    whyMatters:
      "Choosing the wrong lab, testing to the wrong standard, or missing a required test is one of the most expensive compliance mistakes a seller can make. Test reports are costly and time-consuming to obtain - and a report that does not meet Amazon's requirements is money wasted. Getting the right guidance before you test saves you from having to do it twice.",
    includes: [
      "Identify the product type and applicable testing standards",
      "Advise on what testing is required for the product",
      "Recommend the best lab for that specific product type and testing requirement",
    ],
    ctaLabel: "Register Interest",
  },
];
