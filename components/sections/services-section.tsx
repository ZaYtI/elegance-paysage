import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/section-icons";
import { services, type Service } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const accentStyles: Record<Service["accent"], { border: string; badge: string; icon: string; tag: string; num: string }> = {
  sage: {
    border: "border-t-sage-600",
    badge: "bg-sage-600/15",
    icon: "text-sage-600",
    tag: "text-sage-600",
    num: "text-sage-600",
  },
  bark: {
    border: "border-t-bark-700",
    badge: "bg-bark-700/15",
    icon: "text-bark-700",
    tag: "text-bark-700",
    num: "text-bark-700",
  },
  ink: {
    border: "border-t-ink-950",
    badge: "bg-ink-950/15",
    icon: "text-ink-950",
    tag: "text-ink-950",
    num: "text-ink-950",
  },
  gold: {
    border: "border-t-gold-600",
    badge: "bg-gold-600/15",
    icon: "text-gold-600",
    tag: "text-gold-600",
    num: "text-gold-600",
  },
};

function ServiceCard({ service, offset }: { service: Service; offset?: boolean }) {
  const accent = accentStyles[service.accent];

  return (
    <Card
      className={cn(
        "relative overflow-hidden py-0 gap-3.5 px-6 pt-[30px] pb-[26px] rounded-[4px] border-t-[3px] flex flex-col transition-transform duration-250 ease-out hover:-translate-y-[5px] hover:shadow-[0_16px_30px_-18px_rgba(30,27,22,0.35)] group",
        accent.border,
        offset && "md:mt-[22px]"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1.5 right-3.5 font-heading font-extrabold text-[3.4rem] leading-none opacity-[0.09] pointer-events-none select-none",
          accent.num
        )}
      >
        {service.num}
      </span>
      <div
        className={cn(
          "relative z-10 w-[52px] h-[52px] rounded-full flex items-center justify-center transition-transform duration-250 ease-out group-hover:scale-[1.08]",
          accent.badge
        )}
      >
        <ServiceIcon icon={service.icon} className={cn("w-6 h-6", accent.icon)} />
      </div>
      <h3 className="relative z-10 text-[1.06rem] font-heading font-semibold">{service.title}</h3>
      <p className="relative z-10 m-0 text-[0.92rem] text-ink-600">{service.description}</p>
      <span className={cn("relative z-10 mt-auto pt-3 flex items-center gap-1.5 text-[0.68rem] tracking-[0.08em] uppercase font-heading font-semibold", accent.tag)}>
        {service.tag}
        <span className="transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </span>
    </Card>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="py-[70px] pb-[90px] bg-paper">
      <div className="mx-auto max-w-[1160px] px-7">
        <SectionHeading
          eyebrow="Nos métiers"
          title="Quatre savoir-faire, un seul objectif : des extérieurs sains et soignés."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.num} service={service} offset={i === 1 || i === 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
