import { defineField, defineType } from "sanity";

export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "image",
  description:
    "Cliquez sur l’image puis sur l’icône de recadrage pour choisir la zone importante (elle restera visible dans toutes les tailles).",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Description de la photo",
      description: "Décrivez la photo en quelques mots (pour Google et l’accessibilité).",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "caption", title: "Légende", type: "string" }),
  ],
});
