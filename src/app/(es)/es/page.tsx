import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { guides } from "@/lib/guides";
import { buildSpanishPageMetadata } from "@/lib/es-pages";
import { strings } from "@/lib/i18n";
import { PostEntry } from "@/components/post-entry";
import { SectionHeading } from "@/components/section-heading";

const s = strings.es;

export const metadata = buildSpanishPageMetadata({
  enPath: "",
  esPath: "/es",
  description: s.siteDescription,
});

export default function SpanishHome() {
  const posts = getAllPosts("es").slice(0, 4);

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <p className="label-tag label-tag--accent mb-5">{s.home.eyebrow}</p>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] max-w-3xl">
            {s.home.heading}
          </h1>
          <p className="mt-6 text-lg text-muted max-w-xl leading-relaxed">{s.home.intro}</p>
        </div>
      </section>

      <section className="border-b border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
          <SectionHeading eyebrow={s.home.guidesEyebrow} title={s.home.guidesTitle} />
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {guides.map((g) => {
              const t = s.guides[g.category as "buyers-guide" | "sellers-guide"];
              return (
                <Link
                  key={g.category}
                  href={g.esBasePath}
                  className="group block border border-line bg-paper p-8 hover:border-ink transition-colors"
                >
                  <p className="label-tag label-tag--accent mb-3">{t.title}</p>
                  <h3 className="text-2xl font-semibold tracking-tight mb-3">{t.heading}</h3>
                  <p className="text-muted leading-relaxed mb-6">{t.intro}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:text-kw-red">
                    {s.home.openGuide} <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
        <div className="mb-8">
          <SectionHeading eyebrow={s.home.recentEyebrow} title={s.home.recentTitle} />
        </div>
        {posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <PostEntry key={post.slug} post={post} lang="es" />
            ))}
          </div>
        ) : (
          <p className="text-muted border border-dashed border-line p-8 text-center">
            {s.home.recentEmpty}
          </p>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-16 sm:pb-20">
        <div className="border border-line p-8 sm:p-12 flex flex-col sm:flex-row sm:items-center gap-8 justify-between">
          <div>
            <p className="label-tag label-tag--accent mb-3">{s.home.ctaEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight max-w-lg">
              {s.home.ctaTitle}
            </h2>
          </div>
          <Link
            href={s.contactHref}
            className="inline-flex items-center gap-2 border border-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-paper transition-colors shrink-0"
          >
            {s.home.ctaButton} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
