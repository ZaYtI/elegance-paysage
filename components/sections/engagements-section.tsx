import { SectionHeading } from "@/components/section-heading";
import { EngagementIcon } from "@/components/section-icons";
import { engagements, type Engagement } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const accentStyles: Record<Engagement["accent"], { border: string; icon: string }> = {
  sage: { border: "border-sage-600", icon: "text-sage-600" },
  bark: { border: "border-bark-700", icon: "text-bark-700" },
  gold: { border: "border-gold-600", icon: "text-gold-600" },
};

export function EngagementsSection() {
  return (
    <section className="py-17.5 bg-paper">
      <div className="mx-auto max-w-290 px-7">
        <SectionHeading
          eyebrow="Nos engagements"
          title="Une jeune entreprise, des standards professionnels dès le premier chantier."
        />
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2 before:content-[''] before:absolute before:left-0 before:right-0 before:top-9.25 before:border-t before:border-dashed before:border-bark-500 before:opacity-45 before:z-0 max-lg:before:hidden">
          {engagements.map((item) => {
            const accent = accentStyles[item.accent];
            return (
              <div key={item.label} className="relative z-10 flex flex-col items-center text-center gap-2.5 group">
                <div
                  className={cn(
                    "relative z-10 w-14.5 h-14.5 rounded-full bg-paper border-2 border-dashed flex items-center justify-center transition-transform duration-250 ease-out group-hover:scale-[1.06] group-hover:border-solid",
                    accent.border
                  )}
                >
                  <EngagementIcon icon={item.icon} className={cn("w-6 h-6", accent.icon)} />
                </div>
                <span className="text-ink-900 block font-heading font-semibold tracking-[0.09em] uppercase text-[0.78rem]">
                  {item.label}
                </span>
                <p className="m-0 text-[0.88rem] text-ink-600 max-w-[22ch]">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
