# Plan 001 — Technical Plan for the MVP

Implements `spec.md` under the rules of `../constitution.md`.

## 1. Stack (pinned)

| Layer | Choice | Version | Why |
|-------|--------|---------|-----|
| UI | React | ^18.3 | Component model, huge ecosystem |
| Language | TypeScript (strict) | ~5.6 | Compiler catches content-shape mistakes |
| Build | Vite | ^7 | Instant dev server, tiny prod bundles (needs Node ≥ 20.19) |
| Styling | Tailwind CSS | ^3.4 | Utility classes + custom design tokens |
| Routing | react-router-dom | ^6.30 | Client-side routing, lazy routes |
| Fonts | IBM Plex Sans + IBM Plex Mono | Google Fonts | Same family as sarshar.dev; Mono sells the terminal aesthetic |

No other runtime dependencies (Constitution Art. V / NFR-5).

## 2. Directory Layout

```
portfolio/
├── specs/                      # SDD documents (this folder)
├── public/
│   ├── .htaccess               # IONOS SPA rewrite (copied into dist/ by Vite)
│   └── favicon.svg             # yellow ">_" prompt on dark tile
├── index.html                  # meta/SEO/fonts
├── package.json / tsconfigs / vite.config.ts
├── tailwind.config.js          # ALL design tokens live here
├── postcss.config.js
└── src/
    ├── main.tsx                # React root
    ├── App.tsx                 # Router + lazy routes + Suspense
    ├── index.css               # Tailwind layers + custom utility classes
    ├── data/content.ts         # ★ single source of truth for all copy
    ├── hooks/usePageTitle.ts
    ├── components/             # 13 shared components (below)
    └── pages/                  # 8 pages + NotFound
```

## 3. Design Tokens (tailwind.config.js)

**Palette — "Midnight Terminal + Sunshine"**

| Token | Hex | Role |
|-------|-----|------|
| `ink-950` | `#07090E` | page background (deepest) |
| `ink-900` | `#0B0E14` | page background |
| `ink-800` | `#10141D` | cards / surfaces |
| `ink-700` | `#151B26` | hovered surfaces, terminal body |
| `ink-600` | `#1E2431` | borders |
| `ink-500` | `#2A3242` | strong borders |
| `sunshine-300` | `#FFE566` | hover accents |
| `sunshine-400` | `#FFDB2E` | bright accent |
| `sunshine-500` | `#FFD60A` | ★ signature sunshine yellow |
| `sunshine-600` | `#D9B400` | pressed states |
| `sunshine-900` | `#3D3300` | dim yellow wash / heatmap low |
| `mist-100` | `#E9EEF6` | primary text |
| `mist-400` | `#A6B0C0` | secondary text |
| `mist-600` | `#707A8A` | muted text |
| `signal` | `#3FB950` | status-green (online dot, "shipped") |
| syntax set | `#79C0FF` `#BC8CFF` `#FFA657` `#7EE787` `#FF7B72` | decorative code coloring (GitHub-dark) |

Fonts: `font-sans` → IBM Plex Sans; `font-mono` → IBM Plex Mono.
Shadows: `shadow-glow` (yellow bloom), `shadow-card` (depth). Radius: cards `rounded-xl2` (14px).

**Contribution heatmap ramp** (sequential = one hue, darkening→brightening lightness only):
`#151B26 → #3D3300 → #806B00 → #C4A300 → #FFD60A` (5 levels, "less → more").

## 4. Component Inventory

| Component | Purpose |
|-----------|---------|
| `Layout` | Nav + `<main>` + Footer + Suspense boundary + skip link |
| `Navbar` | Sticky, blur, active-route highlight, mobile menu |
| `Footer` | Socials, stack credit, mono styling |
| `ScrollToTop` | Reset scroll on route change |
| `PageLoader` | Terminal-flavored Suspense fallback |
| `SectionHeading` | Mono `// comment` kicker + heading + lead |
| `TerminalWindow` | macOS-dot chrome + mono body (hero, about) |
| `Typewriter` | Cycles role lines; static under reduced-motion |
| `ContributionGraph` | 52×7 seeded heatmap, sunshine ramp, legend |
| `ProjectCard` | GitHub-repo-style card: language bar, tags, impact |
| `LanguageBar` | Segmented per-language bar (GitHub colors) |
| `StatCard` | Big mono number + label |
| `Timeline` | Vertical experience timeline |
| `TestimonialCard` | Quote + attribution |
| `Tag` / `StatusBadge` | Mono chips; pulsing green availability dot |

**Determinism note:** the heatmap uses a *seeded* PRNG (mulberry32), not `Math.random()`,
so every visitor (and every React re-render) sees the identical pattern. Lesson: UI
should be a pure function of data — randomness is data too, so we pin the seed.

## 5. Routing Map

`/` Home · `/about` About · `/projects` Projects · `/experience` Experience ·
`/research` Research & Publications · `/awards` Awards & Recognition ·
`/testimonials` Testimonials · `/contact` Contact · `*` NotFound (terminal 404).
All via `React.lazy()` — each page becomes its own JS chunk downloaded on demand.

## 6. Data Model (content.ts)

Typed interfaces: `Profile`, `Social`, `Stat`, `SkillGroup`, `EducationItem`,
`Project` (with `languages[]`, `impact[]`, `status`), `ExperienceItem`, `Publication`,
`Talk`, `Award`, `PressItem`, `JudgingItem`, `Membership`, `Testimonial`,
`EvidenceLink`. One exported `content` object; components import from it only.

## 7. Deployment (IONOS — later)

1. `npm run build` → `dist/`
2. Upload the *contents* of `dist/` into `public_html`
3. `.htaccess` (already in the build) rewrites unknown paths to `index.html` so
   deep links like `/awards` work on refresh — the server otherwise looks for a real
   folder named `awards`, finds none, and 404s. The rewrite says: "if the requested
   file doesn't exist on disk, serve index.html and let React Router figure it out."

## 8. Risks / Decisions

- **D-1** No contact form in MVP (needs backend/3rd party) → mailto + socials.
- **D-2** Heatmap is decorative with placeholder data; a real GitHub-API version is a
  future spec (would add fetch logic + rate limits).
- **D-3** Proprietary trading code can't be open-sourced; project cards therefore
  emphasize architecture, scale, and measurable outcomes instead of source links.
