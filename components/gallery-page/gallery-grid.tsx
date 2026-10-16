import type { GalleryItem } from "./gallery-items";
import { GalleryTile } from "./gallery-tile";
import styles from "./gallery-grid.module.css";

const APPEAR_STAGGER_SECONDS = 0.05;

type GalleryGridProps = {
  items: GalleryItem[];
  onOpen: (index: number) => void;
};

export function GalleryGrid({ items, onOpen }: GalleryGridProps) {
  return (
    <div className={styles.grid}>
      {items.map((item, index) => (
        <GalleryTile
          key={item.title}
          item={item}
          appearDelaySeconds={index * APPEAR_STAGGER_SECONDS}
          onOpen={() => onOpen(index)}
        />
      ))}
    </div>
  );
}
