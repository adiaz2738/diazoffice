// Shared page logic for the Spanish (/es/) guide hubs, guide chapters and blog posts.
// Only content that exists in src/content/es/posts is listed or served; there is no English fallback.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostArticle } from "@/components/post-article";
import { PostEntry } from "@/components/post-entry";
import {
  getAdjacentChapters,
  getAllPosts,
  getEnglishTranslation,
  getGuideChapterBySlug,
  getGuideChapters,
  getPostBySlug,
} from "@/lib/posts";
import { getGuideByCategory, getPostPath, isGuideCategory } from "@/lib/guides";
import { hreflangLanguages, staticPageAlternates } from "@/lib/alternates";
import { buildPostMetadata } from "@/lib/post-metadata";
import { langMeta, strings } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import type { Post } from "@/types/post";

type GuideCategory = "buyers-guide" | "sellers-guide";

function requireGuide(category: GuideCategory) {
  const g = getGuideByCategory(category);
  if (!g) throw new Error(`No guide configured for category "${category}"`);
  return g;
}

/** hreflang map for a Spanish post, only when its English original is visible. */
function spanishPostLanguages(post: Post) {
  const en = getEnglishTranslation(post);
  return en ? hreflangLanguages(getPostPath(en), getPostPath(post, "es")) : undefined;
}

/** Metadata for a Spanish static page (home, contact, guide hubs). `enPath` is its English twin. */
export function buildSpanishPageMetadata(opts: {
  enPath: string;
  esPath: string;
  title?: string;
  description: string;
}): Metadata {
  const url = `${siteConfig.url}${opts.esPath}`;
  const image = { url: siteConfig.ogImage, width: 1200, height: 630 };
  return {
    ...(opts.title && { title: opts.title }),
    description: opts.description,
    alternates: staticPageAlternates("es", opts.enPath),
    openGraph: {
      title: opts.title ?? siteConfig.name,
      description: opts.description,
      url,
      siteName: siteConfig.name,
      locale: langMeta.es.ogLocale,
      type: "website",
      images: [image],
    },
  };
}

// --- Guide hub ----------------------------------------------------------------------------

export function guideHubMetadata(category: GuideCategory): Metadata {
  const g = requireGuide(category);
  const t = strings.es.guides[category];
  return buildSpanishPageMetadata({
    enPath: g.basePath,
    esPath: g.esBasePath,
    title: t.title,
    description: t.metaDescription,
  });
}

export function GuideHub({ category }: { category: GuideCategory }) {
  const t = strings.es.guides[category];
  const posts = getGuideChapters(category, "es");

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="label-tag label-tag--accent mb-3">{strings.es.guideEyebrow}</p>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight max-w-2xl">{t.heading}</h1>
      <p className="mt-5 text-lg text-muted max-w-2xl leading-relaxed">{t.intro}</p>

      <div className="mt-16">
        {posts.length > 0 ? (
          posts.map((post) => <PostEntry key={post.slug} post={post} lang="es" />)
        ) : (
          <p className="text-muted border border-dashed border-line p-8 text-center">
            {strings.es.guideEmpty}
          </p>
        )}
      </div>
    </div>
  );
}

// --- Guide chapter ------------------------------------------------------------------------

export function guideChapterStaticParams(category: GuideCategory) {
  return getGuideChapters(category, "es").map((post) => ({ slug: post.slug }));
}

export function guideChapterMetadata(category: GuideCategory, slug: string): Metadata {
  const post = getGuideChapterBySlug(category, slug, "es");
  if (!post) return {};
  return buildPostMetadata(
    post,
    getPostPath(post, "es"),
    "es",
    spanishPostLanguages(post)
  );
}

export function GuideChapter({ category, slug }: { category: GuideCategory; slug: string }) {
  const post = getGuideChapterBySlug(category, slug, "es");
  if (!post) notFound();

  const g = requireGuide(category);
  const hubTitle = strings.es.guides[category].title;
  const { prev, next } = getAdjacentChapters(category, post.chapter, "es");
  const link = (c: Post) => ({
    href: getPostPath(c, "es"),
    chapter: c.chapter as number,
    title: c.title,
  });

  return (
    <PostArticle
      lang="es"
      post={post}
      chapterNav={{
        chapterNumber: post.chapter ?? 0,
        totalChapters: g.plannedChapters,
        prev: prev && prev.chapter != null ? link(prev) : null,
        next: next && next.chapter != null ? link(next) : null,
        backHref: g.esBasePath,
        backLabel: strings.es.post.backTo(hubTitle),
      }}
    />
  );
}

// --- Blog post (every non-guide category) -------------------------------------------------

export function blogStaticParams() {
  return getAllPosts("es")
    .filter((post) => !isGuideCategory(post.category))
    .map((post) => ({ slug: post.slug }));
}

export function blogMetadata(slug: string): Metadata {
  const post = getPostBySlug(slug, "es");
  if (!post || isGuideCategory(post.category)) return {};
  return buildPostMetadata(post, `/es/blog/${post.slug}`, "es", spanishPostLanguages(post));
}

export function BlogPost({ slug }: { slug: string }) {
  const post = getPostBySlug(slug, "es");
  if (!post || isGuideCategory(post.category)) notFound();
  return <PostArticle post={post} lang="es" />;
}
