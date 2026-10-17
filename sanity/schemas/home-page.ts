import { defineType } from "sanity";
import { homePageCardField } from "./home-page-card-field";
import { homePageGalleryPreviewField } from "./home-page-gallery-preview-field";

export const HOME_PAGE_TYPE = "homePage";
export const HOME_PAGE_ID = "homePage";

export const homePage = defineType({
  name: HOME_PAGE_TYPE,
  title: "Page d’accueil",
  type: "document",
  groups: [
    { name: "galleryPreview", title: "Aperçu galerie" },
    { name: "cards", title: "Cartes savoir-faire" },
  ],
  fields: [
    homePageGalleryPreviewField,
    homePageCardField("creationCard", "Carte Création & aménagement"),
    homePageCardField("elagageCard", "Carte Élagage"),
    homePageCardField("abattageCard", "Carte Abattage"),
    homePageCardField("haiesCard", "Carte Taille de haies"),
  ],
  preview: { prepare: () => ({ title: "Page d’accueil" }) },
});
