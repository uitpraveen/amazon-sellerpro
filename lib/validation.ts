import { z } from "zod";
import {
  MAX_FILE_COUNT,
  MAX_FILE_SIZE,
  MAX_TOTAL_UPLOAD_SIZE,
  ACCEPTED_FILE_TYPES,
} from "@/lib/constants";

export const contactFormSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  businessName: z.string().trim().min(1, "Business name is required").max(160),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  amazonSellerId: z.string().trim().max(200).optional().or(z.literal("")),
  amazonMarketplace: z
    .string()
    .trim()
    .min(1, "Please select an Amazon marketplace")
    .max(40),
  productCategory: z.string().trim().min(1, "Product category is required").max(120),
  inquiryType: z.enum([
    "asin_classification_review",
    "document_review_remediation",
    "safety_incident_reinstatement",
    "compliance_document_creation",
    "product_compliance_assessment",
    "testing_guidance",
    "not_sure_need_advice",
    "general_question",
  ]),
  message: z.string().trim().min(10, "Please describe your issue").max(5000),
  // Honeypot — must be empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const freeReviewFormSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  businessName: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  amazonSellerId: z.string().trim().max(200).optional().or(z.literal("")),
  productCategory: z.string().trim().min(1).max(120),
  productDescription: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type FreeReviewFormInput = z.infer<typeof freeReviewFormSchema>;

export function validateUploadedFiles(
  files: File[]
): { ok: true } | { ok: false; error: string } {
  if (files.length === 0) {
    return { ok: false, error: "Please attach at least one document." };
  }
  if (files.length > MAX_FILE_COUNT) {
    return { ok: false, error: `You can attach up to ${MAX_FILE_COUNT} files.` };
  }
  let total = 0;
  for (const f of files) {
    if (!ACCEPTED_FILE_TYPES.includes(f.type)) {
      return {
        ok: false,
        error: `${f.name} is not an accepted file type (PDF, JPG, PNG, DOC, DOCX).`,
      };
    }
    if (f.size > MAX_FILE_SIZE) {
      return { ok: false, error: `${f.name} exceeds the 10 MB per-file limit.` };
    }
    total += f.size;
  }
  if (total > MAX_TOTAL_UPLOAD_SIZE) {
    return { ok: false, error: "Total upload size exceeds the 25 MB limit." };
  }
  return { ok: true };
}
