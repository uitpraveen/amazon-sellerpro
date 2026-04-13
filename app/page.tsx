import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SoundFamiliarSection from "@/components/sections/SoundFamiliarSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import RestoredSection from "@/components/sections/RestoredSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import DifferenceSection from "@/components/sections/DifferenceSection";
import HomeCTASection from "@/components/sections/HomeCTASection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SoundFamiliarSection />
        <ProcessSection />
        <CapabilitiesSection />
        <RestoredSection />
        <WhyUsSection />
        <DifferenceSection />
        <HomeCTASection />
      </main>
      <Footer />
    </>
  );
}
