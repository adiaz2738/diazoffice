import Link from "next/link";
import type { Post } from "@/types/post";
import { getPostPath } from "@/lib/guides";
import { formatDate, getPostLabelFor, strings, type Lang } from "@/lib/i18n";

export function PostEntry({ post, lang = "en" }: { post: Post; lang?: Lang }) {
  return (
    <Link
      href={getPostPath(post, lang)}
      className="group grid grid-cols-[auto_1fr] sm:grid-cols-[7rem_1fr] gap-4 sm:gap-8 py-7 border-b border-line"
    >
      <span className="label-tag pt-1 whitespace-nowrap">{formatDate(post.date, lang, "short")}</span>
      <div>
        <span className="label-tag label-tag--accent">
          {post.chapter != null
            ? `${strings[lang].post.chapter} ${post.chapter}`
            : getPostLabelFor(post, lang)}
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
