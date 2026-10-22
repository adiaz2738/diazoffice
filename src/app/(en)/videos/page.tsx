import type { Metadata } from "next";
import { videos } from "@/lib/videos-data";
import { YoutubeEmbed } from "@/components/youtube-embed";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Videos",
  description: "History and real estate videos from Monterey County.",
};

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="label-tag label-tag--accent mb-3">Watch</p>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight max-w-2xl">Videos</h1>
      <p className="mt-5 text-lg text-muted max-w-2xl leading-relaxed">
        History deep-dives and real estate walkthroughs, on{" "}
        <a
          href={siteConfig.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-kw-red hover:text-kw-red"
        >
          YouTube
        </a>
        .
      </p>

      {videos.length > 0 ? (
        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {videos.map((v) => (
            <div key={v.youtubeId}>
              <YoutubeEmbed youtubeId={v.youtubeId} title={v.title} />
              <p className="mt-3 font-medium">{v.title}</p>
              <p className="text-sm text-muted">{v.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-14 text-muted border border-dashed border-line p-8 text-center">
          Videos coming soon.
        </p>
      )}
    </div>
  );
}
