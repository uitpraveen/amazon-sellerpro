/**
 * Single source of truth for site-wide values.
 * All TODO placeholders below must be filled by Deepak before launch.
 */
export const siteConfig = {
  businessName: "Amazon Safety Pro",

  contactEmail: "contact@amazonsafetypro.com",
  websiteUrl: "TODO",
  whatsappNumber: "TODO",
  privacyLastUpdated: "TODO",

  // From the docx; do not change without updating the source document.
  termsLastUpdated: "2026-03-29",
} as const;

export type SiteConfig = typeof siteConfig;
