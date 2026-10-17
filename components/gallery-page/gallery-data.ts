import { fetchCategories, fetchRealisations } from "@/lib/sanity/gallery-content";
import type { GalleryData } from "./gallery-entry";
import { toSanityGalleryData } from "./sanity-gallery";

export async function getGalleryData(): Promise<GalleryData> {
  const [categories, realisations] = await Promise.all([fetchCategories(), fetchRealisations()]);
  return toSanityGalleryData(categories ?? [], realisations ?? []);
}
