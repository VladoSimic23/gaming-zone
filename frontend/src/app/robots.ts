import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"], // Zabrani indeksiranje API ruta
    },
    sitemap: "http://www.gggamingzone.com/sitemap.xml",
  };
}
