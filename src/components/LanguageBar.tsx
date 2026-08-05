import type { ProjectLanguage } from '../data/content';

/** GitHub-repo-style language composition bar + dot legend. */
export default function LanguageBar({ languages }: { languages: ProjectLanguage[] }) {
  return (
    <div>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-ink-700" aria-hidden="true">
        {languages.map((l) => (
          <span key={l.name} style={{ width: `${l.pct}%`, backgroundColor: l.color }} />
        ))}
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {languages.map((l) => (
          <li key={l.name} className="flex items-center gap-1.5 font-mono text-[11px] text-mist-400">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: l.color }} aria-hidden="true" />
            {l.name} <span className="text-mist-600">{l.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
