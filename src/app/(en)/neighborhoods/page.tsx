import type { Metadata } from "next";
import Link from "next/link";
import { neighborhoods } from "@/lib/neighborhoods-data";
import { NeighborhoodMapLoader } from "@/components/neighborhood-map-loader";
import { getPostByNeighborhood } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Neighborhoods",
  description:
    "An interactive map of Monterey County towns and neighborhoods, and the history behind each one.",
};

export default function NeighborhoodsPage() {
  const cards = neighborhoods.map((n) => ({ ...n, post: getPostByNeighborhood(n.slug) }));
  const neighborhoodsWithHistory = cards.map(({ post, ...n }) => ({
    ...n,
    historySlug: post?.slug,
  }));

  return (
    <div>
      <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-20 pb-10">
        <p className="label-tag label-tag--accent mb-3">Explore</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight max-w-2xl">
          A map of the county&apos;s stories
        </h1>
        <p className="mt-5 text-lg text-muted max-w-2xl leading-relaxed">
          Every town on this map has a reason it looks the way it does. Click a marker for a
          quick take, or read the full history below.
        </p>
      </div>

      <div className="h-[420px] sm:h-[520px] border-y border-line">
        <NeighborhoodMapLoader neighborhoods={neighborhoodsWithHistory} />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ post, ...n }) => {
          return (
            <div key={n.slug} className="border border-line p-6">
              <h2 className="text-lg font-semibold tracking-tight mb-2">{n.name}</h2>
              <p className="text-muted text-sm leading-relaxed mb-4">{n.blurb}</p>
              {post ? (
                <div className="flex items-center gap-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-medium hover:text-kw-red"
                  >
                    Read the history →
                  </Link>
                  {post.status === "draft" && (
                    <span className="label-tag label-tag--accent">Draft</span>
                  )}
                </div>
              ) : (
                <span className="text-sm text-muted italic">History post coming soon</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
