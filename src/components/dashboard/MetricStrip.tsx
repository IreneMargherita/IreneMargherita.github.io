import { metrics } from '../../data/panel'
import { useCountUp } from '../../hooks/useInView'

function Metric({ label, value, suffix, raw, active }: { label: string; value: number; suffix: string; raw?: boolean; active: boolean }) {
  // Hooks must run unconditionally — so we always call useCountUp and
  // simply ignore its result for `raw` values. Wrapping a hook in an `if`
  // is the classic React crash: the hook order changes between renders.
  const animated = useCountUp(value, active && !raw)
  const shown = raw ? value : Math.round(animated)

  return (
    <div className="min-w-0">
      <div className="mono-label truncate">{label}</div>
      <div className="mt-1 font-mono text-[13px] tabular-nums text-fg">
        {shown.toLocaleString('en-US')}
        {suffix}
      </div>
    </div>
  )
}

export default function MetricStrip({ inView }: { inView: boolean }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {metrics.map((m) => (
        <Metric key={m.label} label={m.label} value={m.value} suffix={m.suffix} raw={m.raw ?? false} active={inView} />
      ))}
    </div>
  )
}
