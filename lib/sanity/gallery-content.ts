import { categoriesQuery, realisationsQuery } from "./queries";
import { sanityFetch } from "./fetch";
import type { SanityCategory, SanityRealisation } from "./types";

export function fetchCategories() {
  return sanityFetch<SanityCategory[]>(categoriesQuery);
}

export function fetchRealisations() {
  return sanityFetch<SanityRealisation[]>(realisationsQuery);
}
