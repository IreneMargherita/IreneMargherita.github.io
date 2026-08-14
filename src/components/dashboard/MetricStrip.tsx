import { metrics } from '../../data/panel'
import { useCountUp } from '../../hooks/useInView'

function Metric({ label, value, suffix, raw, active }: { label: string; value: number; suffix: string; raw?: boolean; active: boolean }) {
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
      {/* No `truncate`: at this width "Publications" would clip to
          "Publicati…". Wrapping to two lines is always better than
          hiding the label. */}
      {/* min-h reserves room for a second line so every VALUE in the strip
          shares one baseline, even when only one label wraps. Without it
          the row goes ragged the moment a label gets long. */}
      <div className="mono-label !leading-[1.35] min-h-[2.7em]">{label}</div>
      <div className="mt-1 font-mono text-[13px] tabular-nums text-fg">
        {text}
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
