# Derbin Davidraj Portfolio (v3)

Personal portfolio for Derbin Davidraj — Brand & Marketing Designer (brand systems, decks, reports, mascots, campaigns).
Deployed on Vercel (project `derbinportfolio`, domain www.derbin.space). The v1 Vite app is archived in `_legacy-vite/` for reference only.

## Stack
- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 — tokens are CSS variables in `src/app/globals.css` (`.dark` flips a panel); rules in `DESIGN.md`
- Motion (`motion/react`) for reveals, gallery and cursor; always respect reduced motion
- Supabase for projects (`projects` table) and contact messages (`contacts` table), read server-side only

## Layout
- `src/app/` — routes: `/`, `/work`, `/work/[slug]`, `/about`, `/contact` (+ server action), sitemap, robots, OG image
- `src/components/` — UI pieces (header, footer, cards, gallery, services flow, timeline, cursor)
- `src/content/site.ts` — copy: bio, services, process, experience timeline, tools
- `src/content/projects.ts` — curated case studies (images in `public/work/<folder>/`)
- `src/lib/projects.ts` — merges curated local case studies with Supabase rows by slug (local fields win; Supabase-only projects are added)
- `supabase/migrations/` — run new files in the Supabase SQL editor

## Adding a project
Either add an entry to `src/content/projects.ts` with images in `public/work/<folder>/`, or insert a row in Supabase
(`thumbnail_url` is required for it to show; see `002_portfolio_v2.sql` for the case-study columns).

## Env
`SUPABASE_URL` / `SUPABASE_ANON_KEY` (the old `VITE_SUPABASE_*` names are also accepted).

## Commands
- `npm run dev` · `npm run build` · `npm run typecheck`
