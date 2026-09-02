"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export function YoutubeEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (youtubeId.startsWith("REPLACE_")) {
    return (
      <div className="aspect-video w-full bg-paper-dim border border-line flex items-center justify-center">
        <p className="label-tag text-center px-4">Video ID needed — update videos-data.ts</p>
      </div>
    );
  }

  if (playing) {
    return (
      <div className="aspect-video w-full">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="relative aspect-video w-full bg-ink group overflow-hidden"
      aria-label={`Play ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- simple remote thumbnail, not worth a next/image remote pattern config */}
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper text-ink group-hover:bg-kw-red group-hover:text-paper transition-colors">
          <Play size={22} fill="currentColor" />
        </span>
      </span>
    </button>
  );
}
