import {
  sellerPhases,
  sellerTimeline,
  buyerContingencyOutcomes,
  type SellerPhase,
} from "@/lib/seller-timeline-data";
import type { Lang } from "@/lib/buyer-timeline-data";
import {
  VerticalStepTimeline,
  type TimelineGroupData,
} from "@/components/vertical-step-timeline";

const ui = {
  eyebrow: { en: "Timeline", es: "Cronología" },
  title: { en: "The 11 steps", es: "Los 11 pasos" },
} as const;

function buildGroups(lang: Lang): TimelineGroupData[] {
  const groups: TimelineGroupData[] = [];
  for (const step of sellerTimeline) {
    const key: SellerPhase = step.phase;
    const label = sellerPhases[step.phase][lang];
    const normalized = {
      id: `seller-${step.id}`,
      number: step.number,
      title: step.title[lang],
      summary: step.summary[lang],
      bullets: step.bullets[lang],
      chapterLink: step.chapterLink
        ? { href: step.chapterLink.href, label: step.chapterLink.label[lang] }
        : undefined,
      expanded: step.number === 9 ? <ContingencyOutcomesDetail lang={lang} /> : undefined,
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

export function SellerTimeline({ lang = "en" }: { lang?: Lang }) {
  const groups = buildGroups(lang);
  return <VerticalStepTimeline eyebrow={ui.eyebrow[lang]} title={ui.title[lang]} groups={groups} />;
}

function ContingencyOutcomesDetail({ lang }: { lang: Lang }) {
  return (
    <div className="mt-5 space-y-6 border-t border-line pt-5">
      {buyerContingencyOutcomes.map((outcome, i) => (
        <div key={i}>
          <p className="label-tag mb-3">{outcome.title[lang]}</p>
          <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted">
            {outcome.points[lang].map((point, j) => (
              <li key={j}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
