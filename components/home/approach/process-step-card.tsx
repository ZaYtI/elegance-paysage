import { ProcessStepIcon } from "./process-step-icon";
import styles from "./process-step-card.module.css";

type ProcessStep = {
  num: string;
  title: string;
  description: string;
};

type ProcessStepCardProps = {
  step: ProcessStep;
};

export function ProcessStepCard({ step }: ProcessStepCardProps) {
  return (
    <li className={`reveal ${styles.card}`}>
      <span className={styles.watermark} aria-hidden="true">
        {step.num}
      </span>
      <div className={styles.head}>
        <ProcessStepIcon stepNumber={step.num} className={styles.icon} />
        <span className={styles.label}>Étape {step.num}</span>
      </div>
      <h3 className={styles.title}>{step.title}</h3>
      <p className={styles.description}>{step.description}</p>
    </li>
  );
}
