/**
 * DATA FOR THE RESEARCH PANEL (the ai-2027-style dashboard).
 *
 * ─────────────────────────────────────────────────────────────────────
 * ⚠️  CAROL — everything marked [PLACEHOLDER] is a made-up number I put
 *     here so the graphics have something to draw. Replace them before
 *     the site is public. The only figures below that are CONFIRMED are
 *     the 2025 publication and the DOI.
 * ─────────────────────────────────────────────────────────────────────
 *
 * Why a separate data file at all?
 * This is "separation of data and presentation". The chart component knows
 * HOW to draw a line; it knows nothing about what the line means. Swap this
 * file and every graphic updates, with zero risk of breaking the rendering
 * code. It also means the day you wire up a real API (GitHub, Scholar), you
 * only change where this object comes from — not a single component.
 */

/* ------------------------------------------------------------------ */
/* 1 · Timeline chart — cumulative output over time                    */
/* ------------------------------------------------------------------ */

export type Series = {
  key: string
  label: string
  /** Which token colours the line: 'data' | 'alt' | 'dim' */
  tone: 'data' | 'alt' | 'dim'
  /** Cumulative count at the end of each year. Same length as `years`. */
  points: number[]
}

export const years = [2021, 2022, 2023, 2024, 2025, 2026] as const

export const timeline: Series[] = [
  {
    key: 'research',
    label: 'Research',
    tone: 'data',
    // 2025 = 1 is REAL (Computer Physics Communications 317:109853).
    points: [0, 0, 1, 2, 4, 5], // [PLACEHOLDER] except the 2025 publication
  },
  {
    key: 'systems',
    label: 'Systems',
    tone: 'alt',
    points: [0, 1, 2, 3, 5, 7], // [PLACEHOLDER]
  },
  {
    key: 'trading',
    label: 'Trading',
    tone: 'dim',
    points: [0, 0, 0, 1, 3, 6], // [PLACEHOLDER]
  },
]

/** The year shown in the black pill. */
export const focusYear = 2026

/* ------------------------------------------------------------------ */
/* 2 · Capability grid — the bordered icon tiles                       */
/* ------------------------------------------------------------------ */

export type CapabilityIcon = 'wave' | 'brain' | 'code' | 'cloud' | 'chart' | 'stack'

export const capabilities: { label: string; icon: CapabilityIcon }[] = [
  { label: 'Numerical Methods', icon: 'wave' },
  { label: 'Machine Learning', icon: 'brain' },
  { label: 'Python', icon: 'code' },
  { label: 'Cloud / AWS', icon: 'cloud' },
  { label: 'Quant & FinTech', icon: 'chart' },
  { label: 'Systems Design', icon: 'stack' },
]

/* ------------------------------------------------------------------ */
/* 3 · Stack donut + metric strip                                      */
/* ------------------------------------------------------------------ */

export const stack = [
  { label: 'Python', percent: 55, tone: 'data' as const },
  { label: 'TypeScript', percent: 20, tone: 'alt' as const },
  { label: 'C++ / Rust', percent: 12, tone: 'dim' as const },
  { label: 'SQL', percent: 13, tone: 'faint' as const },
] // [PLACEHOLDER] — percentages must sum to 100

/** `raw: true` = show the number as-is (years shouldn't count up from 0). */
export const metrics: { label: string; value: number; suffix: string; raw?: boolean }[] = [
  // Keep labels ≤ 8 chars or breakable at a space — the strip is 4 narrow
  // columns and a word like "Publications" has nowhere clean to wrap.
  { label: 'Papers', value: 1, suffix: '' }, // CONFIRMED
  { label: 'Projects', value: 6, suffix: '' }, // [PLACEHOLDER]
  { label: 'Since', value: 2021, suffix: '', raw: true }, // [PLACEHOLDER]
  { label: 'Open access', value: 100, suffix: '%' }, // CONFIRMED (the CPC paper is OA)
]

/* ------------------------------------------------------------------ */
/* 4 · Maturity dot-bars                                               */
/* ------------------------------------------------------------------ */
/* ai-2027 uses "Currently Exists / Emerging Tech / Science Fiction".
   Yours is honest project staging: what ships, what's mid-build, what's
   still a notebook. `filled` of `total` squares are inked in. */

export const maturity = [
  { label: 'Shipped', filled: 6, total: 9, tone: 'alt' as const },
  { label: 'In Progress', filled: 4, total: 5, tone: 'data' as const },
  { label: 'Exploring', filled: 3, total: 11, tone: 'dim' as const },
] // [PLACEHOLDER]

/** The one-line summary under the chart, ai-2027 style. */
export const panelCaption = {
  lead: '1',
  text: 'peer-reviewed paper · operator networks for Bayesian inference in PDEs',
}
