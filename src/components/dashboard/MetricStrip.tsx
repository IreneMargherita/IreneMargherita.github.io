import { useCountUp } from '../../hooks/useInView'

export interface Metric {
  label: string
  value: number
  suffix?: string
  /** true = show as-is (years must not count up from 0 or grow commas). */
  raw?: boolean
}

function MetricCell({ label, value, suffix = '', raw, active }: Metric & { active: boolean }) {
  // Hooks must run unconditionally — so we always call useCountUp and
  // simply ignore its result for `raw` values. Wrapping a hook in an `if`
  // is the classic React crash: the hook order changes between renders.
  const animated = useCountUp(value, active && !raw)
  const shown = raw ? value : Math.round(animated)

  // Years are identifiers, not quantities — `2021` must never render as
  // "2,021". Only group digits for values that are actually counts.
  const text = raw ? String(shown) : shown.toLocaleString('en-US')

  return (
    <div className="min-w-0">
      {/* min-h reserves room for a second line so every VALUE in the strip
          shares one baseline, even when only one label wraps. */}
      <div className="mono-label min-h-[2.7em] !leading-[1.35]">{label}</div>
      <div className="mt-1 font-mono text-[13px] tabular-nums text-fg">
        {text}
        {suffix}
      </div>
    </div>
  )
}

/**
 * The numeric readout row. Metrics are passed IN rather than imported —
 * the parent decides whether they come from the live GitHub API or the
 * static fallback, and this component neither knows nor cares. That
 * one-way flow ("data down, events up") is the core React discipline.
 */
export default function MetricStrip({ inView, metrics }: { inView: boolean; metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {metrics.map((m) => (
        <MetricCell key={m.label} {...m} active={inView} />
      ))}
    </div>
  )
}
