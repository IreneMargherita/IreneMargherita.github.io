import { useInView } from '../../hooks/useInView'
import { useGitHub } from '../../hooks/useGitHub'
import { fallback, papers, panelCaption, GITHUB_URL, GITHUB_USER } from '../../data/panel'
import ActivityChart from './ActivityChart'
import SkillMeters from './SkillMeters'
import LangSplit from './LangSplit'
import MetricStrip, { type Metric } from './MetricStrip'
import StatusLine from './StatusLine'

/**
 * The telemetry panel — a terminal-window dashboard of Carol's output,
 * fed by the live GitHub API with a static fallback.
 *
 * Visual language: HER site's own terminal chrome (traffic-light dots,
 * mono title bar) + one data colour (the sunshine accent). Everything in
 * the body is something a real TUI could draw: a stepped chart, htop
 * gauges, a stacked bar, a status line. That constraint is what makes
 * the panel original instead of borrowed.
 *
 * ARCHITECTURE (worth stealing): the IntersectionObserver lives HERE,
 * once, and `inView` flows down as a prop — one observer, one moment of
 * "now", one choreographed entrance. Same for the GitHub fetch: children
 * receive plain data and don't know the API exists.
 */
export default function ResearchPanel({ className = '' }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2, rootMargin: '0px 0px -12% 0px' })
  const gh = useGitHub()

  const repos = gh?.repos ?? fallback.repos
  const stars = gh?.stars ?? fallback.stars
  const since = gh?.since ?? fallback.since
  const languages = gh?.languages?.length ? gh.languages : fallback.languages
  const activity = gh?.activity?.length ? gh.activity : fallback.activity

  const metrics: Metric[] = [
    { label: 'Repos', value: repos },
    { label: 'Stars', value: stars },
    { label: 'Papers', value: papers },
    { label: 'Since', value: since, raw: true },
  ]

  return (
    <div ref={ref} className={['terminal', className].join(' ')}>
      {/* Title bar — identical chrome to the hero's TerminalWindow, so the
          two windows read as one operating system. */}
      <div className="terminal-bar">
        <span className="terminal-dot bg-[#FF5F57]" aria-hidden="true" />
        <span className="terminal-dot bg-[#FEBC2E]" aria-hidden="true" />
        <span className="terminal-dot bg-[#28C840]" aria-hidden="true" />
        <p className="ml-2 flex-1 truncate font-mono text-xs text-fg-faint">
          carol@portfolio: ~/telemetry
        </p>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint transition-colors hover:text-accent"
          title={`github.com/${GITHUB_USER}`}
        >
          <span
            className={['h-1.5 w-1.5 rounded-full', gh ? 'bg-data animate-pulse-dot' : 'bg-fg-faint'].join(' ')}
            aria-hidden="true"
          />
          {gh ? 'live' : 'cached'}
        </a>
      </div>

      <div className="space-y-5 px-4 py-4 sm:px-5">
        <ActivityChart inView={inView} activity={activity} />

        <LangSplit inView={inView} languages={languages} />

        <SkillMeters inView={inView} />

        <div className="border-t border-line pt-4">
          <MetricStrip inView={inView} metrics={metrics} />
        </div>

        <StatusLine inView={inView} />

        <p className="border-t border-line pt-3 font-mono text-[10px] leading-relaxed text-fg-faint">
          {panelCaption}
        </p>
      </div>
    </div>
  )
}
