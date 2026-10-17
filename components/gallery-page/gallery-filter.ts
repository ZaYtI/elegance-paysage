import { ALL_CATEGORIES, type GalleryEntry } from "./gallery-entry";

export function filterGalleryEntries(entries: GalleryEntry[], filter: string) {
  if (filter === ALL_CATEGORIES) return entries;
  return entries.filter((entry) => entry.categoryId === filter);
}
