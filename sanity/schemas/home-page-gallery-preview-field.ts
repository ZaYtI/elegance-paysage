import { defineArrayMember, defineField } from "sanity";

export const homePageGalleryPreviewField = defineField({
  name: "galleryPreview",
  title: "Aperçu galerie",
  group: "galleryPreview",
  description: "Les 3 images affichées dans la section galerie de l’accueil.",
  type: "array",
  of: [
    defineArrayMember({
      type: "object",
      name: "galleryPreviewItem",
      title: "Image de l’aperçu",
      fields: [
        defineField({ name: "photo", title: "Photo", type: "photo", validation: (rule) => rule.required() }),
        defineField({ name: "title", title: "Titre", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "subtitle", title: "Sous-titre", type: "string" }),
        defineField({
          name: "isExample",
          title: "Exemple (vue 3D)",
          description: "Image d'illustration. À supprimer quand vous aurez vos propres photos.",
          type: "boolean",
          initialValue: false,
        }),
      ],
      preview: {
        select: { title: "title", subtitle: "subtitle", media: "photo" },
      },
    }),
  ],
  validation: (rule) => rule.max(3),
});
