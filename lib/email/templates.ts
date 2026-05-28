import {
  SERVICE_INQUIRY_LABELS,
  AMAZON_MARKETPLACES,
  type ServiceInquiryType,
} from "@/lib/types";

const MARKETPLACE_LABEL_BY_VALUE: Record<string, string> = Object.fromEntries(
  AMAZON_MARKETPLACES.map((m) => [m.value, m.label])
);

function formatMarketplaces(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const codes = raw
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  if (codes.length === 0) return undefined;
  return codes
    .map((code) => MARKETPLACE_LABEL_BY_VALUE[code] ?? code)
    .join(", ");
}

export interface ContactEmailPayload {
  fullName: string;
  businessName: string;
  email: string;
  phone?: string;
  amazonSellerId?: string;
  amazonMarketplace?: string;
  productCategory: string;
  inquiryType: ServiceInquiryType;
  message: string;
}

export interface FreeReviewEmailPayload {
  fullName: string;
  businessName: string;
  email: string;
  phone?: string;
  amazonSellerId?: string;
  productCategory: string;
  productDescription: string;
  fileSummaries: Array<{ name: string; sizeKb: number }>;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(label: string, value: string | undefined): string {
  if (!value) return "";
  return `<tr><td style="padding:6px 16px 6px 0;color:#5A6173;font-family:ui-monospace,monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">${escapeHtml(
    label
  )}</td><td style="padding:6px 0;color:#0A0E14;font-size:14px;">${escapeHtml(value)}</td></tr>`;
}

export function contactEmail(p: ContactEmailPayload): RenderedEmail {
  const inquiryLabel = SERVICE_INQUIRY_LABELS[p.inquiryType];
  const subject = `New enquiry: ${p.fullName} - ${inquiryLabel}`;

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0A0E14;max-width:640px;background:#F7F7F4;padding:32px;">
      <div style="border:1px solid #D8D6CF;padding:24px;background:#FFF;">
        <div style="font-family:ui-monospace,monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:#1F40FF;">→ NEW ENQUIRY</div>
        <h2 style="margin:8px 0 24px;font-size:24px;font-weight:900;color:#0A0E14;">Contact Form Enquiry</h2>
        <table style="border-collapse:collapse;width:100%;">
          ${row("Full name", p.fullName)}
          ${row("Business", p.businessName)}
          ${row("Email", p.email)}
          ${row("Phone", p.phone)}
          ${row("Seller ID / URL", p.amazonSellerId)}
          ${row("Amazon marketplace", formatMarketplaces(p.amazonMarketplace))}
          ${row("Product category", p.productCategory)}
          ${row("Inquiry type", inquiryLabel)}
        </table>
        <div style="margin-top:24px;border-top:1px solid #D8D6CF;padding-top:16px;">
          <div style="font-family:ui-monospace,monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:#5A6173;margin-bottom:8px;">MESSAGE</div>
          <p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.6;color:#0A0E14;">${escapeHtml(p.message)}</p>
        </div>
      </div>
    </div>
  `.trim();

  const text = [
    "New contact form enquiry",
    "",
    `Full name: ${p.fullName}`,
    `Business: ${p.businessName}`,
    `Email: ${p.email}`,
    p.phone ? `Phone: ${p.phone}` : null,
    p.amazonSellerId ? `Seller ID / URL: ${p.amazonSellerId}` : null,
    formatMarketplaces(p.amazonMarketplace)
      ? `Amazon marketplace: ${formatMarketplaces(p.amazonMarketplace)}`
      : null,
    `Product category: ${p.productCategory}`,
    `Inquiry type: ${inquiryLabel}`,
    "",
    "Message:",
    p.message,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

export function freeReviewEmail(p: FreeReviewEmailPayload): RenderedEmail {
  const subject = `Free review request: ${p.fullName} - ${p.productCategory}`;

  const fileList = p.fileSummaries
    .map(
      (f) =>
        `<li style="font-family:ui-monospace,monospace;font-size:12px;color:#0A0E14;">${escapeHtml(
          f.name
        )} <span style="color:#5A6173;">(${f.sizeKb.toFixed(0)} KB)</span></li>`
    )
    .join("");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0A0E14;max-width:640px;background:#F7F7F4;padding:32px;">
      <div style="border:1px solid #D8D6CF;padding:24px;background:#FFF;">
        <div style="font-family:ui-monospace,monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:#FF5722;">→ FREE REVIEW PAYLOAD</div>
        <h2 style="margin:8px 0 24px;font-size:24px;font-weight:900;color:#0A0E14;">Free Document Review Request</h2>
        <table style="border-collapse:collapse;width:100%;">
          ${row("Full name", p.fullName)}
          ${row("Business", p.businessName)}
          ${row("Email", p.email)}
          ${row("Phone", p.phone)}
          ${row("Seller ID / URL", p.amazonSellerId)}
          ${row("Product category", p.productCategory)}
        </table>
        <div style="margin-top:24px;border-top:1px solid #D8D6CF;padding-top:16px;">
          <div style="font-family:ui-monospace,monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:#5A6173;margin-bottom:8px;">PRODUCT DESCRIPTION</div>
          <p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.6;color:#0A0E14;">${escapeHtml(p.productDescription)}</p>
        </div>
        <div style="margin-top:24px;border-top:1px solid #D8D6CF;padding-top:16px;">
          <div style="font-family:ui-monospace,monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:#5A6173;margin-bottom:8px;">PAYLOAD MANIFEST · ${p.fileSummaries.length} FILES</div>
          <ul style="margin:0;padding-left:20px;">${fileList}</ul>
        </div>
      </div>
    </div>
  `.trim();

  const text = [
    "New free document review request",
    "",
    `Full name: ${p.fullName}`,
    `Business: ${p.businessName}`,
    `Email: ${p.email}`,
    p.phone ? `Phone: ${p.phone}` : null,
    p.amazonSellerId ? `Seller ID / URL: ${p.amazonSellerId}` : null,
    `Product category: ${p.productCategory}`,
    "",
    "Product description:",
    p.productDescription,
    "",
    `Attached files (${p.fileSummaries.length}):`,
    ...p.fileSummaries.map((f) => `- ${f.name} (${f.sizeKb.toFixed(0)} KB)`),
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}
