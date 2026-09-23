import { contactInfo, legalInfo, services, siteInfo, zoneInfo } from "@/lib/site-data";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    "@id": `${siteInfo.url}/#business`,
    name: siteInfo.name,
    legalName: legalInfo.companyName,
    url: siteInfo.url,
    logo: `${siteInfo.url}/icon.svg`,
    image: `${siteInfo.url}/icon.svg`,
    telephone: contactInfo.phone,
    email: contactInfo.email,
    description:
      "Création et aménagement paysager, élagage, abattage et taille de haies pour particuliers et professionnels.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "La Comté",
      postalCode: "62150",
      addressRegion: "Hauts-de-France",
      addressCountry: "FR",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 50.4331,
        longitude: 2.5086,
      },
      geoRadius: zoneInfo.radiusKm * 1000,
    },
    founder: [
      { "@type": "Person", name: "Paul Robillard" },
      { "@type": "Person", name: "Auxence Prévost" },
    ],
    priceRange: "Devis gratuit",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title },
      })),
    },
    ...(siteInfo.googleBusinessUrl && {
      sameAs: [siteInfo.googleBusinessUrl],
      hasMap: siteInfo.googleBusinessUrl,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
