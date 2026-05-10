# Isograf Landing Page V11 — Fix Round

## Mission
Fix ALL visual issues in V10 to match the Figma design. The Anima React source (`anima-source/anima-v10/`) is the SINGLE SOURCE OF TRUTH for what the page should look like. Reference screenshots from Figma are in `figma-references-v11/`.

## CRITICAL: Version Management
- V10 backup is in `versions/v10-pre-fixes.html` + `versions/v10-pre-fixes.css`
- Save the result as `versions/v11-fixes.html` AND update root `index.html`
- NEVER delete previous versions

## Source Files
- **Current page:** `index.html` + `styles.css` + `script.js`
- **Anima React source (TRUTH):** `anima-source/anima-v10/src/screens/IsografUiMain/`
- **Figma reference screenshots:** `figma-references-v11/` (9 images, Figma vs V10 comparisons)
- **Figma CSS values:** `figma-css/` (17 files with exact CSS)
- **Assets:** `assets/anima/` (89 images from Anima CDN)

## Architecture
- Vanilla HTML + CSS + minimal JS (NO React, NO Tailwind runtime)
- Static hosting on GitHub Pages
- ALL images must be local (no CDN dependencies)

## Fonts
- DM Sans (logo, headings, nav) — Google Fonts
- Libre Baskerville (italic accents) — Google Fonts
- Roboto (body text) — Google Fonts

## Colors
- Gold primary: #e2ac26
- Gold gradient: linear-gradient(~58deg, #ffe5ac, #f5c253, #f1b53d, #ffe5ac, #eecb75)
- Navy dark: #14213d
- Text dark: #000000, #272525
- Text gray: #6a7282
- White: #ffffff
- Light bg: #f9f7f2, #faf9f6

## ===== ISSUES TO FIX (Priority Order) =====

### 🔴 ISSUE 1: Container Boxing — Page has left/right margin/padding
**Problem:** The entire page appears "boxed" — sections that should go full-width (edge to edge) have padding/margin. The navy/dark blue sections don't extend to the full viewport width.
**Fix:** Ensure ALL sections with dark backgrounds (navy, gradient) span the FULL viewport width. Only the INNER content should be constrained to max-width.
**Reference:** Look at Figma screenshots — dark sections go edge-to-edge.

### 🔴 ISSUE 2: Hero Section — Responsive breakage
**Problem:** At certain viewports, the hero text wraps one-word-per-line and the layout collapses. See `figma-references-v11/09-v10-hero-BROKEN.jpg`.
**Figma Reference:** See `figma-references-v11/` — hero should have text on left (~60%), Daniel's photo on right (~40%), with clean text wrapping.
**Fix:** Check the Anima source `CertificationHeroSection.tsx` for exact layout. Ensure proper min-width on text column and responsive breakpoints.

### 🔴 ISSUE 3: "Warum zum Isograf" Section — Daniel's photo missing
**Problem:** The card showing "Denn wer mit ISOGRAF arbeitet..." has only the columns/architecture image on the right. Daniel's portrait photo should be OVERLAID on top of the columns image.
**V10 (broken):** `figma-references-v11/02-v10-warum-zum-isograf-BROKEN.jpg`
**Figma (correct):** `figma-references-v11/01-figma-warum-zum-isograf.jpg`
**Fix:** Look at the Anima source for this section. Daniel's photo (`dsc01322-1.png` or `cute-smiling-young-man...` image) needs to be positioned over the columns background. Also add gold bullet dots before list items, and the "+800 Zufriedene Kunden" social proof below the CTA button.

### 🔴 ISSUE 4: "Done-4-You Zertifizierung" — Carousel vs Grid
**Problem:** V10 shows a carousel/slider with only one card visible at a time. Figma shows ALL 4 cards (KOMPASS, AZAV, ZFU, ISO 9001) side by side in a grid, with the active one highlighted.
**V10 (broken):** `figma-references-v11/03-v10-done4you-carousel-WRONG.jpg`
**Figma (correct):** `figma-references-v11/04-figma-done4you-grid.jpg`
**Fix:** Check the Anima source `ExamPrepEbookSection.tsx` (this is the 461 LOC section). Convert from carousel to a 4-column grid. All cards visible simultaneously. Active card slightly larger/highlighted with gold border. Arrow buttons below for navigation (clicking changes which card is "active"/highlighted). Pagination dots match card count (4, not 5).

### 🔴 ISSUE 5: "Zertifizierung, die Ihr Wachstum trägt" Bento Grid — Missing overlays
**Problem:** Multiple missing design elements in the bento grid:
  - Daniel's photo (top-left) should have FLOATING TESTIMONIAL CARDS overlaid (showing "Persona 1", star ratings, review text)
  - "Unkomplizierter Prozess" card (bottom-left) should have a large CHECKMARK ICON (teal circle with white check)
  - "Echtes Wachstum" card (bottom-right) should have DIAMOND decorative shapes
**V10 (broken):** `figma-references-v11/05-v10-bento-grid-BROKEN.jpg`
**Figma (correct):** `figma-references-v11/06-figma-bento-grid.jpg`
**Fix:** Check the Anima source `CertificationAssuranceSection.tsx` (291 LOC). Add all missing overlay elements. Check which images from `assets/anima/` are needed.

### 🔴 ISSUE 6: Bottom CTA "Bereit für Ihre Zertifizierung?" — Photo wrong side
**Problem:** Daniel's photo is on the LEFT side, heavily cropped. Should be on the RIGHT side, larger, overlapping/extending above the card.
**V10 (broken):** `figma-references-v11/07-v10-bottom-cta-WRONG.jpg`
**Figma (correct):** `figma-references-v11/08-figma-bottom-cta.jpg`
**Fix:** Check Anima source `ConsultationSection.tsx` (71 LOC). Flip layout: text left, Daniel right. Photo should be larger and break out of the card boundary upward.

### 🟡 ISSUE 7: "Ich bin eine Headline" placeholder
**Problem:** Section 11 (Related Content) still has placeholder text "Ich bin eine Headline" and Lorem ipsum.
**Fix:** Check Anima source `RelatedContentSection.tsx` for the actual text. If it's also placeholder in the source, keep it but make it look correct visually.

## Responsive Strategy
- **1440px:** MUST be pixel-perfect to Figma
- **1200-1439px:** Scale gracefully
- **768-1199px (tablet):** Stack columns where needed, ensure readability
- **<768px (mobile):** Single column, hamburger menu

## Workflow
1. Read ALL Anima source components listed above (especially the broken sections)
2. Compare with current HTML/CSS
3. Fix section by section, starting with ISSUE 1 (container boxing) since it affects everything
4. Use `image` tool to view the Figma reference screenshots for pixel-level comparison
5. After ALL fixes, take screenshots at 1440px and compare

## Quality Bar
- At 1440px: Match Figma (the reference screenshots in `figma-references-v11/`)
- ALL sections must be full-width where the Figma shows them full-width
- ALL images/overlays from Figma must be present
- Responsive must not break at any common viewport
