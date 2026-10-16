"use client";

import { useState } from "react";
import { Lightbox } from "@/components/ui/lightbox/lightbox";
import { CategoryFilters } from "./category-filters";
import { GalleryGrid } from "./gallery-grid";
import { filterGalleryItems, getCategoryLabel, type GalleryFilterId } from "./gallery-items";
import { LightboxMedia } from "./lightbox-media";
import { LightboxThumbnails } from "./lightbox-thumbnails";

const CLOSED = -1;

export function GalleryBrowser() {
  const [filter, setFilter] = useState<GalleryFilterId>("all");
  const [openIndex, setOpenIndex] = useState(CLOSED);

  const items = filterGalleryItems(filter);
  const openItem = openIndex === CLOSED ? null : items[openIndex];

  function selectFilter(nextFilter: GalleryFilterId) {
    setFilter(nextFilter);
    setOpenIndex(CLOSED);
  }

  return (
    <>
      <CategoryFilters selected={filter} visibleCount={items.length} onSelect={selectFilter} />
      <GalleryGrid key={filter} items={items} onOpen={setOpenIndex} />
      {openItem && (
        <Lightbox
          eyebrow={getCategoryLabel(openItem.category)}
          title={openItem.title}
          current={openIndex + 1}
          total={items.length}
          onClose={() => setOpenIndex(CLOSED)}
          onPrevious={() => setOpenIndex((openIndex + items.length - 1) % items.length)}
          onNext={() => setOpenIndex((openIndex + 1) % items.length)}
          footer={<LightboxThumbnails items={items} currentIndex={openIndex} onSelect={setOpenIndex} />}
        >
          <LightboxMedia item={openItem} />
        </Lightbox>
      )}
    </>
  );
}
