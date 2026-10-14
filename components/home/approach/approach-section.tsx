import { Eyebrow } from "@/components/ui/eyebrow";
import { RoundedPanel } from "@/components/ui/rounded-panel";
import { ProcessSteps } from "./process-steps";
import styles from "./approach-section.module.css";

export function ApproachSection() {
  return (
    <RoundedPanel id="approche" surround="paper">
      <header className={styles.header}>
        <div>
          <Eyebrow className="reveal text-stone-400">03 / Une relation de terrain</Eyebrow>
          <h2 className={`reveal ${styles.title}`}>
            Trois étapes claires,
            <br />
            du premier contact au terrain rendu propre.
          </h2>
        </div>
        <p className={`reveal ${styles.intro}`}>
          Un interlocuteur, un devis clair et un chantier organisé. Nous prenons le temps de comprendre votre terrain avant d’y intervenir.
        </p>
      </header>
      <ProcessSteps />
    </RoundedPanel>
  );
}
