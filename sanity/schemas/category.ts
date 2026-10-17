import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Catégorie",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nom", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Identifiant dans l’adresse",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordre d’affichage",
      description: "Les catégories sont affichées dans l’ordre croissant de ce nombre.",
      type: "number",
    }),
  ],
  preview: { select: { title: "title", subtitle: "order" } },
});
