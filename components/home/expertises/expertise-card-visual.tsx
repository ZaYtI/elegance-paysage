import { GardenSnapshot } from "@/components/garden-scene/garden-snapshot";
import type { SanityCardImage } from "@/lib/sanity/types";
import styles from "./expertise-card.module.css";
import { ExpertiseCardBackground } from "./expertise-card-background";
import { ExpertiseCardMotif } from "./expertise-card-motif";
import type { ExpertiseCardStyle } from "./expertise-cards";

type ExpertiseCardVisualProps = {
  card: ExpertiseCardStyle;
  cardImage: SanityCardImage | null;
};

export function ExpertiseCardVisual({ card, cardImage }: ExpertiseCardVisualProps) {
  if (cardImage) return <ExpertiseCardBackground cardImage={cardImage} />;

  if (card.motif === "garden") {
    return (
      <div className={styles.shot} aria-hidden="true">
        <GardenSnapshot view="creation" />
      </div>
    );
  }

  return <ExpertiseCardMotif card={card} />;
}
