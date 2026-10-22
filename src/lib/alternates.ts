import type { Metadata } from "next";
import { getAllPosts, getEnglishTranslation, getSpanishTranslation } from "@/lib/posts";
import { getPostPath, guides } from "@/lib/guides";
import { siteConfig } from "@/lib/site-config";
import type { Lang } from "@/lib/i18n";

/** English path <-> Spanish path for pages that always exist in both languages. */
export const staticPagePairs: { en: string; es: string }[] = [
  { en: "", es: "/es" },
  { en: "/contact", es: "/es/contacto" },
  ...guides.map((g) => ({ en: g.basePath, es: g.esBasePath })),
];

/** English path <-> Spanish path for every published/visible translated post pair. */
export function getPostPathPairs(): { en: string; es: string }[] {
  const pairs: { en: string; es: string }[] = [];
  for (const esPost of getAllPosts("es")) {
    const enPost = getEnglishTranslation(esPost);
    if (enPost) pairs.push({ en: getPostPath(enPost), es: getPostPath(esPost, "es") });
  }
  return pairs;
}

/** hreflang map (en, es, x-default = English) for a page that has a translation. */
export function hreflangLanguages(enPath: string, esPath: string): Record<string, string> {
  const en = `${siteConfig.url}${enPath}`;
  return { en, es: `${siteConfig.url}${esPath}`, "x-default": en };
}

/** Metadata `alternates`: a self canonical plus hreflang links in both directions. */
export function pairAlternates(
  lang: Lang,
  enPath: string,
  esPath: string
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: `${siteConfig.url}${lang === "es" ? esPath : enPath}`,
    languages: hreflangLanguages(enPath, esPath),
  };
}

/** Alternates for a Spanish-translatable English static page (home, contact, guide hubs). */
export function staticPageAlternates(lang: Lang, enPath: string) {
  const pair = staticPagePairs.find((p) => p.en === enPath);
  return pair ? pairAlternates(lang, pair.en, pair.es) : undefined;
}

/** hreflang map for an English post that has a visible Spanish translation, else undefined. */
export function englishPostLanguages(enSlug: string, enPath: string) {
  const es = getSpanishTranslation(enSlug);
  return es ? hreflangLanguages(enPath, getPostPath(es, "es")) : undefined;
}

/**
 * Current-path -> other-language-path map for the header language switch. Paths with no
 * entry fall back to /es (from English) or / (from Spanish).
 */
export function getLanguageSwitchMap(from: Lang): Record<string, string> {
  const map: Record<string, string> = {};
  for (const pair of [...staticPagePairs, ...getPostPathPairs()]) {
    if (from === "en") map[pair.en || "/"] = pair.es;
    else map[pair.es] = pair.en || "/";
  }
  return map;
}
