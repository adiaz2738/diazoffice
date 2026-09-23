import type { TimelineEntry } from "@/types/post";
import { SectionHeading } from "@/components/section-heading";

export function PostTimeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="mt-12">
      <SectionHeading eyebrow="Timeline" title="Key dates" />
      <div className="mt-6">
        {entries.map((entry, i) => (
          <details key={i} className="group border-b border-line py-4">
            <summary className="grid grid-cols-[auto_1fr] sm:grid-cols-[7rem_1fr] gap-4 sm:gap-8 cursor-pointer list-none">
              <span className="label-tag whitespace-nowrap">{entry.date}</span>
              <span className="font-semibold tracking-tight group-hover:text-kw-red transition-colors">
                {entry.label}
              </span>
            </summary>
            <div className="mt-3 sm:pl-[calc(7rem+2rem)]">
              <p className="text-muted leading-relaxed">{entry.description}</p>
              {entry.confirmed && entry.sourceUrl ? (
                <a
                  href={entry.sourceUrl}
                  className="mt-2 inline-block text-xs text-kw-red underline underline-offset-2"
                >
                  Source: {entry.sourceLabel}
                </a>
              ) : !entry.confirmed ? (
                <p className="mt-2 text-xs text-muted italic">Unconfirmed — included for context</p>
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
