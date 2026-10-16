import { Eyebrow } from "@/components/ui/eyebrow";
import { services } from "@/lib/site-data";
import { ExpertiseCard } from "./expertise-card";
import { ExpertisesTrack } from "./expertises-track";
import { SwipeHint } from "./swipe-hint";

export function ExpertisesSection() {
  return (
    <ExpertisesTrack
      heading={
        <div>
          <Eyebrow>02 / Nos savoir-faire</Eyebrow>
          <h2 className="section-title mt-5 !text-[clamp(38px,4vw,62px)]">
            Des extérieurs sains
            <br />
            et soignés.
          </h2>
          <SwipeHint />
        </div>
      }
    >
      {services.map((service) => (
        <ExpertiseCard key={service.icon} service={service} />
      ))}
    </ExpertisesTrack>
  );
}
