import { maturity } from '../../data/panel'

const toneClass: Record<string, string> = {
  data: 'bg-data',
  alt: 'bg-data-alt',
  dim: 'bg-data-dim',
}

/**
 * The dot rows: `filled` of `total` squares are inked in, the rest sit at
 * low opacity. ai-2027 uses these for Currently Exists / Emerging Tech /
 * Science Fiction; here they stage your work.
 *
 * Note the staggered `animationDelay` — squares appear left-to-right
 * rather than all at once. Simultaneous motion reads as a glitch;
 * sequenced motion reads as a system reporting in. ~35ms is the sweet
 * spot: below ~20ms it looks instant, above ~80ms it feels slow.
 */
export default function MaturityBars({ inView }: { inView: boolean }) {
  let globalIndex = 0

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-2">
      {maturity.map((group, gi) => (
        <div key={group.label} className={gi === 1 ? 'text-center' : gi === 2 ? 'text-right' : ''}>
          <div className={['mono-label', group.tone === 'data' ? 'text-data' : ''].join(' ')}>{group.label}</div>
          <div
            className={['mt-1.5 flex flex-wrap gap-[3px]', gi === 1 ? 'justify-center' : gi === 2 ? 'justify-end' : ''].join(' ')}
            role="img"
            aria-label={`${group.label}: ${group.filled} of ${group.total}`}
          >
            {Array.from({ length: group.total }, (_, i) => {
              const delay = globalIndex++ * 35
              const isFilled = i < group.filled
              return (
                <span
                  key={i}
                  aria-hidden="true"
                  className={[
                    'h-2 w-2',
                    // Unfilled squares use the hairline token, NOT opacity —
                    // `animate-pop-in` ends on opacity:1 and would wipe out
                    // any opacity class we set here. Colour survives; opacity
                    // does not. Worth knowing before you debug it at 1am.
                    isFilled ? (toneClass[group.tone] ?? 'bg-data') : 'bg-line',
                    inView ? 'animate-pop-in' : 'opacity-0',
                  ].join(' ')}
                  style={{ animationDelay: `${delay}ms` }}
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
