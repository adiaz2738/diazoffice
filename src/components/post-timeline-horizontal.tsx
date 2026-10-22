"use client";

import { useState } from "react";
import type { TimelineEntry } from "@/types/post";
import { SectionHeading } from "@/components/section-heading";
import { PostTimeline } from "@/components/post-timeline";
import { cn } from "@/lib/cn";
import { strings, type Lang } from "@/lib/i18n";

export function PostTimelineHorizontal({
  entries,
  lang = "en",
}: {
  entries: TimelineEntry[];
  lang?: Lang;
}) {
  const t = strings[lang].timeline;
  const [selected, setSelected] = useState(0);
  const active = entries[selected];

  return (
    <div className="mt-12">
      <div className="hidden md:block">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />

        <div className="mt-8 overflow-x-auto scroll-smooth snap-x snap-mandatory">
          <div className="flex min-w-max">
            {entries.map((entry, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(i)}
                className={cn(
                  "w-[150px] shrink-0 snap-start border-t-[3px] px-3 py-4 text-left",
                  i !== entries.length - 1 && "border-r border-r-line",
                  i === selected
                    ? "border-t-kw-red"
                    : "border-t-line hover:border-t-ink"
                )}
              >
                <span
                  className={cn(
                    "block text-2xl font-semibold tracking-tight",
                    i === selected ? "text-ink" : "text-muted"
                  )}
                >
                  {entry.date}
                </span>
                <span className="mt-1 block text-xs text-muted line-clamp-2">
                  {entry.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 border border-line p-6">
          <p className="font-semibold tracking-tight">{active.label}</p>
          <p className="mt-2 text-muted leading-relaxed">{active.description}</p>
          {active.confirmed && active.sourceUrl ? (
            <a
              href={active.sourceUrl}
              className="mt-2 inline-block text-xs text-kw-red underline underline-offset-2"
            >
              {t.source} {active.sourceLabel}
            </a>
          ) : !active.confirmed ? (
            <p className="mt-2 text-xs text-muted italic">{t.unconfirmed}</p>
          ) : null}
        </div>
      </div>

      <div className="md:hidden">
        <PostTimeline entries={entries} lang={lang} />
      </div>
    </div>
  );
}
