import type { MetadataRoute } from "next";
import { isProductionSite } from "@/lib/environment";
import { siteInfo } from "@/lib/site-data";

export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteInfo.url}/sitemap.xml`,
  };
}
