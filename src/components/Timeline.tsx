import type { ExperienceItem } from '../data/content';

/** Vertical timeline — the yellow rail + node dots carry the eye down the page. */
export default function Timeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="relative ml-3 space-y-10 border-l border-line-strong/25 pl-8">
      {items.map((item) => (
        <li key={`${item.role}-${item.start}`} className="relative">
          {/* node dot */}
          <span
            className="absolute -left-[39px] top-1.5 h-3 w-3 rounded-full border-2 border-accent/60 bg-canvas"
            aria-hidden="true"
          />
          <p className="font-mono text-xs text-fg-faint">
            {item.start} — {item.end} · {item.location}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-fg">{item.role}</h3>
          <p className="font-mono text-sm text-accent">@ {item.org}</p>
          <p className="mt-2 text-sm leading-relaxed text-fg-faint">{item.summary}</p>

          <ul className="mt-3 space-y-1.5">
            {item.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-[13px] leading-snug text-fg-muted">
                <span className="mt-0.5 shrink-0 font-mono text-accent">▹</span>
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
