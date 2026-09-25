import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostFrontmatter } from "@/types/post";
import type { BlogCategorySlug } from "@/lib/site-config";
import { sortChapters } from "@/lib/guides";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

function readAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readPost(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  return {
    ...frontmatter,
    slug,
    content,
    readingTime: readingTime(content).text,
  };
}

/** All published posts, newest first. Drafts are excluded outside of dev builds. */
export function getAllPosts(): Post[] {
  const slugs = readAllSlugs();
  const posts = slugs.map(readPost);
  const visible = posts.filter(
    (p) => p.status === "published" || process.env.NODE_ENV === "development"
  );
  return visible.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const post = readPost(slug);
    if (post.status !== "published" && process.env.NODE_ENV !== "development") {
      return null;
    }
    return post;
  } catch {
    return null;
  }
}

export function getPostsByCategory(category: BlogCategorySlug): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getAllSlugs(): string[] {
  return readAllSlugs();
}

/** A guide's chapters, sorted by chapter number, drafts already excluded outside dev. */
export function getGuideChapters(category: BlogCategorySlug): Post[] {
  return sortChapters(getPostsByCategory(category));
}

/** A single chapter, but only if it actually belongs to that guide's category. */
export function getGuideChapterBySlug(category: BlogCategorySlug, slug: string): Post | null {
  const post = getPostBySlug(slug);
  if (!post || post.category !== category) return null;
  return post;
}

/** The chapters immediately before/after this one, skipping missing or draft chapters. */
export function getAdjacentChapters(
  category: BlogCategorySlug,
  chapter: number | undefined
): { prev: Post | null; next: Post | null } {
  if (chapter == null) return { prev: null, next: null };
  const chapters = getGuideChapters(category);
  const prev = chapters.filter((c) => c.chapter != null && c.chapter < chapter).pop() ?? null;
  const next = chapters.find((c) => c.chapter != null && c.chapter > chapter) ?? null;
  return { prev, next };
}
