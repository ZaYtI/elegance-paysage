import type { GardenView } from "@/components/garden-scene/garden-views";

export type GalleryPreviewItem = {
  view: GardenView;
  title: string;
  subtitle: string;
  openLabel: string;
};

export const galleryPreviewItems: GalleryPreviewItem[] = [
  { view: "terrace", title: "Vivre dehors", subtitle: "Terrasses & espaces de vie", openLabel: "Agrandir la vue Terrasse" },
  { view: "planting", title: "Composer avec le vivant", subtitle: "Plantations & clôtures", openLabel: "Agrandir la vue Plantations" },
  { view: "hedge", title: "Le soin des lignes", subtitle: "Taille & entretien", openLabel: "Agrandir la vue Haie taillée" },
];
