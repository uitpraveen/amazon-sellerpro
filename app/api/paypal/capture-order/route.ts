import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { orderId?: string } = {};
  try {
    body = (await req.json()) as { orderId?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.orderId || typeof body.orderId !== "string") {
    return NextResponse.json(
      { error: "Missing orderId" },
      { status: 400 }
    );
  }

  const result = await capturePayPalOrder(body.orderId);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({
    captureId: result.captureId,
    orderId: result.orderId,
    amount: result.amount,
    payerEmail: result.payerEmail,
    mock: result.mock,
  });
}
