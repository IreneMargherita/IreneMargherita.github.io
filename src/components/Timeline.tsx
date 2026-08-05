import type { ExperienceItem } from '../data/content';

/** Vertical timeline — the yellow rail + node dots carry the eye down the page. */
export default function Timeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="relative ml-3 space-y-10 border-l border-ink-500 pl-8">
      {items.map((item) => (
        <li key={`${item.role}-${item.start}`} className="relative">
          {/* node dot */}
          <span
            className="absolute -left-[39px] top-1.5 h-3 w-3 rounded-full border-2 border-sunshine-500 bg-ink-900 shadow-glow-sm"
            aria-hidden="true"
          />
          <p className="font-mono text-xs text-mist-600">
            {item.start} — {item.end} · {item.location}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-mist-100">{item.role}</h3>
          <p className="font-mono text-sm text-sunshine-400">@ {item.org}</p>
          <p className="mt-2 text-sm leading-relaxed text-mist-400">{item.summary}</p>

          <ul className="mt-3 space-y-1.5">
            {item.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-[13px] leading-snug text-mist-300">
                <span className="mt-0.5 shrink-0 font-mono text-sunshine-500">▹</span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}
