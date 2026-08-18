import { useContributions } from '../hooks/useContributions';
import { GITHUB_USER } from '../data/panel';

/**
 * GitHub contribution heatmap, re-skinned in sunshine yellow — now LIVE.
 * Real calendar data via useContributions (spec 006); if the data source is
 * unreachable, the seeded placeholder below renders instead, clearly labeled.
 *
 * Lessons that remain true in both modes:
 * 1. SEEDED randomness for the fallback — deterministic UI, no flicker.
 * 2. SEQUENTIAL color ramp — one hue, five lightness steps, instantly legible.
 * 3. GRACEFUL DEGRADATION — third-party outage ≠ broken site.
 */

const WEEKS = 52;
const DAYS = 7;

/** Yellow intensity ramp: level 0 (none) → level 4 (max) */
const RAMP = ['bg-line', 'bg-accent/25', 'bg-accent/50', 'bg-accent/75', 'bg-accent'];

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildFallback(): number[][] {
  const rand = mulberry32(20260804); // fixed seed = identical graph every render
  const weeks: number[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const days: number[] = [];
    const wave = 0.55 + 0.45 * Math.sin((w / WEEKS) * Math.PI * 2.3 + 1.2);
    for (let d = 0; d < DAYS; d++) {
      const weekdayBoost = d > 0 && d < 6 ? 1 : 0.45;
      const r = rand() * wave * weekdayBoost;
      days.push(r > 0.52 ? 4 : r > 0.38 ? 3 : r > 0.24 ? 2 : r > 0.12 ? 1 : 0);
    }
    weeks.push(days);
  }
  return weeks;
}

const FALLBACK = buildFallback();

export default function ContributionGraph() {
  const live = useContributions();

  return (
    <div className="card overflow-x-auto p-5">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="font-mono text-xs text-fg-faint">
          <span className="text-accent">$</span> git log --graph — a year of building
        </p>
        <p className="hidden font-mono text-[11px] text-fg-faint sm:block">
          {live ? (
            <>
              <span className="text-data">●</span> live · {live.total} contributions ·{' '}
              {GITHUB_USER}
            </>
          ) : (
            'placeholder · live data loads once online'
          )}
        </p>
      </div>

      <div
        className="flex min-w-[640px] gap-[3px]"
        role="img"
        aria-label={
          live
            ? `GitHub contribution heatmap: ${live.total} contributions in the last year`
            : 'Decorative contribution activity heatmap (placeholder)'
        }
      >
        {live
          ? live.weeks.map((week, w) => (
              <div key={w} className="flex flex-col gap-[3px]">
                {week.map((day, d) =>
                  day ? (
                    <span
                      key={d}
                      className={`h-[10px] w-[10px] rounded-[2px] ${RAMP[day.level]}`}
                      title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                    />
                  ) : (
                    <span key={d} className="h-[10px] w-[10px]" />
                  ),
                )}
              </div>
            ))
          : FALLBACK.map((week, w) => (
              <div key={w} className="flex flex-col gap-[3px]">
                {week.map((level, d) => (
                  <span key={d} className={`h-[10px] w-[10px] rounded-[2px] ${RAMP[level]}`} />
                ))}
              </div>
            ))}
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[11px] text-fg-faint">
        less
        {RAMP.map((c) => (
          <span key={c} className={`h-[10px] w-[10px] rounded-[2px] ${c}`} />
        ))}
        more
      </div>
    </div>
  );
}
