# Spec 001 — Portfolio MVP

**Status:** ✅ Implemented · **Owner:** Carol · **Date:** 2026-08-04
**Constitution:** v1.0.0

## 1. Problem & Goal

Carol is a software engineer building proprietary FinTech / algorithmic-trading systems.
She needs a personal website that convinces several very different professional readers
that she is exceptional and credible — in under two minutes of skimming.

**Goal of the MVP:** ship a fast, dark, developer-branded static site whose structure
already mirrors the O-1A evidence categories, filled with clearly-marked placeholder
content Carol can replace without touching code.

## 2. Personas & User Stories

| # | Persona | Story | Success looks like |
|---|---------|-------|--------------------|
| P1 | **USCIS officer / immigration lawyer** | As a reviewer of an O-1A petition, I need to verify claims of extraordinary ability quickly. | Finds Awards, Press, Judging, Publications, and Critical Roles each on a dedicated, skimmable page within 2 clicks. |
| P2 | **Investor** | As an investor doing diligence, I want to gauge technical depth and execution ability. | Sees concrete projects with impact metrics, a clear specialization (FinTech/trading), and a way to reach Carol. |
| P3 | **Researcher / collaborator** | As an academic, I want to see publications, talks, and shared interests. | Finds a Research page with citable entries and links (Scholar/ORCID-style). |
| P4 | **Interviewer / recruiter** | As a hiring or press contact, I want a quick overview and contact path. | Hero communicates who/what/where in 5 seconds; Contact page gives email + socials + what she's open to. |
| P5 | **Carol (owner)** | As the site owner, I want to update all content in one file and roll the site back to any checkpoint. | Edits only `src/data/content.ts`; SDD folders + git give checkpoints. |

## 3. Functional Requirements

- **FR-1 Routing.** Client-side routes: `/`, `/about`, `/projects`, `/experience`,
  `/research`, `/awards`, `/testimonials`, `/contact`, plus a themed 404 catch-all.
  Every route lazy-loads its page component.
- **FR-2 Navigation.** Sticky top nav with active-route highlight, mobile hamburger
  menu, skip-to-content link, footer with socials and stack credit.
- **FR-3 Home.** Terminal-window hero with typewriter role lines, primary CTAs
  (Projects / Contact), status badge ("open to..."), stats row, GitHub-style
  contribution heatmap (sunshine-yellow ramp), 3 featured projects, and a
  "reviewing my credentials?" evidence band linking to O-1A-relevant pages.
- **FR-4 About.** Bio, "currently building" terminal block, education, grouped skills,
  interests.
- **FR-5 Projects.** Repo-card grid (language bar, tags, status, impact bullets) for
  proprietary work presented truthfully (private code, shareable results).
- **FR-6 Experience.** Vertical timeline of roles with impact highlights and tags
  (supports O-1A "critical role" evidence).
- **FR-7 Research.** Publications grouped by type + talks list (O-1A "scholarly
  articles" evidence).
- **FR-8 Awards.** Four sections — Awards, Press & Media, Judging & Peer Review,
  Memberships (four O-1A criteria on one page).
- **FR-9 Testimonials.** Quote cards with name/title/org + note that signed letters are
  available on request.
- **FR-10 Contact.** Email CTA (mailto), socials, "open to" list, location/timezone.
  No form in MVP (forms need a backend or third-party service → future spec).
- **FR-11 Content.** 100% of copy in `src/data/content.ts` behind typed interfaces;
  factual-claim placeholders visibly marked `[Placeholder]`.
- **FR-12 SEO basics.** Per-page `<title>`, meta description, Open Graph tags,
  custom favicon.

## 4. Non-Functional Requirements

- **NFR-1** Lighthouse-ready performance: code-split routes, no blocking fonts, no
  layout shift from images.
- **NFR-2** WCAG 2.1 AA: contrast, focus-visible rings, semantic HTML, landmarks,
  `prefers-reduced-motion` honored by typewriter/pulse animations.
- **NFR-3** Fully responsive 360 px → 1536 px.
- **NFR-4** Deployable as plain static files to IONOS `public_html` with `.htaccess`
  SPA rewrite (file ships in `public/`).
- **NFR-5** Zero runtime dependencies beyond React, ReactDOM, React Router.

## 5. Design Direction (from stakeholder brief)

Dark "developer-hacking" theme (reference: MLH Global Hack Week) kept professional for
USCIS/investor eyes: deep-space background, **sunshine yellow** signature color,
IBM Plex Sans/Mono (same family as sarshar.dev), terminal windows, GitHub-style
graphics (contribution heatmap, repo cards, language bars), subtle glow — no scanlines,
no matrix rain.

## 6. Out of Scope (future specs)

Contact form (002?), blog/writing section, analytics, OG social-share image, CV PDF
generator, i18n, CMS, dynamic GitHub API integration for the real contribution graph.

## 7. Acceptance Criteria

- [x] `npm run dev` serves the site; all 8 routes + 404 render without console errors.
- [x] `npm run build` passes TypeScript strict checks and emits `dist/`.
- [x] Nav works on mobile (hamburger) and desktop; active route is highlighted.
- [x] All copy edits require touching only `src/data/content.ts`.
- [x] Every placeholder factual claim is visibly marked.
- [x] Animations disabled under `prefers-reduced-motion`.
- [x] `.htaccess` present in build output for IONOS SPA routing.
