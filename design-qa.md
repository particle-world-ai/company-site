# Particle World design QA

final result: passed

## Reference and evidence

- Selected source: `/Users/nickcheng/.codex/generated_images/01a09b33-e8ff-7223-bdbd-c7ce5a061b6b/exec-0b9ac8b6-ebea-4743-b70e-94d3c76769c8.png` (first displayed concept).
- Local implementation: http://localhost:8765/
- Desktop screenshot: `qa/desktop-zh.png`; English: `qa/desktop-en.png`.
- Mobile screenshots: `qa/mobile-zh.png`, `qa/mobile-en.png`.
- Join section: `qa/join-zh.png`.
- Source and desktop comparison: 1374 × 1145 pixels, 1374 × 1145 CSS viewport, devicePixelRatio 1. No density normalization required. Chinese, light theme, top of page, fonts loaded.
- Source and final desktop image were emitted together in the same browser-tool comparison call. Full-view review covers the logo, typography, whitespace, three-column links and introduction. These details were legible at native resolution; no separate crop was needed.
- Mobile: 390 × 844 CSS pixels, both languages; additional overflow check at 320 × 740.

## Findings and comparison history

1. Initial implementation placed the editorial column and logo approximately 27px too far left at the reference width (P2). Updated the desktop shell from a fixed 1200px content width to proportional gutters, retaining the maximum width.
2. Initial vertical spacing placed the intro approximately 16–20px too low (P2). Reduced axis and metadata spacing. Final screenshot shows the introduction starting at the reference's approximate vertical position.
3. Initial font loading was incomplete (P1). Replaced runtime external font requests with local licensed WOFF2 subsets. Browser font status is loaded, and there are no console warnings or errors in the final verification session.
4. Final combined comparison: no outstanding P0/P1/P2 findings. The full user-provided second introductory paragraph adds a line compared with the abbreviated mock; this is an intentional content requirement. Lower-page sections extend the approved editorial structure.

## Fidelity surfaces

- Typography: Noto Serif SC Chinese, Source Serif 4 English, IBM Plex Mono annotations. Clear serif hierarchy, readable long-form body, no clipping. Exact glyph shape and small tracking differences from the raster concept are P3 and acceptable.
- Spacing: centered hero, large whitespace, three-column navigation, thin separators and aligned numbered sections. Mobile reflows into single-column rows.
- Colors: near-white #fefefd, dark #1d1d23, secondary #626273, restrained violet #6b5bd6 and #e1e1e8 hairlines. No heavy backgrounds or visual effects.
- Assets: original purple logo mark remains unchanged, transparent and crisp. A black text wordmark matches the selected white-background composition. Original supplied lockup remains in the repository.
- Content: all supplied Chinese company copy included, corresponding English data attributes available for every translated item. No invented office locations or recruitment URLs. Existing email address is retained.

## Functional verification

- Chinese to English and back: passed.
- English selection persists after reload: passed (`aria-pressed=true`).
- English translated nodes: zero mismatches against their `data-en` values.
- Language-specific document title, language and description implemented.
- JOIN US link navigates to #join with the expected heading and contact visible; back-to-top link returns to the hero.
- Email links use `mailto:info@particleworld.ai`; no messages sent.
- Mobile document width equals viewport width at 390px in both languages and 320px in English.
- Final browser console warning/error log: empty.
- Static Chinese content and links available without JavaScript by source inspection; browser JS-disable behavior was not separately tested.
- Keyboard focus styling and reduced-motion rule checked in CSS; assistive-technology testing was not performed.

## Implementation checklist

- [x] Preserve logo and violet brand elements.
- [x] Implement selected white editorial style.
- [x] Complete bilingual content and switching.
- [x] Host font subsets locally with licenses.
- [x] Verify desktop, mobile and key interactions.
- [x] Keep local preview available; do not deploy.

## Follow-up polish

- Optional small font tracking refinements after user review.
- Refresh local font subsets whenever copy introduces new Chinese characters.

## Updates page addition

final result: passed

- Reference: `/var/folders/x1/2yw3m9716jjfhjxwbj82kzqc0000gn/T/codex-clipboard-f76d3dad-4988-4667-98f0-0f14a45448ff.png`.
- Implementation: `/updates/`; evidence `qa/updates-desktop-en.png` and `qa/updates-mobile-zh.png`.
- Desktop reference and screenshot viewed together at 1034 × 1005, DPR 1. Full-frame text and controls are readable, so a separate crop was unnecessary.
- Typography: serif small-caps English heading, Chinese serif equivalent, mono back link; same locally hosted font system as the homepage.
- Layout: left-aligned logo/title, narrow editorial column, back link, generous whitespace, centered footer. The new language control intentionally extends the reference.
- Color/assets: original violet Particle World mark, off-white background and restrained purple links retained; no AMI brand assets copied.
- Content: no company update was supplied. The page intentionally uses a bilingual empty state rather than the reference's launch/funding announcement. Article density comparison is therefore not applicable yet.
- Functional checks: homepage Updates link, return home, language persistence across page navigation, Chinese/English switching, page title and 320px overflow checks passed. Browser warning/error log empty.
- No actionable P0/P1/P2 issues. Future article layout will need validation once real news is provided.
- Local only; not deployed.
