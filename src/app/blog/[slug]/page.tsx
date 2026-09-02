import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { blogCategories, siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const categoryLabel = blogCategories.find((c) => c.slug === post.category)?.label;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.brokerage,
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <p className="label-tag label-tag--accent mb-3">{categoryLabel}</p>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1]">
        {post.title}
      </h1>
      <div className="mt-5 flex items-center gap-3 text-sm text-muted">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </time>
        <span aria-hidden>·</span>
        <span>{post.readingTime}</span>
      </div>

      <div
        className="prose-content mt-10 max-w-none
        [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:tracking-tight [&>h2]:mt-12 [&>h2]:mb-4
        [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-3
        [&>p]:leading-relaxed [&>p]:text-ink/90 [&>p]:mb-5
        [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-5 [&>ul]:space-y-1
        [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-5 [&>ol]:space-y-1
        [&>blockquote]:border-l-2 [&>blockquote]:border-kw-red [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted [&>blockquote]:mb-5
        [&_a]:underline [&_a]:decoration-kw-red [&_a]:underline-offset-2 hover:[&_a]:text-kw-red
        [&>hr]:border-line [&>hr]:my-10"
      >
        <MDXRemote source={post.content} />
      </div>

      {post.sources && post.sources.length > 0 && (
        <div className="mt-14 pt-8 border-t border-line">
          <p className="label-tag mb-3">Sources</p>
          <ul className="text-sm text-muted space-y-1">
            {post.sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
