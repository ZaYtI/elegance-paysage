import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProcessSection } from "@/components/sections/process-section";
import { EngagementsSection } from "@/components/sections/engagements-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ZoneSection } from "@/components/sections/zone-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <SiteHeader />
      <main className="flex flex-col flex-1">
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <EngagementsSection />
        <PortfolioSection />
        <ZoneSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
