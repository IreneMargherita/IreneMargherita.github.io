/**
 * Suspense fallback shown for the split-second while a lazy page's
 * JS chunk downloads. Kept terminal-flavored so even loading is on-brand.
 */
export default function PageLoader() {
  return (
    <div className="container-content flex min-h-[50vh] items-center justify-center">
      <p className="font-mono text-sm text-mist-600" role="status">
        <span className="text-sunshine-500">$</span> loading module
        <span className="animate-blink text-sunshine-500">▍</span>
      </p>
    </div>
  );
}
