import { defineField, defineType } from "sanity";

export const cardPhoto = defineType({
  name: "cardPhoto",
  title: "Photo de la carte",
  type: "image",
  description:
    "Cliquez sur l’image puis sur l’icône de recadrage pour choisir la zone importante (elle restera visible dans toutes les tailles).",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Description de la photo (pour Google)",
      description: "Décrivez la photo en quelques mots (pour Google et l’accessibilité).",
      type: "string",
      validation: (rule) =>
        rule.custom((alt, context) => {
          const image = context.parent as { asset?: unknown } | undefined;
          return image?.asset && !alt ? "La description est obligatoire quand une photo est ajoutée." : true;
        }),
    }),
  ],
});
