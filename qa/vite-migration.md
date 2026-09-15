# Vite migration verification

Verified on 2026-09-15 using headless Chrome via Playwright, at device scale 1.

The baseline is a copy of the working website before migration. Comparisons use the production `dist/` output served by `vite preview`, after fonts have loaded. Full-page PNGs were compared with pixelmatch at threshold 0.

| Viewport | Page | Different pixels |
| --- | --- | --- |
| 1440 × 900 | Home | 0 |
| 1440 × 900 | Updates | 0 |
| 736 × 803 | Home | 0 |
| 736 × 803 | Updates | 0 |
| 390 × 844 | Home | 0 |
| 390 × 844 | Updates | 0 |

Both pages retain Chinese as the active language and hide the language switch. Page navigation and homepage anchor targets pass. No JavaScript errors or HTTP errors occurred during these checks.

`npm run build`, `git diff --check`, and dependency audit passed. The build includes the custom-domain CNAME, font licenses and `.nojekyll`. GitHub Pages now builds with Node 24 and uploads `dist/`.

These checks cover local production rendering and behavior; no deployment was performed during this migration.
