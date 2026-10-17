import type { Metadata } from "next";
import { GalleryBrowser } from "@/components/gallery-page/gallery-browser";
import { getGalleryData } from "@/components/gallery-page/gallery-data";
import { GalleryContactBand } from "@/components/gallery-page/gallery-contact-band";
import { GalleryHero } from "@/components/gallery-page/gallery-hero";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Galerie — Élégance Paysage",
  description:
    "Le book de chantiers d’Élégance Paysage : création de jardins, terrasses, plantations, haies, élagage et entretien dans le Pas-de-Calais.",
  alternates: { canonical: "/galerie" },
};

export default async function GalleryPage() {
  const galleryData = await getGalleryData();

  return (
    <>
      <SiteHeader />
      <main>
        <div className="bg-paper text-[#1e1b16]">
          <GalleryHero data={galleryData} />
          <GalleryBrowser data={galleryData} />
        </div>
        <GalleryContactBand />
      </main>
      <SiteFooter />
    </>
  );
}
