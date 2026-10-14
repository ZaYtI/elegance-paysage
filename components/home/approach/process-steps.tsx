import { processSteps } from "@/lib/site-data";
import { ProcessStepCard } from "./process-step-card";
import styles from "./process-steps.module.css";

export function ProcessSteps() {
  return (
    <ol className={styles.steps}>
      {processSteps.map((step) => (
        <ProcessStepCard key={step.num} step={step} />
      ))}
    </ol>
  );
}
