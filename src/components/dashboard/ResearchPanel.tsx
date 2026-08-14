import { useInView } from '../../hooks/useInView'
import { panelCaption } from '../../data/panel'
import ForecastChart from './ForecastChart'
import CapabilityGrid from './CapabilityGrid'
import StackDonut from './StackDonut'
import MetricStrip from './MetricStrip'
import MaturityBars from './MaturityBars'

/**
 * The instrument panel — an ai-2027-style dashboard summarising the work.
 *
 * ARCHITECTURE NOTE (this is the bit worth stealing for other features):
 * the IntersectionObserver lives HERE, once, and `inView` is passed down
 * as a prop. The alternative — each of the five graphics observing itself
 * — would create five observers, five sets of callbacks, and five
 * slightly different moments of "now". One observer, one truth, one
 * choreographed entrance. Lifting shared state to the nearest common
 * parent is the same instinct that keeps business logic out of leaf
 * components.
 */
export default function ResearchPanel({ className = '' }: { className?: string }) {
  // rootMargin pulls the trigger line 12% up from the bottom of the
  // viewport, so the animation starts just before the panel is fully
  // visible — by the time your eye lands on it, it is already moving.
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2, rootMargin: '0px 0px -12% 0px' })

  return (
    <div ref={ref} className={['panel p-4 sm:p-5', className].join(' ')}>
      {/* Header rule */}
      <div className="mb-4 flex items-center justify-between border-b border-line pb-2.5">
        <span className="mono-label text-fg">Carol E. Gudumotou — output</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-data" />
          <span className="mono-label">Live</span>
        </span>
      </div>

      <ForecastChart inView={inView} />

      <div className="mt-5 flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <CapabilityGrid inView={inView} />
        </div>
        <StackDonut inView={inView} />
      </div>

      {/* The one-line caption, ai-2027's "2,000 copies thinking at 8x" slot */}
      <p className="mt-4 font-mono text-[11px] leading-relaxed text-fg-muted">
        <span className="text-fg">{panelCaption.lead}</span> {panelCaption.text}
      </p>

      <div className="mt-4 border-t border-line pt-3">
        <MetricStrip inView={inView} />
      </div>

      <div className="mt-5">
        <MaturityBars inView={inView} />
      </div>
    </div>
  )
}
