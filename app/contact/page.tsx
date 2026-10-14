import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form/contact-form";
import { ContactIntro } from "@/components/contact-page/contact-intro";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { RoundedPanel } from "@/components/ui/rounded-panel";
import { pageNav } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact — Élégance Paysage | Devis gratuit paysagiste & élagueur",
  description:
    "Contactez Élégance Paysage pour un devis gratuit : création de jardin, élagage, abattage, taille de haies. Intervention dans un rayon de 80 km autour d’Olhain.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader links={pageNav} homeHref="/" />
      <main className="bg-sand-100 pt-[110px]">
        <RoundedPanel surround="sand" className="grid grid-cols-1 items-start gap-14 min-[951px]:grid-cols-[1fr_1.15fr]">
          <ContactIntro />
          <ContactForm />
        </RoundedPanel>
      </main>
      <SiteFooter />
    </>
  );
}
