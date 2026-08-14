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
import ResearchPanel from '../components/dashboard/ResearchPanel';

export default function Home() {
  usePageTitle();
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* ─────────────────────────── Hero ─────────────────────────── */}
      <section className="section">
        <div className="container-content grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-fade-up">
            <p className="mb-4 font-mono text-sm text-fg-faint">
              <span className="text-accent">~/{profile.firstName.toLowerCase()}</span>{' '}
              <span className="text-accent/60">$</span> whoami
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-fg sm:text-5xl lg:text-6xl">
              {profile.name}
              <span className="glow-text text-accent">_</span>
            </h1>

            <p className="mt-3 text-lg font-medium text-fg-muted sm:text-xl">{profile.title}</p>

            <p className="mt-4 min-h-[1.75rem] text-base sm:text-lg">
              <span className="font-mono text-accent/70">&gt; </span>
              <Typewriter lines={profile.typewriterLines} />
            </p>

            <p className="mt-5 max-w-xl leading-relaxed text-fg-muted">{profile.heroIntro}</p>

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
                <span className="text-data">➜</span> <span className="text-data-alt">~/trading</span>{' '}
                <span className="text-fg">python run_strategy.py --live</span>
              </p>
              <p className="mt-2 text-fg-faint">[08:31:02] loading market data feed…</p>
              <p className="text-fg-faint">
                [08:31:03] <span className="text-data">✓</span> connected · 142 symbols streaming
              </p>
              <p className="text-fg-faint">
                [08:31:03] <span className="text-data">✓</span> risk limits armed · max_dd 2.0%
              </p>
              <p className="text-fg-faint">
                [08:31:04] <span className="text-accent">λ</span> momentum_v3 warming up…
              </p>
              <p className="mt-2">
                <span className="text-syntax-violet">INFO</span>{' '}
                <span className="text-fg-muted">
                  strategy healthy · sharpe(backtest)=<span className="text-accent">[tbd]</span>
                </span>
              </p>
              <p className="mt-2">
                <span className="text-data">➜</span> <span className="text-data-alt">~/trading</span>{' '}
                <span className="animate-blink text-accent">▍</span>
              </p>
            </TerminalWindow>
          </div>
        </div>
      </section>

      {/* ───────────────── Essay + instrument panel ────────────────── */}
      {/* The ai-2027 layout signature: a narrow serif reading column on the
          left, a live-looking data panel pinned on the right. The panel is
          `sticky` so it stays with you as the prose scrolls past it. */}
      <section className="section-divider section">
        <div className="container-content grid gap-10 lg:grid-cols-[1fr_minmax(320px,380px)]">
          <div>
            <p className="mono-label mb-3">The work</p>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Research methods, applied to markets
            </h2>
            <div className="prose-paper mt-5 max-w-prose">
              <p>
                My background is in numerical methods and machine learning for physical systems — specifically
                operator networks for Bayesian parameter estimation in PDEs, published in{' '}
                <em>Computer Physics Communications</em>.
              </p>
              <p>
                The same problem shape shows up in markets: you have noisy observations, an unknown
                parameter you care about, and a model that has to stay honest about its own uncertainty.
                What I&rsquo;m building now applies that framing to proprietary trading systems.
              </p>
              <p>
                The panel to the right summarises where that work stands. Numbers update as the work does.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link to="/research" className="link font-mono text-sm">
                read the research →
              </Link>
              <Link to="/about" className="link font-mono text-sm">
                more about me →
              </Link>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <ResearchPanel />
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
                <p className="font-mono text-sm font-semibold text-accent">{e.label} →</p>
                <p className="mt-2 text-[13px] leading-snug text-fg-muted">{e.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
