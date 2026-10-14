import type { Metadata } from "next";
import { GalleryBrowser } from "@/components/gallery-page/gallery-browser";
import { GalleryContactBand } from "@/components/gallery-page/gallery-contact-band";
import { GalleryHero } from "@/components/gallery-page/gallery-hero";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { galleryNav } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Galerie — Élégance Paysage",
  description:
    "Le book de chantiers d’Élégance Paysage : création de jardins, terrasses, plantations, haies, élagage et entretien dans le Pas-de-Calais.",
  alternates: { canonical: "/galerie" },
};

export default function GalleryPage() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader links={galleryNav} homeHref="/" />
      <main>
        <div className="bg-paper text-[#1e1b16]">
          <GalleryHero />
          <GalleryBrowser />
        </div>
        <GalleryContactBand />
      </main>
      <SiteFooter />
    </>
  );
}
