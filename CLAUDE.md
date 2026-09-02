@AGENTS.md

See `context.md` in the repo root for full project context: goals, stack, content strategy, design system, and roadmap. Read it before making non-trivial changes.

Quick rules for this repo:
- Do not do whole-file rewrites of existing components/pages. Anthony has been burned by this before (file corruption from full-file replacements). Use targeted edits.
- Tailwind v4 (CSS-based config, no tailwind.config.js). Custom colors are defined in `src/app/globals.css` via `@theme inline` — bg-ink, bg-paper, bg-paper-dim, text-muted, border-line, text-kw-red / bg-kw-red are the palette. Don't introduce new colors outside this palette without asking.
- Font is Inter only, throughout. Do not add a second typeface.
- Blog posts are MDX files in `src/content/posts/`. Frontmatter shape is defined in `src/types/post.ts`.
- `params` and `searchParams` are async (Promise-based) — this is Next.js 16.
