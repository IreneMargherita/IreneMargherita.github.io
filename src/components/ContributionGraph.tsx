/**
 * GitHub-style contribution heatmap, re-skinned in sunshine yellow.
 * 52 weeks × 7 days, decorative (placeholder data for the MVP — a real
 * GitHub-API version is backlog item B4).
 *
 * Two lessons hiding in here:
 *
 * 1. SEEDED randomness. `Math.random()` gives different output every render,
 *    which makes UI flicker and tests impossible. mulberry32 is a tiny PRNG:
 *    same seed in → same "random" sequence out, forever. Determinism makes
 *    the component a pure function of its props.
 *
 * 2. SEQUENTIAL color ramp. A "more → less" scale should vary lightness
 *    within ONE hue (dark ink → dim gold → full sunshine), so intensity is
 *    readable at a glance — never a rainbow.
 */

const WEEKS = 52;
const DAYS = 7;

/** Yellow intensity ramp: level 0 (none) → level 4 (max) */
const RAMP = ['bg-line', 'bg-data/30', 'bg-data/55', 'bg-data/80', 'bg-data'];

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCells(): number[][] {
  const rand = mulberry32(20260804); // fixed seed = identical graph every render
  const weeks: number[][] = [];

  for (let w = 0; w < WEEKS; w++) {
    const days: number[] = [];
    // a slow seasonal wave so activity looks organic, not uniform noise
    const wave = 0.55 + 0.45 * Math.sin((w / WEEKS) * Math.PI * 2.3 + 1.2);
    for (let d = 0; d < DAYS; d++) {
      const weekdayBoost = d > 0 && d < 6 ? 1 : 0.45; // lighter weekends
      const r = rand() * wave * weekdayBoost;
      const level = r > 0.52 ? 4 : r > 0.38 ? 3 : r > 0.24 ? 2 : r > 0.12 ? 1 : 0;
      days.push(level);
    }
    weeks.push(days);
  }
  return weeks;
}

const CELLS = buildCells();

export default function ContributionGraph() {
  return (
    <div className="card overflow-x-auto p-5">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="font-mono text-xs text-fg-faint">
          <span className="text-accent">$</span> git log --graph — a year of building
        </p>
        <p className="hidden font-mono text-[11px] text-fg-faint sm:block">
          placeholder data · wire to GitHub API later
        </p>
      </div>

      <div
        className="flex min-w-[640px] gap-[3px]"
        role="img"
        aria-label="Decorative contribution activity heatmap"
      >
        {CELLS.map((week, w) => (
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
