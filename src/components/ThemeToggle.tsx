import { useTheme } from '../hooks/useTheme'

/**
 * Light/dark switch.
 *
 * Accessibility notes (these are the parts people skip):
 *  - `aria-pressed` tells a screen reader this is a two-state toggle and
 *    which state it is in — a plain <button> announces neither.
 *  - The visible label is the theme you will GET, not the one you are in.
 *    Both conventions exist; pick one and be consistent. "What happens if
 *    I click this" is the one users guess correctly.
 *  - Icons are aria-hidden because the text already says it. Announcing
 *    "sun graphic, light" is noise.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={[
        'group inline-flex items-center gap-2 border px-2.5 py-1.5 font-mono text-[11px]',
        'uppercase tracking-[0.12em] text-fg-faint transition-colors',
        'border-line-strong/25 hover:border-accent hover:text-accent',
        className,
      ].join(' ')}
    >
      <span className="relative block h-3.5 w-3.5">
        {/* Sun */}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={[
            'absolute inset-0 h-3.5 w-3.5 transition-all duration-300',
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100',
          ].join(' ')}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
        {/* Moon */}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={[
            'absolute inset-0 h-3.5 w-3.5 transition-all duration-300',
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0',
          ].join(' ')}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      </span>
      <span className="hidden sm:inline">{isDark ? 'light' : 'dark'}</span>
    </button>
  )
}
