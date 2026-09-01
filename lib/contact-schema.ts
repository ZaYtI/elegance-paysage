import { z } from "zod";
import { serviceOptions } from "@/lib/site-data";

export const phoneCountries = [
  { code: "+33", label: "France", flag: "FR", pattern: /^[1-9]\d{8}$/, placeholder: "6 12 34 56 78" },
  { code: "+32", label: "Belgique", flag: "BE", pattern: /^[1-9]\d{7,8}$/, placeholder: "470 12 34 56" },
] as const;

export type PhoneCountryCode = (typeof phoneCountries)[number]["code"];

export const contactFormSchema = z
  .object({
    nom: z
      .string()
      .trim()
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(100, "100 caractères maximum"),
    email: z.string().trim().min(1, "L'email est requis").pipe(z.email("Adresse email invalide")),
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

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const PHOTO_LIMITS = {
  maxSize: 5 * 1024 * 1024,
  maxCount: 5,
  acceptedTypes: ["image/jpeg", "image/png", "image/webp"] as const,
};
