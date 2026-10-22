import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostFrontmatter } from "@/types/post";
import type { BlogCategorySlug } from "@/lib/site-config";
import { getPostPath, sortChapters } from "@/lib/guides";
import { strings, type Lang } from "@/lib/i18n";

// English lives in src/content/posts, Spanish in src/content/es/posts (same frontmatter + translationOf).
// Each path.join stays statically scoped so the bundler traces only the content folders.
function postsDir(lang: Lang): string {
  return lang === "es"
    ? path.join(process.cwd(), "src/content/es/posts")
    : path.join(process.cwd(), "src/content/posts");
}

function readAllSlugs(lang: Lang = "en"): string[] {
  const dir = postsDir(lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readPost(slug: string, lang: Lang = "en"): Post {
  const filePath = path.join(postsDir(lang), `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  return {
    ...frontmatter,
    slug,
    content,
    readingTime:
      lang === "en"
        ? readingTime(content).text
        : `${Math.ceil(readingTime(content).minutes)} ${strings[lang].post.minRead}`,
  };
}

/** All published posts, newest first. Drafts are excluded outside of dev builds. */
export function getAllPosts(lang: Lang = "en"): Post[] {
  const slugs = readAllSlugs(lang);
  const posts = slugs.map((slug) => readPost(slug, lang));
  const visible = posts.filter(
    (p) => p.status === "published" || process.env.NODE_ENV === "development"
  );
  return visible.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string, lang: Lang = "en"): Post | null {
  try {
    const post = readPost(slug, lang);
    if (post.status !== "published" && process.env.NODE_ENV !== "development") {
      return null;
    }
    return post;
  } catch {
    return null;
  }
}

export function getPostsByCategory(category: BlogCategorySlug, lang: Lang = "en"): Post[] {
  return getAllPosts(lang).filter((p) => p.category === category);
}

export function getAllSlugs(lang: Lang = "en"): string[] {
  return readAllSlugs(lang);
}

/** The post whose frontmatter `neighborhood` matches, respecting the usual dev/production draft rules. */
export function getPostByNeighborhood(neighborhoodSlug: string): Post | null {
  return getAllPosts().find((p) => p.neighborhood === neighborhoodSlug) ?? null;
}

/** A guide's chapters, sorted by chapter number, drafts already excluded outside dev. */
export function getGuideChapters(category: BlogCategorySlug, lang: Lang = "en"): Post[] {
  return sortChapters(getPostsByCategory(category, lang));
}

/** A single chapter, but only if it actually belongs to that guide's category. */
export function getGuideChapterBySlug(
  category: BlogCategorySlug,
  slug: string,
  lang: Lang = "en"
): Post | null {
  const post = getPostBySlug(slug, lang);
  if (!post || post.category !== category) return null;
  return post;
}

/** The chapters immediately before/after this one, skipping missing or draft chapters. */
export function getAdjacentChapters(
  category: BlogCategorySlug,
  chapter: number | undefined,
  lang: Lang = "en"
): { prev: Post | null; next: Post | null } {
  if (chapter == null) return { prev: null, next: null };
  const chapters = getGuideChapters(category, lang);
  const prev = chapters.filter((c) => c.chapter != null && c.chapter < chapter).pop() ?? null;
  const next = chapters.find((c) => c.chapter != null && c.chapter > chapter) ?? null;
  return { prev, next };
}

/** The visible Spanish post that translates this English slug, or null. */
export function getSpanishTranslation(englishSlug: string): Post | null {
  if (!getPostBySlug(englishSlug)) return null;
  return getAllPosts("es").find((p) => p.translationOf === englishSlug) ?? null;
}

/** The visible English post a Spanish post translates, or null if it's unset, missing or hidden. */
export function getEnglishTranslation(spanishPost: Pick<Post, "translationOf">): Post | null {
  if (!spanishPost.translationOf) return null;
  return getPostBySlug(spanishPost.translationOf);
}

/**
 * Where a timeline's English chapter link should point in the given language. Spanish pages
 * link only to chapters that exist in Spanish (undefined = hide the link, never fall back to English).
 */
export function getLocalizedChapterHref(englishHref: string, lang: Lang): string | undefined {
  if (lang === "en") return englishHref;
  const slug = englishHref.split("/").pop() ?? "";
  const es = getSpanishTranslation(slug);
  return es ? getPostPath(es, "es") : undefined;
}
