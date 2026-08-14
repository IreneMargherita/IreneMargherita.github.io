import { usePageTitle } from '../hooks/usePageTitle';
import { research, profile } from '../data/content';
import type { Publication } from '../data/content';
import SectionHeading from '../components/SectionHeading';

const TYPE_BADGE: Record<Publication['type'], string> = {
  journal: 'text-data-alt border-data-alt/40 bg-data-alt/10',
  conference: 'text-syntax-violet border-syntax-violet/40 bg-syntax-violet/10',
  preprint: 'text-syntax-orange border-syntax-orange/40 bg-syntax-orange/10',
  article: 'text-data border-data/40 bg-data/10',
};

export default function Research() {
  usePageTitle('Research & Publications');
  const scholar = profile.socials.find((s) => s.label === 'Google Scholar');

  return (
    <section className="section">
      <div className="container-content">
        <SectionHeading code="04. research" title="Research & publications" lead={research.intro} />

        {scholar && (
          <div className="-mt-4 mb-10">
            <a href={scholar.url} target="_blank" rel="noreferrer" className="btn-ghost">
              gs · view my Google Scholar profile ↗
            </a>
          </div>
        )}

        <div className="max-w-3xl space-y-4">
          {research.publications.map((pub) => (
            <article key={pub.title} className="card card-hover p-5">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={`rounded-full border px-2 py-0.5 font-mono text-[11px] ${TYPE_BADGE[pub.type]}`}>
                  {pub.type}
                </span>
                <span className="font-mono text-xs text-fg-faint">{pub.year}</span>
              </div>
              <h3 className="text-[15px] font-semibold leading-snug text-fg">{pub.title}</h3>
              <p className="mt-1 font-mono text-xs text-fg-faint">
                {pub.authors} · <span className="italic">{pub.venue}</span>
              </p>
              {pub.note && <p className="mt-2 text-[13px] text-fg-faint">{pub.note}</p>}
              {(pub.link || pub.preprint) && (
                <div className="mt-3 flex flex-wrap gap-4">
                  {pub.link && (
                    <a href={pub.link} target="_blank" rel="noreferrer" className="link font-mono text-xs">
                      journal (DOI) →
                    </a>
                  )}
                  {pub.preprint && (
                    <a href={pub.preprint} target="_blank" rel="noreferrer" className="link font-mono text-xs">
                      preprint (arXiv) →
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-14 max-w-3xl">
          <h3 className="mb-4 font-mono text-sm text-accent">
            <span className="text-accent/60">{'//'}</span> talks
          </h3>
          <ul className="space-y-3">
            {research.talks.map((t) => (
              <li key={t.title} className="card flex flex-wrap items-baseline justify-between gap-2 p-4">
                <div>
                  <p className="text-sm font-medium text-fg">{t.title}</p>
                  <p className="font-mono text-xs text-fg-faint">{t.event}</p>
                </div>
                <span className="font-mono text-xs text-fg-faint">{t.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
