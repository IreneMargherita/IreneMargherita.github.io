import { status } from '../../data/panel'

const toneClass = {
  accent: 'text-accent',
  fg: 'text-fg-muted',
  faint: 'text-fg-faint',
} as const

/**
 * One line: `▲ 6 shipped   ● 4 building   ○ 3 exploring`
 *
 * The previous design spent three dot-matrix rows on this. A status line
 * carries the same information in a tenth of the space — and information
 * density per pixel is exactly what makes a panel feel like an instrument
 * instead of an infographic. Glyph weight (filled → hollow) mirrors
 * project maturity, so the encoding survives grayscale.
 */
export default function StatusLine({ inView }: { inView: boolean }) {
  return (
    <p className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] leading-none">
      {status.map((s, i) => (
        <span
          key={s.label}
          className={[toneClass[s.tone], inView ? 'animate-fade-up' : 'opacity-0'].join(' ')}
          style={{ animationDelay: `${300 + i * 120}ms` }}
        >
          {s.glyph} {s.count} {s.label}
        </span>
      ))}
    </p>
  )
}
