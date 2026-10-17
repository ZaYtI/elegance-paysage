"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/ui/lightbox/lightbox";
import { cn } from "@/lib/utils";
import type { SanityGalleryPreviewPhoto } from "./sanity-gallery-preview-photo";
import styles from "./gallery-preview-grid.module.css";

const PREVIEW_IMAGE_SIZES = "(min-width: 1024px) 50vw, 100vw";

type SanityGalleryPreviewGridProps = {
  photos: SanityGalleryPreviewPhoto[];
};

export function SanityGalleryPreviewGrid({
  photos,
}: SanityGalleryPreviewGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const count = photos.length;
  const openPhoto = openIndex === null ? null : photos[openIndex];

  function showPrevious() {
    setOpenIndex((index) =>
      index === null ? null : (index - 1 + count) % count,
    );
  }

  function showNext() {
    setOpenIndex((index) => (index === null ? null : (index + 1) % count));
  }

  return (
    <>
      <div className={styles.grid}>
        {photos.map((photo, index) => (
          <figure key={photo.id} className={cn(styles.item, "reveal")}>
            <button
              type="button"
              className={styles.open}
              aria-label={`Agrandir : ${photo.title}`}
              onClick={() => setOpenIndex(index)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={PREVIEW_IMAGE_SIZES}
                className={cn(styles.media, "object-cover")}
                style={{ objectPosition: photo.objectPosition }}
              />
            </button>
            <figcaption className={styles.caption}>
              {photo.title}
              <span>{photo.subtitle}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {openPhoto && openIndex !== null && (
        <Lightbox
          eyebrow={openPhoto.subtitle}
          title={openPhoto.title}
          current={openIndex + 1}
          total={count}
          onClose={() => setOpenIndex(null)}
          onPrevious={showPrevious}
          onNext={showNext}
        >
          <div className="relative h-full w-full">
            <Image
              src={openPhoto.src}
              alt={openPhoto.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </Lightbox>
      )}
    </>
  );
}
