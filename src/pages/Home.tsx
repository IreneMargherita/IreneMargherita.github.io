import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { profile, stats, projects, evidenceLinks } from '../data/content';
import Typewriter from '../components/Typewriter';
import TerminalWindow from '../components/TerminalWindow';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import ProjectCard from '../components/ProjectCard';
import ContributionGraph from '../components/ContributionGraph';
import SectionHeading from '../components/SectionHeading';

export default function Home() {
  usePageTitle();
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* ─────────────────────────── Hero ─────────────────────────── */}
      <section className="section">
        <div className="container-content grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-fade-up">
            <p className="mb-4 font-mono text-sm text-mist-400">
              <span className="text-sunshine-500">~/{profile.firstName.toLowerCase()}</span>{' '}
              <span className="text-sunshine-700">$</span> whoami
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-mist-100 sm:text-5xl lg:text-6xl">
              {profile.name}
              <span className="glow-text text-sunshine-500">_</span>
            </h1>

            <p className="mt-3 text-lg font-medium text-mist-300 sm:text-xl">{profile.title}</p>

            <p className="mt-4 min-h-[1.75rem] text-base sm:text-lg">
              <span className="font-mono text-sunshine-700">&gt; </span>
              <Typewriter lines={profile.typewriterLines} />
            </p>

            <p className="mt-5 max-w-xl leading-relaxed text-mist-400">{profile.heroIntro}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/projects" className="btn-primary">
                view projects →
              </Link>
              <Link to="/contact" className="btn-ghost">
                get in touch
              </Link>
            </div>

            <div className="mt-6">
              <StatusBadge />
            </div>
          </div>

          {/* Terminal side */}
          <div className="animate-fade-up">
            <TerminalWindow title={`${profile.firstName.toLowerCase()}@portfolio: ~/trading`}>
              <p>
                <span className="text-signal">➜</span> <span className="text-syntax-blue">~/trading</span>{' '}
                <span className="text-mist-100">python run_strategy.py --live</span>
              </p>
              <p className="mt-2 text-mist-600">[08:31:02] loading market data feed…</p>
              <p className="text-mist-600">
                [08:31:03] <span className="text-signal">✓</span> connected · 142 symbols streaming
              </p>
              <p className="text-mist-600">
                [08:31:03] <span className="text-signal">✓</span> risk limits armed · max_dd 2.0%
              </p>
              <p className="text-mist-600">
                [08:31:04] <span className="text-sunshine-400">λ</span> momentum_v3 warming up…
              </p>
              <p className="mt-2">
                <span className="text-syntax-violet">INFO</span>{' '}
                <span className="text-mist-300">
                  strategy healthy · sharpe(backtest)=<span className="text-sunshine-400">[tbd]</span>
                </span>
              </p>
              <p className="mt-2">
                <span className="text-signal">➜</span> <span className="text-syntax-blue">~/trading</span>{' '}
                <span className="animate-blink text-sunshine-500">▍</span>
              </p>
            </TerminalWindow>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── Stats ─────────────────────────── */}
      <section className="section-divider section">
        <div className="container-content">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} stat={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────── Contribution ─────────────────────── */}
      <section className="section pt-0">
        <div className="container-content">
          <ContributionGraph />
        </div>
      </section>

      {/* ─────────────────────── Featured work ─────────────────────── */}
      <section className="section-divider section">
        <div className="container-content">
          <SectionHeading
            code="featured work"
            title="Systems I'm building"
            lead="Proprietary trading infrastructure — presented with the architecture and outcomes that matter, since the code itself stays private."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
          <div className="mt-8">
            <Link to="/projects" className="link font-mono text-sm">
              cat all_projects.md →
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────── Evidence band ─────────────────────── */}
      <section className="section-divider section">
        <div className="container-content">
          <SectionHeading
            code="for reviewers"
            title="Reviewing my credentials?"
            lead="Investors, researchers, and immigration reviewers — everything you need is organized below."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {evidenceLinks.map((e) => (
              <Link key={e.to} to={e.to} className="card card-hover group p-5">
                <p className="font-mono text-sm font-semibold text-sunshine-400 group-hover:text-sunshine-300">
                  {e.label} →
                </p>
                <p className="mt-2 text-[13px] leading-snug text-mist-400">{e.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
