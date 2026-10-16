import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { RevealOnScroll } from "@/components/layout/reveal-on-scroll";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { LocalBusinessJsonLd } from "@/components/local-business-jsonld";
import { isPreviewDeployment } from "@/lib/environment";
import { siteInfo } from "@/lib/site-data";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.url),
  alternates: { canonical: "/" },
  title: "Élégance Paysage — Robillard & Prévost | Aménagement paysager, élagage & abattage",
  description:
    "Création et aménagement paysager (portails, clôtures), élagage, abattage et taille de haies pour particuliers et professionnels dans un rayon de 80 km autour de Ruitz. Devis gratuit.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: siteInfo.name,
  },
  robots: isPreviewDeployment() ? { index: false, follow: false } : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${dmSans.variable} ${manrope.variable} antialiased`}
    >
      <body>
        <LocalBusinessJsonLd />
        <RevealOnScroll />
        <SmoothScroll />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
