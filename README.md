# Particle World / 见微知界

Bilingual company website. Static HTML, CSS and JavaScript; no build step or runtime dependencies.

## Local preview

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://localhost:8765. This project has not been deployed as part of the redesign.

## Editing

- `index.html`: Chinese content and matching `data-en` translations.
- `styles.css`: responsive layout and visual tokens.
- `script.js`: language switching, preference persistence, metadata and year.
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

Language defaults to Chinese and is saved in local storage. Without JavaScript the full Chinese page and navigation links remain available.

## Updates

`updates/index.html` is the bilingual news page, linked from the homepage header. It currently displays an empty state because no news article has been supplied. Replace `.updates-empty` with real dated content when ready, provide matching `data-en` translations, then regenerate font subsets. The font script includes both the homepage and all HTML files under `updates/`.
