import { LogoIcon } from "@/components/logo-icon";
import styles from "./intro-brand.module.css";

export function IntroBrand() {
  return (
    <div className={styles.brand}>
      <div className={styles.emblem}>
        <LogoIcon onDark />
      </div>
      <p className={styles.name}>élégance paysage</p>
      <p className={styles.tagline}>Paysagiste &amp; élagueur</p>
      <span className={styles.pulse} />
    </div>
  );
}
