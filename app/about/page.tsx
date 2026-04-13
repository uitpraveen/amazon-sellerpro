import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutDossierSection from "@/components/sections/AboutDossierSection";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutDossierSection />
      </main>
      <Footer />
    </>
  );
}
