import { defineArrayMember, defineField, defineType } from "sanity";

export const realisation = defineType({
  name: "realisation",
  title: "Réalisation",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "location", title: "Lieu", type: "string" }),
    defineField({
      name: "date",
      title: "Date du chantier",
      type: "date",
      options: { dateFormat: "MMMM YYYY" },
    }),
    defineField({
      name: "isExample",
      title: "Exemple (vue 3D)",
      description: "Image d'illustration. À supprimer quand vous aurez vos propres photos.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({
      name: "photos",
      title: "Photos",
      description: "La première photo sert de couverture.",
      type: "array",
      of: [defineArrayMember({ type: "photo" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", category: "category.title", media: "photos.0" },
    prepare: ({ title, category, media }) => ({ title, subtitle: category, media }),
  },
});
