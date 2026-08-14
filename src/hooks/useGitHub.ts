import { useEffect, useState } from 'react'
import { GITHUB_USER } from '../data/panel'

/**
 * Live GitHub stats, fetched in the visitor's browser from the OFFICIAL
 * public REST API (api.github.com — CORS-enabled, no token needed).
 *
 * Design decisions worth learning from:
 *
 * 1. GRACEFUL DEGRADATION. The hook returns `null` until data arrives and
 *    forever if the fetch fails (offline, rate-limited: 60 req/hr per IP).
 *    Components fall back to the static numbers in panel.ts. The site must
 *    never look broken because a third party had a bad day.
 *
 * 2. MODULE-LEVEL CACHE. The promise lives OUTSIDE the hook, so five
 *    components calling useGitHub() produce exactly one network request,
 *    and navigating between pages doesn't refetch. This is the poor
 *    man's react-query — and for one endpoint it's all you need.
 *
 * 3. DERIVE, DON'T STORE. We keep only the numbers the UI shows. Storing
 *    raw API payloads in state invites stale shapes when GitHub changes
 *    a field you never used anyway.
 */

export interface GitHubStats {
  /** Public, non-fork repository count. */
  repos: number
  /** Sum of stargazers across those repos. */
  stars: number
  /** Year the account was created. */
  since: number
  /** Primary-language split by repo count, as percents summing to ~100. */
  languages: { label: string; percent: number }[]
  /** Cumulative repo count at the end of each year, oldest → newest. */
  activity: { year: number; cumulative: number }[]
}

let cached: Promise<GitHubStats | null> | null = null

async function fetchStats(): Promise<GitHubStats | null> {
  try {
    const headers = { Accept: 'application/vnd.github+json' }
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers }),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`, { headers }),
    ])
    if (!userRes.ok || !reposRes.ok) return null

    const user = (await userRes.json()) as { created_at: string; public_repos: number }
    const repos = (await reposRes.json()) as {
      fork: boolean
      language: string | null
      stargazers_count: number
      created_at: string
    }[]

    // Forks are other people's work — counting them inflates every number.
    const own = repos.filter((r) => !r.fork)

    const stars = own.reduce((sum, r) => sum + r.stargazers_count, 0)
    const since = new Date(user.created_at).getFullYear()

    // Language split by primary language of each repo.
    const counts = new Map<string, number>()
    for (const r of own) {
      if (!r.language) continue
      counts.set(r.language, (counts.get(r.language) ?? 0) + 1)
    }
    const total = [...counts.values()].reduce((a, b) => a + b, 0) || 1
    const languages = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([label, n]) => ({ label, percent: Math.round((n / total) * 100) }))

    // Cumulative repos created per year — an honest "output over time"
    // curve derived from primary-source data, not hand-typed numbers.
    const nowYear = new Date().getFullYear()
    const activity: { year: number; cumulative: number }[] = []
    let running = 0
    for (let y = since; y <= nowYear; y++) {
      running += own.filter((r) => new Date(r.created_at).getFullYear() === y).length
      activity.push({ year: y, cumulative: running })
    }

    return { repos: own.length, stars, since, languages, activity }
  } catch {
    return null
  }
}

export function useGitHub(): GitHubStats | null {
  const [stats, setStats] = useState<GitHubStats | null>(null)

  useEffect(() => {
    let alive = true
    cached ??= fetchStats()
    cached.then((s) => {
      // The "alive" guard prevents calling setState on an unmounted
      // component — the classic React warning when a fetch resolves after
      // the user has already navigated away.
      if (alive && s) setStats(s)
    })
    return () => {
      alive = false
    }
  }, [])

  return stats
}
