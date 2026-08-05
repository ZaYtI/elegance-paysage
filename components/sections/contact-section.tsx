"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MailIcon, PhoneIcon } from "@/components/section-icons";
import { contactInfo, serviceOptions } from "@/lib/site-data";

const fieldClasses =
  "bg-ink-800 border-white/15 text-paper placeholder:text-paper/40 focus-visible:ring-gold-600/50 focus-visible:border-gold-600";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="bg-ink-950 text-paper pt-20 pb-[60px]">
      <div className="mx-auto max-w-[1160px] px-7 grid gap-14 md:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="inline-flex items-center gap-2 mb-2.5 text-sage-300 font-heading font-semibold tracking-[0.09em] uppercase text-[0.72rem]">
            <span className="h-px w-5 bg-sage-300" aria-hidden="true" />
            Contact
          </span>
          <h2 className="text-[clamp(1.6rem,2.8vw,2.05rem)] max-w-[14ch] font-heading font-semibold">
            Un projet ? Parlons-en.
          </h2>
          <p className="opacity-82 max-w-[38ch] mt-3.5">
            Décrivez votre chantier ou envoyez quelques photos : nous revenons vers vous avec une
            première estimation.
          </p>
          <div className="flex gap-3 items-center mt-[22px] text-[0.96rem]">
            <PhoneIcon className="w-5 h-5 text-gold-600 shrink-0" />
            <a href={contactInfo.phoneHref}>{contactInfo.phone}</a>
          </div>
          <div className="flex gap-3 items-center mt-3 text-[0.96rem]">
            <MailIcon className="w-5 h-5 text-gold-600 shrink-0" />
            <a href={contactInfo.emailHref}>{contactInfo.email}</a>
          </div>
        </div>

        <form
          className="flex flex-col gap-3.5"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <Label htmlFor="nom" className="text-[0.78rem] opacity-80 mb-1.5">
                Nom
              </Label>
              <Input id="nom" placeholder="Votre nom" required className={fieldClasses} />
            </div>
            <div>
              <Label htmlFor="tel" className="text-[0.78rem] opacity-80 mb-1.5">
                Téléphone
              </Label>
              <Input id="tel" type="tel" placeholder="06 00 00 00 00" className={fieldClasses} />
            </div>
          </div>

          <div>
            <Label htmlFor="service" className="text-[0.78rem] opacity-80 mb-1.5">
              Type de demande
            </Label>
            <Select defaultValue={serviceOptions[0]}>
              <SelectTrigger id="service" className={`w-full ${fieldClasses}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {serviceOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="msg" className="text-[0.78rem] opacity-80 mb-1.5">
              Votre message
            </Label>
            <Textarea
              id="msg"
              placeholder="Décrivez votre projet, l'adresse, et si possible la taille approximative des arbres..."
              className={`min-h-[90px] ${fieldClasses}`}
            />
          </div>

          <Button
            type="submit"
            className="self-start mt-1.5 bg-paper text-ink-950 hover:bg-bark-700 hover:text-white rounded-[3px] h-auto py-[13px] px-[22px]"
          >
            Envoyer la demande
          </Button>
          <span className="text-[0.78rem] opacity-60 mt-0.5">
            {submitted
              ? "Merci, message noté ✓ (formulaire de démonstration — à connecter à une adresse e-mail ou un service comme Formspree)."
              : ""}
          </span>
        </form>
      </div>
    </section>
  );
}
