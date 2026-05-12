"use client";

import { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import type { ServiceInquiryType } from "@/lib/types";
import { formatPrice } from "@/lib/services-prices";

const cardFont = { fontFamily: "var(--font-outfit)" };

export interface PayPalCheckoutProps {
  inquiryType: ServiceInquiryType;
  amount: number;
  onSuccess: (captureId: string, orderId: string) => void;
  onError?: (message: string) => void;
}

type Status = "idle" | "processing" | "error";

export default function PayPalCheckout({
  inquiryType,
  amount,
  onSuccess,
  onError,
}: PayPalCheckoutProps) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const isMockMode = !clientId || clientId === "MOCK";

  if (isMockMode) {
    return (
      <MockPayPalButton
        inquiryType={inquiryType}
        amount={amount}
        onSuccess={onSuccess}
        onError={onError}
      />
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: "USD",
        intent: "capture",
      }}
    >
      <RealPayPalButtons
        inquiryType={inquiryType}
        onSuccess={onSuccess}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
}

function RealPayPalButtons({
  inquiryType,
  onSuccess,
  onError,
}: {
  inquiryType: ServiceInquiryType;
  onSuccess: (captureId: string, orderId: string) => void;
  onError?: (message: string) => void;
}) {
  return (
    <PayPalButtons
      style={{
        layout: "vertical",
        color: "gold",
        shape: "rect",
        label: "pay",
        height: 48,
      }}
      createOrder={async () => {
        const res = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ inquiryType }),
        });
        const data = (await res.json()) as {
          orderId?: string;
          error?: string;
        };
        if (!res.ok || !data.orderId) {
          throw new Error(data.error || "Unable to create order");
        }
        return data.orderId;
      }}
      onApprove={async (data) => {
        const res = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: data.orderID }),
        });
        const captured = (await res.json()) as {
          captureId?: string;
          orderId?: string;
          error?: string;
        };
        if (!res.ok || !captured.captureId) {
          onError?.(captured.error || "Capture failed");
          return;
        }
        onSuccess(captured.captureId, captured.orderId || data.orderID);
      }}
      onError={(err) => {
        onError?.(err instanceof Error ? err.message : "PayPal error");
      }}
    />
  );
}

function MockPayPalButton({
  inquiryType,
  amount,
  onSuccess,
  onError,
}: {
  inquiryType: ServiceInquiryType;
  amount: number;
  onSuccess: (captureId: string, orderId: string) => void;
  onError?: (message: string) => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function handleMockPay() {
    setStatus("processing");
    setErrMsg(null);
    try {
      const createRes = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inquiryType }),
      });
      const createData = (await createRes.json()) as {
        orderId?: string;
        error?: string;
      };
      if (!createRes.ok || !createData.orderId) {
        throw new Error(createData.error || "Mock order failed");
      }
      await new Promise((r) => setTimeout(r, 600));
      const capRes = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: createData.orderId }),
      });
      const capData = (await capRes.json()) as {
        captureId?: string;
        orderId?: string;
        error?: string;
      };
      if (!capRes.ok || !capData.captureId) {
        throw new Error(capData.error || "Mock capture failed");
      }
      onSuccess(capData.captureId, capData.orderId || createData.orderId);
    } catch (err) {
      const m = err instanceof Error ? err.message : "Mock payment failed";
      setErrMsg(m);
      onError?.(m);
      setStatus("error");
    }
  }

  return (
    <div>
      <div
        className="mb-4 rounded-lg border border-dashed border-[#B8860B]/40 bg-[#B8860B]/[0.06] px-4 py-3"
        style={cardFont}
      >
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B8860B]">
          Sandbox · Mock mode
        </p>
        <p className="text-xs text-[#6B6560] mt-1 leading-relaxed">
          PayPal credentials not configured. This button simulates a successful
          payment so the full flow can be tested. Add{" "}
          <code className="font-mono text-[11px]">NEXT_PUBLIC_PAYPAL_CLIENT_ID</code>{" "}
          to enable real PayPal sandbox.
        </p>
      </div>
      <button
        type="button"
        onClick={handleMockPay}
        disabled={status === "processing"}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#daa520] disabled:opacity-60 disabled:cursor-not-allowed text-[#1f1c19] px-6 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase transition-colors"
        style={cardFont}
      >
        {status === "processing"
          ? "Processing…"
          : `Simulate ${formatPrice(amount)} payment`}
      </button>
      {errMsg && (
        <p
          className="mt-3 text-sm text-[#9B1C1C]"
          style={cardFont}
        >
          {errMsg}
        </p>
      )}
    </div>
  );
}
