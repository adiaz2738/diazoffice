"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/cn";
import {
  buyerTimelineSteps,
  phases,
  contingencies,
  renegotiationOutcomes,
  deadlineOutcomes,
  type Lang,
  type BuyerTimelineStep,
} from "@/lib/buyer-timeline-data";

const ui = {
  eyebrow: { en: "Timeline", es: "Cronología" },
  title: { en: "The 11 steps", es: "Los 11 pasos" },
  contingenciesHeading: { en: "The 4 main contingencies", es: "Las 4 contingencias principales" },
  daysDefault: { en: "days by default", es: "días por defecto" },
  comparisonHeading: {
    en: "What changes when you remove one",
    es: "Qué cambia cuando eliminas una",
  },
  appraisalHeading: {
    en: "If the appraisal comes in low",
    es: "Si el avalúo resulta bajo",
  },
} as const;

type Group = { phaseIndex: number; steps: BuyerTimelineStep[] };

function groupByPhase(steps: BuyerTimelineStep[]): Group[] {
  const groups: Group[] = [];
  for (const step of steps) {
    const last = groups[groups.length - 1];
    if (last && last.phaseIndex === step.phase) {
      last.steps.push(step);
    } else {
      groups.push({ phaseIndex: step.phase, steps: [step] });
    }
  }
  return groups;
}

export function TimelineBuyer({ lang = "en" }: { lang?: Lang }) {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const groups = groupByPhase(buyerTimelineSteps);

  function toggle(step: number) {
    setOpen((prev) => ({ ...prev, [step]: !prev[step] }));
  }

  return (
    <div className="mt-12">
      <SectionHeading eyebrow={ui.eyebrow[lang]} title={ui.title[lang]} />

      <div className="relative mt-8">
        <div className="absolute left-5 top-2 bottom-2 w-px bg-line" aria-hidden />

        {groups.map((group) => (
          <div key={group.phaseIndex}>
            <div className="relative py-3 pl-14">
              <span
                aria-hidden
                className="absolute left-5 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kw-red"
              />
              <p className="label-tag label-tag--accent">{phases[group.phaseIndex][lang]}</p>
            </div>

            {group.steps.map((step) => (
              <StepRow
                key={step.step}
                step={step}
                lang={lang}
                isOpen={!!open[step.step]}
                onToggle={() => toggle(step.step)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepRow({
  step,
  lang,
  isOpen,
  onToggle,
}: {
  step: BuyerTimelineStep;
  lang: Lang;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const summary = step.bullets[lang][0];
  const panelId = `buyer-timeline-step-${step.step}`;

  return (
    <div className="relative">
      <span
        aria-hidden
        className={cn(
          "absolute left-5 top-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border bg-paper text-sm font-semibold",
          isOpen ? "border-kw-red text-kw-red" : "border-line text-ink"
        )}
      >
        {step.step}
      </span>

      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 border-b border-line py-4 pl-14 pr-1 text-left"
      >
        <span>
          <span className="block font-semibold tracking-tight">{step.title[lang]}</span>
          <span className="mt-1 block text-sm text-muted">{summary}</span>
        </span>
        <span aria-hidden className="shrink-0 text-lg text-muted">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div id={panelId} hidden={!isOpen} className="pb-6 pl-14 pr-1 pt-1">
        <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted">
          {step.bullets[lang].map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
        {step.chapterLink && (
          <Link
            href={step.chapterLink.href}
            className="mt-3 inline-block text-xs text-kw-red underline underline-offset-2"
          >
            {step.chapterLink.label[lang]}
          </Link>
        )}
        {step.step === 10 && <Step10Detail lang={lang} />}
      </div>
    </div>
  );
}

function Step10Detail({ lang }: { lang: Lang }) {
  return (
    <div className="mt-5 space-y-6 border-t border-line pt-5">
      <div>
        <p className="label-tag mb-3">{ui.contingenciesHeading[lang]}</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {contingencies.map((c) => (
            <div key={c.id} className="border border-line p-4">
              <p className="text-sm font-medium">{c.title[lang]}</p>
              <p className="mt-1 text-xs text-muted">
                {c.defaultDays} {ui.daysDefault[lang]}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.description[lang]}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="label-tag mb-3">{ui.comparisonHeading[lang]}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {renegotiationOutcomes.map((o) => (
            <div key={o.id}>
              <p className="text-sm font-medium">{o.label[lang]}</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted">
                {o.points[lang].map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="label-tag mb-3">{ui.appraisalHeading[lang]}</p>
        <ul className="space-y-2 text-sm leading-relaxed">
          {deadlineOutcomes.map((o) => (
            <li key={o.id}>
              <span className="font-medium">{o.label[lang]}</span>{" "}
              <span className="text-muted">— {o.description[lang]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
