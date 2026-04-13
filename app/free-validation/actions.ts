"use server";

import { headers } from "next/headers";
import { freeReviewFormSchema, validateUploadedFiles } from "@/lib/validation";
import { freeReviewEmail } from "@/lib/email/templates";
import { sendLeadEmail } from "@/lib/email/resend";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site-config";

export type FreeReviewActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<string, string>> };

export async function submitFreeReview(
  _prev: FreeReviewActionResult | null,
  formData: FormData
): Promise<FreeReviewActionResult> {
  const h = await headers();
  const ip = getClientIp(h);

  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return {
      ok: false,
      error: "Too many submissions. Please try again in a few minutes.",
    };
  }

  const raw = {
    fullName: formData.get("fullName")?.toString() ?? "",
    businessName: formData.get("businessName")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    amazonSellerId: formData.get("amazonSellerId")?.toString() ?? "",
    productCategory: formData.get("productCategory")?.toString() ?? "",
    productDescription: formData.get("productDescription")?.toString() ?? "",
    website: formData.get("website")?.toString() ?? "",
  };

  const parsed = freeReviewFormSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      error: "Please correct the errors below and try again.",
      fieldErrors,
    };
  }

  if (parsed.data.website) {
    return { ok: true };
  }

  const fileEntries = formData.getAll("documents");
  const files: File[] = fileEntries.filter(
    (entry): entry is File => entry instanceof File && entry.size > 0
  );

  const fileCheck = validateUploadedFiles(files);
  if (!fileCheck.ok) {
    return { ok: false, error: fileCheck.error };
  }

  const attachments = await Promise.all(
    files.map(async (f) => ({
      filename: f.name,
      content: Buffer.from(await f.arrayBuffer()),
    }))
  );

  const rendered = freeReviewEmail({
    fullName: parsed.data.fullName,
    businessName: parsed.data.businessName,
    email: parsed.data.email,
    phone: parsed.data.phone || undefined,
    amazonSellerId: parsed.data.amazonSellerId || undefined,
    productCategory: parsed.data.productCategory,
    productDescription: parsed.data.productDescription,
    fileSummaries: files.map((f) => ({ name: f.name, sizeKb: f.size / 1024 })),
  });

  const result = await sendLeadEmail({
    subject: rendered.subject,
    html: rendered.html,
    text: rendered.text,
    replyTo: parsed.data.email,
    attachments,
  });

  if (!result.ok) {
    return {
      ok: false,
      error: `We couldn't send your submission. Please email us directly at ${siteConfig.contactEmail}.`,
    };
  }
  return { ok: true };
}
