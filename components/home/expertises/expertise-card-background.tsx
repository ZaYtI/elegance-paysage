import Image from "next/image";
import { hotspotPosition } from "@/lib/sanity/hotspot-position";
import { urlFor } from "@/lib/sanity/image";
import type { SanityCardImage } from "@/lib/sanity/types";
import styles from "./expertise-card.module.css";

type ExpertiseCardBackgroundProps = {
  cardImage: SanityCardImage;
};

export function ExpertiseCardBackground({ cardImage }: ExpertiseCardBackgroundProps) {
  return (
    <div className={styles.shot}>
      <Image
        src={urlFor(cardImage.image).width(1600).auto("format").url()}
        alt={cardImage.alt}
        fill
        sizes="(max-width: 650px) 82vw, 820px"
        className="object-cover"
        style={{ objectPosition: hotspotPosition(cardImage.hotspot) }}
      />
    </div>
  );
}
