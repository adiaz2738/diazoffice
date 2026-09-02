import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { PostEntry } from "@/components/post-entry";
import { SectionHeading } from "@/components/section-heading";

export default function Home() {
  const posts = getAllPosts().slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <p className="label-tag label-tag--accent mb-5">Monterey County, California</p>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] max-w-3xl">
            The history behind the Monterey Peninsula.
          </h1>
          <p className="mt-6 text-lg text-muted max-w-xl leading-relaxed">
            Real estate in Monterey County from a local who loves the history.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-paper transition-colors"
            >
              Read the archive <ArrowRight size={16} />
            </Link>
            <Link
              href="/buyers-guide"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-muted hover:text-ink transition-colors"
            >
              Buying a home here? Start here
            </Link>
          </div>
        </div>
      </section>

      {/* Recent posts */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-6 mb-8">
          <SectionHeading eyebrow="Recently written" title="From the archive" />
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-kw-red shrink-0"
          >
            View all posts <ArrowRight size={14} />
          </Link>
        </div>

        {posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <PostEntry key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted border border-dashed border-line p-8 text-center">
            No posts published yet. The first ones are in progress.
          </p>
        )}
      </section>

      {/* Teasers: Buyer's Guide + Neighborhoods */}
      <section className="border-t border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20 grid gap-10 md:grid-cols-2">
          <TeaserCard
            eyebrow="Tutorials"
            title="Buying a home in Monterey County"
            description="Straight answers on offers, contingencies, and everything else that comes up between an open house and closing day."
            href="/buyers-guide"
            cta="Open the guide"
          />
          <TeaserCard
            eyebrow="Explore"
            title="A map of the county's stories"
            description="Every town has a reason it looks the way it does. Click around the map to find the history behind each one."
            href="/neighborhoods"
            cta="See the map"
          />
        </div>
      </section>

      {/* About / CTA strip */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
        <div className="border border-line p-8 sm:p-12 flex flex-col sm:flex-row sm:items-center gap-8 justify-between">
          <div>
            <p className="label-tag label-tag--accent mb-3">Working with me</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight max-w-lg">
              A local agent who actually knows why this county looks the way it does.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-paper transition-colors shrink-0"
          >
            Get in touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

function TeaserCard({
  eyebrow,
  title,
  description,
  href,
  cta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <Link href={href} className="group block border border-line bg-paper p-8 hover:border-ink transition-colors">
      <p className="label-tag label-tag--accent mb-3">{eyebrow}</p>
      <h3 className="text-2xl font-semibold tracking-tight mb-3">{title}</h3>
      <p className="text-muted leading-relaxed mb-6">{description}</p>
      <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:text-kw-red">
        {cta} <ArrowRight size={14} />
      </span>
    </Link>
  );
}
