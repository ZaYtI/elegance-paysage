import { defineField } from "sanity";

export function homePageCardField(name: string, title: string) {
  return defineField({
    name,
    title,
    group: "cards",
    description: "Laisser un champ vide pour garder le texte ou le visuel actuel.",
    type: "object",
    fields: [
      defineField({ name: "title", title: "Titre", type: "string" }),
      defineField({ name: "tag", title: "Étiquette", type: "string" }),
      defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
      defineField({ name: "image", title: "Photo de fond", type: "cardPhoto" }),
    ],
  });
}
