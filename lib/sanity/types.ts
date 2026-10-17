import type { SanityImageSource } from "@sanity/image-url";

export type SanityHotspot = {
  x: number;
  y: number;
};

export type SanityPhoto = {
  _key: string;
  alt: string;
  caption?: string;
  image: SanityImageSource;
  hotspot?: SanityHotspot | null;
};

export type SanityCategory = {
  _id: string;
  title: string;
  slug: string;
};

export type SanityRealisation = {
  _id: string;
  title: string;
  location?: string;
  isExample?: boolean;
  category: { title: string; slug: string };
  photos: SanityPhoto[];
};

export type SanityCardImage = {
  alt: string;
  image: SanityImageSource;
  hotspot?: SanityHotspot | null;
};

export type SanityHomeCard = {
  title?: string | null;
  tag?: string | null;
  description?: string | null;
  image: SanityCardImage | null;
};

export type SanityGalleryPreviewItem = {
  _key: string;
  title: string;
  subtitle?: string;
  isExample?: boolean;
  alt: string;
  image: SanityImageSource;
  hotspot?: SanityHotspot | null;
};

export type SanityHomePage = {
  creation: SanityHomeCard | null;
  elagage: SanityHomeCard | null;
  abattage: SanityHomeCard | null;
  haies: SanityHomeCard | null;
  galleryPreview: SanityGalleryPreviewItem[] | null;
};
