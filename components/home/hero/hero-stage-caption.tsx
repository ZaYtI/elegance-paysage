import { gardenStages } from "@/components/garden-scene/garden-views";
import { Eyebrow } from "@/components/ui/eyebrow";
import styles from "./hero-stage-caption.module.css";

type HeroStageCaptionProps = {
  stageIndex: number;
};

export function HeroStageCaption({ stageIndex }: HeroStageCaptionProps) {
  return (
    <div className={styles.caption}>
      <Eyebrow className={styles.eyebrow}>De l’idée au jardin</Eyebrow>
      <strong className={styles.stageName}>{gardenStages[stageIndex]}</strong>
      <div aria-hidden="true" className={styles.steps}>
        {gardenStages.map((stage, index) => (
          <span key={stage} className={index <= stageIndex ? styles.lit : undefined} />
        ))}
      </div>
      <small className={styles.note}>Étude paysagère · Matières &amp; volumes</small>
    </div>
  );
}
