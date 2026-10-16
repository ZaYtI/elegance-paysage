import { LogoLockup } from "@/components/logo-lockup";
import styles from "./intro-brand.module.css";

export function IntroBrand() {
  return (
    <div className={styles.brand}>
      <LogoLockup onDark className={styles.lockup} />
      <p className={styles.tagline}>Paysagiste &amp; élagueur</p>
      <span className={styles.pulse} />
    </div>
  );
}
