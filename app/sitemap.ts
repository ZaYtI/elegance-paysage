import type { MetadataRoute } from "next";
import { siteInfo } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteInfo.url, changeFrequency: "monthly", priority: 1 },
    { url: `${siteInfo.url}/mentions-legales`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
