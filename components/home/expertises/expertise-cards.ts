import type { Service } from "@/lib/site-data";

export type ExpertiseMotif = "leaves" | "rings" | "bars" | "garden";

export type ExpertiseCardStyle = {
  tag: string;
  background: string;
  color: string;
  motif: ExpertiseMotif;
  motifColor?: string;
  motifOpacity?: number;
};

export const expertiseCardStyles: Record<Service["icon"], ExpertiseCardStyle> = {
  amenagement: {
    tag: "IMAGINER & RÉALISER",
    background: "#3c342b",
    color: "#ffffff",
    motif: "garden",
  },
  elagage: {
    tag: "ÉLAGAGE",
    background: "#a0a794",
    color: "#17140f",
    motif: "leaves",
    motifColor: "#17140f",
    motifOpacity: 0.16,
  },
  abattage: {
    tag: "ABATTAGE",
    background: "#6c5d4f",
    color: "#faf8f2",
    motif: "rings",
    motifColor: "#faf8f2",
    motifOpacity: 0.14,
  },
  haies: {
    tag: "TAILLE DE HAIES",
    background: "#242019",
    color: "#faf8f2",
    motif: "bars",
    motifColor: "#a0a794",
    motifOpacity: 0.2,
  },
};
