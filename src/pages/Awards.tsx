import { usePageTitle } from '../hooks/usePageTitle';
import { recognition } from '../data/content';
import SectionHeading from '../components/SectionHeading';

export default function Awards() {
  usePageTitle('Awards & Recognition');

  return (
    <section className="section">
      <div className="container-content">
        <SectionHeading code="05. recognition" title="Awards & recognition" lead={recognition.intro} />

        <div className="grid max-w-5xl gap-10 lg:grid-cols-2">
          {/* Awards */}
          <div>
            <h3 className="mb-4 font-mono text-sm text-accent">
              <span className="text-accent/60">{'//'}</span> awards & honors
            </h3>
            <ul className="space-y-4">
              {recognition.awards.map((a) => (
                <li key={a.title} className="card card-hover p-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-lg text-accent" aria-hidden="true">
                      ★
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-fg">{a.title}</p>
                      <p className="font-mono text-xs text-fg-faint">
                        {a.issuer} · {a.year}
                      </p>
                      <p className="mt-2 text-[13px] leading-snug text-fg-faint">{a.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Press */}
          <div>
            <h3 className="mb-4 font-mono text-sm text-accent">
              <span className="text-accent/60">{'//'}</span> press & media
            </h3>
            <ul className="space-y-4">
              {recognition.press.map((p) => (
                <li key={p.title} className="card card-hover p-5">
                  <p className="font-mono text-xs uppercase tracking-wide text-data-alt">{p.outlet}</p>
                  <p className="mt-1 text-sm font-medium text-fg">“{p.title}”</p>
                  <p className="mt-1 font-mono text-xs text-fg-faint">{p.year}</p>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="link mt-2 inline-block font-mono text-xs">
                      read coverage →
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* Judging */}
            <h3 className="mb-4 mt-10 font-mono text-sm text-accent">
              <span className="text-accent/60">{'//'}</span> judging & peer review
            </h3>
            <ul className="space-y-4">
              {recognition.judging.map((j) => (
                <li key={j.role} className="card p-5">
                  <p className="text-sm font-semibold text-fg">{j.role}</p>
                  <p className="font-mono text-xs text-fg-faint">
                    {j.org} · {j.year}
                  </p>
                  <p className="mt-2 text-[13px] leading-snug text-fg-faint">{j.description}</p>
                </li>
              ))}
            </ul>

            {/* Memberships */}
            <h3 className="mb-4 mt-10 font-mono text-sm text-accent">
              <span className="text-accent/60">{'//'}</span> memberships
            </h3>
            <ul className="space-y-3">
              {recognition.memberships.map((m) => (
                <li key={m.org} className="card flex flex-wrap items-baseline justify-between gap-2 p-4">
                  <p className="text-sm font-medium text-fg">{m.org}</p>
                  <p className="font-mono text-xs text-fg-faint">
                    {m.level} · {m.year}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
