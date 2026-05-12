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

const WINDOWS_SCALING_FIX = `(function(){function a(){try{var w=navigator.userAgent.indexOf('Windows')!==-1;var d=window.devicePixelRatio||1;var iw=window.innerWidth||document.documentElement.clientWidth;var e=document.documentElement;if(!w||iw<1024){e.style.zoom='';return;}if(d>=1.7){e.style.zoom='0.7';}else if(d>=1.4){e.style.zoom='0.8';}else if(d>=1.2){e.style.zoom='0.9';}else{e.style.zoom='';}}catch(err){}}a();window.addEventListener('resize',a);})();`;

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
  title: "Amazon Safety Pro — Compliance handled by people who built the rules",
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
      className={`${geist.variable} ${geistMono.variable} ${fraunces.variable} ${bricolage.variable} ${playfair.variable} ${lora.variable} ${inter.variable} ${dmSans.variable} ${dmSerif.variable} ${jakarta.variable} ${syne.variable} ${outfit.variable} ${manrope.variable} ${nunito.variable}`}
    >
      <body className="bg-[var(--paper)] text-[var(--ink)] antialiased">
        <Script id="windows-scaling-fix" strategy="beforeInteractive">
          {WINDOWS_SCALING_FIX}
        </Script>
        <TacticalShell>{children}</TacticalShell>
      </body>
    </html>
  );
}
