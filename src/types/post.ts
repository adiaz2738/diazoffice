import type { BlogCategorySlug } from "@/lib/site-config";

export type TimelineEntry = {
  date: string; // display string, e.g. "1925" or "July 2026" — not necessarily ISO, often approximate
  label: string; // short title for the collapsed view
  description: string; // shown when expanded
  confirmed: boolean; // false = show "unconfirmed" note instead of treating it as settled fact
  sourceLabel?: string; // e.g. "Carmel Pine Cone" — only if confirmed and a specific source backs this exact entry
  sourceUrl?: string;
};

export type PostFrontmatter = {
  title: string;
  excerpt: string;
  date: string; // ISO format: 2026-03-14
  category: BlogCategorySlug;
  coverImage?: string;
  seoDescription?: string;
  status: "draft" | "published";
  sources?: string[]; // book/citation names — keeps you honest at a glance
  timeline?: TimelineEntry[];
  timelinePlacement?: "top" | "bottom"; // defaults to "bottom" when timeline exists
  timelineStyle?: "simple" | "horizontal"; // defaults to "simple" when unset
  chapter?: number; // position within a guide (see src/lib/guides.ts), unset for non-guide posts
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  readingTime: string;
};
