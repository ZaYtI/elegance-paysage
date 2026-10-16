import type { GalleryItem } from "./gallery-items";
import { GalleryTexture } from "./gallery-texture";
import styles from "./lightbox-thumbnails.module.css";

type LightboxThumbnailsProps = {
  items: GalleryItem[];
  currentIndex: number;
  onSelect: (index: number) => void;
};

export function LightboxThumbnails({ items, currentIndex, onSelect }: LightboxThumbnailsProps) {
  return (
    <div className={styles.strip}>
      {items.map((item, index) => (
        <button
          key={item.title}
          type="button"
          className={styles.thumbnail}
          aria-current={index === currentIndex}
          aria-label={item.title}
          onClick={() => onSelect(index)}
        >
          <GalleryTexture category={item.category} className={styles.texture} />
        </button>
      ))}
    </div>
  );
}
