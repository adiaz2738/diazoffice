import {
  buyerTimelineSteps,
  phases,
  contingencies,
  renegotiationOutcomes,
  deadlineOutcomes,
  type Lang,
} from "@/lib/buyer-timeline-data";
import {
  VerticalStepTimeline,
  type TimelineGroupData,
} from "@/components/vertical-step-timeline";

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

function buildGroups(lang: Lang): TimelineGroupData[] {
  const groups: TimelineGroupData[] = [];
  for (const step of buyerTimelineSteps) {
    const key = String(step.phase);
    const label = phases[step.phase][lang];
    const normalized = {
      id: `buyer-${step.step}`,
      number: step.step,
      title: step.title[lang],
      summary: step.bullets[lang][0],
      bullets: step.bullets[lang],
      chapterLink: step.chapterLink
        ? { href: step.chapterLink.href, label: step.chapterLink.label[lang] }
        : undefined,
      expanded: step.step === 10 ? <Step10Detail lang={lang} /> : undefined,
    };
    const last = groups[groups.length - 1];
    if (last && last.key === key) {
      last.steps.push(normalized);
    } else {
      groups.push({ key, label, steps: [normalized] });
    }
  }
  return groups;
}

export function TimelineBuyer({ lang = "en" }: { lang?: Lang }) {
  const groups = buildGroups(lang);
  return <VerticalStepTimeline eyebrow={ui.eyebrow[lang]} title={ui.title[lang]} groups={groups} />;
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
