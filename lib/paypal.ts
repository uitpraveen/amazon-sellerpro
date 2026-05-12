/**
 * Server-side PayPal helpers for the Orders v2 API.
 *
 * When PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET is missing, all functions
 * operate in MOCK mode — they return synthetic order/capture IDs and the
 * downstream code treats them as valid. This lets the entire flow be tested
 * without real PayPal sandbox credentials.
 */

import { CURRENCY } from "@/lib/services-prices";

const MOCK_ORDER_PREFIX = "MOCK_ORDER_";
const MOCK_CAPTURE_PREFIX = "MOCK_CAPTURE_";

export function isPayPalMockMode(): boolean {
  return !process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET;
}

function paypalBaseUrl(): string {
  return process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !secret) {
    throw new Error("PayPal credentials missing");
  }
  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");
  const res = await fetch(`${paypalBaseUrl()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`PayPal auth failed: ${res.status}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export type CreateOrderResult =
  | { ok: true; orderId: string; mock: boolean }
  | { ok: false; error: string };

export async function createPayPalOrder(
  amountUsd: number,
  description: string
): Promise<CreateOrderResult> {
  if (isPayPalMockMode()) {
    return {
      ok: true,
      orderId: `${MOCK_ORDER_PREFIX}${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 10)}`,
      mock: true,
    };
  }

  try {
    const token = await getAccessToken();
    const res = await fetch(`${paypalBaseUrl()}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            description,
            amount: {
              currency_code: CURRENCY,
              value: amountUsd.toFixed(2),
            },
          },
        ],
      }),
      cache: "no-store",
    });
    const data = (await res.json()) as { id?: string; message?: string };
    if (!res.ok || !data.id) {
      return {
        ok: false,
        error: data.message || `PayPal create-order failed (${res.status})`,
      };
    }
    return { ok: true, orderId: data.id, mock: false };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : "Unknown error creating PayPal order",
    };
  }
}

export type CaptureOrderResult =
  | {
      ok: true;
      captureId: string;
      orderId: string;
      amount: string;
      payerEmail?: string;
      mock: boolean;
    }
  | { ok: false; error: string };

export async function capturePayPalOrder(
  orderId: string
): Promise<CaptureOrderResult> {
  if (isPayPalMockMode()) {
    return {
      ok: true,
      captureId: `${MOCK_CAPTURE_PREFIX}${Date.now()}`,
      orderId,
      amount: "0.00",
      payerEmail: "mock-buyer@sandbox.paypal.com",
      mock: true,
    };
  }
  if (orderId.startsWith(MOCK_ORDER_PREFIX)) {
    return { ok: false, error: "Mock order rejected in live PayPal mode" };
  }

  try {
    const token = await getAccessToken();
    const res = await fetch(
      `${paypalBaseUrl()}/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    const data = (await res.json()) as {
      id?: string;
      status?: string;
      message?: string;
      purchase_units?: Array<{
        payments?: {
          captures?: Array<{
            id: string;
            status: string;
            amount?: { value: string; currency_code: string };
          }>;
        };
      }>;
      payer?: { email_address?: string };
    };
    if (!res.ok) {
      return {
        ok: false,
        error: data.message || `PayPal capture failed (${res.status})`,
      };
    }
    const capture = data.purchase_units?.[0]?.payments?.captures?.[0];
    if (!capture || capture.status !== "COMPLETED") {
      return {
        ok: false,
        error: `Payment not completed (status: ${capture?.status ?? "unknown"})`,
      };
    }
    return {
      ok: true,
      captureId: capture.id,
      orderId,
      amount: capture.amount?.value ?? "0.00",
      payerEmail: data.payer?.email_address,
      mock: false,
    };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : "Unknown error capturing PayPal order",
    };
  }
}

export async function verifyPayPalCapture(
  captureId: string
): Promise<{ ok: true; amount: string } | { ok: false; error: string }> {
  if (isPayPalMockMode()) {
    return { ok: true, amount: "0.00" };
  }
  if (captureId.startsWith(MOCK_CAPTURE_PREFIX)) {
    return { ok: false, error: "Mock capture rejected in live PayPal mode" };
  }

  try {
    const token = await getAccessToken();
    const res = await fetch(
      `${paypalBaseUrl()}/v2/payments/captures/${captureId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
    const data = (await res.json()) as {
      status?: string;
      amount?: { value: string };
      message?: string;
    };
    if (!res.ok || data.status !== "COMPLETED") {
      return {
        ok: false,
        error: data.message || `Capture not COMPLETED (${data.status})`,
      };
    }
    return { ok: true, amount: data.amount?.value ?? "0.00" };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Capture verify failed",
    };
  }
}
