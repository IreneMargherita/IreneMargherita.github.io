import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { nav, profile } from '../data/content';

/**
 * Sticky top navigation.
 * - NavLink (vs Link) knows whether its route is active, so we can style
 *   the current page differently — like a highlighted tab in an editor.
 * - Mobile: a hamburger toggles a slide-down panel. State lives here and
 *   closes on every link click.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    [
      'font-mono text-sm transition-colors px-1 py-0.5',
      isActive ? 'text-sunshine-500' : 'text-mist-400 hover:text-mist-100',
    ].join(' ');

  return (
    <header className="sticky top-0 z-50 border-b border-ink-600/70 bg-ink-900/80 backdrop-blur-md">
      <nav aria-label="Main" className="container-content flex h-16 items-center justify-between">
        {/* Wordmark */}
        <Link
          to="/"
          className="group flex items-center gap-2 font-mono text-sm font-semibold text-mist-100"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-sunshine-700/70 bg-sunshine-900/30 text-sunshine-500 shadow-glow-sm transition-shadow group-hover:shadow-glow">
            &gt;_
          </span>
          <span>
            {profile.firstName.toLowerCase()}
            <span className="text-sunshine-500">.dev</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.to === '/'} className={linkClasses}>
                <span className="text-sunshine-700">/</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="rounded-md border border-ink-500 p-2 text-mist-300 hover:border-sunshine-600 hover:text-sunshine-400 lg:hidden"
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
      </nav>

      {/* Mobile panel */}
      {open && (
        <div id="mobile-menu" className="border-t border-ink-600 bg-ink-900/95 backdrop-blur-md lg:hidden">
          <ul className="container-content flex flex-col py-3">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    [
                      'block border-l-2 py-2.5 pl-4 font-mono text-sm transition-colors',
                      isActive
                        ? 'border-sunshine-500 text-sunshine-500'
                        : 'border-transparent text-mist-400 hover:text-mist-100',
                    ].join(' ')
                  }
                  onClick={() => setOpen(false)}
                >
                  <span className="text-sunshine-700">~/</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
