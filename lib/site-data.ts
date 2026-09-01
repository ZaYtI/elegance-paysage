export const nav = [
  { label: "Services", href: "#services" },
  { label: "Déroulé", href: "#process" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Zone d'intervention", href: "#zone" },
  { label: "Contact", href: "#contact" },
];

export const heroStats = [
  { value: "Gratuit", label: "Devis personnalisé" },
  { value: "100%", label: "Assuré & équipé" },
  { value: "4", label: "Métiers du végétal" },
];

export type Service = {
  num: string;
  icon: "elagage" | "abattage" | "haies" | "amenagement";
  title: string;
  description: string;
  tag: string;
  accent: "sage" | "bark" | "ink" | "gold";
};

export const services: Service[] = [
  {
    num: "01",
    icon: "amenagement",
    title: "Création & aménagement paysager",
    description:
      "Conception de jardins, plantations, allées et espaces verts sur-mesure, ainsi que pose de portails et clôtures, du premier plan à la réalisation.",
    tag: "Sur devis personnalisé",
    accent: "gold",
  },
  {
    num: "02",
    icon: "elagage",
    title: "Élagage",
    description:
      "Taille raisonnée adaptée à chaque essence et à la saison, pour préserver la forme, la santé et la sécurité de l'arbre.",
    tag: "Toutes hauteurs",
    accent: "sage",
  },
  {
    num: "03",
    icon: "abattage",
    title: "Abattage",
    description:
      "Démontage sécurisé des arbres dangereux, malades ou trop proches des habitations. Évacuation des bois sur demande.",
    tag: "Zones difficiles d'accès",
    accent: "bark",
  },
  {
    num: "04",
    icon: "haies",
    title: "Taille de haies",
    description:
      "Entretien régulier pour des lignes nettes toute l'année, quel que soit le gabarit ou l'essence de votre haie.",
    tag: "Passage périodique",
    accent: "ink",
  },
];

export const processSteps = [
  {
    num: "01",
    title: "Devis gratuit",
    description:
      "Visite sur place ou échange par photos selon la nature du chantier. Estimation claire et sans engagement.",
  },
  {
    num: "02",
    title: "Intervention",
    description:
      "Équipe équipée et assurée, matériel professionnel entretenu, dans le respect de vos horaires et de vos contraintes.",
  },
  {
    num: "03",
    title: "Nettoyage & finition",
    description:
      "Évacuation des déchets verts et broyage sur demande. Le terrain est rendu propre avant notre départ.",
  },
];

export type Engagement = {
  icon: "shield" | "tools" | "quote" | "clock";
  label: string;
  description: string;
  accent: "sage" | "bark" | "gold";
};

export const engagements: Engagement[] = [
  {
    icon: "shield",
    label: "Assurance",
    description: "Responsabilité civile professionnelle couvrant chaque intervention.",
    accent: "sage",
  },
  {
    icon: "tools",
    label: "Matériel",
    description: "Équipement d'élagage et de sécurité entretenu et conforme.",
    accent: "bark",
  },
  {
    icon: "quote",
    label: "Devis",
    description: "Estimation gratuite et détaillée, adaptée à votre projet.",
    accent: "gold",
  },
  {
    icon: "clock",
    label: "Disponibilité",
    description: "Interventions toute l'année, y compris en urgence.",
    accent: "sage",
  },
];

export const serviceOptions = [
  "Création / aménagement paysager",
  "Élagage",
  "Abattage",
  "Taille de haie",
  "Autre",
] as const;

export const contactInfo = {
  phone: "+33 6 28 73 25 88",
  phoneHref: "tel:+330628732588",
  phoneSecondary: "+33 6 65 38 71 22",
  phoneSecondaryHref: "tel:+330665387122",
  email: "contact@elegancepaysage62.com",
  emailHref: "mailto:contact@elegancepaysage62.com",
};

export const zoneInfo = {
  city: "Olhain",
  radiusKm: 80,
};

export const legalInfo = {
  // Éditeur
  companyName: "Élégance Paysage",
  legalForm: "Société à responsabilité limitée (SARL)",
  capital: "5 700 €",
  address: "164 Grand Rue, 62150 La Comté",
  rcsCity: "Arras",
  siren: "108 765 629",
  // Société assujettie à la TVA, numéro en cours d'attribution.
  // Quand il est reçu, le renseigner ici (valeur probable : "FR 54 108765629").
  // Tant que "", la page affiche « En cours d'attribution ».
  vatNumber: "",
  // Représentant(s) légal(aux) — directeur de la publication.
  publicationDirector: "Paul Robillard et Auxence Prévost, cogérants",
  // Hébergeur (déploiement Vercel)
  host: {
    name: "Vercel Inc.",
    address: "340 S Lemon Avenue #4133, Walnut, CA 91789, États-Unis",
    url: "https://vercel.com",
  },
  // Optionnel — médiateur de la consommation (obligatoire pour la vente aux particuliers)
  mediator: {
    name: "",
    url: "",
  },
  lastUpdated: "2026-09-01",
};

export const brand = {
  name: "ÉLÉGANCE PAYSAGES",
  tagline: "Robillard & Prévost",
};
