"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/cn";

export type TimelineStepData = {
  id: string;
  number: number;
  title: string;
  summary: string;
  bullets: string[];
  chapterLink?: { href: string; label: string };
  expanded?: ReactNode;
};

export type TimelineGroupData = {
  key: string;
  label: string;
  steps: TimelineStepData[];
};

export function VerticalStepTimeline({
  eyebrow,
  title,
  groups,
}: {
  eyebrow: string;
  title: string;
  groups: TimelineGroupData[];
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  function toggle(id: string) {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="mt-12">
      <SectionHeading eyebrow={eyebrow} title={title} />

      <div className="relative mt-8">
        <div className="absolute left-5 top-2 bottom-2 w-px bg-line" aria-hidden />

        {groups.map((group) => (
          <div key={group.key}>
            <div className="relative py-3 pl-14">
              <span
                aria-hidden
                className="absolute left-5 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kw-red"
              />
              <p className="label-tag label-tag--accent">{group.label}</p>
            </div>

            {group.steps.map((step) => (
              <TimelineStepRow
                key={step.id}
                step={step}
                isOpen={!!open[step.id]}
                onToggle={() => toggle(step.id)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineStepRow({
  step,
  isOpen,
  onToggle,
}: {
  step: TimelineStepData;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `timeline-step-${step.id}`;

  return (
    <div className="relative">
      <span
        aria-hidden
        className={cn(
          "absolute left-5 top-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border bg-paper text-sm font-semibold",
          isOpen ? "border-kw-red text-kw-red" : "border-line text-ink"
        )}
      >
        {step.number}
      </span>

      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 border-b border-line py-4 pl-14 pr-1 text-left"
      >
        <span>
          <span className="block font-semibold tracking-tight">{step.title}</span>
          <span className="mt-1 block text-sm text-muted">{step.summary}</span>
        </span>
        <span aria-hidden className="shrink-0 text-lg text-muted">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div id={panelId} hidden={!isOpen} className="pb-6 pl-14 pr-1 pt-1">
        <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted">
          {step.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
        {step.chapterLink && (
          <Link
            href={step.chapterLink.href}
            className="mt-3 inline-block text-xs text-kw-red underline underline-offset-2"
          >
            {step.chapterLink.label}
          </Link>
        )}
        {step.expanded}
      </div>
    </div>
  );
}
