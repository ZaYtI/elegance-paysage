import { useState } from "react";
import { Lightbox } from "@/components/ui/lightbox/lightbox";
import type { GalleryEntry } from "./gallery-entry";
import { LightboxFooter } from "./lightbox-footer";
import { LightboxMedia } from "./lightbox-media";

type GalleryLightboxProps = {
  entries: GalleryEntry[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export function GalleryLightbox({ entries, index, onIndexChange, onClose }: GalleryLightboxProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const entry = entries[index];

  function goTo(nextIndex: number) {
    setPhotoIndex(0);
    onIndexChange(nextIndex);
  }

  return (
    <Lightbox
      eyebrow={entry.categoryLabel}
      title={entry.title}
      current={index + 1}
      total={entries.length}
      onClose={onClose}
      onPrevious={() => goTo((index + entries.length - 1) % entries.length)}
      onNext={() => goTo((index + 1) % entries.length)}
      footer={
        <LightboxFooter entry={entry} photoIndex={photoIndex} onSelectPhoto={setPhotoIndex} />
      }
    >
      <LightboxMedia entry={entry} photoIndex={photoIndex} />
    </Lightbox>
  );
}
