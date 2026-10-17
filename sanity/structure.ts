import type { StructureResolver } from "sanity/structure";
import { HOME_PAGE_ID, HOME_PAGE_TYPE } from "./schemas/home-page";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("Page d’accueil")
        .id(HOME_PAGE_ID)
        .child(S.document().schemaType(HOME_PAGE_TYPE).documentId(HOME_PAGE_ID)),
      S.documentTypeListItem("category").title("Catégories"),
      S.documentTypeListItem("realisation").title("Réalisations"),
    ]);
