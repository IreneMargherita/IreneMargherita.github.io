# Tasks 001 — MVP Build Checklist

Derived from `plan.md`. A task is only `[x]` when its acceptance criterion passes.

## Phase A — Foundation
- [x] T001 Scaffold Vite + React 18 + TS strict (manual, pinned versions)
- [x] T002 Tailwind v3 + PostCSS wired; design tokens in `tailwind.config.js`
- [x] T003 `index.html`: IBM Plex fonts (preconnect + swap), SEO/OG meta, favicon
- [x] T004 `public/.htaccess` SPA rewrite for IONOS
- [x] T005 Global styles: grid background, glow, terminal, tag, btn utilities

## Phase B — Content Layer
- [x] T006 Define all TypeScript interfaces for content
- [x] T007 Author placeholder content for every page (`[Placeholder]`-marked claims)

## Phase C — Shell & Components
- [x] T008 Layout, Navbar (mobile menu), Footer, ScrollToTop, PageLoader
- [x] T009 SectionHeading, TerminalWindow, Typewriter (reduced-motion safe)
- [x] T010 ContributionGraph (seeded PRNG, sunshine ramp, legend)
- [x] T011 ProjectCard + LanguageBar, StatCard, Tag, StatusBadge
- [x] T012 Timeline, TestimonialCard

## Phase D — Pages (each lazy-loaded)
- [x] T013 Home (hero, stats, heatmap, featured projects, evidence band)
- [x] T014 About · T015 Projects · T016 Experience · T017 Research
- [x] T018 Awards · T019 Testimonials · T020 Contact · T021 NotFound (404)

## Phase E — Verification
- [x] T022 `tsc` strict passes; `npm run build` succeeds
- [x] T023 Screenshot pass (desktop 1440 + mobile 390) on key routes; no console errors

## Phase F — Handoff
- [x] T024 README: quickstart, content-editing guide, SDD workflow, deploy steps,
      pre-publish truthfulness checklist
- [x] T025 Deliver source to Carol's local folder + zip in chat + spec in Claude Project

## Backlog (candidates for spec 002+)
- [ ] B1 Real resume/CV PDF + download link
- [ ] B2 Contact form via third-party (Formspree/Web3Forms) — needs spec (Art. I)
- [ ] B3 OG share image + per-page meta via a head manager
- [ ] B4 Live GitHub contribution data via public API
- [ ] B5 Blog / writing section (O-1A: published material *by* Carol)
- [ ] B6 robots.txt + sitemap.xml + canonical URLs when domain is chosen
- [ ] B7 Deploy to IONOS + domain + HTTPS check
