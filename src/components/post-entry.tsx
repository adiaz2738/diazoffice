import Link from "next/link";
import type { Post } from "@/types/post";
import { blogCategories } from "@/lib/site-config";
import { getPostPath } from "@/lib/guides";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function categoryLabel(slug: Post["category"]) {
  return blogCategories.find((c) => c.slug === slug)?.label ?? slug;
}

export function PostEntry({ post }: { post: Post }) {
  return (
    <Link
      href={getPostPath(post)}
      className="group grid grid-cols-[auto_1fr] sm:grid-cols-[7rem_1fr] gap-4 sm:gap-8 py-7 border-b border-line"
    >
      <span className="label-tag pt-1 whitespace-nowrap">{formatDate(post.date)}</span>
      <div>
        <span className="label-tag label-tag--accent">
          {post.chapter != null ? `Chapter ${post.chapter}` : categoryLabel(post.category)}
        </span>
        <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight group-hover:text-kw-red transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-muted leading-relaxed max-w-2xl">{post.excerpt}</p>
        <span className="mt-3 block text-xs text-muted">{post.readingTime}</span>
      </div>
    </Link>
  );
}
