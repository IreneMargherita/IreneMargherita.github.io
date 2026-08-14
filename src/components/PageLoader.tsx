/**
 * Suspense fallback shown for the split-second while a lazy page's
 * JS chunk downloads. Kept terminal-flavored so even loading is on-brand.
 */
export default function PageLoader() {
  return (
    <div className="container-content flex min-h-[50vh] items-center justify-center">
      <p className="font-mono text-sm text-fg-faint" role="status">
        <span className="text-accent">$</span> loading module
        <span className="animate-blink text-accent">▍</span>
      </p>
    </div>
  );
}
