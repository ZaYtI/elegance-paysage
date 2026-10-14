import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/home/hero/hero-section";
import { VisionSection } from "@/components/home/vision-section";
import { ExpertisesSection } from "@/components/home/expertises/expertises-section";
import { ApproachSection } from "@/components/home/approach/approach-section";
import { GalleryPreviewSection } from "@/components/home/gallery-preview/gallery-preview-section";
import { ZoneSection } from "@/components/home/zone-section";
import { ContactSection } from "@/components/home/contact/contact-section";
import { homeNav } from "@/lib/site-data";

export default function Home() {
  return (
    <>
      <SiteHeader links={homeNav} homeHref="#top" />
      <main>
        <HeroSection />
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
