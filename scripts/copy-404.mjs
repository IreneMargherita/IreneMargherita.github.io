/**
 * GitHub Pages SPA fallback (spec 002, plan §2a).
 * Pages serves 404.html for any path it can't find — so we make 404.html a
 * copy of index.html, and React Router renders the right page client-side.
 * Node built-ins only: works the same on Windows, macOS, Linux, and CI.
 */
import { copyFileSync } from 'node:fs';

copyFileSync('dist/index.html', 'dist/404.html');
console.log('✓ dist/404.html created (SPA deep-link fallback for GitHub Pages)');
