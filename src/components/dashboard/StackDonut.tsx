import { stack } from '../../data/panel'

const R = 30
const STROKE = 11

const toneClass: Record<string, string> = {
  data: 'stroke-data',
  alt: 'stroke-data-alt',
  dim: 'stroke-data-dim',
  faint: 'stroke-fg-faint',
}

/**
 * A donut chart drawn with ONE circle per segment and no arc maths.
 *
 * The trick is `pathLength={100}`. It tells the browser "pretend this
 * circle's outline is exactly 100 units long", so a 55% segment is
 * literally `strokeDasharray="55 45"` — the percentage IS the dash.
 * No 2πr, no arc flags, no floating-point drift at the seams.
 *
 * `strokeDashoffset` then rotates each segment to start where the
 * previous one ended. Negative because dash offsets run backwards.
 */
export default function StackDonut({ inView }: { inView: boolean }) {
  let cursor = 0

  return (
    <div className="relative shrink-0" style={{ width: 96, height: 96 }}>
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" role="img" aria-label={`Stack split: ${stack.map((s) => `${s.label} ${s.percent}%`).join(', ')}.`}>
        {/* Track */}
        <circle cx="40" cy="40" r={R} fill="none" strokeWidth={STROKE} className="stroke-line" opacity={0.5} />

        {stack.map((seg, i) => {
          const offset = -cursor
          cursor += seg.percent
          return (
            <circle
              key={seg.label}
              cx="40"
              cy="40"
              r={R}
              fill="none"
              strokeWidth={STROKE}
              pathLength={100}
              className={toneClass[seg.tone] ?? 'stroke-data'}
              strokeDasharray={inView ? `${seg.percent} ${100 - seg.percent}` : `0 100`}
              strokeDashoffset={offset}
              style={{ transition: `stroke-dasharray 900ms cubic-bezier(0.4, 0, 0.2, 1) ${i * 130}ms` }}
            />
          )
        })}
      </svg>

      {/* Centre label sits outside the rotated <svg> so it stays upright */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="mono-label !text-[9px] text-fg">Stack</span>
      </div>
    </div>
  )
}
