import type { Project } from '../data/content';
import LanguageBar from './LanguageBar';

const STATUS_STYLES: Record<Project['status'], { label: string; classes: string }> = {
  active: { label: '● active', classes: 'text-data border-data/40 bg-data/10' },
  shipped: { label: '✓ shipped', classes: 'text-data-alt border-data-alt/40 bg-data-alt/10' },
  research: { label: '⚗ research', classes: 'text-syntax-violet border-syntax-violet/40 bg-syntax-violet/10' },
};

/** A GitHub-repo-flavored card for one project. */
export default function ProjectCard({ project }: { project: Project }) {
  const status = STATUS_STYLES[project.status];

  return (
    <article className="card card-hover flex h-full flex-col p-5">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="flex min-w-0 items-center gap-2 font-mono text-sm font-semibold text-accent">
          {/* repo "book" icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="shrink-0 text-fg-faint" aria-hidden="true">
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.25.25 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
          </svg>
          <span className="truncate">{project.name}</span>
        </h3>
        <span className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[11px] ${status.classes}`}>
          {status.label}
        </span>
      </div>

      <p className="mb-1 text-sm font-medium text-fg">{project.tagline}</p>
      <p className="mb-4 text-sm leading-relaxed text-fg-faint">{project.description}</p>

      {project.impact.length > 0 && (
        <ul className="mb-4 space-y-1.5">
          {project.impact.map((line) => (
            <li key={line} className="flex gap-2 text-[13px] leading-snug text-fg-muted">
              <span className="mt-0.5 shrink-0 font-mono text-accent">▹</span>
              {line}
            </li>
          ))}
        </ul>
      )}

      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.stack.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto">
        <LanguageBar languages={project.languages} />
        {project.links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="link font-mono text-xs">
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
