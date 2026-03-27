import type { MetadataRoute } from "next";
import { getAllLanguages, getAllProblems, getAllTags } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now },
    { url: absoluteUrl("/problems"), lastModified: now },
    { url: absoluteUrl("/learning-paths"), lastModified: now }
  ];

  const problemRoutes: MetadataRoute.Sitemap = getAllProblems().map((problem) => ({
    url: absoluteUrl(`/problems/${problem.slug}`),
    lastModified: now
  }));

  const tagRoutes: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: absoluteUrl(`/tags/${tag}`),
    lastModified: now
  }));

  const languageRoutes: MetadataRoute.Sitemap = getAllLanguages().map((language) => ({
    url: absoluteUrl(`/languages/${language}`),
    lastModified: now
  }));

  return [...staticRoutes, ...problemRoutes, ...tagRoutes, ...languageRoutes];
}
