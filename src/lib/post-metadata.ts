import type { Metadata } from "next";
import type { Post } from "@/types/post";
import { siteConfig } from "@/lib/site-config";

/** Shared metadata shape for a post/chapter page, given the path it actually lives at. */
export function buildPostMetadata(post: Post, path: string): Metadata {
  const url = `${siteConfig.url}${path}`;
  const image = post.coverImage ?? siteConfig.ogImage;
  return {
    title: post.title,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      url,
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
