import Image from "next/image";
import { ExampleTag } from "@/components/ui/example-tag";
import type { GalleryEntry } from "./gallery-entry";

const LIGHTBOX_IMAGE_SIZES = "100vw";

type LightboxMediaProps = {
  entry: GalleryEntry;
  photoIndex: number;
};

export function LightboxMedia({ entry, photoIndex }: LightboxMediaProps) {
  const photo = entry.photos[photoIndex];

  return (
    <div className="relative h-full w-full">
      <Image src={photo.src} alt={photo.alt} fill sizes={LIGHTBOX_IMAGE_SIZES} className="object-contain" />
      {entry.isExample && (
        <span className="absolute left-4 top-4">
          <ExampleTag />
        </span>
      )}
    </div>
  );
}
