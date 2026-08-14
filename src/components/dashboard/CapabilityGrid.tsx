import { capabilities, type CapabilityIcon } from '../../data/panel'

/**
 * All six icons live in ONE component behind a lookup, rather than six
 * files exporting six near-identical SVGs.
 *
 * The rule of thumb: duplication is cheaper than the wrong abstraction —
 * but these genuinely share a shape (same box, same stroke, same size),
 * so the abstraction is right. The moment one of them needs a different
 * viewBox, split it out.
 */
function Glyph({ name }: { name: CapabilityIcon }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className: 'h-3.5 w-3.5',
  }

  switch (name) {
    case 'wave': // numerical methods / PDEs
      return (
        <svg {...common}>
          <path d="M2 12c2.5-6 5-6 7.5 0s5 6 7.5 0 4-4 5-2" />
        </svg>
      )
    case 'brain': // machine learning
      return (
        <svg {...common}>
          <circle cx="6" cy="7" r="2" />
          <circle cx="6" cy="17" r="2" />
          <circle cx="18" cy="12" r="2" />
          <path d="M8 7.8 16 11M8 16.2 16 13" />
        </svg>
      )
    case 'code':
      return (
        <svg {...common}>
          <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
        </svg>
      )
    case 'cloud':
      return (
        <svg {...common}>
          <path d="M6.5 18A4 4 0 0 1 7 10a5 5 0 0 1 9.6 1.2A3.4 3.4 0 0 1 17.5 18Z" />
        </svg>
      )
    case 'chart': // quant / fintech
      return (
        <svg {...common}>
          <path d="M4 20V4M4 20h16" />
          <path d="m7 14 3.5-4 3 2.5L20 6" />
        </svg>
      )
    case 'stack': // systems design
      return (
        <svg {...common}>
          <path d="m12 3 8 4-8 4-8-4 8-4Z" />
          <path d="m4 12 8 4 8-4M4 17l8 4 8-4" />
        </svg>
      )
  }
}

export default function CapabilityGrid({ inView }: { inView: boolean }) {
  return (
    <div className="flex gap-3">
      {/* Vertical rail label — the sideways "AI CAPABILITIES" on ai-2027 */}
      <div
        className="mono-label shrink-0 self-center whitespace-nowrap"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        Capabilities
      </div>

      <div className="grid flex-1 grid-cols-1 gap-x-3 gap-y-1.5 sm:grid-cols-2">
        {capabilities.map((cap, i) => (
          <div
            key={cap.label}
            className={['panel-tile', inView ? 'animate-pop-in' : 'opacity-0'].join(' ')}
            style={{ animationDelay: `${i * 55}ms` }}
          >
            <span className="panel-chip">
              <Glyph name={cap.icon} />
            </span>
            <span className="font-mono text-[11px] leading-tight text-fg">{cap.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
