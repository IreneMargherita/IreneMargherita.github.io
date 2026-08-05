# Tasks 002 — GitHub Pages Deploy

## Claude (code) — done
- [x] T001 `scripts/copy-404.mjs` + build chain emits `dist/404.html`
- [x] T002 `.github/workflows/deploy.yml` (Actions: build on push → deploy to Pages)
- [x] T003 `vite.config.ts` comment documenting the `base` rule for non-root repos
- [x] T004 README deploy section rewritten (Pages primary, IONOS fallback)
- [x] T005 Local build verified: `dist/404.html` present and identical to `index.html`

## Carol (one-time manual steps)
- [ ] T006 Install Git if needed → `git --version` (get it from git-scm.com)
- [ ] T007 Create GitHub account (if none) → note your username
- [ ] T008 On github.com: New repository → name it exactly `<username>.github.io`,
      Public, no README/gitignore (we have our own) → Create
- [ ] T009 In PowerShell at the project folder:
      ```
      git init
      git add -A
      git commit -m "001-mvp + 002-deploy: spec-driven portfolio"
      git branch -M main
      git remote add origin https://github.com/<username>/<username>.github.io.git
      git push -u origin main
      ```
      (First push opens a browser window to sign in — that's Git Credential Manager.)
- [ ] T010 Repo → Settings → Pages → "Build and deployment" → Source: **GitHub Actions**
- [ ] T011 Watch the Actions tab turn green (~1–2 min) → visit
      `https://<username>.github.io` → refresh on `/awards` to confirm deep links
- [ ] T012 ⚠️ Hold off sharing the URL until `[Placeholder]` content is replaced

## Backlog
- [ ] B1 Custom domain (e.g. carolgudumotou.com) + HTTPS + `canonical`/OG URLs
- [ ] B2 Wire ContributionGraph to the real GitHub API once the repo is active
