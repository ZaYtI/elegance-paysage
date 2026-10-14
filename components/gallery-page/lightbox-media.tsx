import type { GalleryItem } from "./gallery-items";
import { GalleryTexture } from "./gallery-texture";
import styles from "./lightbox-media.module.css";

type LightboxMediaProps = {
  item: GalleryItem;
};

export function LightboxMedia({ item }: LightboxMediaProps) {
  return (
    <div className={styles.media}>
      <GalleryTexture category={item.category} className={styles.texture} />
      <span className={styles.label}>Photo à venir</span>
    </div>
  );
}
