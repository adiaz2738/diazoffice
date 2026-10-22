import type { MetadataRoute } from "next";
import { getAllPosts, getEnglishTranslation } from "@/lib/posts";
import { getPostPath } from "@/lib/guides";
import { getStaticPagePairs, hreflangLanguages } from "@/lib/alternates";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const englishOnly = ["/blog", "/neighborhoods", "/videos", "/about", "/listings"];
  const abs = (path: string) => `${siteConfig.url}${path}`;

  // Pages that exist in both languages carry hreflang alternates on each entry.
  const pairs = getStaticPagePairs();
  const pairedStatic = pairs.flatMap((pair) => {
    const languages = hreflangLanguages(pair.en, pair.es);
    return [
      { url: abs(pair.en), lastModified: new Date(), alternates: { languages } },
      { url: abs(pair.es), lastModified: new Date(), alternates: { languages } },
    ];
  });

  const pairedPaths = new Set(pairs.map((p) => p.en));
  const staticRoutes = englishOnly.filter((route) => !pairedPaths.has(route)).map((route) => ({
    url: abs(route),
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: abs(getPostPath(post)),
    lastModified: new Date(post.date),
  }));

  // Spanish posts are standalone entries; those with a visible English original link both ways.
  // (English posts that have a Spanish twin get their alternates here too, below.)
  const spanishPosts = getAllPosts("es");
  const twinByEnglishPath = new Map<string, string>();
  const spanishRoutes = spanishPosts.map((post) => {
    const esPath = getPostPath(post, "es");
    const en = getEnglishTranslation(post);
    if (!en) return { url: abs(esPath), lastModified: new Date(post.date) };
    const enPath = getPostPath(en);
    twinByEnglishPath.set(enPath, esPath);
    return {
      url: abs(esPath),
      lastModified: new Date(post.date),
      alternates: { languages: hreflangLanguages(enPath, esPath) },
    };
  });

  const postRoutesWithAlternates = postRoutes.map((entry) => {
    const enPath = entry.url.slice(siteConfig.url.length);
    const esPath = twinByEnglishPath.get(enPath);
    return esPath
      ? { ...entry, alternates: { languages: hreflangLanguages(enPath, esPath) } }
      : entry;
  });

  return [...pairedStatic, ...staticRoutes, ...postRoutesWithAlternates, ...spanishRoutes];
}
