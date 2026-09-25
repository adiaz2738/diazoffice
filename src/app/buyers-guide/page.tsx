import type { Metadata } from "next";
import { getGuideChapters } from "@/lib/posts";
import { PostEntry } from "@/components/post-entry";
import { videos } from "@/lib/videos-data";
import { YoutubeEmbed } from "@/components/youtube-embed";

export const metadata: Metadata = {
  title: "Buyer's Guide",
  description:
    "Everything you need to know about buying a home in Monterey County, from offers to contingencies to closing day.",
};

export default function BuyersGuidePage() {
  const posts = getGuideChapters("buyers-guide");
  const guideVideos = videos.filter((v) => v.category === "buyers-guide");

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="label-tag label-tag--accent mb-3">Tutorials</p>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight max-w-2xl">
        Buying a home in Monterey County
      </h1>
      <p className="mt-5 text-lg text-muted max-w-2xl leading-relaxed">
        Straight, no-fluff answers to the questions that actually come up, from your first
        offer to the walk-through before closing.
      </p>

      {guideVideos.length > 0 && (
        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {guideVideos.map((v) => (
            <div key={v.youtubeId}>
              <YoutubeEmbed youtubeId={v.youtubeId} title={v.title} />
              <p className="mt-3 font-medium">{v.title}</p>
              <p className="text-sm text-muted">{v.description}</p>
            </div>
          ))}
        </div>
      )}

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
