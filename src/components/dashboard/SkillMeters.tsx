import { skills } from '../../data/panel'

const CELLS = 10

/**
 * htop-style gauges: `python  [█████████░]  9.0`
 *
 * Ten discrete cells instead of a smooth progress bar, for two reasons:
 * - Discrete cells admit their own imprecision. A pixel-perfect 73% bar
 *   claims an accuracy a self-assessment doesn't have; 7 of 10 blocks
 *   reads as the estimate it actually is.
 * - It's system-monitor language, which is the panel's whole voice.
 *
 * Each row's cells cascade in left-to-right (30ms apart), and rows are
 * offset by 90ms — the gauges "boot up" in sequence like a machine
 * coming online.
 */
export default function SkillMeters({ inView }: { inView: boolean }) {
  return (
    <div className="space-y-1.5" role="list" aria-label="Skill self-assessment">
      {skills.map((s, row) => (
        <div
          key={s.label}
          role="listitem"
          aria-label={`${s.label}: ${s.level} of ${CELLS}`}
          className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2"
        >
          <span className="truncate font-mono text-[11px] leading-none text-fg-muted">{s.label}</span>

          <span className="flex gap-[2px]" aria-hidden="true">
            {Array.from({ length: CELLS }, (_, i) => {
              const on = i < s.level
              return (
                <span
                  key={i}
                  className={[
                    'h-3 w-[7px]',
                    on ? 'bg-accent' : 'bg-line',
                    inView ? 'animate-pop-in' : 'opacity-0',
                  ].join(' ')}
                  style={{
                    animationDelay: `${row * 90 + i * 30}ms`,
                    // Full cells dim slightly toward the top of the gauge —
                    // the subtle ramp keeps ten solid blocks from banding
                    // into one rectangle.
                    opacity: on ? 0.55 + 0.45 * (i / (CELLS - 1)) : undefined,
                  }}
                />
              )
            })}
          </span>

          <span className="w-7 text-right font-mono text-[11px] tabular-nums leading-none text-fg-faint">
            {s.level}.0
          </span>
        </div>
      ))}
    </div>
  )
}
