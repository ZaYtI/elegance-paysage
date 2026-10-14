import { Eyebrow } from "@/components/ui/eyebrow";
import { zoneInfo } from "@/lib/site-data";
import { galleryCategories, galleryItems } from "./gallery-items";
import styles from "./gallery-hero.module.css";

const stats = [
  { value: String(galleryCategories.length), label: "types d’aménagement" },
  { value: String(galleryItems.length), label: "ambiances" },
  { value: `${zoneInfo.radiusKm} km`, label: `autour d’${zoneInfo.city}` },
];

export function GalleryHero() {
  return (
    <section
      id="top"
      className={`${styles.head} relative grid items-end gap-x-[70px] gap-y-10 px-[6%] pt-[160px] pb-14 max-[950px]:grid-cols-1 max-[950px]:pt-[140px] min-[951px]:grid-cols-[1.25fr_.75fr] max-[650px]:gap-[26px] max-[650px]:px-[22px] max-[650px]:pt-[124px] max-[650px]:pb-[34px]`}
    >
      <div>
        <Eyebrow className="flex items-center gap-4 text-bark-700">
          <span className="h-px w-[38px] flex-none bg-bark-700" />
          <span>04 / Galerie</span>
        </Eyebrow>
        <h1 className={`${styles.title} mt-[26px]`}>
          Le book <em>de chantiers.</em>
        </h1>
      </div>
      <div className="flex flex-col gap-[26px] pb-3">
        <p className="max-w-[30rem] text-[17px] leading-[1.7] text-ink-700">
          Création, terrasses, plantations, taille : parcourez les ambiances par type d’aménagement. Les photos de nos chantiers prendront place ici au fil des interventions.
        </p>
        <div className={styles.stats}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
