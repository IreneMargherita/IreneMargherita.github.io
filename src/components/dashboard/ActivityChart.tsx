import type { GitHubStats } from '../../hooks/useGitHub'

const W = 340
const H = 110
const PAD = { top: 14, right: 10, bottom: 16, left: 10 }

/**
 * Cumulative GitHub output as a STEPPED area chart.
 *
 * Why steps, not curves? A smooth spline says "continuous trend" — the
 * grammar of forecasts. A staircase says "discrete events accumulating" —
 * the grammar of commits, releases, ships. Repos land one at a time, so
 * the honest shape IS a staircase. (It also looks nothing like the smooth
 * multi-line forecast charts everyone associates with ai-2027 — one
 * decision, both goals.)
 *
 * The fill is a vertical fade of the accent — solid at the line, gone at
 * the baseline — so the yellow reads as glow off the data rather than a
 * painted block.
 */
export default function ActivityChart({
  inView,
  activity,
}: {
  inView: boolean
  activity: GitHubStats['activity']
}) {
  const innerW = W - PAD.left - PAD.right
  const innerH = H - PAD.top - PAD.bottom
  const max = Math.max(...activity.map((a) => a.cumulative), 1)

  const x = (i: number) => PAD.left + (i / Math.max(activity.length - 1, 1)) * innerW
  const y = (v: number) => PAD.top + innerH - (v / max) * innerH

  // Step path: horizontal run to the next year, then the vertical rise.
  // "H then V" (rise at the END of the run) matches how the number is
  // true over time: you HAD 14 repos all year, then the count jumped.
  let line = `M ${x(0)} ${y(activity[0].cumulative)}`
  for (let i = 1; i < activity.length; i++) {
    line += ` H ${x(i)} V ${y(activity[i].cumulative)}`
  }
  const area = `${line} V ${PAD.top + innerH} H ${x(0)} Z`

  const last = activity[activity.length - 1]
  const endX = x(activity.length - 1)
  const endY = y(last.cumulative)

  return (
    <div>
      {/* Prompt line — the chart's "title" speaks terminal, not chart-ese */}
      <p className="font-mono text-[11px] leading-none text-fg-faint">
        <span className="text-data">➜</span> <span className="text-accent">~/github</span>{' '}
        <span className="text-fg-muted">git log --oneline | wc -l</span>
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-2 w-full"
        role="img"
        aria-label={`Cumulative public repositories, ${activity[0].year} to ${last.year}: rising to ${last.cumulative}.`}
      >
        <defs>
          <linearGradient id="tele-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--c-accent))" stopOpacity="0.28" />
            <stop offset="100%" stopColor="rgb(var(--c-accent))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Dotted horizontal gridlines — quarter, half, three-quarter */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={PAD.left}
            x2={PAD.left + innerW}
            y1={PAD.top + innerH * f}
            y2={PAD.top + innerH * f}
            className="stroke-line"
            strokeWidth="1"
            strokeDasharray="1 5"
          />
        ))}

        {/* Area: fades in after the line has mostly drawn */}
        <path
          d={area}
          fill="url(#tele-fill)"
          style={{ opacity: inView ? 1 : 0, transition: 'opacity 700ms ease 700ms' }}
        />

        {/* The stepped line itself */}
        <path
          d={line}
          fill="none"
          strokeWidth="1.8"
          strokeLinecap="square"
          className="stroke-accent"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: inView ? 0 : 1,
            transition: 'stroke-dashoffset 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        {/* Live cursor: the pulse ring uses SVG's own animate elements, so
            it costs nothing on the main thread. */}
        <circle
          cx={endX}
          cy={endY}
          r="3"
          className="fill-accent"
          style={{ opacity: inView ? 1 : 0, transition: 'opacity 300ms ease 1100ms' }}
        />
        <circle
          cx={endX}
          cy={endY}
          r="3"
          fill="none"
          className="stroke-accent"
          strokeWidth="1"
          style={{ opacity: inView ? 1 : 0 }}
        >
          <animate attributeName="r" values="3;9" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Total, annotated at the line's end like a measurement readout */}
        <text
          x={endX - 8}
          y={endY - 8}
          textAnchor="end"
          className="fill-fg font-mono"
          style={{
            fontSize: 10,
            opacity: inView ? 1 : 0,
            transition: 'opacity 400ms ease 1200ms',
          }}
        >
          Σ {last.cumulative} repos
        </text>
      </svg>

      <div className="mono-label flex justify-between px-0.5">
        <span>{activity[0].year}</span>
        <span className="text-accent">now</span>
      </div>
    </div>
  )
}
