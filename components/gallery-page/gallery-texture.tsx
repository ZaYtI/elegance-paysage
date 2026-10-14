import { cn } from "@/lib/utils";
import type { GalleryCategoryId } from "./gallery-items";
import styles from "./gallery-texture.module.css";

type GalleryTextureProps = {
  category: GalleryCategoryId;
  className?: string;
};

export function GalleryTexture({ category, className }: GalleryTextureProps) {
  return <span aria-hidden="true" className={cn(styles.texture, styles[category], className)} />;
}
