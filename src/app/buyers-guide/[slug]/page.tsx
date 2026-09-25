import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdjacentChapters, getGuideChapterBySlug, getGuideChapters } from "@/lib/posts";
import { getGuideByCategory } from "@/lib/guides";
import { buildPostMetadata } from "@/lib/post-metadata";
import { PostArticle } from "@/components/post-article";

// This route serves one guide. Copying this file for another guide (e.g.
// sellers-guide) only requires changing GUIDE_CATEGORY below.
const GUIDE_CATEGORY = "buyers-guide" as const;

function guide() {
  const g = getGuideByCategory(GUIDE_CATEGORY);
  if (!g) throw new Error(`No guide configured for category "${GUIDE_CATEGORY}"`);
  return g;
}

export function generateStaticParams() {
  return getGuideChapters(GUIDE_CATEGORY).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getGuideChapterBySlug(GUIDE_CATEGORY, slug);
  if (!post) return {};

  return buildPostMetadata(post, `${guide().basePath}/${post.slug}`);
}

export default async function GuideChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getGuideChapterBySlug(GUIDE_CATEGORY, slug);
  if (!post) notFound();

  const g = guide();
  const { prev, next } = getAdjacentChapters(GUIDE_CATEGORY, post.chapter);

  return (
    <PostArticle
      post={post}
      chapterNav={{
        chapterNumber: post.chapter ?? 0,
        totalChapters: g.plannedChapters,
        prev: prev && prev.chapter != null
          ? { href: `${g.basePath}/${prev.slug}`, chapter: prev.chapter, title: prev.title }
          : null,
        next: next && next.chapter != null
          ? { href: `${g.basePath}/${next.slug}`, chapter: next.chapter, title: next.title }
          : null,
        backHref: g.basePath,
        backLabel: `Back to the ${g.hubTitle}`,
      }}
    />
  );
}
