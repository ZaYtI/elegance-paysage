import { PillLink } from "@/components/ui/pill-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { contactInfo, zoneInfo } from "@/lib/site-data";
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
        <p className={styles.copy}>
          Création d’espaces verts, portails et clôtures, entretien, tonte et taille pour particuliers et
          professionnels.
          <span className={styles.desktopOnly}>
            {" "}
            Un travail soigné, sécurisé, et pensé pour la santé de vos arbres sur le long terme.
          </span>
        </p>
        <div className={styles.ctas}>
          <PillLink href="#contact" variant="filled" className={styles.pill}>
            Demander un devis gratuit
          </PillLink>
          <PillLink href={contactInfo.phoneHref} className={styles.pill}>
            {contactInfo.phone}
          </PillLink>
        </div>
      </div>
    </div>
  );
}
