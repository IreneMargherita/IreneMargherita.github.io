import type { GitHubStats } from '../../hooks/useGitHub'

/**
 * Language split as ONE stacked horizontal bar — monochrome yellow.
 *
 * Every segment is the same accent at a different opacity (100 → 25%).
 * A one-hue ramp does two jobs at once: it encodes rank (opacity = share)
 * so the bar is legible even to fully colour-blind visitors, and it keeps
 * the panel's palette to exactly one data colour — which is what makes
 * the whole thing read as designed rather than defaulted.
 */
const OPACITY = [1, 0.72, 0.48, 0.26]

export default function LangSplit({
  inView,
  languages,
}: {
  inView: boolean
  languages: GitHubStats['languages']
}) {
  return (
    <div>
      <div className="mono-label mb-1.5 flex items-center justify-between">
        <span>lang split — public repos</span>
      </div>

      {/* The bar. Segments grow from 0 to their width, staggered, so the
          bar assembles left-to-right. */}
      <div
        className="flex h-3 w-full overflow-hidden bg-line/60"
        role="img"
        aria-label={`Language split: ${languages.map((l) => `${l.label} ${l.percent}%`).join(', ')}.`}
      >
        {languages.map((lang, i) => (
          <div
            key={lang.label}
            className="h-full bg-accent"
            style={{
              opacity: OPACITY[i] ?? 0.2,
              width: inView ? `${lang.percent}%` : '0%',
              transition: `width 800ms cubic-bezier(0.4, 0, 0.2, 1) ${i * 110}ms`,
            }}
          />
        ))}
      </div>

      {/* Legend: swatch + name + %, wrapping as needed */}
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {languages.map((lang, i) => (
          <span key={lang.label} className="flex items-center gap-1.5 font-mono text-[10px] text-fg-faint">
            <span className="h-2 w-2 bg-accent" style={{ opacity: OPACITY[i] ?? 0.2 }} aria-hidden="true" />
            {lang.label} <span className="text-fg-muted">{lang.percent}%</span>
          </span>
        ))}
      </div>
    </div>
  )
}
