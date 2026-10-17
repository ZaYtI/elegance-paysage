import { hotspotPosition } from "@/lib/sanity/hotspot-position";
import { urlFor } from "@/lib/sanity/image";
import type { SanityGalleryPreviewItem } from "@/lib/sanity/types";

const PREVIEW_IMAGE_WIDTH = 1400;
const IMAGE_QUALITY = 80;

export type SanityGalleryPreviewPhoto = {
  id: string;
  title: string;
  subtitle: string;
  isExample: boolean;
  src: string;
  alt: string;
  objectPosition: string;
};

export function toSanityGalleryPreviewPhoto(item: SanityGalleryPreviewItem): SanityGalleryPreviewPhoto {
  return {
    id: item._key,
    title: item.title,
    subtitle: item.subtitle ?? "",
    isExample: item.isExample === true,
    src: urlFor(item.image).width(PREVIEW_IMAGE_WIDTH).quality(IMAGE_QUALITY).auto("format").url(),
    alt: item.alt,
    objectPosition: hotspotPosition(item.hotspot),
  };
}
