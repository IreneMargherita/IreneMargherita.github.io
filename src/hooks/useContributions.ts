import { useEffect, useState } from 'react'
import { GITHUB_USER } from '../data/panel'

/**
 * Live GitHub CONTRIBUTION CALENDAR (the green-squares graph — ours is yellow).
 *
 * Why not the official API? GitHub only exposes the contribution calendar via
 * its GraphQL API, which requires an auth token — and a static site can never
 * ship a token (anyone could read it in the JS bundle). The community-run
 * mirror `github-contributions-api.jogruber.de` reads the same PUBLIC calendar
 * server-side and serves it with CORS, token-free. Trade-off documented in
 * spec 006: if that service is ever down, this hook returns null and the
 * component falls back to its seeded placeholder — the site never breaks.
 *
 * Privacy note: this DISPLAYS Carol's public calendar. It collects nothing
 * from visitors. (Tip: GitHub → Settings → Profile → "Include private
 * contributions" makes private-repo work count in this calendar as anonymous
 * totals — ideal for proprietary trading code.)
 */

export interface ContributionDay {
  date: string
  count: number
  /** GitHub's own 0–4 intensity bucket — maps 1:1 onto our sunshine ramp. */
  level: 0 | 1 | 2 | 3 | 4
}

export interface Contributions {
  /** Column-major: weeks[w][d], d = 0 (Sun) … 6 (Sat), oldest week first. */
  weeks: (ContributionDay | null)[][]
  total: number
}

let cached: Promise<Contributions | null> | null = null

async function fetchContributions(): Promise<Contributions | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
    )
    if (!res.ok) return null
    const data = (await res.json()) as {
      total: Record<string, number>
      contributions: ContributionDay[]
    }
    if (!Array.isArray(data.contributions) || data.contributions.length === 0) return null

    // Re-shape the flat day list into GitHub-style week columns (Sun→Sat).
    const weeks: (ContributionDay | null)[][] = []
    let col: (ContributionDay | null)[] = []

    for (const day of data.contributions) {
      const weekday = new Date(`${day.date}T00:00:00`).getDay() // 0 = Sunday
      if (weekday === 0 && col.length > 0) {
        weeks.push(col)
        col = []
      }
      if (col.length === 0 && weekday !== 0) {
        // pad a partial first week so rows line up with weekdays
        for (let i = 0; i < weekday; i++) col.push(null)
      }
      col.push(day)
    }
    if (col.length > 0) weeks.push(col)

    const total = data.contributions.reduce((sum, d) => sum + d.count, 0)
    return { weeks: weeks.slice(-53), total }
  } catch {
    return null
  }
}

export function useContributions(): Contributions | null {
  const [stats, setStats] = useState<Contributions | null>(null)

  useEffect(() => {
    cached ??= fetchContributions()
    let alive = true
    cached.then((s) => alive && setStats(s))
    return () => {
      alive = false
    }
  }, [])

  return stats
}
