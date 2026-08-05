# Carol's Portfolio — MVP

Dark, developer-themed portfolio built with **React 18 · TypeScript · Vite 7 ·
Tailwind CSS v3 · React Router v6**. Fully static — no backend, no database.

> **Spec-driven:** this repo's requirements, design decisions, and task history
> live in [`specs/`](specs/). Read `specs/constitution.md` first — new features
> start as `specs/002-*/spec.md`, not as code.

## Quickstart

```bash
npm install        # once
npm run dev        # dev server with hot reload → http://localhost:5173
npm run build      # typecheck + production build → dist/
npm run preview    # serve the production build locally
```

Requires Node ≥ 20.19 (Vite 7).

## Editing your content (the only file you usually touch)

All copy lives in **`src/data/content.ts`** — name, bio, projects, awards,
publications, testimonials, socials. Change values there; every page updates.
The TypeScript compiler will point at any spot you break (that's a feature —
strict types turn "oops the site is blank" into a red squiggle before you ship).

### ⚠️ Pre-publish checklist (Constitution, Article IV)

This site will be reviewed by USCIS officers, lawyers, and investors, so:

- [ ] Replace every `[Placeholder]` string and `TODO` comment in `src/data/content.ts`
- [ ] Delete any award/publication/press/testimonial entry you cannot document
- [ ] Get written permission for each testimonial quote
- [ ] Update real social URLs (GitHub/LinkedIn/Scholar)
- [ ] Update `<title>` / meta description in `index.html` if name or domain changed
- [ ] Contribution heatmap is decorative placeholder data — either keep the
      on-card "placeholder" label or wire it to the real GitHub API (backlog B4)

## Project structure

```
specs/                  ← SDD documents (constitution + numbered feature specs)
public/                 ← copied verbatim into the build (.htaccess, favicon)
src/
  data/content.ts       ← ★ ALL site copy, typed
  components/           ← reusable UI (terminal, heatmap, cards, nav…)
  pages/                ← one file per route, lazy-loaded
  hooks/                ← usePageTitle
  index.css             ← Tailwind + custom utility classes
tailwind.config.js      ← design tokens (colors, fonts, shadows)
```

## Adding a page (the SDD way)

1. Describe it in a new spec: `specs/002-my-feature/spec.md` (copy the 001 format)
2. Add its content + types to `src/data/content.ts`
3. Create `src/pages/MyPage.tsx`
4. Register a lazy route in `src/App.tsx` and a link in `nav` (content.ts)

## Deploying — GitHub Pages (free, automatic; spec 002)

One-time setup: create a **public** repo named `<username>.github.io`, push this
project to `main` (steps in `specs/002-github-pages/tasks.md`), then set repo
**Settings → Pages → Source: GitHub Actions**. After that, every `git push`
rebuilds and publishes the site automatically — watch the Actions tab.

Deep links work via `dist/404.html` (a copy of `index.html` created by the build;
GitHub Pages serves it for unknown paths and React Router takes over).

## Deploying — IONOS (paid fallback)

1. `npm run build`
2. Upload the **contents** of `dist/` into `public_html` (keep `.htaccess` —
   it's what lets `/awards` refresh without a 404; see `specs/001-mvp/plan.md §7`)
3. Visit your domain and hard-refresh (Ctrl+Shift+R)

## Version-control checkpoints (recommended)

```bash
git init
git add -A
git commit -m "001-mvp: initial spec-driven build"
```

Commit after each completed spec/task so you can roll back to any checkpoint
(`git log`, `git checkout <hash>`). Specs tell you *why* each checkpoint exists.
