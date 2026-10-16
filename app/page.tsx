import { IntroLoader } from "@/components/home/intro-loader/intro-loader";
import { IntroSkipScript } from "@/components/home/intro-loader/intro-skip-script";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/home/hero/hero-section";
import { KeyFactsBand } from "@/components/home/key-facts-band";
import { VisionSection } from "@/components/home/vision-section";
import { ExpertisesSection } from "@/components/home/expertises/expertises-section";
import { ApproachSection } from "@/components/home/approach/approach-section";
import { GalleryPreviewSection } from "@/components/home/gallery-preview/gallery-preview-section";
import { ZoneSection } from "@/components/home/zone-section";
import { ContactSection } from "@/components/home/contact/contact-section";

export default function Home() {
  return (
    <>
      <IntroSkipScript />
      <IntroLoader />
      <SiteHeader />
      <main>
        <HeroSection />
        <KeyFactsBand />
        <VisionSection />
        <ExpertisesSection />
        <ApproachSection />
        <GalleryPreviewSection />
        <ZoneSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
