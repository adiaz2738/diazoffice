# Context: Anthony Diaz Realty Site

Read this before making non-trivial changes. Keep it updated as decisions change —
it's the source of truth for a Claude Code session that doesn't have this chat history.

## What this is

A content-first website for Anthony Diaz's real estate business in Monterey County.
The draw is local history content (blog + eventually YouTube), with real estate
woven in — not the other way around. Real estate lead gen matters, but it rides on
the back of "this guy actually knows the county," not banner ads.

## Goals, in order

1. Ship a real, working v1: home, blog, buyer's guide, neighborhoods map, videos,
   about, contact. All wired up, nothing fake.
2. Make publishing a blog post as low-friction as possible (write MDX file, commit,
   done) so this survives contact with a busy, easily-distracted schedule.
3. SEO: rank for both real-estate-intent searches ("Monterey County real estate
   agent") and town-history-intent searches ("history of Moss Landing"). The
   history content is the SEO wedge — there's less competition there than in real
   estate SEO generally.
4. Eventually: real MLS/IDX listings, more video content, possibly a Supabase-backed
   CMS if the MDX workflow becomes a bottleneck.

## Who this is for

- Homebuyers/sellers in Monterey, Santa Cruz, and San Benito counties.
- Locals and history-curious people searching town-specific questions who may
  become future clients or referrals even if they never buy/sell right away.

## Non-goals (v1)

- No real IDX/MLS integration yet (placeholder page only — needs MLS licensing).
- No comments on blog posts.
- No user accounts / login.
- No admin dashboard — publishing is git-based.
- No second typeface, no dark mode toggle, no animation-heavy interactions.

## Stack

- **Framework:** Next.js 16 (App Router, TypeScript, Turbopack). Note: `params`
  and `searchParams` in pages are async (`Promise<...>`) — this is a Next 15/16
  behavior, don't write them as sync props.
- **Styling:** Tailwind CSS v4 (CSS-based config via `@theme inline` in
  `src/app/globals.css` — there is no `tailwind.config.js`).
- **Content:** MDX files in `src/content/posts/`, parsed with `gray-matter`,
  rendered with `next-mdx-remote/rsc`.
- **Backend:** Supabase — currently only used for two tables: `contact_submissions`
  and `newsletter_subscribers`. Schema lives in `supabase/schema.sql`.
- **Map:** `react-leaflet` + `leaflet`, free CartoDB light basemap tiles (no API
  key required, no billing risk).
- **Deployment:** Vercel.
- **Icons:** `lucide-react`.

## Content model

Blog posts are MDX files at `src/content/posts/<slug>.mdx`. Frontmatter shape is
defined in `src/types/post.ts`:

```
title, excerpt, date (ISO), category (history | real-estate | buyers-guide),
coverImage?, seoDescription?, status (draft | published), sources? (string[])
```

- `status: "draft"` posts are visible when running `npm run dev` locally, but are
  excluded from the production build, blog listings, and the sitemap. Flip to
  `"published"` when it's ready to go live.
- Use `src/content/posts/_TEMPLATE.mdx` as the starting point for a new post
  (filenames starting with `_` are ignored by the post loader).
- The three sample posts shipped in v1 (Stokes Adobe, Moss Landing, Ohlone in the
  Salinas Valley) are **structural templates only** — every historical claim in
  them is a bracketed placeholder. They exist to show the format and to hold a
  content slot, not as ready copy. Do not publish them as-is.
- `category` also powers the Buyer's Guide hub page, which pulls in every post
  tagged `buyers-guide` — so writing a "how to make an offer in a multi-offer
  market" post as a normal blog post with that category is enough to have it show
  up there too. No separate content system needed.

## Design system

Palette (defined as CSS variables in `src/app/globals.css`, exposed as Tailwind
utilities via `@theme inline`):

| Token | Hex | Usage |
|---|---|---|
| `ink` | `#0a0a0a` | primary text, dark surfaces |
| `paper` | `#fafaf8` | background |
| `paper-dim` | `#f0efea` | section alternation |
| `line` | `#dedcd4` | hairline borders/dividers |
| `muted` | `#6b6b64` | secondary text |
| `kw-red` | `#ce011f` | accent only — links, tags, focus ring, CTAs. Used
sparingly, never as a large fill. |

Typography: **Inter only**, throughout, varying weight (400–800) and tracking for
hierarchy. No second typeface. Uppercase, letter-spaced "eyebrow" labels
(`.label-tag` class) are the recurring signature element — used for categories,
dates, and section labels, echoing an archive/ledger feel that fits the history
content.

Signature layout element: blog post listings use a ledger-style row (date column +
category tag + title + excerpt) rather than image-card grids — see
`src/components/post-entry.tsx`. This was a deliberate choice to fit the
archival/historical-society tone rather than a generic blog template.

Motion: minimal. Hover color transitions only. `prefers-reduced-motion` is
respected globally.

## Navigation

Blog, Buyer's Guide, Neighborhoods, Videos, About in the primary nav; Contact is a
standalone bordered CTA button, not a nav link. Same order on mobile (hamburger
menu). Nav config lives in `src/lib/site-config.ts` — add/remove pages there, the
header and footer both read from it.

## Roadmap (rough, not committed)

- Real MLS/IDX integration on the Listings page, once licensing is sorted.
- Fill in real content for the 3 placeholder history posts, then keep writing —
  target cadence is a couple of posts a month, not a couple a week. Don't let this
  become another unfinished project; realistic pace beats ambitious pace.
- Populate `src/lib/videos-data.ts` as new YouTube videos go up; consider
  auto-pulling from the YouTube Data API instead of manual entries if the channel
  becomes active again.
- More neighborhoods/towns in `src/lib/neighborhoods-data.ts` as posts get written
  to back them.
- Possible future: Supabase-backed CMS with an admin UI, if MDX + git ever becomes
  the bottleneck instead of the content itself. The frontmatter schema was kept
  simple on purpose so it maps cleanly onto a future `posts` table if that happens.
- Logo (see `logo-brief.md` — meant for a separate chat, not this codebase).
- Domain: currently pointed at `diazoffice.com` in `src/lib/site-config.ts`
  — update if a different domain gets used.

## Working conventions

- Targeted edits over whole-file rewrites (file corruption risk noted from past
  experience — see `CLAUDE.md`).
- Commit style: `git add . && git commit -m "..." && git push`, conventional
  prefixes (`feat:`, `fix:`, `content:` for new/edited posts).
- Test on live Vercel deploys, not just localhost.
