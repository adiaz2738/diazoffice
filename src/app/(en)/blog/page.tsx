import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostEntry } from "@/components/post-entry";
import { blogCategories, type BlogCategorySlug } from "@/lib/site-config";
import { isGuideCategory } from "@/lib/guides";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Monterey County history, real estate market notes, and buyer's guide articles.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = blogCategories.find((c) => c.slug === category)?.slug as
    | BlogCategorySlug
    | undefined;

  const posts = getAllPosts().filter(
    (p) => !isGuideCategory(p.category) && (!activeCategory || p.category === activeCategory)
  );
  const filterableCategories = blogCategories.filter((c) => !isGuideCategory(c.slug));

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="label-tag label-tag--accent mb-3">The archive</p>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-8">Blog</h1>

      <div className="flex flex-wrap gap-2 mb-12 border-b border-line pb-8">
        <FilterPill href="/blog" active={!activeCategory} label="All" />
        {filterableCategories.map((c) => (
          <FilterPill
            key={c.slug}
            href={`/blog?category=${c.slug}`}
            active={activeCategory === c.slug}
            label={c.label}
          />
        ))}
      </div>

      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <PostEntry key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted border border-dashed border-line p-8 text-center">
          Nothing in this category yet — check back soon.
        </p>
      )}
    </div>
  );
}

function FilterPill({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "px-4 py-1.5 text-sm font-medium border transition-colors",
        active
          ? "bg-ink text-paper border-ink"
          : "border-line text-muted hover:border-ink hover:text-ink"
      )}
    >
      {label}
    </Link>
  );
}
