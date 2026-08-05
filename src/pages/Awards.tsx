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
            <h3 className="mb-4 font-mono text-sm text-sunshine-500">
              <span className="text-sunshine-700">{'//'}</span> awards & honors
            </h3>
            <ul className="space-y-4">
              {recognition.awards.map((a) => (
                <li key={a.title} className="card card-hover p-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-lg text-sunshine-500" aria-hidden="true">
                      ★
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-mist-100">{a.title}</p>
                      <p className="font-mono text-xs text-mist-400">
                        {a.issuer} · {a.year}
                      </p>
                      <p className="mt-2 text-[13px] leading-snug text-mist-400">{a.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Press */}
          <div>
            <h3 className="mb-4 font-mono text-sm text-sunshine-500">
              <span className="text-sunshine-700">{'//'}</span> press & media
            </h3>
            <ul className="space-y-4">
              {recognition.press.map((p) => (
                <li key={p.title} className="card card-hover p-5">
                  <p className="font-mono text-xs uppercase tracking-wide text-syntax-blue">{p.outlet}</p>
                  <p className="mt-1 text-sm font-medium text-mist-100">“{p.title}”</p>
                  <p className="mt-1 font-mono text-xs text-mist-600">{p.year}</p>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="link mt-2 inline-block font-mono text-xs">
                      read coverage →
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* Judging */}
            <h3 className="mb-4 mt-10 font-mono text-sm text-sunshine-500">
              <span className="text-sunshine-700">{'//'}</span> judging & peer review
            </h3>
            <ul className="space-y-4">
              {recognition.judging.map((j) => (
                <li key={j.role} className="card p-5">
                  <p className="text-sm font-semibold text-mist-100">{j.role}</p>
                  <p className="font-mono text-xs text-mist-400">
                    {j.org} · {j.year}
                  </p>
                  <p className="mt-2 text-[13px] leading-snug text-mist-400">{j.description}</p>
                </li>
              ))}
            </ul>

            {/* Memberships */}
            <h3 className="mb-4 mt-10 font-mono text-sm text-sunshine-500">
              <span className="text-sunshine-700">{'//'}</span> memberships
            </h3>
            <ul className="space-y-3">
              {recognition.memberships.map((m) => (
                <li key={m.org} className="card flex flex-wrap items-baseline justify-between gap-2 p-4">
                  <p className="text-sm font-medium text-mist-100">{m.org}</p>
                  <p className="font-mono text-xs text-mist-400">
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
