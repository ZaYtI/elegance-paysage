import { defineConfig } from "sanity";
import { frFRLocale } from "@sanity/locale-fr-fr";
import { structureTool } from "sanity/structure";
import { sanityDataset, sanityProjectId } from "@/lib/sanity/env";
import { schemaTypes } from "./sanity/schemas";
import { withoutHomePageTemplate, withoutSingletonActions } from "./sanity/singleton-rules";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "elegance-paysage",
  title: "Élégance Paysage",
  basePath: "/studio",
  projectId: sanityProjectId,
  dataset: sanityDataset,
  plugins: [structureTool({ structure }), frFRLocale()],
  schema: { types: schemaTypes, templates: withoutHomePageTemplate },
  document: { actions: (actions, { schemaType }) => withoutSingletonActions(actions, schemaType) },
});
