import { NextResponse } from "next/server";
import { createStripePaymentIntent } from "@/lib/stripe";
import {
  getServicePrice,
  SERVICE_PRICES_USD,
} from "@/lib/services-prices";
import type { ServiceInquiryType } from "@/lib/types";
import { SERVICE_INQUIRY_LABELS } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { inquiryType?: string } = {};
  try {
    body = (await req.json()) as { inquiryType?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const inquiryType = body.inquiryType as ServiceInquiryType | undefined;
  if (!inquiryType || !(inquiryType in SERVICE_PRICES_USD)) {
    return NextResponse.json(
      { error: "Unsupported or missing service type" },
      { status: 400 }
    );
  }

  const price = getServicePrice(inquiryType);
  if (price == null) {
    return NextResponse.json(
      { error: "Service has no price" },
      { status: 400 }
    );
  }

  const description = SERVICE_INQUIRY_LABELS[inquiryType];
  const result = await createStripePaymentIntent(price, description);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({
    paymentIntentId: result.paymentIntentId,
    clientSecret: result.clientSecret,
    mock: result.mock,
  });
}
