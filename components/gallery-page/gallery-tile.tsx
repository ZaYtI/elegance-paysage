import { cn } from "@/lib/utils";
import { getCategoryLabel, type GalleryItem, type GalleryTileSize } from "./gallery-items";
import { GalleryTexture } from "./gallery-texture";
import styles from "./gallery-tile.module.css";

type GalleryTileProps = {
  item: GalleryItem;
  appearDelaySeconds: number;
  onOpen: () => void;
};

const sizeClassNames: Record<GalleryTileSize, string | undefined> = {
  regular: undefined,
  wide: styles.wide,
  tall: styles.tall,
  big: styles.big,
};

export function GalleryTile({ item, appearDelaySeconds, onOpen }: GalleryTileProps) {
  return (
    <button
      type="button"
      className={cn(styles.tile, sizeClassNames[item.size])}
      style={{ animationDelay: `${appearDelaySeconds}s` }}
      aria-label={`Agrandir : ${item.title}`}
      onClick={onOpen}
    >
      <GalleryTexture category={item.category} className={styles.texture} />
      <span className={styles.tag}>{getCategoryLabel(item.category)}</span>
      <span className="block">
        <h3 className={styles.title}>{item.title}</h3>
        <small className={styles.soon}>Photo à venir</small>
      </span>
      <span className={styles.see} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </span>
    </button>
  );
}
