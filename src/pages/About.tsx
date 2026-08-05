import { usePageTitle } from '../hooks/usePageTitle';
import { about, profile } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import TerminalWindow from '../components/TerminalWindow';

const SYNTAX_COLOR: Record<string, string> = {
  blue: 'text-syntax-blue',
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
              <p key={p.slice(0, 32)} className="leading-relaxed text-mist-300">
                {p}
              </p>
            ))}

            <div className="pt-2">
              <h3 className="mb-3 font-mono text-sm text-sunshine-500">
                <span className="text-sunshine-700">{'//'}</span> education
              </h3>
              <ul className="space-y-4">
                {about.education.map((e) => (
                  <li key={e.degree} className="card p-4">
                    <p className="text-sm font-semibold text-mist-100">{e.degree}</p>
                    <p className="font-mono text-xs text-mist-400">
                      {e.school} · {e.years}
                    </p>
                    {e.details && <p className="mt-1 text-[13px] text-mist-400">{e.details}</p>}
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
                    <span className="text-signal">➜</span>{' '}
                    <span className="text-syntax-blue">~/now</span>{' '}
                    <span className="text-mist-100">{c.cmd}</span>
                  </p>
                  <p className="text-sunshine-400">{c.out}</p>
                </div>
              ))}
            </TerminalWindow>

            <div>
              <h3 className="mb-3 font-mono text-sm text-sunshine-500">
                <span className="text-sunshine-700">{'//'}</span> toolbox
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {about.skills.map((g) => (
                  <div key={g.category} className="card p-4">
                    <p className={`mb-2 font-mono text-xs font-semibold ${SYNTAX_COLOR[g.color]}`}>
                      const {g.category.toLowerCase().replace(/[^a-z]+/g, '_')} = [
                    </p>
                    <ul className="space-y-1 pl-3">
                      {g.items.map((item) => (
                        <li key={item} className="font-mono text-[13px] text-mist-300">
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
              <h3 className="mb-3 font-mono text-sm text-sunshine-500">
                <span className="text-sunshine-700">{'//'}</span> beyond the code
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
