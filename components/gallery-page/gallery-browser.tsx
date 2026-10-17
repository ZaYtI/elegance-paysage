"use client";

import { useState } from "react";
import { CategoryFilters } from "./category-filters";
import { ALL_CATEGORIES, type GalleryData } from "./gallery-entry";
import { filterGalleryEntries } from "./gallery-filter";
import { GalleryGrid } from "./gallery-grid";
import { UpcomingPhotos } from "@/components/ui/upcoming-photos";
import { GalleryLightbox } from "./gallery-lightbox";

const CLOSED = -1;

type GalleryBrowserProps = {
  data: GalleryData;
};

export function GalleryBrowser({ data }: GalleryBrowserProps) {
  const [filter, setFilter] = useState(ALL_CATEGORIES);
  const [openIndex, setOpenIndex] = useState(CLOSED);

  const entries = filterGalleryEntries(data.entries, filter);

  function selectFilter(nextFilter: string) {
    setFilter(nextFilter);
    setOpenIndex(CLOSED);
  }

  if (data.entries.length === 0) {
    return (
      <div className="px-[6%] pb-20 pt-10">
        <UpcomingPhotos subline="Nos premières réalisations arrivent bientôt." />
      </div>
    );
  }

  return (
    <>
      <CategoryFilters data={data} selected={filter} visibleCount={entries.length} onSelect={selectFilter} />
      <GalleryGrid key={filter} entries={entries} onOpen={setOpenIndex} />
      {openIndex !== CLOSED && (
        <GalleryLightbox
          entries={entries}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(CLOSED)}
        />
      )}
    </>
  );
}
