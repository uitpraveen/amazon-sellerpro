import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/sections/home/HeroSlider";
import SoundFamiliar from "@/components/sections/home/SoundFamiliar";
import ServiceCards from "@/components/sections/home/ServiceCards";
import RestrictedSlider from "@/components/sections/home/RestrictedSlider";
import ProcessFlow from "@/components/sections/home/ProcessFlow";
import WhyUs from "@/components/sections/home/WhyUs";
import HomeCTA from "@/components/sections/home/HomeCTA";
import DifferenceClosing from "@/components/sections/home/DifferenceClosing";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <main>
        <HeroSlider />
        <SoundFamiliar />
        <HomeCTA />
        <ServiceCards />
        <RestrictedSlider />
        <ProcessFlow />
        <WhyUs />
        <DifferenceClosing />
      </main>
      <Footer />
    </div>
  );
}
