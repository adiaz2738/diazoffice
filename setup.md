# Setup Guide

Step-by-step to get this from a folder on your machine to a live site. Written
assuming you're comfortable in Cursor's terminal (Git Bash) — commands are the
same ones you've used on your other projects.

## 0. Prerequisites

- Node.js 20.9+ installed (`node -v` to check — Next.js 16 requires this minimum).
- A GitHub account.
- A Vercel account (sign in with GitHub — easiest).
- A Supabase account.

## 1. Get the code onto your machine

Unzip the project folder, then open it in Cursor. In the integrated terminal:

```bash
cd diazoffice
npm install
```

## 2. Local environment variables

Copy the example env file:

```bash
cp .env.example .env.local
```

Leave `.env.local` empty for now — you'll fill in Supabase values in step 4. The
site runs fine without them; only the contact form and newsletter signup need
Supabase to actually work.

Confirm it runs locally:

```bash
npm run dev
```

Open `http://localhost:3000`. You should see the homepage. Stop it with `Ctrl+C`
when you're done poking around.

## 3. Git + GitHub

Initialize git and make the first commit:

```bash
git init
git add .
git commit -m "feat: initial site scaffold"
```

Create a new **empty** repo on GitHub (no README/gitignore — you already have
those). Then connect and push:

```bash
git branch -M main
git remote add origin https://github.com/<your-username>/diazoffice.git
git push -u origin main
```

From here on, your commit pattern is the usual:

```bash
git add . && git commit -m "feat: short description" && git push
```

## 4. Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project**.
2. Name it something like `diazoffice`, pick a strong database password
   (save it somewhere — a password manager, not a text file), pick a region close
   to your users (US West is closest to Monterey).
3. Wait for the project to finish provisioning (~2 minutes).
4. Go to **SQL Editor** → **New query**. Paste in the entire contents of
   `supabase/schema.sql` from this repo, and click **Run**. This creates the
   `contact_submissions` and `newsletter_subscribers` tables with the right
   permissions (public can insert, nobody but you can read).
5. Go to **Project Settings → API**. You'll need two values:
   - **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key (under Project API keys) → this is
     `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Paste both into your local `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Restart `npm run dev` and test the contact form and newsletter signup at
`localhost:3000/contact`. Check **Table Editor** in Supabase to confirm the row
showed up.

## 5. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo you
   just pushed.
2. Framework preset should auto-detect as Next.js. Leave build settings default.
3. Before clicking Deploy, expand **Environment Variables** and add the same two
   Supabase variables from step 4 (`NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Click **Deploy**. First build takes a couple minutes.
5. Once it's live, test the contact form on the actual deployed URL
   (`your-project.vercel.app`) — confirm a submission shows up in Supabase.

From now on, every `git push` to `main` auto-deploys. Push to a different branch
and open a PR if you want a preview URL to check something before it goes live.

## 6. Custom domain

If `diazoffice.com` isn't already pointed somewhere else:

1. In Vercel: **Project → Settings → Domains** → add `diazoffice.com` (and
   `www.diazoffice.com` if you want both).
2. Vercel will show you DNS records to add. Go to wherever the domain is
   registered (registrar's DNS settings) and add those records — usually an `A`
   record for the apex domain and a `CNAME` for `www`.
3. DNS propagation can take anywhere from a few minutes to a few hours. Vercel's
   dashboard will show the domain as "Valid Configuration" once it's live.
4. Update `siteConfig.url` in `src/lib/site-config.ts` if the domain differs from
   what's currently set — this feeds into SEO metadata and the sitemap.

## 7. Post-launch checklist

- [ ] Submit the sitemap (`yourdomain.com/sitemap.xml`) to Google Search Console.
- [ ] Replace the 3 placeholder history posts with real, fact-checked content (or
      unpublish them by setting `status: "draft"` until they're ready).
- [ ] Write your real bio on the About page (currently a placeholder).
- [ ] Add real coordinates/blurbs for any neighborhoods you want to add beyond the
      starter 5 in `src/lib/neighborhoods-data.ts`.
- [ ] Swap in real YouTube video IDs in `src/lib/videos-data.ts`.
- [ ] Set up a favicon (currently missing — drop a `favicon.ico` into
      `src/app/`).
- [ ] Fill in `siteConfig.social.instagram` / `.facebook` in
      `src/lib/site-config.ts` if you want those linked anywhere later.

## Troubleshooting

- **Build fails on Vercel with a Supabase error:** double-check the two env vars
  are set in Vercel's project settings, not just locally.
- **Map doesn't show on Neighborhoods page:** this is a client-only component by
  design (Leaflet needs the browser `window` object) — if it's blank, check the
  browser console, not the server logs.
- **New blog post isn't showing up:** confirm `status: "published"` in the
  frontmatter, and that the filename doesn't start with `_`.
