"use client";

import { useEffect, useMemo, useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type { ServiceInquiryType } from "@/lib/types";
import { formatPrice } from "@/lib/services-prices";

const cardFont = { fontFamily: "var(--font-outfit)" };

export interface StripeCheckoutProps {
  inquiryType: ServiceInquiryType;
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onError?: (message: string) => void;
}

export default function StripeCheckout({
  inquiryType,
  amount,
  onSuccess,
  onError,
}: StripeCheckoutProps) {
  const publishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [isMock, setIsMock] = useState(false);
  const [bootstrapError, setBootstrapError] = useState<string | null>(null);

  const stripePromise = useMemo<Promise<Stripe | null> | null>(() => {
    if (!publishable || publishable === "MOCK") return null;
    return loadStripe(publishable);
  }, [publishable]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ inquiryType }),
        });
        const data = (await res.json()) as {
          clientSecret?: string;
          paymentIntentId?: string;
          mock?: boolean;
          error?: string;
        };
        if (cancelled) return;
        if (!res.ok || !data.clientSecret || !data.paymentIntentId) {
          setBootstrapError(data.error || "Could not start payment");
          return;
        }
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
        setIsMock(Boolean(data.mock));
      } catch (err) {
        if (cancelled) return;
        setBootstrapError(
          err instanceof Error ? err.message : "Network error"
        );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [inquiryType]);

  if (bootstrapError) {
    return (
      <p className="text-sm text-[#9B1C1C]" style={cardFont}>
        {bootstrapError}
      </p>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center gap-2 text-sm text-[#6B6560]" style={cardFont}>
        <span className="inline-block h-2 w-2 rounded-full bg-[#B8860B] animate-pulse" />
        Preparing secure card form…
      </div>
    );
  }

  // Mock mode - Stripe.js can't be loaded, so we render a placeholder card
  // form that auto-completes when the user clicks "Pay (mock)".
  if (isMock || !stripePromise) {
    return (
      <MockStripeForm
        amount={amount}
        paymentIntentId={paymentIntentId!}
        onSuccess={onSuccess}
        onError={onError}
      />
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#B8860B",
            colorBackground: "#FAF7F2",
            colorText: "#2D2A26",
            colorDanger: "#9B1C1C",
            fontFamily: '"Outfit", system-ui, sans-serif',
            borderRadius: "8px",
          },
        },
      }}
    >
      <RealStripeForm
        amount={amount}
        paymentIntentId={paymentIntentId!}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
}

function RealStripeForm({
  amount,
  paymentIntentId,
  onSuccess,
  onError,
}: {
  amount: number;
  paymentIntentId: string;
  onSuccess: (paymentIntentId: string) => void;
  onError?: (msg: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    if (!stripe || !elements) return;
    setIsSubmitting(true);
    setError(null);
    const { error: submitErr } = await elements.submit();
    if (submitErr) {
      const msg = submitErr.message || "Card form invalid";
      setError(msg);
      onError?.(msg);
      setIsSubmitting(false);
      return;
    }
    const { error: confirmErr, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (confirmErr) {
      const msg = confirmErr.message || "Payment failed";
      setError(msg);
      onError?.(msg);
      setIsSubmitting(false);
      return;
    }
    if (paymentIntent?.status === "succeeded") {
      onSuccess(paymentIntent.id);
      return;
    }
    const msg = `Unexpected status: ${paymentIntent?.status}`;
    setError(msg);
    onError?.(msg);
    setIsSubmitting(false);
  }

  return (
    <div>
      <PaymentElement options={{ layout: "tabs" }} />
      <button
        type="button"
        onClick={handlePay}
        disabled={isSubmitting || !stripe || !elements}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#daa520] disabled:opacity-60 disabled:cursor-not-allowed text-[#1f1c19] px-6 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase transition-colors"
        style={cardFont}
      >
        {isSubmitting ? "Processing…" : `Pay ${formatPrice(amount)}`}
      </button>
      {error && (
        <p className="mt-3 text-sm text-[#9B1C1C]" style={cardFont}>
          {error}
        </p>
      )}
      <p
        className="mt-3 text-[11px] text-[#6B6560]/70"
        style={cardFont}
      >
        Payments secured by Stripe. Intent: {paymentIntentId.slice(0, 12)}…
      </p>
    </div>
  );
}

function MockStripeForm({
  amount,
  paymentIntentId,
  onSuccess,
}: {
  amount: number;
  paymentIntentId: string;
  onSuccess: (paymentIntentId: string) => void;
  onError?: (msg: string) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleMockPay() {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    onSuccess(paymentIntentId);
  }

  return (
    <div>
      <div
        className="mb-4 rounded-lg border border-dashed border-[#B8860B]/40 bg-[#B8860B]/[0.06] px-4 py-3"
        style={cardFont}
      >
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B8860B]">
          Stripe · Mock mode
        </p>
        <p className="text-xs text-[#6B6560] mt-1 leading-relaxed">
          Stripe credentials not configured. This button simulates a successful
          card payment. Add{" "}
          <code className="font-mono text-[11px]">
            NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
          </code>{" "}
          and{" "}
          <code className="font-mono text-[11px]">STRIPE_SECRET_KEY</code> to
          enable the real Stripe test mode.
        </p>
      </div>
      <div className="space-y-3">
        <div className="rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] px-4 py-3 text-sm text-[#6B6560]" style={cardFont}>
          <div className="flex justify-between">
            <span>Card number</span>
            <span className="font-mono">4242 4242 4242 4242</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Expiry · CVC</span>
            <span className="font-mono">12 / 34 · 123</span>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={handleMockPay}
        disabled={isSubmitting}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#daa520] disabled:opacity-60 disabled:cursor-not-allowed text-[#1f1c19] px-6 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase transition-colors"
        style={cardFont}
      >
        {isSubmitting ? "Processing…" : `Simulate ${formatPrice(amount)} payment`}
      </button>
      <p className="mt-3 text-[11px] text-[#6B6560]/70" style={cardFont}>
        Mock intent: {paymentIntentId.slice(0, 18)}…
      </p>
    </div>
  );
}
