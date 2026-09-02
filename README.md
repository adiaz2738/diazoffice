# Anthony Diaz Realty

Monterey County real estate + local history blog. Next.js 16, Tailwind v4, MDX blog posts, Supabase (contact form + newsletter), deployed on Vercel.

- **Start here:** `context.md` — full project context, goals, stack, design system, roadmap.
- **Getting set up:** `setup.md` — git, GitHub, Supabase, Vercel, env vars, custom domain, step by step.
- **Logo:** `logo-brief.md` — paste into a fresh chat, kept separate on purpose.
- **Agent instructions:** `CLAUDE.md` — quick rules for Claude Code sessions in this repo.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in Supabase values, see setup.md
npm run dev
```

## Writing a new blog post

Copy `src/content/posts/_TEMPLATE.mdx` to `src/content/posts/your-slug.mdx`, fill in the frontmatter and body, set `status: "published"` when ready, commit and push.
