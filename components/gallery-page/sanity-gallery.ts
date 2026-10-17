import { hotspotPosition } from "@/lib/sanity/hotspot-position";
import { urlFor } from "@/lib/sanity/image";
import type { SanityCategory, SanityPhoto, SanityRealisation } from "@/lib/sanity/types";
import type { GalleryCategory, GalleryData, GalleryEntry, GalleryPhoto, GalleryTileSize } from "./gallery-entry";

const COVER_WIDTH = 1200;
const THUMBNAIL_WIDTH = 160;
const IMAGE_QUALITY = 80;
const TILE_SIZE_PATTERN: GalleryTileSize[] = ["big", "tall", "regular", "regular", "tall", "wide", "regular", "wide", "regular"];

function toGalleryPhoto(photo: SanityPhoto): GalleryPhoto {
  return {
    id: photo._key,
    alt: photo.alt,
    objectPosition: hotspotPosition(photo.hotspot),
    src: urlFor(photo.image).width(COVER_WIDTH).quality(IMAGE_QUALITY).auto("format").url(),
    thumbnailSrc: urlFor(photo.image).width(THUMBNAIL_WIDTH).quality(IMAGE_QUALITY).auto("format").url(),
  };
}

function toGalleryEntry(realisation: SanityRealisation, index: number): GalleryEntry {
  return {
    id: realisation._id,
    title: realisation.title,
    categoryId: realisation.category.slug,
    categoryLabel: realisation.category.title,
    size: TILE_SIZE_PATTERN[index % TILE_SIZE_PATTERN.length],
    isExample: realisation.isExample === true,
    photos: realisation.photos.map(toGalleryPhoto),
  };
}

function toGalleryCategory(category: SanityCategory): GalleryCategory {
  return { id: category.slug, label: category.title };
}

export function toSanityGalleryData(categories: SanityCategory[], realisations: SanityRealisation[]): GalleryData {
  const entries = realisations.map(toGalleryEntry);
  const usedCategoryIds = new Set(entries.map((entry) => entry.categoryId));

  return {
    categories: categories.map(toGalleryCategory).filter((category) => usedCategoryIds.has(category.id)),
    entries,
  };
}
