import { profile } from '../data/content';

/** Pulsing green "available" pill — the classic GitHub-profile status vibe. */
export default function StatusBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line-strong/25 bg-canvas-soft/80 px-3 py-1.5 font-mono text-xs text-fg-muted">
      <span className="h-2 w-2 animate-pulse-dot rounded-full bg-data" aria-hidden="true" />
      {profile.availability}
    </span>
  );
}
