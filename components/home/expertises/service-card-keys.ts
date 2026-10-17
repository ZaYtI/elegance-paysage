import type { SanityHomePage } from "@/lib/sanity/types";
import type { Service } from "@/lib/site-data";

type HomeCardKey = Exclude<keyof SanityHomePage, "galleryPreview">;

export const serviceCardKeys: Record<Service["icon"], HomeCardKey> = {
  amenagement: "creation",
  elagage: "elagage",
  abattage: "abattage",
  haies: "haies",
};
