import { SectionHeading } from "@/components/section-heading";
import { processSteps } from "@/lib/site-data";

export function ProcessSection() {
  return (
    <section id="process" className="bg-ink-800 text-paper py-20">
      <div className="mx-auto max-w-[1160px] px-7">
        <SectionHeading
          eyebrow="Comment ça se passe"
          title="Trois étapes claires, du premier contact au terrain rendu propre."
          variant="dark"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] mt-2.5">
          {processSteps.map((step) => (
            <div key={step.num} className="border-t border-white/15 pt-[18px]">
              <span className="font-heading font-semibold tracking-[0.09em] uppercase text-[0.8rem] text-gold-600">
                {step.num}
              </span>
              <h3 className="mt-2.5 text-[1.06rem] font-heading font-semibold">{step.title}</h3>
              <p className="text-paper/78 text-[0.92rem]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
