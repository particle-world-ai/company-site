# Particle World / 见微知界

Bilingual company website built with Vite and vanilla HTML, CSS and JavaScript. The homepage and updates page are independent HTML entries, with shared styles and a bundled JavaScript module. No framework runtime is required.

## Local preview

```sh
npm ci
npm run dev -- --port 8765
```

Use Node.js 22.12+ or 24+. Open http://localhost:8765 (Vite reports another port if it is already occupied). The updates page is at `/updates/`.

## Production build and deployment

```sh
npm run build
npm run preview
```

`dist/` contains the complete production website, including both pages, bundled CSS and JavaScript, fonts, logo, font licenses, `CNAME`, and `.nojekyll`. Only referenced visual assets are bundled. Preview serves this production build locally; it does not publish it.

The GitHub Pages workflow installs dependencies with `npm ci`, builds the site, and uploads only `dist/`. Pushes to `main` or `gh-pages` trigger deployment, as does a manual workflow run. Relative asset URLs support the existing custom domain and GitHub Pages project paths. Do not publish the unbuilt source directory.

## Editing

- `index.html`: Chinese content and matching `data-en` translations.
- `styles.css`: responsive layout and visual tokens.
- `script.js`: language switching, preference persistence, metadata and year.
- `vite.config.js`: two HTML build entries, relative asset paths and distribution metadata.
- `assets/particleworld-mark.png`: original unchanged logo mark.
- `assets/fonts/`: locally hosted font subsets and their SIL Open Font Licenses.
- `DESIGN.md`: selected design and implementation decisions.
- `design-qa.md`: browser verification and visual QA record.

## Fonts

Chinese uses Noto Serif SC, English uses Source Serif 4, and technical labels use IBM Plex Mono. The locally hosted WOFF2 files are subsetted to the site's current copy. No third-party font request is needed at runtime. On devices without the fonts, local files supply them; system fonts are fallbacks during loading.

After changing copy, regenerate subsets so new Chinese characters are included:

```sh
python3 -m venv .font-venv
.font-venv/bin/pip install fonttools brotli
.font-venv/bin/python scripts/build-fonts.py
```

This downloads original open-source fonts from the Google Fonts repository into a temporary cache, preserves license files, and writes renamed WOFF2 subsets. Redistribution licenses are in `assets/fonts/OFL-*.txt`.

English is currently disabled via `englishEnabled` in `script.js`; all translations remain in the HTML for later review. Chinese is saved in local storage. Without JavaScript the full Chinese page and navigation links remain available.

## Updates

`updates/index.html` is the bilingual news page, linked from the homepage header. It currently displays an empty state because no news article has been supplied. Replace `.updates-empty` with real dated content when ready, provide matching `data-en` translations, then regenerate font subsets. The font script includes both the homepage and all HTML files under `updates/`.
