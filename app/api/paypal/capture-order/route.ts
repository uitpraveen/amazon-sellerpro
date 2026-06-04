import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";
import { contactFormSchema } from "@/lib/validation";
import {
  sendContactLead,
  sendPaymentCapturedAlert,
  type PaymentInfo,
} from "@/lib/email/contact-lead";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { orderId?: string; form?: Record<string, string> } = {};
  try {
    body = (await req.json()) as {
      orderId?: string;
      form?: Record<string, string>;
    };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.orderId || typeof body.orderId !== "string") {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  // 1) Capture the payment.
  const result = await capturePayPalOrder(body.orderId);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  // 2) Payment captured - send the lead in the SAME server step, so a paid
  //    submission can't be lost by the browser closing or a second round-trip
  //    failing. A failed email never undoes the (already captured) payment.
  let leadSent = false;
  let leadError: string | undefined;

  if (body.form) {
    const parsed = contactFormSchema.safeParse(body.form);
    if (parsed.success && !parsed.data.website) {
      const paymentInfo: PaymentInfo = {
        provider: "paypal",
        reference: result.captureId,
        secondary: result.orderId,
        amount: result.amount,
      };
      const sent = await sendContactLead(parsed.data, paymentInfo);
      leadSent = sent.ok;
      if (!sent.ok) {
        leadError = sent.error;
        console.error("[capture-order] lead email failed", sent.error);
      }
    } else {
      // Payment went through but the form data is invalid - never drop a paid
      // lead silently; alert the admin with the reference + raw fields.
      console.error(
        "[capture-order] form invalid after capture",
        parsed.success ? "honeypot" : parsed.error.issues
      );
      const alert = await sendPaymentCapturedAlert({
        captureId: result.captureId,
        orderId: result.orderId,
        amount: result.amount,
        rawForm: body.form,
      });
      leadSent = alert.ok;
      if (!alert.ok) leadError = alert.error;
    }
  }

  return NextResponse.json({
    captureId: result.captureId,
    orderId: result.orderId,
    amount: result.amount,
    payerEmail: result.payerEmail,
    leadSent,
    leadError,
    mock: result.mock,
  });
}
