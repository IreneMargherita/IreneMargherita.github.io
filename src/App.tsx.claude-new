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
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Experience = lazy(() => import('./pages/Experience'));
const Research = lazy(() => import('./pages/Research'));
const Awards = lazy(() => import('./pages/Awards'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/research" element={<Research />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          {/* 005-restore (2026-08-18): the four pages retired on 08-14 are
              back — for an O-1A audience, Awards/Testimonials/About/Contact
              are the evidence, not extras. See specs/005-restore-pages. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
