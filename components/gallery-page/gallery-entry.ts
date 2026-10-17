export type GalleryTileSize = "regular" | "wide" | "tall" | "big";

export type GalleryPhoto = {
  id: string;
  src: string;
  thumbnailSrc: string;
  alt: string;
  objectPosition?: string;
};

export type GalleryCategory = {
  id: string;
  label: string;
};

export type GalleryEntry = {
  id: string;
  title: string;
  categoryId: string;
  categoryLabel: string;
  size: GalleryTileSize;
  isExample: boolean;
  photos: GalleryPhoto[];
};

export type GalleryData = {
  categories: GalleryCategory[];
  entries: GalleryEntry[];
};

export const ALL_CATEGORIES = "all";
