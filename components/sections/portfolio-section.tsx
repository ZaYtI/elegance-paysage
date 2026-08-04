import { SectionHeading } from "@/components/section-heading";
import { FrameIcon } from "@/components/section-icons";

const frames = [
  { tag: "Avant", caption: "Bientôt vos premiers chantiers ici" },
  { tag: "Après", caption: "Photos ajoutées au fil des interventions" },
];

export function PortfolioSection() {
  return (
    <section id="realisations" className="py-[70px] pb-[90px] bg-sand-100">
      <div className="mx-auto max-w-[1160px] px-7">
        <SectionHeading eyebrow="Réalisations" title="Le book de chantiers se construit en ce moment." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {frames.map((frame) => (
            <div
              key={frame.tag}
              className="aspect-4/3 border-2 border-dashed border-bark-500 rounded-lg flex flex-col items-center justify-center gap-2.5 text-bark-700 bg-bark-700/5 text-center p-5"
            >
              <FrameIcon className="w-[38px] h-[38px]" />
              <span className="text-bark-700 font-heading font-semibold tracking-[0.09em] uppercase text-[0.72rem]">
                {frame.tag}
              </span>
              <span className="text-[0.85rem]">{frame.caption}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[0.9rem] text-ink-600 max-w-[60ch]">
          L&apos;activité démarre tout juste : cette galerie sera remplie au fil des premiers chantiers,
          avec des photos avant/après. Envoyez vos visuels dès que possible pour les intégrer ici.
        </p>
      </div>
    </section>
  );
}
