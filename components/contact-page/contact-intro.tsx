import { Eyebrow } from "@/components/ui/eyebrow";
import { ContactDetails } from "./contact-details";

export function ContactIntro() {
  return (
    <div>
      <Eyebrow className="text-stone-400">Contact · Devis gratuit</Eyebrow>
      <h1 className="mt-[26px] text-[clamp(48px,6vw,92px)] leading-none tracking-[-0.06em]">
        Un projet ?<br />
        <em className="font-[Georgia,serif] font-normal text-sage-500">Parlons-en.</em>
      </h1>
      <p className="mt-8 max-w-[420px] text-base leading-[1.8] text-stone-400">
        Décrivez votre chantier ou envoyez quelques photos : nous revenons vers vous avec une estimation claire et sans engagement.
      </p>
      <ContactDetails />
    </div>
  );
}
