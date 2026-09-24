# Launch Pipeline

Work top to bottom. Don't read past the current section until everything above
it is checked off. That's the point of the buckets, not a suggestion.

## Right now: the one thing blocking launch

- [ ] Write and fact-check the Carmel-by-the-Sea addresses post (verify against
      the Pine Cone and any other sources, no placeholder brackets left)
- [ ] Set its frontmatter `status` to "published"
- [ ] Add its slug to the `carmel-by-the-sea` entry's `relatedPostSlugs` in
      src/lib/neighborhoods-data.ts

Nothing else matters until this is done. Skip everything below.

## Before flipping the site live

- [ ] Pick Neon or Supabase, wire up contact_submissions + newsletter_subscribers,
      confirm both forms actually save a row (test locally first)
- [ ] Push to GitHub if not already, connect repo to Vercel, add env vars, deploy
- [ ] Point diazoffice.com at the Vercel deployment
- [ ] Add a real favicon (currently missing)
- [ ] Decide what to do with the logo: implement it in the header/favicon/OG
      image, or explicitly decide to launch v1 with the plain text wordmark as-is

## Content debt (post-launch, no rush)

- [ ] Real About page bio (currently a bracketed placeholder)
- [ ] Fill in the 3 remaining FAQ [TODO] answers
- [ ] Decide FAQ's spot in primary nav vs staying footer-only
- [ ] Real content for the 3 template posts (Stokes Adobe, Moss Landing, Ohlone)
      — fine to leave status: draft indefinitely
- [ ] Replace REPLACE_WITH_VIDEO_ID in videos-data.ts once you have the real ID

## Someday, not blocking anything

- [ ] Finalize hero photo treatment (wash opacity, grayscale or not)
- [ ] Fill in Instagram/Facebook links in site-config.ts
- [ ] Submit sitemap to Google Search Console (do this after launch, not before)
- [ ] Real MLS/IDX listings integration (needs licensing first)
- [ ] Set up a git-based CMS admin panel (Decap CMS or TinaCMS) so blog posts
      can be published from a browser instead of only through git. Depends on
      the database being connected first (see "Before flipping the site live").
      Preference is Supabase over Neon for this, since Supabase's built-in
      auth means no separate Clerk setup is needed to gate the admin panel;
      Neon would require adding Clerk (or similar) separately for the same
      protection.
- [ ] Bilingual site, scoped version: path-based routing (diazoffice.com/es/...
      via a Next.js [locale] segment), NOT a subdomain, to keep SEO authority
      unified under one domain. Fully translate only the conversion-critical
      pages: Home, About, Contact, Buyer's Guide. Add prominent "Hablo
      español" / bilingual-agent messaging site-wide regardless of full
      translation status, since that's a strong differentiator on its own.
      Translate blog posts selectively as bandwidth allows, not as a blanket
      requirement, a language toggle should only appear on posts that
      actually have a translation, not link to English-only content. Browser-
      side translate (Chrome's built-in feature) covers the gap for anything
      not manually translated, no action needed there, it already works.

---
Keep this file updated as items get done: check them off, and if something new
comes up, put it in the right bucket rather than at the top. Keep "Right now"
to exactly one item at a time — when the Carmel post ships, promote the next
single most important thing into that slot instead of stacking several there.
