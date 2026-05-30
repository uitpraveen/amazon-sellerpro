"use client";

import { useEffect, useRef } from "react";

/**
 * Public client-id for PayPal Hosted Buttons (safe to expose - it is rendered
 * inline in the page by design). Both hosted buttons share this client-id.
 */
const PAYPAL_CLIENT_ID =
  "BAA_gcRoYRXAajr8WUn5o2xtJvCo8T6vqbOaqAPXOh-ajZyrGeQAGppY543jNishQ6U7h8F4D73I-zdouo";

const SDK_SRC = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=hosted-buttons&disable-funding=venmo&currency=USD`;

type HostedButtonsApi = {
  HostedButtons: (opts: { hostedButtonId: string }) => {
    render: (selector: string) => void;
  };
};

function getHostedButtons(): HostedButtonsApi | undefined {
  if (typeof window === "undefined") return undefined;
  const api = (window as unknown as { paypal?: Partial<HostedButtonsApi> })
    .paypal;
  return api && typeof api.HostedButtons === "function"
    ? (api as HostedButtonsApi)
    : undefined;
}

let sdkPromise: Promise<void> | null = null;

function loadPayPalSdk(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (getHostedButtons()) return Promise.resolve();
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-paypal-hosted="true"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("PayPal SDK failed to load"))
      );
      return;
    }
    const script = document.createElement("script");
    script.src = SDK_SRC;
    script.async = true;
    script.dataset.paypalHosted = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("PayPal SDK failed to load"));
    document.body.appendChild(script);
  });

  return sdkPromise;
}

export default function PayPalHostedButton({
  hostedButtonId,
}: {
  hostedButtonId: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    loadPayPalSdk()
      .then(() => {
        if (cancelled || renderedRef.current || !containerRef.current) return;
        const paypal = getHostedButtons();
        if (!paypal) return;
        renderedRef.current = true;
        paypal
          .HostedButtons({ hostedButtonId })
          .render(`#${containerRef.current.id}`);
      })
      .catch(() => {
        /* SDK load failure is non-fatal; the card simply shows no button. */
      });
    return () => {
      cancelled = true;
    };
  }, [hostedButtonId]);

  return (
    <div
      id={`paypal-container-${hostedButtonId}`}
      ref={containerRef}
      className="min-h-[45px]"
    />
  );
}
