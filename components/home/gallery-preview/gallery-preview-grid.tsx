"use client";

import { useState } from "react";
import { GardenSnapshot } from "@/components/garden-scene/garden-snapshot";
import { Lightbox } from "@/components/ui/lightbox";
import { cn } from "@/lib/utils";
import { galleryPreviewItems } from "./gallery-preview-items";
import styles from "./gallery-preview-grid.module.css";

export function GalleryPreviewGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const itemCount = galleryPreviewItems.length;
  const openItem = openIndex === null ? null : galleryPreviewItems[openIndex];

  function showPrevious() {
    setOpenIndex((index) => (index === null ? null : (index - 1 + itemCount) % itemCount));
  }

  function showNext() {
    setOpenIndex((index) => (index === null ? null : (index + 1) % itemCount));
  }

  return (
    <>
      <div className={styles.grid}>
        {galleryPreviewItems.map((item, index) => (
          <figure key={item.view} className={cn(styles.item, "reveal")}>
            <button type="button" className={styles.open} aria-label={item.openLabel} onClick={() => setOpenIndex(index)}>
              <GardenSnapshot view={item.view} className={styles.media} />
            </button>
            <figcaption className={styles.caption}>
              {item.title}
              <span>{item.subtitle}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {openItem && openIndex !== null && (
        <Lightbox
          title={openItem.title}
          indexLabel={`${openIndex + 1} / ${itemCount}`}
          onClose={() => setOpenIndex(null)}
          onPrevious={showPrevious}
          onNext={showNext}
        >
          <GardenSnapshot view={openItem.view} label={openItem.openLabel.replace("Agrandir", "Vue agrandie :")} />
        </Lightbox>
      )}
    </>
  );
}
