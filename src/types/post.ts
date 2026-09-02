import type { BlogCategorySlug } from "@/lib/site-config";

export type PostFrontmatter = {
  title: string;
  excerpt: string;
  date: string; // ISO format: 2026-03-14
  category: BlogCategorySlug;
  coverImage?: string;
  seoDescription?: string;
  status: "draft" | "published";
  sources?: string[]; // book/citation names — keeps you honest at a glance
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  readingTime: string;
};
