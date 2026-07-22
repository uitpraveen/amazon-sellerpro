"use client";

import {
  FileSearch,
  Stethoscope,
  PencilLine,
  ClipboardList,
  Send,
  TrendingUp,
} from "lucide-react";
import ProcessFlow from "@/components/sections/home/ProcessFlow";

const REINSTATEMENT_STEPS = [
  {
    num: "01",
    title: "Review the Suspension Notice",
    desc: "We start by reviewing the Amazon Performance Notification in detail, identifying the exact suspension type, the policy Amazon has cited, and what Amazon is communicating between the lines. We also review any prior appeals you have submitted to understand the state of your case log.",
    icon: FileSearch,
  },
  {
    num: "02",
    title: "Diagnose the Root Cause",
    desc: "We go deeper than the surface reason Amazon gives. We identify the exact enforcement trigger, whether it is listing content, supply chain documentation, account-level conduct, or a pattern of unresolved violations, so the appeal addresses the real problem, not the symptom.",
    icon: Stethoscope,
  },
  {
    num: "03",
    title: "Fix Listing Content Where Needed",
    desc: "Where listing content (title, bullet points, description, or backend keywords) contributed to the suspension, we review and fix it before the appeal is submitted. Submitting an appeal without correcting the underlying listing issue is one of the most common reasons reinstatement fails.",
    icon: PencilLine,
  },
  {
    num: "04",
    title: "Build Your Plan of Action",
    desc: "We prepare a tailored, evidence-based Plan of Action (POA) structured to Amazon's exact requirements, covering root cause, corrective actions already taken, and preventive measures. Every claim in the POA is tied to evidence Amazon can verify. We do not use templates.",
    icon: ClipboardList,
  },
  {
    num: "05",
    title: "Submit and Manage All Amazon Communication",
    desc: "We submit the appeal through the correct channel in Seller Central and take over all communication with Amazon from that point. Every follow-up is controlled to keep your case log consistent: no contradictions, no mixed messages, no wasted submissions.",
    icon: Send,
  },
  {
    num: "06",
    title: "Escalate Until Resolved",
    desc: "If the initial submission stalls or is rejected, we escalate through the appropriate channels. We do not stop at the first response. We manage the full process, including follow-ups, calls, and escalations, until your account is reinstated or there is no viable path remaining.",
    icon: TrendingUp,
  },
];

export default function ReinstatementProcess() {
  return (
    <ProcessFlow
      steps={REINSTATEMENT_STEPS}
      eyebrow="Account Reinstatement"
      title="Our Reinstatement Process"
    />
  );
}
