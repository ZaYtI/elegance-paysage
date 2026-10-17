import { sanityFetch } from "./fetch";
import { homePageQuery } from "./queries";
import type { SanityHomePage } from "./types";

export function fetchHomePage() {
  return sanityFetch<SanityHomePage>(homePageQuery);
}
