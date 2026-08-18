# Spec 004 — Live GitHub Panel ("telemetry")

**Status:** ✅ Shipped (commit `70e4687`, 2026-08-14)
**⚠️ Backfilled retroactively on 2026-08-18** — implemented without a spec;
reconstructed from the shipped code. (The commit called this "telemetry",
which usually means *collecting visitor data* — this feature is the opposite:
it **displays Carol's public GitHub stats** to visitors. Privacy review 
2026-08-18: no visitor data is collected or sent anywhere. ✅)

## What shipped

- `hooks/useGitHub.ts` — fetches Carol's public profile + repos from the
  official `api.github.com` REST API in the visitor's browser (CORS, no
  token). Notable engineering: module-level promise cache (one request per
  page load however many components subscribe), graceful degradation to the
  static numbers in `data/panel.ts` when offline or rate-limited (60 req/hr
  per visitor IP), forks excluded so counts aren't inflated.
- Dashboard rework: `ActivityChart` (cumulative repos by year), `LangSplit`
  (language split), `SkillMeters`, `StatusLine`, `MetricStrip` — replacing
  the earlier CapabilityGrid/ForecastChart/MaturityBars/StackDonut set.
- ContributionGraph caption updated; `data/panel.ts` slimmed to config +
  static fallbacks (exports `GITHUB_USER`).
- **Also in this commit: retired `/awards` and `/testimonials`** (and a
  follow-up commit retired `/about` and `/contact`) — **reversed by spec 005**;
  see that spec for the reasoning.

## Acceptance (verified retroactively)

- [x] Panel renders real data when GitHub API reachable; static fallbacks otherwise
- [x] Exactly one API round-trip per page load; no fetch on route changes
- [x] No visitor tracking of any kind
