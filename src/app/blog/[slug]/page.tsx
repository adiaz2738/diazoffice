import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { isGuideCategory } from "@/lib/guides";
import { buildPostMetadata } from "@/lib/post-metadata";
import { PostArticle } from "@/components/post-article";

export function generateStaticParams() {
  return getAllPosts()
    .filter((post) => !isGuideCategory(post.category))
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || isGuideCategory(post.category)) return {};

  return buildPostMetadata(post, `/blog/${post.slug}`);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || isGuideCategory(post.category)) notFound();

  return <PostArticle post={post} />;
}
