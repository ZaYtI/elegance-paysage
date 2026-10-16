import { Eyebrow } from "@/components/ui/eyebrow";
import { PillLink } from "@/components/ui/pill-link";
import { RoundedPanel } from "@/components/ui/rounded-panel";
import { contactInfo } from "@/lib/site-data";

export function GalleryContactBand() {
  return (
    <RoundedPanel id="contact" surround="paperToSand" className="text-center">
      <Eyebrow className="reveal text-stone-400">Votre jardin pourrait être le prochain.</Eyebrow>
      <h2 className="reveal mx-auto mt-[26px] mb-10 max-w-[1100px] text-[clamp(46px,7.5vw,112px)] leading-none tracking-[-0.06em]">
        Un projet ?
        <br />
        <em className="font-[Georgia,serif] font-normal text-sage-500">Parlons-en.</em>
      </h2>
      <div className="reveal flex flex-wrap justify-center gap-[15px] max-[650px]:flex-col max-[650px]:items-stretch">
        <PillLink href="/contact" variant="filled">
          Demander un devis
        </PillLink>
        <PillLink href={contactInfo.phoneHref}>{contactInfo.phone}</PillLink>
        <PillLink href={contactInfo.phoneSecondaryHref}>{contactInfo.phoneSecondary}</PillLink>
      </div>
    </RoundedPanel>
  );
}
