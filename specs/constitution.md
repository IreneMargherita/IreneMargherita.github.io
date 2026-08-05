# Project Constitution — Carol's Portfolio Website

> The constitution is the set of principles every spec, plan, and line of code must obey.
> If a future change conflicts with a principle here, either the change is wrong or this
> document must be consciously amended first (bump the version, note the reason).

**Version:** 1.0.0 · **Ratified:** 2026-08-04

---

## Article I — Static First

The site is a fully static front-end. No backend, no database, no authentication, no CMS.
Anything dynamic (contact forms, analytics, blog) enters only through a new spec that
explains why a static alternative is insufficient.

**Why (the teaching bit):** a static site is like a printed brochure that a copy shop
(the host) hands out — nothing to hack, nothing to crash, nearly free to serve, and it
loads fast anywhere. A backend is like staffing a live receptionist: powerful, but now
someone must be paid, secured, and kept awake 24/7. A portfolio rarely needs the receptionist.

## Article II — Single Source of Truth for Content

All human-readable copy (names, bios, project descriptions, awards, links) lives in
`src/data/content.ts` and nowhere else. Components receive content as data; they never
hard-code sentences. Editing the site's words must never require touching a component.

## Article III — Type Safety Everywhere

TypeScript `strict` mode stays on. Every content structure has an exported interface.
If the shape of the data changes, the compiler — not a runtime surprise — tells us
every place that must be updated.

## Article IV — Truthful Evidence

This site will be read by USCIS officers, lawyers, and investors. Placeholder content
must be *visibly* placeholder (marked `[Placeholder]` / `TODO`). No fabricated awards,
publications, or press may ever look real. The pre-publish checklist in the README must
be completed before the site goes live.

## Article V — Performance Budget

Every route is lazy-loaded (code-split). Initial JS for the landing route stays under
~150 KB gzipped. Images get explicit dimensions. Fonts load via `display=swap` so text
never blocks on a font download.

## Article VI — Accessibility Floor

WCAG 2.1 AA is the floor: visible focus states, semantic landmarks, alt text, color
contrast ≥ 4.5:1 for body text, and all animation respects `prefers-reduced-motion`.

## Article VII — Spec-Driven Development (SDD)

Work flows **spec → plan → tasks → code**, in numbered feature folders:

```
specs/
  constitution.md          ← this file (principles, rarely changes)
  001-mvp/
    spec.md                ← WHAT & WHY (user stories, acceptance criteria)
    plan.md                ← HOW (architecture, tokens, components)
    tasks.md               ← checklist of work, with status
  002-<next-feature>/      ← future work starts by copying this pattern
```

Each folder is a checkpoint. To revisit or change a decision, read the spec that made
it, write the delta as a new numbered spec, then change code. Combined with git
(`git init` + a commit per completed task list), this gives cheap time travel.

## Article VIII — Design System Discipline

Colors, fonts, spacing, shadows, and radii are defined once as tokens in
`tailwind.config.js` (plus utility classes in `src/index.css`). Components use tokens
(`bg-ink-900`, `text-sunshine-400`), never raw hex values sprinkled in JSX.
