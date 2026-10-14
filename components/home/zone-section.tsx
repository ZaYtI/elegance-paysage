import type { CSSProperties } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { zoneInfo } from "@/lib/site-data";
import styles from "./zone-section.module.css";

const RING_COUNT = 6;
const ringIndexes = Array.from({ length: RING_COUNT }, (_, index) => index);

export function ZoneSection() {
  return (
    <section id="secteur" className={styles.zone}>
      <div className="reveal">
        <Eyebrow className="text-bark-700">05 / Notre secteur</Eyebrow>
        <h2 className="section-title my-[25px]">
          Un rayon de {zoneInfo.radiusKm} km
          <br />
          autour d’{zoneInfo.city}
        </h2>
        <p className={cn(styles.lead, "max-w-[380px] text-base leading-[1.8]")}>
          Particuliers, copropriétés et professionnels. Déplacement à évaluer au-delà de cette zone
          selon le chantier — n’hésitez pas à demander.
        </p>
        <p className={cn(styles.lead, "mt-4 max-w-[380px] text-base leading-[1.8]")}>
          Un projet au-delà ? Parlons-en.
        </p>
      </div>
      <div className={cn(styles.sphere, "reveal")}>
        <div className={styles.rings} aria-hidden="true">
          {ringIndexes.map((index) => (
            <span key={index} className={styles.ring} style={{ "--i": index } as CSSProperties} />
          ))}
        </div>
        <div className={styles.figure}>
          <strong className={styles.figureNumber}>
            {zoneInfo.radiusKm}
            <em className={styles.unit}>km</em>
          </strong>
          <span className={styles.figureCaption}>autour d’{zoneInfo.city}</span>
        </div>
      </div>
    </section>
  );
}
