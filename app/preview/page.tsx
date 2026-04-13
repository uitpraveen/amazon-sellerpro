import type { Metadata } from "next";
import EditorialNavbar from "@/components/sections/preview/EditorialNavbar";
import EditorialFooter from "@/components/sections/preview/EditorialFooter";
import EditorialHero from "@/components/sections/preview/EditorialHero";
import StatsRow from "@/components/sections/preview/StatsRow";
import EditorialSoundFamiliar from "@/components/sections/preview/EditorialSoundFamiliar";
import DarkProcessSection from "@/components/sections/preview/DarkProcessSection";
import EditorialCapabilities from "@/components/sections/preview/EditorialCapabilities";
import DarkThesisSection from "@/components/sections/preview/DarkThesisSection";
import TestimonialsSection from "@/components/sections/preview/TestimonialsSection";
import DarkCTASection from "@/components/sections/preview/DarkCTASection";

export const metadata: Metadata = {
  title:
    "Amazon Safety Pro — Editorial Preview · Compliance handled by people who built the rules",
  description:
    "Editorial Authority design direction preview for Amazon Safety Pro.",
};

export default function PreviewHomePage() {
  return (
    <>
      <EditorialNavbar />
      <main>
        <EditorialHero />
        <StatsRow />
        <EditorialSoundFamiliar />
        <DarkProcessSection />
        <EditorialCapabilities />
        <DarkThesisSection />
        <TestimonialsSection />
        <DarkCTASection />
      </main>
      <EditorialFooter />
    </>
  );
}
