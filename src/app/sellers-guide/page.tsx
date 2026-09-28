import type { Metadata } from "next";
import { getGuideChapters } from "@/lib/posts";
import { PostEntry } from "@/components/post-entry";

export const metadata: Metadata = {
  title: "Seller's Guide",
  description:
    "What to know about selling a home in Monterey County, from pricing to the local rules that come up in escrow.",
};

export default function SellersGuidePage() {
  const posts = getGuideChapters("sellers-guide");

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="label-tag label-tag--accent mb-3">Tutorials</p>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight max-w-2xl">
        Selling a home in Monterey County
      </h1>
      <p className="mt-5 text-lg text-muted max-w-2xl leading-relaxed">
        What to know about selling a home in Monterey County, from pricing to the local rules
        that come up in escrow.
      </p>

      <div className="mt-16">
        {posts.length > 0 ? (
          posts.map((post) => <PostEntry key={post.slug} post={post} />)
        ) : (
          <p className="text-muted border border-dashed border-line p-8 text-center">
            Guide articles are in progress. Check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
