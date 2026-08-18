# Spec 003 — Dual Theme (light/dark) + Instrument-Panel Design Language

**Status:** ✅ Shipped (commits `6257b99`, `0298b92`, `be53a6b`, 2026-08-14)
**⚠️ Backfilled retroactively on 2026-08-18** — this feature was implemented
without a spec (Constitution Art. VII violation, noted for honesty). This
document reconstructs the WHAT/WHY from the shipped code so future changes
have something to reason against.

## What shipped

- **Semantic color tokens** replacing raw palette references throughout:
  `fg`, `fg-muted`, `fg-faint` (text), `accent` (sunshine yellow), `data`,
  `data-alt` (status/terminal hues), `--c-invert`, `--c-chip`, `.panel-chip` —
  defined as CSS custom properties that flip with a `.dark` class on `<html>`.
  Lesson: components now say *what a color means*, not *which hex it is* —
  that's what makes two themes possible with one codebase.
- **Light mode** ("ai-2027-style"): warm paper background (#FBF9F3-ish), serif
  reading voice (IBM Plex Serif added to the font stack), dark-ink text —
  the "research paper" feel. Dark mode remains the midnight-terminal look.
- **Anti-flash boot script** in `index.html`: reads `localStorage` + system
  `prefers-color-scheme` *before first paint* so the page never flashes the
  wrong theme. (Try/catch for Safari private mode.)
- **ThemeToggle** component in the navbar; preference persists in
  `localStorage('theme')`; system preference is the default.
- **Instrument panel** on Home (`components/dashboard/`): sticky right-hand
  data panel beside a serif essay column.

## Acceptance (verified retroactively)

- [x] Both themes render all pages without unreadable contrast pairs
- [x] No theme flash on hard reload in either mode
- [x] Theme choice survives navigation and reload
