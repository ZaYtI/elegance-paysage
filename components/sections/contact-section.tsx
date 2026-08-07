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
import { cn } from "@/lib/utils";
import { z } from "zod";

const fieldClasses =
  "bg-ink-800 border-white/15 text-paper placeholder:text-paper/40 focus-visible:ring-gold-600/50 focus-visible:border-gold-600";

const phoneCountries = [
  { code: "+33", label: "France", flag: "FR", pattern: /^[1-9]\d{8}$/, placeholder: "6 12 34 56 78" },
  { code: "+32", label: "Belgique", flag: "BE", pattern: /^[1-9]\d{7,8}$/, placeholder: "470 12 34 56" },
] as const;

type PhoneCountryCode = (typeof phoneCountries)[number]["code"];

const contactFormSchema = z
  .object({
    nom: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100, "100 caractères maximum"),
    email: z
      .string()
      .trim()
      .min(1, "L'email est requis")
      .pipe(z.email("Adresse email invalide")),
    telCountry: z.enum(["+33", "+32"]),
    tel: z.string().trim(),
    service: z.enum(serviceOptions),
    msg: z.string().trim().max(500, "500 caractères maximum").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.tel === "") return;
    const country = phoneCountries.find((c) => c.code === data.telCountry);
    if (country && !country.pattern.test(data.tel)) {
      ctx.addIssue({
        code: "custom",
        path: ["tel"],
        message: `Numéro invalide pour ${country.label} (+${country.code.slice(1)})`,
      });
    }
  });

type ContactFormValues = z.infer<typeof contactFormSchema>;
type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  nom: "",
  email: "",
  telCountry: "+33",
  tel: "",
  service: serviceOptions[0],
  msg: "",
};

export function ContactSection() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function setField<K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  }

  const activeCountry = phoneCountries.find((c) => c.code === values.telCountry) ?? phoneCountries[0];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = contactFormSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: ContactFormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormValues | undefined;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      setSubmitted(false);
      return;
    }

    setErrors({});
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bg-ink-950 text-paper pt-20 pb-15">
      <div className="mx-auto max-w-290 px-7 grid gap-14 md:grid-cols-[1fr_1.1fr]">
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
          <div className="flex gap-3 items-center mt-5.5 text-[0.96rem]">
            <PhoneIcon className="w-5 h-5 text-gold-600 shrink-0" />
            <a href={contactInfo.phoneHref}>{contactInfo.phone}</a>
          </div>
          <div className="flex gap-3 items-center mt-3 text-[0.96rem]">
            <MailIcon className="w-5 h-5 text-gold-600 shrink-0" />
            <a href={contactInfo.emailHref}>{contactInfo.email}</a>
          </div>
        </div>

        <form className="flex flex-col gap-3.5" noValidate onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <Label htmlFor="nom" className="text-[0.78rem] opacity-80 mb-1.5">
                Nom
              </Label>
              <Input
                id="nom"
                name="nom"
                placeholder="Votre nom"
                required
                value={values.nom}
                onChange={(e) => setField("nom", e.target.value)}
                aria-invalid={Boolean(errors.nom)}
                className={fieldClasses}
              />
              {errors.nom && <p className="mt-1 text-[0.78rem] text-destructive">{errors.nom}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="text-[0.78rem] opacity-80 mb-1.5">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="vous@exemple.fr"
                required
                value={values.email}
                onChange={(e) => setField("email", e.target.value)}
                aria-invalid={Boolean(errors.email)}
                className={fieldClasses}
              />
              {errors.email && <p className="mt-1 text-[0.78rem] text-destructive">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <Label htmlFor="tel" className="text-[0.78rem] opacity-80 mb-1.5">
                Téléphone
              </Label>
              <div
                className={cn(
                  "flex items-stretch rounded-lg border overflow-hidden transition-colors",
                  "focus-within:ring-3 focus-within:ring-gold-600/50 focus-within:border-gold-600",
                  errors.tel ? "border-destructive ring-3 ring-destructive/20" : "border-white/15"
                )}
              >
                <Select
                  name="telCountry"
                  value={values.telCountry}
                  onValueChange={(value) => setField("telCountry", value as PhoneCountryCode)}
                >
                  <SelectTrigger
                    className="w-auto shrink-0 rounded-none border-0 border-r border-white/15 bg-ink-700 text-paper focus-visible:ring-0"
                  >
                    <SelectValue>
                      {activeCountry.flag} {activeCountry.code}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {phoneCountries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.flag} {country.label} ({country.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="tel"
                  name="tel"
                  type="tel"
                  inputMode="numeric"
                  placeholder={activeCountry.placeholder}
                  value={values.tel}
                  onChange={(e) => setField("tel", e.target.value)}
                  aria-invalid={Boolean(errors.tel)}
                  className="border-0 rounded-none bg-ink-800 text-paper placeholder:text-paper/40 focus-visible:ring-0 focus-visible:border-transparent"
                />
              </div>
              {errors.tel && <p className="mt-1 text-[0.78rem] text-destructive">{errors.tel}</p>}
            </div>

            <div>
              <Label htmlFor="service" className="text-[0.78rem] opacity-80 mb-1.5">
                Type de demande
              </Label>
              <Select
                name="service"
                value={values.service}
                onValueChange={(value) => setField("service", value as ContactFormValues["service"])}
              >
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
          </div>

          <div>
            <Label htmlFor="msg" className="text-[0.78rem] opacity-80 mb-1.5">
              Votre message
            </Label>
            <Textarea
              id="msg"
              name="msg"
              placeholder="Décrivez votre projet, l'adresse, et si possible la taille approximative des arbres..."
              value={values.msg}
              onChange={(e) => setField("msg", e.target.value)}
              aria-invalid={Boolean(errors.msg)}
              className={`min-h-22.5 ${fieldClasses}`}
            />
            {errors.msg && <p className="mt-1 text-[0.78rem] text-destructive">{errors.msg}</p>}
          </div>

          <Button
            type="submit"
            className="self-start mt-1.5 bg-paper text-ink-950 hover:bg-bark-700 hover:text-white rounded-[3px] h-auto py-3.25 px-5.5"
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
