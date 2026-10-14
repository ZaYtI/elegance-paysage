import { keyFacts, zoneInfo } from "@/lib/site-data";
import styles from "./key-facts-band.module.css";

const facts = [
  ...keyFacts,
  { value: `${zoneInfo.radiusKm} km`, label: `Autour d’${zoneInfo.city}` },
];

export function KeyFactsBand() {
  return (
    <section aria-label="Chiffres clés" className={styles.band}>
      <dl className={`reveal ${styles.facts}`}>
        {facts.map((fact) => (
          <div key={fact.label} className={styles.fact}>
            <dt className={styles.label}>{fact.label}</dt>
            <dd className={styles.value}>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
