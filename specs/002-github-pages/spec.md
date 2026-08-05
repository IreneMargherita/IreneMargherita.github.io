# Spec 002 — Deploy to GitHub Pages

**Status:** ✅ Code implemented · ⏳ Awaiting Carol's manual steps (repo + push)
**Date:** 2026-08-05 · **Constitution:** v1.0.0 · **Supersedes:** the IONOS plan in 001 §7 (IONOS remains a supported fallback)

## 1. Problem & Goal

The MVP (spec 001) targeted IONOS paid hosting "later". Carol wants the site live
sooner, for free, without changing the design in any way. GitHub Pages hosts static
sites for free from a public repository — the same setup her professor uses for
sarshar.dev.

**Goal:** the exact 001 build, deployed automatically to `https://<username>.github.io`
on every `git push`, at $0.

## 2. Requirements

- **FR-1** Zero visual/functional change to the site itself.
- **FR-2** Deep links (`/awards`, refresh included) must work on GitHub Pages,
  which has no `.htaccess` support.
- **FR-3** Deployment is automated: push to `main` → build → publish (CI/CD).
  No manual uploading of `dist/`.
- **FR-4** Keep the IONOS path working (`.htaccess` stays in `public/`; it is
  simply inert on GitHub Pages).
- **FR-5** Repo will be **public** (free-plan requirement) → repo must contain
  nothing sensitive. Audit: it contains only the site source; no trading code,
  no secrets, no `.env`. ✅

## 3. Non-goals (future)

Custom domain purchase/DNS (do after site content is real), analytics, staging
environment.

## 4. Acceptance Criteria

- [x] `npm run build` also emits `dist/404.html` (byte-identical to `index.html`)
- [x] Workflow file exists and builds with Node 22 + `npm ci`
- [ ] Carol: repo `<username>.github.io` created (public) and code pushed
- [ ] Carol: repo Settings → Pages → Source = "GitHub Actions"
- [ ] Site loads at `https://<username>.github.io`; refresh on `/awards` renders
      the Awards page (via the 404 fallback), not GitHub's 404
- [ ] ⚠️ Before sharing the URL with reviewers: all `[Placeholder]` content replaced
      (Constitution Art. IV — the internet is public the moment this deploys)
