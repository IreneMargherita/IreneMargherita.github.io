import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SPAs don't reload the page on navigation, so the browser keeps the old
 * scroll position. This component resets it whenever the route changes.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}
