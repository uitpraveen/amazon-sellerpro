import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Fraunces,
  Bricolage_Grotesque,
  Playfair_Display,
  Lora,
  Inter,
  DM_Sans,
  DM_Serif_Display,
  Plus_Jakarta_Sans,
  Syne,
  Outfit,
  Manrope,
  Nunito,
} from "next/font/google";
import Script from "next/script";
import "./globals.css";
import TacticalShell from "@/components/layout/TacticalShell";

const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MN8CZ49R');`;

// Windows high-DPI display scaling (125/150/175%) makes the site render too
// large. Counter it with a CSS zoom on desktop Windows, and expose the factor
// as --ui-scale so full-viewport sections can compensate (calc(100svh/scale))
// and keep filling the screen + keep scroll math correct. Scale stays 1 on
// Mac/normal displays, so they are unaffected.
const UI_SCALE_FIX = `(function(){function a(){try{var win=navigator.userAgent.indexOf('Windows')!==-1;var d=window.devicePixelRatio||1;var w=window.innerWidth||document.documentElement.clientWidth;var e=document.documentElement;var s=1;if(win&&w>=1024){if(d>=1.7){s=0.7;}else if(d>=1.4){s=0.8;}else if(d>=1.2){s=0.9;}}e.style.zoom=s===1?'':String(s);e.style.setProperty('--ui-scale',String(s));}catch(err){}}a();window.addEventListener('resize',a);})();`;

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
  weight: ["400", "500", "600", "700", "900"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "opsz"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif",
  weight: ["400"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Amazon Safety Pro - Compliance handled by people who built the rules",
  description:
    "Amazon product safety and ASIN reinstatement, led by ex-Amazonians who spent half a decade inside Amazon's product safety team.",
  keywords: [
    "Amazon safety compliance",
    "ASIN reinstatement",
    "CPC creation",
    "DOC GCC creation",
    "product safety",
    "Amazon seller services",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // The ui-scale-fix script below runs beforeInteractive and sets
      // `zoom` + `--ui-scale` on this <html> element from client-only signals
      // (devicePixelRatio, innerWidth, userAgent) that can't be computed on the
      // server. That legitimately makes the client <html> differ from the SSR
      // markup, so we suppress the hydration warning for this element's own
      // attributes (does not affect children).
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${fraunces.variable} ${bricolage.variable} ${playfair.variable} ${lora.variable} ${inter.variable} ${dmSans.variable} ${dmSerif.variable} ${jakarta.variable} ${syne.variable} ${outfit.variable} ${manrope.variable} ${nunito.variable}`}
    >
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="beforeInteractive">
          {GTM_SNIPPET}
        </Script>
        {/* End Google Tag Manager */}
        <Script id="ui-scale-fix" strategy="beforeInteractive">
          {UI_SCALE_FIX}
        </Script>
      </head>
      <body className="bg-[var(--paper)] text-[var(--ink)] antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MN8CZ49R"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <TacticalShell>{children}</TacticalShell>
      </body>
    </html>
  );
}
