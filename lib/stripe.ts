/**
 * Server-side Stripe helpers.
 *
 * When STRIPE_SECRET_KEY is missing, all functions operate in MOCK mode —
 * the API route returns a synthetic client_secret and verifyPaymentIntent
 * accepts mock IDs. This mirrors the PayPal mock pattern so the full flow
 * can be tested without real Stripe credentials.
 */

import Stripe from "stripe";
import { CURRENCY } from "@/lib/services-prices";

const MOCK_PI_PREFIX = "pi_MOCK_";
const MOCK_SECRET_SUFFIX = "_secret_MOCK";

export function isStripeMockMode(): boolean {
  return !process.env.STRIPE_SECRET_KEY;
}

function stripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY missing");
  return new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
}

export type CreatePaymentIntentResult =
  | {
      ok: true;
      clientSecret: string;
      paymentIntentId: string;
      mock: boolean;
    }
  | { ok: false; error: string };

export async function createStripePaymentIntent(
  amountUsd: number,
  description: string
): Promise<CreatePaymentIntentResult> {
  if (isStripeMockMode()) {
    const id = `${MOCK_PI_PREFIX}${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 10)}`;
    return {
      ok: true,
      paymentIntentId: id,
      clientSecret: `${id}${MOCK_SECRET_SUFFIX}`,
      mock: true,
    };
  }

  try {
    const stripe = stripeClient();
    const amountCents = Math.round(amountUsd * 100);
    const intent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: CURRENCY.toLowerCase(),
      description,
      automatic_payment_methods: { enabled: true },
    });
    if (!intent.client_secret) {
      return { ok: false, error: "Stripe returned no client_secret" };
    }
    return {
      ok: true,
      paymentIntentId: intent.id,
      clientSecret: intent.client_secret,
      mock: false,
    };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error ? err.message : "Stripe create-intent failed",
    };
  }
}

export async function verifyStripePaymentIntent(
  paymentIntentId: string
): Promise<{ ok: true; amount: string } | { ok: false; error: string }> {
  if (isStripeMockMode()) {
    return { ok: true, amount: "0.00" };
  }
  if (paymentIntentId.startsWith(MOCK_PI_PREFIX)) {
    return { ok: false, error: "Mock PaymentIntent rejected in live mode" };
  }
  try {
    const stripe = stripeClient();
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (intent.status !== "succeeded") {
      return {
        ok: false,
        error: `PaymentIntent status: ${intent.status}`,
      };
    }
    return {
      ok: true,
      amount: (intent.amount_received / 100).toFixed(2),
    };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : "Stripe verify failed",
    };
  }
}
