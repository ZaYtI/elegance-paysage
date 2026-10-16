import { HeroScrollLine } from "./hero-scroll-line";
import styles from "./hero-bottom-bar.module.css";

export function HeroBottomBar() {
  return (
    <div className={styles.bar}>
      <a href="#vision" className="flex items-center gap-[14px]">
        <HeroScrollLine />
        <span>DÉFILEZ POUR DÉCOUVRIR</span>
      </a>
      <span>CRÉATION PAYSAGÈRE &amp; MÉTIERS DE L’ARBRE</span>
    </div>
  );
}
