import type { Metadata } from "next";
import type { Post } from "@/types/post";
import { siteConfig } from "@/lib/site-config";
import { langMeta, type Lang } from "@/lib/i18n";

/**
 * Shared metadata shape for a post/chapter page, given the path it actually lives at.
 * `languages` is the hreflang map, only passed when the post has a translation.
 */
export function buildPostMetadata(
  post: Post,
  path: string,
  lang: Lang = "en",
  languages?: Record<string, string>
): Metadata {
  const url = `${siteConfig.url}${path}`;
  const image = post.coverImage ?? siteConfig.ogImage;
  return {
    title: post.title,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: url,
      ...(languages && { languages }),
    },
    openGraph: {
      title: post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      url,
      ...(lang !== "en" && { locale: langMeta[lang].ogLocale }),
      publishedTime: post.date,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.seoDescription || post.excerpt,
      images: [image],
    },
  };
}
