import type { MetadataRoute } from "next";
import { isPreviewDeployment } from "@/lib/environment";
import { siteInfo } from "@/lib/site-data";

export default function robots(): MetadataRoute.Robots {
  if (isPreviewDeployment()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/studio"] },
    sitemap: `${siteInfo.url}/sitemap.xml`,
  };
}
