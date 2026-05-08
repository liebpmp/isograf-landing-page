# Isograf Landing Page — V9 Pixel-Perfect Rebuild

## Mission
Build a PIXEL-PERFECT website from the Figma design. Every CSS value must match exactly.

## What You Have (ALL LOCAL — no API calls needed!)

### 1. Pre-extracted CSS per section: `figma-css/*.md`
These files contain EXACT CSS values extracted from Figma for every node:
- Colors as hex/rgba (already converted from Figma 0-1 floats)
- Typography: font-family, font-size, font-weight, line-height, letter-spacing
- Layout: display, flex-direction, justify-content, align-items, gap, padding
- Effects: box-shadow, border, border-radius
- Text content
- Image references (for download)

**USE THESE AS YOUR PRIMARY SOURCE.** Read each section's CSS file and translate directly to HTML+CSS.

### 2. Reference screenshots: `figma-reference-images/*.png`
PNG screenshots of each section as rendered in Figma. **Compare your output against these.**

### 3. Builder export for text/SVGs: `builder-export.html`
Contains all German text content and inline SVGs. Copy text and SVGs verbatim.

### 4. Raw Figma JSON: `figma-sections/*.json` (if you need deeper detail)

## 17 Sections (build in this order)

| # | CSS File | Reference Image |
|---|----------|-----------------|
| 1 | `figma-css/01-navbar-css.md` | `figma-reference-images/01-navbar.png` |
| 2 | `figma-css/02-hero-css.md` | `figma-reference-images/02-hero.png` |
| 3 | `figma-css/03-references-css.md` | `figma-reference-images/03-references.png` |
| 4 | `figma-css/04-columns-1-css.md` | `figma-reference-images/04-columns-1.png` |
| 5 | `figma-css/05-columns-2-css.md` | `figma-reference-images/05-columns-2.png` |
| 6 | `figma-css/06-introduction-css.md` | `figma-reference-images/06-introduction.png` |
| 7 | `figma-css/07-certificate-css.md` | `figma-reference-images/07-certificate.png` |
| 8 | `figma-css/08-frame16-css.md` | `figma-reference-images/08-frame16.png` |
| 9 | `figma-css/09-growth-css.md` | `figma-reference-images/09-growth.png` |
| 10 | `figma-css/10-contact-banner-css.md` | `figma-reference-images/10-contact-banner.png` |
| 11 | `figma-css/11-routes-refs-1-css.md` | `figma-reference-images/11-routes-refs-1.png` |
| 12 | `figma-css/12-five-methods-css.md` | `figma-reference-images/12-five-methods.png` |
| 13 | `figma-css/13-comparison-css.md` | (not available — use CSS data) |
| 14 | `figma-css/14-frame14-css.md` | `figma-reference-images/14-frame14.png` |
| 15 | `figma-css/15-routes-refs-2-css.md` | `figma-reference-images/15-routes-refs-2.png` |
| 16 | `figma-css/16-contact-banner-2-css.md` | `figma-reference-images/16-contact-banner-2.png` |
| 17 | `figma-css/17-footer-css.md` | `figma-reference-images/17-footer.png` |

## Workflow — STRICT ORDER

For EACH section (1-17):
1. **Read** `figma-css/XX-name-css.md` — this has ALL the CSS values you need
2. **Look at** `figma-reference-images/XX-name.png` — this is your visual target
3. **Get text/SVGs from** `builder-export.html` for that section
4. **Write HTML + CSS** using the EXACT values from the CSS file
5. **For images**: use `mcp__figma__download_figma_images` with fileKey `zjXTHbWMJ85arqkgO17rxa` and the image node IDs listed in the CSS file

After ALL sections:
6. **Take a full-page screenshot** at 1441px width
7. **Compare section by section** against reference images
8. **Fix any differences** — colors, spacing, fonts, layout
9. **Git commit and push** to origin/main for GitHub Pages

## Design System

### Fonts (from Figma)
- **DM Sans** — Logo, navigation, headings (400, 500, 700)
- **Libre Baskerville** — Italic accents in headings
- **Roboto** — Body text (400, 500)
Load via Google Fonts.

### Key Colors (from Figma CSS files — verified)
- Gold primary: `#e2ac26`
- Gold light: `#fcc846`, `#fdb931`
- Navy dark: `#14213d`, `#082742`
- Text dark: `#000000`, `#272525`
- Text gray: `#6a7282`
- White: `#ffffff`
- Light bg: `#f9f7f2`, `#faf9f6`

## Output Files
```
index.html    — semantic HTML5, one <section> per Figma frame
styles.css    — all styles, CSS custom properties for colors/fonts
script.js     — smooth scroll, sticky nav, mobile menu, FAQ accordion
assets/       — all images
```

## Page Width
- Desktop: exactly 1441px content width (match Figma frame)
- All sections: `max-width: 1441px; margin: 0 auto;` or full-bleed with inner container

## Critical Rules
1. **EVERY CSS value comes from figma-css/*.md** — no guessing, no defaults
2. **At 1441px, output MUST visually match** the reference images
3. **Read the CSS file COMPLETELY** before writing each section
4. **Text content from builder-export.html** — copy exactly (German)
5. **SVGs from builder-export.html** — copy exactly
6. Don't overcomplicate — clean semantic HTML, BEM-style classes
7. One section at a time, test as you go
