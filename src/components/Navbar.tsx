import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { nav, profile } from '../data/content'
import ThemeToggle from './ThemeToggle'

/**
 * Sticky top navigation.
 * - NavLink (vs Link) knows whether its route is active, so we can style
 *   the current page differently — like a highlighted tab in an editor.
 * - Mobile: a hamburger toggles a slide-down panel. State lives here and
 *   closes on every link click.
 * - Colours are SEMANTIC tokens (bg-canvas, text-fg, border-line), so this
 *   file has zero `dark:` classes and is correct in both themes.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    ['font-mono text-sm transition-colors px-1 py-0.5', isActive ? 'text-accent' : 'text-fg-faint hover:text-fg'].join(' ')

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-md">
      <nav aria-label="Main" className="container-content flex h-16 items-center justify-between">
        {/* Wordmark */}
        <Link
          to="/"
          className="group flex items-center gap-2 font-mono text-sm font-semibold text-fg"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/60 bg-accent-soft/50 text-accent transition-shadow group-hover:shadow-glow-sm">
            &gt;_
          </span>
          <span>
            {profile.firstName.toLowerCase()}
            <span className="text-accent">.dev</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-6">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={linkClasses}>
                  <span className="text-accent/60">/</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile: toggle stays visible next to the hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-md border border-line-strong/25 p-2 text-fg-muted hover:border-accent hover:text-accent"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div id="mobile-menu" className="border-t border-line bg-canvas/95 backdrop-blur-md lg:hidden">
          <ul className="container-content flex flex-col py-3">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    [
                      'block border-l-2 py-2.5 pl-4 font-mono text-sm transition-colors',
                      isActive ? 'border-accent text-accent' : 'border-transparent text-fg-faint hover:text-fg',
                    ].join(' ')
                  }
                  onClick={() => setOpen(false)}
                >
                  <span className="text-accent/60">~/</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
