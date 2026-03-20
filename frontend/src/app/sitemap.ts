import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";

export const revalidate = 3600; // Sitemap će se automatski osvježiti svakih sat vremena

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "http://www.gggamingzone.com";

  // Povlačenje svih objavljenih novosti i turnira iz Sanitya
  const newsQuery = `*[_type == "news" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`;
  const tournamentsQuery = `*[_type == "tournament" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`;

  const [news, tournaments] = await Promise.all([
    client.fetch(newsQuery),
    client.fetch(tournamentsQuery),
  ]);

  // Generiranje URL-ova za novosti
  const newsUrls: MetadataRoute.Sitemap = news.map(
    (item: { slug: string; _updatedAt: string }) => ({
      url: `${baseUrl}/novosti/${item.slug}`,
      lastModified: item._updatedAt || new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  // Generiranje URL-ova za turnire
  const tournamentUrls: MetadataRoute.Sitemap = tournaments.map(
    (item: { slug: string; _updatedAt: string }) => ({
      url: `${baseUrl}/turniri/${item.slug}`,
      lastModified: item._updatedAt || new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  // Vraćanje svih statičnih i dinamičnih putanja
  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/novosti`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/turniri`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...newsUrls,
    ...tournamentUrls,
  ];
}
