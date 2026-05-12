export type PaymentProvider = "paypal" | "stripe";

export const DEFAULT_PROVIDER: PaymentProvider = "paypal";

export function getActiveProvider(): PaymentProvider {
  const v = process.env.NEXT_PUBLIC_PAYMENT_PROVIDER?.toLowerCase();
  if (v === "stripe") return "stripe";
  if (v === "paypal") return "paypal";
  return DEFAULT_PROVIDER;
}
