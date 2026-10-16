"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { fieldClasses } from "./field-classes";
import { FormField } from "./form-field";
import { PhoneField } from "./phone-field";
import { PhotoPicker } from "./photo-picker";
import { ServiceSelect } from "./service-select";
import { SubmitFeedback } from "./submit-feedback";
import { useContactForm } from "./use-contact-form";

type ContactFormProps = {
  className?: string;
};

export function ContactForm({ className }: ContactFormProps) {
  const { values, errors, status, feedback, photoAttachments, setField, submit } = useContactForm();
  const isSending = status === "sending";

  return (
    <form
      noValidate
      onSubmit={submit}
      className={cn("flex w-full flex-col gap-4 rounded-[20px] bg-ink-800 p-8 text-left text-paper max-[650px]:p-5", className)}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField htmlFor="nom" label="Nom" error={errors.nom}>
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
        </FormField>
        <FormField htmlFor="email" label="Email" error={errors.email}>
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
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PhoneField
          country={values.telCountry}
          number={values.tel}
          error={errors.tel}
          onCountryChange={(country) => setField("telCountry", country)}
          onNumberChange={(number) => setField("tel", number)}
        />
        <ServiceSelect value={values.service} onChange={(service) => setField("service", service)} />
      </div>

      <FormField htmlFor="msg" label="Votre message" error={errors.msg}>
        <Textarea
          id="msg"
          name="msg"
          placeholder="Décrivez votre projet, l'adresse, et si possible la taille approximative des arbres..."
          value={values.msg}
          onChange={(e) => setField("msg", e.target.value)}
          aria-invalid={Boolean(errors.msg)}
          className={`min-h-24 ${fieldClasses}`}
        />
      </FormField>

      <PhotoPicker
        photos={photoAttachments.photos}
        error={photoAttachments.error}
        onAddFiles={photoAttachments.addFiles}
        onRemove={photoAttachments.removePhoto}
      />

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <button
        type="submit"
        disabled={isSending}
        className="mt-2 inline-flex min-h-[50px] items-center justify-center self-start rounded-full border border-sage-500 bg-sage-500 px-7 text-sm font-medium text-ink-950 transition hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 max-[650px]:w-full max-[650px]:self-stretch"
      >
        {isSending ? "Envoi en cours…" : "Envoyer la demande"}
      </button>
      <SubmitFeedback message={feedback} isError={status === "error"} />
    </form>
  );
}
