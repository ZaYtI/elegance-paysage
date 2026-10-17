import Image from "next/image";
import type { GalleryEntry } from "./gallery-entry";

type GalleryCoverProps = {
  entry: GalleryEntry;
  sizes: string;
  className?: string;
};

export function GalleryCover({ entry, sizes, className }: GalleryCoverProps) {
  const [cover] = entry.photos;

  return (
    <Image
      src={cover.src}
      alt={cover.alt}
      fill
      sizes={sizes}
      className={className}
      style={{ objectPosition: cover.objectPosition }}
    />
  );
}
