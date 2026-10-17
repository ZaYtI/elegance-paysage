export type GalleryCategoryId = "creation" | "terrasses" | "plantations" | "haies" | "arbres" | "entretien";

export type GalleryFilterId = GalleryCategoryId | "all";

export type GalleryTileSize = "regular" | "wide" | "tall" | "big";

export type GalleryItem = {
  title: string;
  category: GalleryCategoryId;
  size: GalleryTileSize;
};

export const galleryCategories: { id: GalleryCategoryId; label: string }[] = [
  { id: "creation", label: "Création" },
  { id: "terrasses", label: "Terrasses & allées" },
  { id: "plantations", label: "Plantations" },
  { id: "haies", label: "Haies & taille" },
  { id: "arbres", label: "Élagage & abattage" },
  { id: "entretien", label: "Tonte & entretien" },
];

export const galleryItems: GalleryItem[] = [
  { title: "Terrasse bois et salon de jardin", category: "terrasses", size: "big" },
  { title: "Massif de vivaces", category: "plantations", size: "tall" },
  { title: "Haie taillée au cordeau", category: "haies", size: "regular" },
  { title: "Création d’un jardin complet", category: "creation", size: "wide" },
  { title: "Taille raisonnée d’un fruitier", category: "arbres", size: "regular" },
  { title: "Allée en pas japonais", category: "terrasses", size: "tall" },
  { title: "Pelouse tondue en bandes", category: "entretien", size: "wide" },
  { title: "Portail et clôture bois", category: "creation", size: "regular" },
  { title: "Haie champêtre", category: "haies", size: "tall" },
  { title: "Abattage en zone difficile", category: "arbres", size: "regular" },
  { title: "Bordures acier et gravier", category: "creation", size: "regular" },
  { title: "Plantation de bosquets", category: "plantations", size: "wide" },
];

export function getCategoryLabel(category: GalleryCategoryId): string {
  return galleryCategories.find((entry) => entry.id === category)?.label ?? "";
}

export function filterGalleryItems(filter: GalleryFilterId): GalleryItem[] {
  if (filter === "all") return galleryItems;
  return galleryItems.filter((item) => item.category === filter);
}
