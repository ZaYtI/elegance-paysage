import { PillLink } from "@/components/ui/pill-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { zoneInfo } from "@/lib/site-data";
import styles from "./hero-content.module.css";

export function HeroContent() {
  return (
    <div className={styles.content}>
      <Eyebrow className={styles.eyebrow}>
        <span className={styles.eyebrowRule} />
        <span>Paysagiste &amp; élagueur · {zoneInfo.city}, Pas-de-Calais</span>
      </Eyebrow>
      <h1 className={styles.title}>
        <span>Des jardins pensés </span>
        <span className="text-[var(--accent-color)]">avec élégance, </span>
        <span>de la racine à la cime.</span>
      </h1>
      <div>
        <p className={styles.copy}>Aménagement, élagage et entretien pour particuliers et professionnels.</p>
        <div className={styles.ctas}>
          <PillLink href="#contact" variant="filled" className={styles.pill}>
            Demander un devis gratuit
          </PillLink>
        </div>
      </div>
    </div>
  );
}
