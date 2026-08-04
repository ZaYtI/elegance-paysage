import type { Metadata } from "next";
import { Poppins, Work_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const workSans = Work_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Élégance Paysages — Robillard & Prévost | Aménagement paysager, élagage & abattage",
  description:
    "Création et aménagement paysager (portails, clôtures), élagage, abattage et taille de haies pour particuliers et professionnels dans un rayon de 80 km autour de Ruitz. Devis gratuit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${poppins.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink-900 font-sans">
        {children}
      </body>
    </html>
  );
}
