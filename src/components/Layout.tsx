import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import PageLoader from './PageLoader';

/**
 * The shell every page renders inside: nav on top, footer below,
 * and <Outlet /> where React Router injects the current page.
 * The Suspense boundary lives here so the nav/footer stay visible
 * while a lazy page chunk is still downloading.
 */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Keyboard users can skip straight past the nav (WCAG 2.4.1) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-accent-ink"
      >
        skip to content
      </a>

      <Navbar />

      <main id="main" className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
