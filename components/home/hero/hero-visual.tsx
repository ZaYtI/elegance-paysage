import Image from "next/image";
import styles from "./hero-visual.module.css";

export function HeroVisual() {
  return (
    <div className={styles.visual} aria-hidden="true">
      <Image
        src="/hero/jardin-cloture-gabions.webp"
        alt=""
        fill
        priority
        sizes="(min-width: 651px) 100vw, 100vw"
        className={styles.image}
      />
      <div className={styles.fade} />
    </div>
  );
}
