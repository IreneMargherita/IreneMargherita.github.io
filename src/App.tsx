import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

/**
 * React.lazy = code-splitting. Each page below becomes its own JS file that
 * the browser downloads only when the visitor actually navigates there.
 * Analogy: instead of mailing someone the whole encyclopedia, you send the
 * cover + index (the shell), then individual chapters on request.
 */
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Experience = lazy(() => import('./pages/Experience'));
const Research = lazy(() => import('./pages/Research'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/research" element={<Research />} />
          {/* Retired pages (2026-08-14): /awards, /testimonials, /about,
              /contact. Their URLs fall through to the terminal 404 — the
              correct HTTP story for pages that no longer exist. Contact
              lives on as a mailto: link in the hero and footer. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
