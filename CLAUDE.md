# Isograf Landing Page V11 — Visual Fixes on Responsive V10

## ⚠️ CRITICAL: The Base is ALREADY Responsive!
The current `index.html` + `styles.css` is the output of a previous Claude Code session that converted Anima's fixed-1440px React code into responsive vanilla HTML+CSS with 3 breakpoints. **DO NOT go back to the Anima source code for layout/responsive behavior.** The Anima source (`anima-source/`) is ONLY useful for understanding which visual elements/assets should exist — NOT for layout values.

**Your job: Fix specific visual issues ON TOP of the existing responsive code. Do NOT rewrite responsive breakpoints or layout logic that already works.**

## The Key Layout Issue: Container Boxing
The existing code wraps ALL sections in `max-width: var(--max-w)` (1440px). This means on screens wider than 1440px, there are white gaps on the sides.

**The fix pattern for EVERY section:**
- Section BACKGROUND (the `<section>` element itself): `width: 100%` — spans full viewport, no max-width
- Section CONTENT (the inner `__inner` div): `max-width: var(--max-w); margin: 0 auto; padding: 0 32px;` — centered, constrained

This means dark/navy backgrounds, gradients, and background images go edge-to-edge across the FULL screen, while text/cards stay centered. This is standard landing page behavior.

**Check this on EVERY section — many currently have max-width on the section itself instead of only the inner wrapper.**

## Version Management
- Save result as `versions/v11-clean.html` + `versions/v11-clean.css`
- Also update root `index.html` + `styles.css`

## Architecture
- Vanilla HTML + CSS + minimal JS (NO React, NO Tailwind)
- Static hosting on GitHub Pages

## Fonts & Colors (for reference)
- DM Sans (headings), Libre Baskerville (italic), Roboto (body)
- Gold: #e2ac26, Navy: #14213d, Light bg: #f9f7f2

## ===== VISUAL ISSUES TO FIX =====

### 🔴 ISSUE 1: Container Boxing (affects ALL sections)
Fix the pattern described above. Every section needs full-width background with centered max-width content.

### 🔴 ISSUE 2: Video Section — Remove fake monitor bezel
The video thumbnail image `assets/anima/4-coloumns.png` (1441x1078) already contains the play button and rounded corners BAKED IN. The CSS should NOT add:
- Extra play button overlay (`.video-intro__play`) → hide it
- Dark gradient overlay (`.video-intro__frame::after`) → remove it
- `background: #2c2c2c` → transparent
- Heavy box-shadow → soft `drop-shadow(0 8px 40px rgba(0,0,0,0.12))`
- `filter: brightness(0.78)` → remove or lighten
Just show the image cleanly with a subtle drop shadow. See `figma-references-v11/` for comparison.

### 🔴 ISSUE 3: "Warum zum Isograf" — Daniel's photo missing
The card with "Denn wer mit ISOGRAF arbeitet..." currently shows only the columns/architecture image on the right. Daniel's portrait photo should be OVERLAID on top, positioned right side of the card.
- Look at `figma-references-v11/01-figma-warum-zum-isograf.jpg` for the correct look
- The photo file is likely `assets/anima/dsc01322-1.png` or similar (check existing assets)
- If no suitable photo exists in assets, check what Anima source references: look at `CourseIntroductionSection.tsx`
- Also: add gold bullet dots before the 3 list items (kleine bis mittelständige..., Bildungsinstitute..., Berater...)

### 🔴 ISSUE 4: "Done-4-You Zertifizierung" — Carousel → 4-column Grid
V10 shows a carousel with only 1 active card visible. The Figma design shows ALL 4 cards (KOMPASS, AZAV, ZFU, ISO 9001) side by side.
- See `figma-references-v11/04-figma-done4you-grid.jpg` for the correct look
- All 4 cards visible simultaneously in a row
- The "active" card (currently ZFU) is slightly larger/highlighted with gold border
- Arrow buttons + pagination dots below allow changing which card is active
- Navigation is OPTIONAL — the static grid with all visible is the priority

### 🔴 ISSUE 5: "Zertifizierung, die Ihr Wachstum trägt" Bento Grid — Missing overlays
The bento grid has these missing elements:
- **Top-left (Daniel photo):** Should have floating testimonial cards overlaid (showing "Persona 1", star ratings, review text) — see `figma-references-v11/06-figma-bento-grid.jpg`
- **Bottom-left ("Unkomplizierter Prozess"):** Should have a large checkmark icon (teal circle with white check)
- **Bottom-right ("Echtes Wachstum"):** Should have diamond decorative shapes

Check what assets exist for these overlays — look at `CertificationAssuranceSection.tsx` in the Anima source for the asset references.

### 🔴 ISSUE 6: Bottom CTA "Bereit für Ihre Zertifizierung?" — Photo wrong side
Daniel's photo is on the LEFT, heavily cropped. Should be on the RIGHT, larger, overlapping/extending above the card.
- See `figma-references-v11/08-figma-bottom-cta.jpg`
- Check `ConsultationSection.tsx` for correct layout

### 🟡 ISSUE 7: Hero Background Image
The hero section needs the architectural sketch background image behind Daniel's photo cutout. The image file is `assets/anima/placeholder-image.png` (check if it exists). If not, check what the Anima source `CertificationHeroSection.tsx` references.
**DO NOT change the hero layout/responsive behavior — only add the background image.**

## Available Resources
- **Figma reference screenshots:** `figma-references-v11/` (9 images, showing Figma vs V10)
- **Anima React source:** `anima-source/anima-v10/` — use ONLY for asset references and element structure, NOT for layout values
- **Figma CSS:** `figma-css/` — 17 files with exact CSS values at 1440px
- **Assets:** `assets/anima/` — 89+ images from Anima CDN
- **Figma MCP Server:** Available via `mcp__figma__get_figma_data` and `mcp__figma__download_figma_images` tools — use for exact CSS values or missing assets. File key: `rvCwJ18rF7Fmm9i7vc9PK6`

## Quality Bar
- Responsive behavior that already works → DON'T TOUCH
- Full-width backgrounds on ALL sections (no white gaps on large screens)
- All visual elements from Figma present (photos, overlays, icons)
- No layout breaks at any viewport from 375px to 2560px
