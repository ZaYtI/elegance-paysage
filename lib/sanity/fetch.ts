import { sanityClient } from "./client";
import { isSanityConfigured } from "./env";

const SANITY_CACHE_TAG = "sanity";
const ONE_DAY_SECONDS = 60 * 60 * 24;

export async function sanityFetch<Result>(query: string): Promise<Result | null> {
  if (!isSanityConfigured()) return null;

  try {
    return await sanityClient.fetch<Result>(query, {}, { next: { revalidate: ONE_DAY_SECONDS, tags: [SANITY_CACHE_TAG] } });
  } catch (error) {
    console.error("Sanity fetch failed.", error);
    return null;
  }
}
