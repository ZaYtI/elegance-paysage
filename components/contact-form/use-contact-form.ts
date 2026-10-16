"use client";

import { useState } from "react";
import {
  contactFormSchema,
  type ContactFormErrors,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { serviceOptions } from "@/lib/site-data";
import { usePhotoAttachments } from "./use-photo-attachments";

export type SubmitStatus = "idle" | "sending" | "success" | "error";

const initialValues: ContactFormValues = {
  nom: "",
  email: "",
  telCountry: "+33",
  tel: "",
  service: serviceOptions[0],
  msg: "",
};

const successMessage = "Merci, votre demande a bien été envoyée. Nous revenons vers vous rapidement.";

function collectFieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const fieldErrors: ContactFormErrors = {};
  for (const issue of issues) {
    const field = issue.path[0] as keyof ContactFormValues | undefined;
    if (field && !fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
  }
  return fieldErrors;
}

function buildRequestBody(values: ContactFormValues, photos: File[]) {
  const body = new FormData();
  body.set("nom", values.nom);
  body.set("email", values.email);
  body.set("telCountry", values.telCountry);
  body.set("tel", values.tel);
  body.set("service", values.service);
  body.set("msg", values.msg ?? "");
  for (const photo of photos) body.append("photos", photo);
  return body;
}

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const photoAttachments = usePhotoAttachments();

  function setField<K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (status === "error" || status === "success") {
      setStatus("idle");
      setFeedback("");
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const result = contactFormSchema.safeParse(values);
    if (!result.success) {
      setErrors(collectFieldErrors(result.error.issues));
      setStatus("idle");
      setFeedback("");
      return;
    }

    setErrors({});
    setStatus("sending");
    setFeedback("");

    try {
      const files = photoAttachments.photos.map((photo) => photo.file);
      const response = await fetch("/api/contact", {
        method: "POST",
        body: buildRequestBody(result.data, files),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "L'envoi a échoué.");
      }

      photoAttachments.clearPhotos();
      setValues(initialValues);
      setStatus("success");
      setFeedback(successMessage);
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "L'envoi a échoué. Réessayez plus tard.");
    }
  }

  return { values, errors, status, feedback, photoAttachments, setField, submit };
}
