import type { GalleryItem } from "./gallery-items";
import { GalleryTexture } from "./gallery-texture";
import { LightboxThumbnails } from "./lightbox-thumbnails";
import styles from "./lightbox-media.module.css";

type LightboxMediaProps = {
  items: GalleryItem[];
  currentIndex: number;
  onSelect: (index: number) => void;
};

export function LightboxMedia({ items, currentIndex, onSelect }: LightboxMediaProps) {
  const current = items[currentIndex];

  return (
    <div className={styles.media}>
      <div className={styles.frame}>
        <GalleryTexture category={current.category} className={styles.texture} />
        <span className={styles.label}>Photo à venir — la photo du chantier remplacera cette matière</span>
      </div>
      <LightboxThumbnails items={items} currentIndex={currentIndex} onSelect={onSelect} />
    </div>
  );
}
