import { profile } from '../data/content';

/** Pulsing green "available" pill — the classic GitHub-profile status vibe. */
export default function StatusBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-ink-500 bg-ink-800/80 px-3 py-1.5 font-mono text-xs text-mist-300">
      <span className="h-2 w-2 animate-pulse-dot rounded-full bg-signal" aria-hidden="true" />
      {profile.availability}
    </span>
  );
}
