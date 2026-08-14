/**
 * DATA FOR THE TELEMETRY PANEL (the home-page dashboard).
 *
 * The panel prefers LIVE numbers from the GitHub API (src/hooks/useGitHub).
 * Everything in this file is either configuration (which skills to show)
 * or the FALLBACK shown while the API loads / if it is rate-limited.
 *
 * ─────────────────────────────────────────────────────────────────────
 * ⚠️  CAROL — values marked [PLACEHOLDER] are stand-ins. The live API
 *     replaces most of them automatically in the browser; the skill
 *     LEVELS and status counts are yours to calibrate honestly.
 * ─────────────────────────────────────────────────────────────────────
 */

export const GITHUB_USER = 'IreneMargherita'
export const GITHUB_URL = `https://github.com/${GITHUB_USER}`

/* ------------------------------------------------------------------ */
/* Skill meters — htop-style gauges                                    */
/* ------------------------------------------------------------------ */
/* `level` is 0–10 and is a SELF-ASSESSMENT — calibrate it honestly;
   reviewers trust a 6 next to a 9 far more than a row of 10s. */

export const skills: { label: string; level: number }[] = [
  { label: 'python', level: 9 },
  { label: 'uncertainty-quant', level: 8 },
  { label: 'numerical-methods', level: 7 },
  { label: 'trading-systems', level: 6 },
  { label: 'typescript/react', level: 6 },
  { label: 'cloud/aws', level: 4 }, // honest: you said you're learning this
] // [PLACEHOLDER] levels — adjust to taste

/* ------------------------------------------------------------------ */
/* Fallbacks while the GitHub API loads (or if it's rate-limited)      */
/* ------------------------------------------------------------------ */

/** Real at the time of writing (2026-08): github.com/IreneMargherita */
export const fallback = {
  repos: 34, // CONFIRMED 2026-08 (public_repos)
  stars: 0, // [PLACEHOLDER] — live API supplies the real sum
  since: 2022, // [PLACEHOLDER] — live API supplies created_at year
  languages: [
    { label: 'Python', percent: 45 },
    { label: 'Jupyter', percent: 25 },
    { label: 'TypeScript', percent: 18 },
    { label: 'Other', percent: 12 },
  ], // [PLACEHOLDER] — live API computes the real split
  activity: [
    { year: 2022, cumulative: 4 },
    { year: 2023, cumulative: 14 },
    { year: 2024, cumulative: 24 },
    { year: 2025, cumulative: 30 },
    { year: 2026, cumulative: 34 },
  ], // [PLACEHOLDER] shape — live API derives the real curve
}

/* ------------------------------------------------------------------ */
/* Facts that do NOT come from GitHub                                  */
/* ------------------------------------------------------------------ */

export const papers = 1 // CONFIRMED — Computer Physics Communications 317:109853 (2025)

/** The status line under the chart: shipped / building / exploring. */
export const status = [
  { glyph: '▲', label: 'shipped', count: 6, tone: 'accent' as const },
  { glyph: '●', label: 'building', count: 4, tone: 'fg' as const },
  { glyph: '○', label: 'exploring', count: 3, tone: 'faint' as const },
] // [PLACEHOLDER] counts

export const panelCaption =
  'uncertainty quantification in ML · risk-critical trading infrastructure'
