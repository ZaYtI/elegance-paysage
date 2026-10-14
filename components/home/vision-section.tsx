import { Eyebrow } from "@/components/ui/eyebrow";
import { ManifestoHeading } from "./manifesto-heading";
import styles from "./vision-section.module.css";

export function VisionSection() {
  return (
    <section id="vision" className={styles.section}>
      <Eyebrow className="reveal pt-[17px] text-stone-400">01 / Le sens du paysage</Eyebrow>
      <div>
        <ManifestoHeading />
        <div className={`reveal ${styles.bottom}`}>
          <p className={styles.pitch}>
            Responsabilité civile professionnelle, équipement d’élagage et de sécurité entretenu, estimation
            gratuite et détaillée : chaque intervention est adaptée à votre projet.
          </p>
          <div className={styles.signature}>Robillard &amp; Prévost</div>
        </div>
      </div>
    </section>
  );
}
