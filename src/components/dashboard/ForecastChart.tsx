import { years, timeline, focusYear, type Series } from '../../data/panel'

const W = 340
const H = 118
const PAD = { top: 22, right: 26, bottom: 14, left: 6 }

const toneClass: Record<Series['tone'], string> = {
  data: 'stroke-data',
  alt: 'stroke-data-alt',
  dim: 'stroke-data-dim',
}
const toneFill: Record<Series['tone'], string> = {
  data: 'fill-data',
  alt: 'fill-data-alt',
  dim: 'fill-data-dim',
}

/**
 * Converts a list of points into a SMOOTH svg path using Catmull-Rom
 * splines converted to cubic béziers.
 *
 * Why not just `L` (straight lines)? Because a forecast drawn with hard
 * elbows reads as "measured data"; a smooth curve reads as "trend". The
 * ai-2027 chart is entirely smooth curves, and that is most of why it
 * looks editorial rather than like a spreadsheet export.
 *
 * The maths, in one line: for each pair of points, place the two bézier
 * control handles one-sixth of the way along the vector between that
 * point's NEIGHBOURS. That guarantees the curve passes through every
 * point and that the tangents match on both sides of each point — i.e.
 * no visible kinks.
 */
function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
  }
  return d
}

export default function ForecastChart({ inView }: { inView: boolean }) {
  // One shared y-scale across all series, so the lines are comparable.
  // Scaling each series to its own max is the single most common way
  // charts lie by accident.
  const max = Math.max(...timeline.flatMap((s) => s.points), 1)
  const innerW = W - PAD.left - PAD.right
  const innerH = H - PAD.top - PAD.bottom

  const project = (points: number[]) =>
    points.map((v, i) => ({
      x: PAD.left + (i / (points.length - 1)) * innerW,
      y: PAD.top + innerH - (v / max) * innerH,
    }))

  const firstYear = years[0]
  const lastYear = years[years.length - 1]

  return (
    <div className="relative">
      {/* The black pill, top-left — ai-2027's signature "you are here" marker */}
      <div className="absolute left-0 top-0 z-10">
        <span className="year-pill">{focusYear}</span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label={`Cumulative output by year, ${firstYear} to ${lastYear}: ${timeline
          .map((s) => `${s.label} reaching ${s.points[s.points.length - 1]}`)
          .join('; ')}.`}
      >
        {timeline.map((series, si) => {
          const pts = project(series.points)
          const end = pts[pts.length - 1]
          return (
            <g key={series.key}>
              <path
                d={smoothPath(pts)}
                fill="none"
                strokeWidth={1.6}
                strokeLinecap="round"
                className={toneClass[series.tone]}
                /* pathLength={1} renormalises the path so its length is
                   exactly 1 no matter its real geometry. That lets one
                   dash rule animate every line identically — no measuring
                   with getTotalLength(), no layout reads, no JS at all. */
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: inView ? 0 : 1,
                  transition: `stroke-dashoffset 1400ms cubic-bezier(0.4, 0, 0.2, 1) ${si * 140}ms`,
                }}
              />
              {/* End-cap dot */}
              <circle
                cx={end.x}
                cy={end.y}
                r={2.4}
                className={toneFill[series.tone]}
                style={{
                  opacity: inView ? 1 : 0,
                  transition: `opacity 400ms ease ${1200 + si * 140}ms`,
                }}
              />
            </g>
          )
        })}

        {/* Inline series label sitting on the curve, ai-2027 style */}
        <text
          x={PAD.left + innerW * 0.52}
          y={PAD.top + innerH * 0.34}
          className="fill-fg-faint font-mono"
          style={{
            fontSize: 8,
            letterSpacing: '0.06em',
            opacity: inView ? 1 : 0,
            transition: 'opacity 500ms ease 900ms',
          }}
        >
          Cumulative output
        </text>
      </svg>

      {/* Year axis — mono, tiny, no axis line. Restraint is the whole look. */}
      <div className="mono-label -mt-1 flex justify-between px-1">
        <span>{firstYear}</span>
        <span>{lastYear}</span>
      </div>
    </div>
  )
}
