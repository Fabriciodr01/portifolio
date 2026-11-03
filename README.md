# Fabricio · Portfolio

Elite Dangerous themed portfolio. React + TypeScript + Tailwind CSS v4 + Motion.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build locally
```

## Structure

```text
src/
  components/
    ui/        Panel, BracketButton, Chip, Eyebrow, SectionDivider   (reusable parts)
    layout/    Backdrop, StatusBar, Section                          (page frame)
    motion/    Reveal                                                (shared animation wrappers)
  sections/    intro/  about/  projects/                             (one folder per section)
  data/        site.ts (name, links, section list)  projects.ts      (content lives here)
  hooks/       useActiveSection                                      (nav highlight)
  styles/      theme.css                                             (design tokens)
```

- **Look and feel:** change colors, fonts and spacing in `src/styles/theme.css` (`@theme`).
- **Add a section:** create `src/sections/<name>/`, add it to `SECTIONS` in `data/site.ts`, render it in `App.tsx`.
- **Snap scrolling:** only on desktop with a mouse/trackpad (see the media query in `theme.css`). Phones scroll freely.
- **Animations** respect `prefers-reduced-motion`.

## Deploy (GitHub Pages)

1. Push to a repo on GitHub (branch `main`).
2. Settings → Pages → Source: **GitHub Actions**.
3. Every push to `main` builds and publishes via `.github/workflows/deploy.yml`.

A repo named `fabriciodr01.github.io` is served at `https://fabriciodr01.github.io/`. Any other repo name is served at `https://fabriciodr01.github.io/<repo>/`; the workflow sets the base path automatically.

## Roadmap

- [x] **Phase 0** Foundation: tokens, fonts, backdrop, status bar, snap sections, shared UI, deploy
- [ ] **Phase 1** Intro: boot animation, name scramble, 3D ship, buttons
- [ ] **Phase 2** About: dossier text, stack tabs
- [ ] **Phase 3** Projects: cards, hashtag filter, expandable details
- [ ] **Phase 4** Polish: transitions, mobile pass, performance, SEO
