import type { Stat } from '../data/content';

export default function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="card p-5 text-center">
      <p className="font-mono text-3xl font-semibold text-sunshine-500 glow-text">{stat.value}</p>
      <p className="mt-1 text-sm text-mist-400">{stat.label}</p>
      {stat.hint && <p className="mt-1 font-mono text-[10px] text-mist-700">{stat.hint}</p>}
    </div>
  );
}
