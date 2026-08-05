import { useEffect } from 'react';
import { profile } from '../data/content';

/**
 * Sets the browser-tab title for a page.
 * Teaching note: a custom hook is just a function that uses other hooks —
 * it lets every page share this behavior without copy-pasting useEffect.
 */
export function usePageTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} — ${profile.name}` : `${profile.name} — ${profile.title}`;
  }, [page]);
}
