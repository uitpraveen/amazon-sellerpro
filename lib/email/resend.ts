import { Resend } from "resend";

export interface LeadEmailAttachment {
  filename: string;
  content: Buffer;
}

export interface SendLeadEmailInput {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: LeadEmailAttachment[];
}

export type SendLeadEmailResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

let cachedClient: Resend | null = null;

function getClient(): Resend {
  if (!cachedClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("RESEND_API_KEY is not set");
    }
    cachedClient = new Resend(key);
  }
  return cachedClient;
}

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

/**
 * Send to an explicit recipient (e.g. the customer confirmation email).
 * Unlike sendLeadEmail, the `to` address is provided by the caller.
 */
export async function sendEmail(
  input: SendEmailInput
): Promise<SendLeadEmailResult> {
  const from = process.env.RESEND_FROM_EMAIL;

  if (!from) {
    return {
      ok: false,
      error: "Email service is not configured.",
    };
  }

  try {
    const client = getClient();
    const response = await client.emails.send({
      from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo: input.replyTo,
    });

    if (response.error) {
      return { ok: false, error: response.error.message };
    }
    return { ok: true, id: response.data?.id ?? "" };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { ok: false, error: message };
  }
}

export async function sendLeadEmail(
  input: SendLeadEmailInput
): Promise<SendLeadEmailResult> {
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.LEAD_INBOX_EMAIL;

  if (!from || !to) {
    return {
      ok: false,
      error: "Email service is not configured. Please contact us directly.",
    };
  }

  try {
    const client = getClient();
    const response = await client.emails.send({
      from,
      to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo: input.replyTo,
      attachments: input.attachments?.map((a) => ({
        filename: a.filename,
        content: a.content,
      })),
    });

    if (response.error) {
      return { ok: false, error: response.error.message };
    }
    return { ok: true, id: response.data?.id ?? "" };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { ok: false, error: message };
  }
}
