export interface BotNode {
  id: string;
  message: string;
  options?: { label: string; nextId: string }[];
  endState?: {
    type: "can_help" | "book_consultation" | "cannot_reinstate";
    title: string;
    message: string;
    cta: { label: string; href: string };
  };
}

export const selfGuideTree: Record<string, BotNode> = {
  start: {
    id: "start",
    message:
      "Hi! I'm the Safety Pro Guide. I'll help you figure out if your Amazon product issue can be resolved. Let's start with a few questions.",
  },
  q1: {
    id: "q1",
    message: "What type of issue are you facing?",
    options: [
      { label: "Product listing removed/suppressed", nextId: "q2" },
      { label: "Safety compliance document needed", nextId: "q3" },
      { label: "Product recall notification", nextId: "end_consultation_recall" },
      { label: "Account health warning", nextId: "q4" },
    ],
  },
  q2: {
    id: "q2",
    message: "Is the product a recalled product?",
    options: [
      { label: "Yes, it's been recalled", nextId: "end_cannot_reinstate" },
      { label: "No, it's not recalled", nextId: "q3" },
      { label: "I'm not sure", nextId: "end_free_validation" },
    ],
  },
  q3: {
    id: "q3",
    message: "Which Amazon marketplace is this for?",
    options: [
      { label: "United States (US)", nextId: "q5" },
      { label: "Canada (CA)", nextId: "q5" },
      { label: "European Union (EU)", nextId: "q5" },
      { label: "Other marketplace", nextId: "end_consultation_other" },
    ],
  },
  q4: {
    id: "q4",
    message: "Do you have existing safety documents for this product?",
    options: [
      { label: "Yes, I have documents", nextId: "end_free_validation" },
      { label: "No, I need them created", nextId: "end_can_help_create" },
    ],
  },
  q5: {
    id: "q5",
    message: "What product category does this fall under?",
    options: [
      { label: "Children's products", nextId: "end_can_help_cpc" },
      { label: "General consumer products", nextId: "end_can_help_gcc" },
      { label: "Electrical/electronic products", nextId: "end_can_help_testing" },
      { label: "Food/dietary supplements", nextId: "end_consultation_food" },
    ],
  },
  end_can_help_cpc: {
    id: "end_can_help_cpc",
    message: "",
    endState: {
      type: "can_help",
      title: "We Can Help!",
      message:
        "Children's products require a Children's Product Certificate (CPC). Our team specializes in CPC creation and can guide you through the entire reinstatement process.",
      cta: { label: "Get Free Validation", href: "/free-validation" },
    },
  },
  end_can_help_gcc: {
    id: "end_can_help_gcc",
    message: "",
    endState: {
      type: "can_help",
      title: "We Can Help!",
      message:
        "General consumer products typically require a General Certificate of Conformity (GCC) or Declaration of Conformity (DOC). We can create these documents and handle the reinstatement.",
      cta: { label: "Get Free Validation", href: "/free-validation" },
    },
  },
  end_can_help_testing: {
    id: "end_can_help_testing",
    message: "",
    endState: {
      type: "can_help",
      title: "We Can Help!",
      message:
        "Electrical and electronic products may need additional testing and certification. We'll review your case and connect you with accredited testing labs.",
      cta: { label: "Get Free Validation", href: "/free-validation" },
    },
  },
  end_can_help_create: {
    id: "end_can_help_create",
    message: "",
    endState: {
      type: "can_help",
      title: "We Can Create Your Documents!",
      message:
        "No worries — we specialize in creating CPC, DOC, and GCC documents from scratch. Check our pricing packages to get started.",
      cta: { label: "View Pricing", href: "/pricing" },
    },
  },
  end_free_validation: {
    id: "end_free_validation",
    message: "",
    endState: {
      type: "can_help",
      title: "Let Us Check Your Documents",
      message:
        "Upload your existing documents and we'll validate them for free. We'll let you know exactly what's needed to get your product back on Amazon.",
      cta: { label: "Upload for Free Validation", href: "/free-validation" },
    },
  },
  end_cannot_reinstate: {
    id: "end_cannot_reinstate",
    message: "",
    endState: {
      type: "cannot_reinstate",
      title: "Recalled Products Cannot Be Reinstated",
      message:
        "Unfortunately, recalled products cannot be relisted on Amazon. However, we can help you understand the recall process and explore next steps. Book a consultation to discuss your options.",
      cta: { label: "Book Consultation", href: "/contact" },
    },
  },
  end_consultation_recall: {
    id: "end_consultation_recall",
    message: "",
    endState: {
      type: "book_consultation",
      title: "Product Recalls Need Expert Guidance",
      message:
        "Product recall situations are complex and vary by jurisdiction (CPSC, CA, EU). We recommend a consultation to assess your specific situation and available options.",
      cta: { label: "Book Consultation", href: "/contact" },
    },
  },
  end_consultation_other: {
    id: "end_consultation_other",
    message: "",
    endState: {
      type: "book_consultation",
      title: "Let's Discuss Your Marketplace",
      message:
        "Safety compliance varies by marketplace. Book a consultation so we can assess the specific requirements for your target market.",
      cta: { label: "Book Consultation", href: "/contact" },
    },
  },
  end_consultation_food: {
    id: "end_consultation_food",
    message: "",
    endState: {
      type: "book_consultation",
      title: "Specialized Consultation Needed",
      message:
        "Food and dietary supplements have unique regulatory requirements (FDA, FSVP, etc.). Book a consultation for specialized guidance on your product category.",
      cta: { label: "Book Consultation", href: "/contact" },
    },
  },
};

export const QUESTION_ORDER = ["q1", "q2", "q3", "q4", "q5"];

export function getQuestionNumber(nodeId: string): number {
  const idx = QUESTION_ORDER.indexOf(nodeId);
  return idx >= 0 ? idx + 1 : 0;
}

export function getTotalQuestions(): number {
  return QUESTION_ORDER.length;
}
