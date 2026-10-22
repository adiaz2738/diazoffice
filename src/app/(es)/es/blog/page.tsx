import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostEntry } from "@/components/post-entry";
import { blogCategories, type BlogCategorySlug } from "@/lib/site-config";
import { isGuideCategory } from "@/lib/guides";
import { buildSpanishPageMetadata } from "@/lib/es-pages";
import { strings } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const t = strings.es.blog;

export const metadata = buildSpanishPageMetadata({
  enPath: "/blog",
  esPath: "/es/blog",
  title: t.title,
  description: t.metaDescription,
});

export default async function SpanishBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = blogCategories.find((c) => c.slug === category)?.slug as
    | BlogCategorySlug
    | undefined;

  const posts = getAllPosts("es").filter(
    (p) => !isGuideCategory(p.category) && (!activeCategory || p.category === activeCategory)
  );
  const filterableCategories = blogCategories.filter((c) => !isGuideCategory(c.slug));

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="label-tag label-tag--accent mb-3">{t.eyebrow}</p>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-8">{t.title}</h1>

      <div className="flex flex-wrap gap-2 mb-12 border-b border-line pb-8">
        <FilterPill href="/es/blog" active={!activeCategory} label={t.all} />
        {filterableCategories.map((c) => (
          <FilterPill
            key={c.slug}
            href={`/es/blog?category=${c.slug}`}
            active={activeCategory === c.slug}
            label={strings.es.categories[c.slug]}
          />
        ))}
      </div>

      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <PostEntry key={post.slug} post={post} lang="es" />
          ))}
        </div>
      ) : (
        <p className="text-muted border border-dashed border-line p-8 text-center">{t.empty}</p>
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
