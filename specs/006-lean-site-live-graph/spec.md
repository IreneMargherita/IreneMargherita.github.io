# Spec 006 — Lean Site (final) + Live Contribution Graph

**Status:** ✅ Implemented 2026-08-18 · **Decision by:** Carol (explicit)
**Reverses:** spec 005. **Settles:** the page-set question — the LEAN five-route
site (home, projects, experience, research, 404) is the owner's chosen design.

## 1. The page-set decision, finally documented

History, so no future session relitigates it:
- 08-14: Carol's other tool retired /awards /testimonials /about /contact.
- 08-18 (morning): this assistant flagged the deletions as accidental and,
  with Carol's ok, restored them (spec 005).
- 08-18 (later): **Carol clarified the deletions were intentional** — she wants
  the lean site. 005 is hereby reversed: the four page FILES are removed again
  (they had been committed unwired in `47faf60`), plus the `.claude-new` temp
  files that commit accidentally picked up.
- The wiring (App routes, nav, evidence band) was never re-expanded on the
  deployed site, so visitors never saw a flip-flop.
- The O-1A trade-off from 005 §1 still stands as a RISK note: awards, letters,
  and contact now have no dedicated pages. Mitigations available later without
  new pages: fold key items into /research and the home evidence band; contact
  remains a mailto in hero + footer socials.

## 2. Live contribution graph (closes backlog B4)

- `hooks/useContributions.ts` + `ContributionGraph.tsx` rewrite: the heatmap
  now renders Carol's REAL last-52-weeks GitHub calendar, in the sunshine ramp,
  with per-day tooltips and a "● live · N contributions" caption.
- **Data source:** `github-contributions-api.jogruber.de` (community mirror of
  the public calendar, CORS-enabled). Why: GitHub only exposes the calendar via
  authenticated GraphQL, and a static site must never ship a token (it would be
  readable by anyone in the JS bundle). Trade-off: third-party availability →
  mitigated by the seeded placeholder fallback, clearly labeled, so an outage
  degrades the page, never breaks it. Same graceful-degradation contract as 004.
- Privacy: displays public data about Carol; collects nothing from visitors.
- To include private trading-repo work in the graph: GitHub → Settings →
  Profile → contribution settings → "Include private contributions" (shows as
  anonymized counts — no repo names leak).

## 3. Acceptance

- [x] Build passes; 5 routes; graph falls back cleanly with no network
- [ ] Carol: apply files, commit, push
- [ ] Live check: graph shows "● live · N contributions" within ~2s of load
      (verify at https://irenemargherita.github.io after deploy)
