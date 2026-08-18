# Spec 005 — Restore the Evidence Pages

**Status:** ✅ Implemented 2026-08-18 · **Decision by:** Carol
**Reverses:** the page retirements in `70e4687` (awards, testimonials) and
`a531f57` (about, contact). **Keeps:** everything else those commits added
(dual theme, live GitHub panel, surname fix, footer copy decisions).

## 1. Why

The retirements optimized for a *minimal developer portfolio*. But this site's
primary audience (spec 001 §2) is **reviewers of an O-1A petition, investors,
and researchers** — for them, Awards, Testimonials, About, and Contact are not
auxiliary pages; they are the evidence and the call-to-action:

| Restored page | O-1A / audience function |
|---|---|
| `/awards` | Awards, press, judging, memberships — four O-1A criteria on one page |
| `/testimonials` | Letters of recommendation, surfaced |
| `/about` | Education + skills + narrative — context reviewers expect |
| `/contact` | The conversion point for every persona (mailto alone buries it) |

A leaner site is a fine aesthetic; a persuasive petition needs the full record.

## 2. What was done (implementation notes)

- Pages resurrected from git history, each from its **last-alive commit** so
  they carry the 003 token system: About/Contact from `f4930ec` (post-surname-
  fix), Awards/Testimonials from `be53a6b` (pre-fix — audited for the old
  surname: none present; they render purely from `content.ts` data, which was
  never deleted).
- Routes + lazy imports restored in `App.tsx`; nav restored to 8 entries;
  `evidenceLinks` restored to 4 cards (grid back to `lg:grid-cols-4`);
  hero "get in touch" is a `<Link to="/contact">` again; "more about me →"
  link restored on Home.
- Deliberately **not** restored: the footer build-stack line (the 08-14
  removal had a good reason — the site should talk about Carol, not its
  plumbing) and the retired dashboard components (superseded by 004's set).

## 3. Lesson this spec exists to teach

Git never deletes — `git show <commit>:<path>` resurrected all four files in
their exact last-known-good form, including theme adaptations. And specs are
why the *reasoning* survives alongside the code: 003/004 shipped without
specs, so their intent had to be reverse-engineered; 005 won't have that
problem.

## 4. Acceptance

- [x] All 9 routes render in BOTH themes without console errors
- [x] `npm run build` passes; every restored page code-splits as before
- [x] Nav shows 8 entries; evidence band shows 4 cards on desktop
- [ ] Carol: commit + push (`005-restore-pages`) → verify live
