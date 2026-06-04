/**
 * Pushes a custom event onto the GTM dataLayer (created by the GTM snippet in
 * the root layout). Safe to call before GTM has loaded - the array is created
 * if missing, and GTM replays queued events once it initialises. No-op on the
 * server. Keep payloads free of PII - dataLayer values flow on to GA4/Ads.
 */
export function pushDataLayer(
  payload: Record<string, unknown> & { event: string }
): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: Array<Record<string, unknown>>;
  };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
}
