import { Eyebrow } from "@/components/ui/eyebrow";
import { PillLink } from "@/components/ui/pill-link";
import { RoundedPanel } from "@/components/ui/rounded-panel";
import { contactInfo } from "@/lib/site-data";
import { ContactForm } from "@/components/contact-form/contact-form";

const emailSubject = "Mon projet paysager";

export function ContactSection() {
  return (
    <RoundedPanel id="contact" surround="sand" className="text-center">
      <Eyebrow className="reveal text-stone-400">
        Décrivez votre chantier ou envoyez quelques photos.
      </Eyebrow>
      <h2 className="reveal mx-auto mt-[30px] mb-10 max-w-[1100px] text-[clamp(56px,9vw,135px)] leading-none">
        Un projet ?<br />
        <em className="font-[Georgia,serif] font-normal text-sage-500">Parlons-en.</em>
      </h2>
      <div className="reveal flex flex-wrap justify-center gap-[15px] max-[650px]:flex-col max-[650px]:items-stretch">
        <PillLink
          href={contactInfo.phoneHref}
          variant="filled"
          className="max-[650px]:min-h-14 max-[650px]:text-base"
        >
          {contactInfo.phone}
        </PillLink>
        <PillLink
          href={contactInfo.phoneSecondaryHref}
          className="max-[650px]:min-h-14 max-[650px]:text-base"
        >
          {contactInfo.phoneSecondary}
        </PillLink>
      </div>
      <a
        href={`${contactInfo.emailHref}?subject=${encodeURIComponent(emailSubject)}`}
        className="reveal mt-[35px] inline-block border-b border-white/25 pb-2 text-base text-stone-400 [overflow-wrap:anywhere]"
      >
        {contactInfo.email}
      </a>
      <ContactForm className="reveal mx-auto mt-16 max-w-[720px] max-[650px]:mt-12" />
    </RoundedPanel>
  );
}
