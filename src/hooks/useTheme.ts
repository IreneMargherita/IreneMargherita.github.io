import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

/**
 * Reads the CURRENT truth off the DOM rather than recomputing it.
 *
 * The inline script in index.html already decided the theme before React
 * existed. If this hook re-derived the answer from localStorage it would
 * have two sources of truth that can silently disagree. One source of
 * truth, always — the `.dark` class on <html> is it.
 */
function readTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  const isDark = theme === 'dark'
  document.documentElement.classList.toggle('dark', isDark)
  // Keep the mobile browser chrome in step with the page.
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#0B0E14' : '#FBF9F3')
}

/**
 * Light/dark theme with three behaviours:
 *   1. Explicit user choice wins and persists across visits.
 *   2. With no choice saved, follow the operating system.
 *   3. If the OS flips while the tab is open and the user never chose,
 *      follow it live.
 *
 * Returns a stable `toggle` (useCallback) so components that take it as a
 * prop don't re-render on every parent render — the habit that keeps
 * React.memo from being a lie.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  const setAndPersist = useCallback((next: Theme) => {
    setTheme(next)
    applyTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* private mode / storage disabled — the theme still applies for this session */
    }
  }, [])

  const toggle = useCallback(() => {
    setAndPersist(readTheme() === 'dark' ? 'light' : 'dark')
  }, [setAndPersist])

  // Follow the OS, but only while the user has expressed no preference.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      let saved: string | null = null
      try {
        saved = localStorage.getItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
      if (saved) return // user overrode the OS; respect that
      const next: Theme = e.matches ? 'dark' : 'light'
      setTheme(next)
      applyTheme(next)
    }
    mq.addEventListener('change', onChange)
    // Cleanup is not optional: without it every mount leaks one more
    // listener, and the OS flip fires N handlers instead of one.
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return { theme, toggle, setTheme: setAndPersist }
}
