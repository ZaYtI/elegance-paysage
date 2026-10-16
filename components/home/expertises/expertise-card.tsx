import { GardenSnapshot } from "@/components/garden-scene/garden-snapshot";
import type { Service } from "@/lib/site-data";
import styles from "./expertise-card.module.css";
import { ExpertiseCardMotif } from "./expertise-card-motif";
import { expertiseCardStyles } from "./expertise-cards";

type ExpertiseCardProps = {
  service: Service;
};

export function ExpertiseCard({ service }: ExpertiseCardProps) {
  const card = expertiseCardStyles[service.icon];

  return (
    <article className={styles.card} style={{ background: card.background, color: card.color }}>
      {card.motif === "garden" && (
        <div className={styles.shot} aria-hidden="true">
          <GardenSnapshot view="creation" />
        </div>
      )}
      <span className="text-sm">{service.num} /</span>
      <span className={styles.tag}>{card.tag}</span>
      <ExpertiseCardMotif card={card} />
      <div>
        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.text}>{service.description}</p>
      </div>
    </article>
  );
}
