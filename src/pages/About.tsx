import { usePageTitle } from '../hooks/usePageTitle';
import { about, profile } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import TerminalWindow from '../components/TerminalWindow';

const SYNTAX_COLOR: Record<string, string> = {
  blue: 'text-data-alt',
  violet: 'text-syntax-violet',
  orange: 'text-syntax-orange',
  green: 'text-syntax-green',
  red: 'text-syntax-red',
};

export default function About() {
  usePageTitle('About');

  return (
    <section className="section">
      <div className="container-content">
        <SectionHeading code="01. about" title={`Hi, I'm ${profile.firstName}.`} />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Bio */}
          <div className="space-y-5">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 32)} className="leading-relaxed text-fg-muted">
                {p}
              </p>
            ))}

            <div className="pt-2">
              <h3 className="mb-3 font-mono text-sm text-accent">
                <span className="text-accent/60">{'//'}</span> education
              </h3>
              <ul className="space-y-4">
                {about.education.map((e) => (
                  <li key={e.degree} className="card p-4">
                    <p className="text-sm font-semibold text-fg">{e.degree}</p>
                    <p className="font-mono text-xs text-fg-faint">
                      {e.school} · {e.years}
                    </p>
                    {e.details && <p className="mt-1 text-[13px] text-fg-faint">{e.details}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Terminal + skills */}
          <div className="space-y-8">
            <TerminalWindow title={`${profile.firstName.toLowerCase()}@portfolio: ~/now`}>
              {about.currently.map((c) => (
                <div key={c.cmd} className="mb-3 last:mb-0">
                  <p>
                    <span className="text-data">➜</span>{' '}
                    <span className="text-data-alt">~/now</span>{' '}
                    <span className="text-fg">{c.cmd}</span>
                  </p>
                  <p className="text-accent">{c.out}</p>
                </div>
              ))}
            </TerminalWindow>

            <div>
              <h3 className="mb-3 font-mono text-sm text-accent">
                <span className="text-accent/60">{'//'}</span> toolbox
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {about.skills.map((g) => (
                  <div key={g.category} className="card p-4">
                    <p className={`mb-2 font-mono text-xs font-semibold ${SYNTAX_COLOR[g.color]}`}>
                      const {g.category.toLowerCase().replace(/[^a-z]+/g, '_')} = [
                    </p>
                    <ul className="space-y-1 pl-3">
                      {g.items.map((item) => (
                        <li key={item} className="font-mono text-[13px] text-fg-muted">
                          '{item}',
                        </li>
                      ))}
                    </ul>
                    <p className={`mt-1 font-mono text-xs ${SYNTAX_COLOR[g.color]}`}>]</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-mono text-sm text-accent">
                <span className="text-accent/60">{'//'}</span> beyond the code
              </h3>
              <div className="flex flex-wrap gap-2">
                {about.interests.map((i) => (
                  <span key={i} className="tag-yellow">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
