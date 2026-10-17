import type { SanityHomeCard } from "@/lib/sanity/types";
import type { Service } from "@/lib/site-data";
import styles from "./expertise-card.module.css";
import { ExpertiseCardVisual } from "./expertise-card-visual";
import { expertiseCardStyles } from "./expertise-cards";
import { resolveExpertiseCard } from "./resolve-expertise-card";

type ExpertiseCardProps = {
  service: Service;
  override: SanityHomeCard | null;
};

export function ExpertiseCard({ service, override }: ExpertiseCardProps) {
  const style = expertiseCardStyles[service.icon];
  const card = resolveExpertiseCard(service, style, override);

  return (
    <article className={styles.card} style={{ background: style.background, color: style.color }}>
      <ExpertiseCardVisual card={style} cardImage={card.image} />
      <span className="text-sm">{service.num} /</span>
      <span className={styles.tag}>{card.tag}</span>
      <div>
        <h3 className={styles.title}>{card.title}</h3>
        <p className={styles.text}>{card.description}</p>
      </div>
    </article>
  );
}
