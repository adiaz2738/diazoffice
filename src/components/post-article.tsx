import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Post } from "@/types/post";
import { blogCategories, siteConfig } from "@/lib/site-config";
import { PostTimeline } from "@/components/post-timeline";
import { PostTimelineHorizontal } from "@/components/post-timeline-horizontal";

export type ChapterNav = {
  chapterNumber: number;
  totalChapters: number;
  prev: { href: string; chapter: number; title: string } | null;
  next: { href: string; chapter: number; title: string } | null;
  backHref: string;
  backLabel: string;
};

export function PostArticle({ post, chapterNav }: { post: Post; chapterNav?: ChapterNav }) {
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
      {chapterNav && (
        <p className="label-tag mb-3">
          Chapter {chapterNav.chapterNumber} of {chapterNav.totalChapters}
        </p>
      )}
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

      {post.coverImage && (
        <div className="mt-8 aspect-video border border-line relative overflow-hidden">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
        </div>
      )}

      {post.timeline && post.timeline.length > 0 && post.timelinePlacement === "top" && (
        post.timelineStyle === "horizontal" ? (
          <PostTimelineHorizontal entries={post.timeline} />
        ) : (
          <PostTimeline entries={post.timeline} />
        )
      )}

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

      {post.timeline && post.timeline.length > 0 && post.timelinePlacement !== "top" && (
        post.timelineStyle === "horizontal" ? (
          <PostTimelineHorizontal entries={post.timeline} />
        ) : (
          <PostTimeline entries={post.timeline} />
        )
      )}

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

      {chapterNav && (
        <div className="mt-14 pt-8 border-t border-line">
          <div className="grid grid-cols-2 gap-6">
            <div>
              {chapterNav.prev && (
                <Link href={chapterNav.prev.href} className="group block">
                  <span className="label-tag">← Chapter {chapterNav.prev.chapter}</span>
                  <span className="mt-1 block font-medium group-hover:text-kw-red transition-colors">
                    {chapterNav.prev.title}
                  </span>
                </Link>
              )}
            </div>
            <div className="text-right">
              {chapterNav.next && (
                <Link href={chapterNav.next.href} className="group block">
                  <span className="label-tag">Chapter {chapterNav.next.chapter} →</span>
                  <span className="mt-1 block font-medium group-hover:text-kw-red transition-colors">
                    {chapterNav.next.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
          <Link
            href={chapterNav.backHref}
            className="mt-8 inline-block text-sm text-muted underline decoration-kw-red underline-offset-2 hover:text-kw-red"
          >
            {chapterNav.backLabel}
          </Link>
        </div>
      )}
    </article>
  );
}
