import type { BlogCategorySlug } from "@/lib/site-config";
import type { Post } from "@/types/post";

export type GuideConfig = {
  category: BlogCategorySlug;
  basePath: string; // e.g. "/buyers-guide" — chapters live at `${basePath}/${slug}`
  hubTitle: string;
  plannedChapters: number; // the "Y" in "Chapter X of Y", independent of how many files exist
};

// Add an entry here (e.g. for "sellers-guide") to get its own chapter URLs,
// hub sorting, and prev/next nav for free.
export const guides: GuideConfig[] = [
  {
    category: "buyers-guide",
    basePath: "/buyers-guide",
    hubTitle: "Buyer's Guide",
    plannedChapters: 8,
  },
];

export function getGuideByCategory(category: string): GuideConfig | undefined {
  return guides.find((g) => g.category === category);
}

export function isGuideCategory(category: string): boolean {
  return guides.some((g) => g.category === category);
}

/** Where a post's own page lives: a guide chapter URL if its category is a guide, /blog/[slug] otherwise. */
export function getPostPath(post: Pick<Post, "category" | "slug">): string {
  const guide = getGuideByCategory(post.category);
  return guide ? `${guide.basePath}/${post.slug}` : `/blog/${post.slug}`;
}

/** Chapters for a guide, sorted by chapter number (undefined chapters sort last). */
export function sortChapters(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => (a.chapter ?? Infinity) - (b.chapter ?? Infinity));
}
