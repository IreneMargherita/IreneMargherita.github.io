# Plan 002 — How the GitHub Pages deploy works

## 1. Why nothing about the design changes

`npm run build` compiles React + Tailwind into plain HTML/CSS/JS in `dist/`.
A static host is just a file-cabinet with a web address — IONOS, GitHub Pages,
Netlify all hand out the same files. Swapping hosts = swapping cabinets.

## 2. The three mechanics (and the reasoning)

### a) SPA deep links → `404.html` trick (replaces `.htaccess`)
GitHub Pages can't run Apache rewrite rules. Instead: when Pages can't find a
file for `/awards`, it serves `404.html` — so we make `404.html` a byte-for-byte
copy of `index.html`. The visitor receives the full app, React Router reads the
URL bar, renders the Awards page. Implemented as a postbuild step:
`scripts/copy-404.mjs` (4 lines, Node built-ins only, cross-platform — no new
dependencies, honoring Constitution Art. V).

### b) URL root → repo naming
| Repo name | Site URL | Config needed |
|-----------|----------|---------------|
| `<username>.github.io` ★ | `https://<username>.github.io/` | none (base stays `/`) |
| anything else | `https://<username>.github.io/<repo>/` | `base: '/<repo>/'` in vite.config.ts |

★ Recommended. A comment in `vite.config.ts` documents the alternative.

### c) CI/CD → `.github/workflows/deploy.yml`
GitHub Actions is a robot that wakes on every push: checks out the code, installs
deps with `npm ci` (ci = "clean install from the lockfile", perfectly reproducible),
runs the build, uploads `dist/` and deploys it to Pages. Uses GitHub's official
actions (`upload-pages-artifact` + `deploy-pages`) with OIDC permissions —
no passwords or tokens stored anywhere.

## 3. Decisions

- **D-1** Keep `public/.htaccess`: inert on Pages, preserves the IONOS fallback.
- **D-2** `npm ci` (not `npm install`) in CI — installs exactly the lockfile, fails
  loudly if lockfile and package.json disagree. Lesson: builds you can reproduce
  are builds you can trust.
- **D-3** Public repo is acceptable and desirable (portfolio code is itself
  evidence of craft). Trading code never enters this repo.
- **D-4** `404.html` returns HTTP 404 status on deep links — harmless for a
  portfolio; revisit only if SEO of inner pages ever matters (custom domain +
  prerendering would be a future spec).
