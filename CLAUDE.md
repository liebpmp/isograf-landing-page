# Isograf Landing Page — Builder.io Figma Export → Responsive Website

## Mission
Convert the Builder.io Figma export (`builder-export.html`, 248KB) into a production-ready, responsive, pixel-perfect landing page for GitHub Pages deployment.

## Source of Truth
**`builder-export.html`** is THE definitive reference. It contains:
- All exact Figma positions, sizes, colors, fonts, spacing
- 41 images hosted on Builder.io CDN (download locally to `assets/`)
- All SVGs inline (logo, icons, decorative elements)
- Complete text content in German
- Layer names from Figma (use as semantic class names)

## Design System (extracted from builder-export.html)

### Fonts
- **DM Sans** — Logo, navigation, headings (weight: 400, 500, 700)
- **Libre Baskerville** — Hero headline italic accent ("zu deiner Zertifizierung")
- **Roboto** — Body text, buttons, descriptions (weight: 400, 500)
- Load via Google Fonts

### Colors
- **Gold primary:** `#E2AC26` (logo, checkmarks, accents)
- **Gold light:** `#FCC846` (stars, highlights)
- **Gold gradient (CTA):** `linear-gradient(94deg, rgba(238,203,117,0.90) 13%, rgba(226,172,38,0.90) 57%, rgba(238,203,117,0.90) 102%)`
- **Gold gradient (nav button):** `linear-gradient(86deg, #FFE5AC -30%, #F5C253 20%, #F1B53D 41%, #FFE5AC 75%, #EECB75 97%)`
- **Navy/Dark:** `#14213D`, `#082742`, `#0A2640` (dark sections)
- **Text:** `#000` (headings), `#6A7282` / `#272525` (body)
- **Borders:** `#E0E0E0`, `#ECECEC`, `#F3F4F6`
- **White:** `#FFF`, `rgba(255,255,255,0.95)` (nav bg)

### Layout
- **Max width:** 1441px (Figma artboard)
- **Content max-width:** ~1311px with padding
- **Nav padding:** `0 65px`
- **Section padding:** typically `80px 65px` or `120px 65px`

## Architecture

### Files to create
```
index.html          — Semantic HTML5, sections matching Figma layers
styles.css          — All styles, CSS custom properties, responsive breakpoints
script.js           — Smooth scroll, intersection observers, mobile menu
assets/             — All images downloaded from Builder CDN
```

### Responsive Breakpoints
- Desktop: 1441px+ (match Figma exactly)
- Laptop: 1024-1440px (fluid scaling)
- Tablet: 768-1023px (stack columns)
- Mobile: <768px (single column, hamburger menu)

## Critical Rules

1. **NO absolute positioning** — Convert ALL absolute positions from builder-export to flexbox/grid
2. **Download ALL images** from `https://api.builder.io/api/v1/image/assets/TEMP/...` to `assets/` folder
3. **Preserve ALL SVGs** inline (logo, icons, check marks, stars, decorative)
4. **Preserve exact colors** — use CSS custom properties matching the design system above
5. **Preserve exact typography** — font families, sizes, weights, line-heights, letter-spacing
6. **Preserve exact spacing** — paddings, gaps, margins from the export
7. **Every section must be a semantic HTML section** with descriptive class names from Figma layer names
8. **All text content must be searchable/selectable** — NO text-as-image
9. **CTA buttons** must be `<a>` tags linking to `#kontakt` or Calendly
10. **Navigation** must have smooth-scroll to sections + sticky header

## Sections (from builder-export.html layer names)

1. **NavBar** — Logo + Links (Leistungen, Über uns, Ergebnisse, Ressourcen, Karriere) + Gold CTA
2. **Hero** — Headline with DM Sans + Libre Baskerville italic, 3 checkmark USPs, gold CTA, "Bekannt aus" logos (ZDF, Spiegel)
3. **Stats/Trust** — Numbers section (1.000+ Projekte etc.)
4. **Leistungen** — Services grid (ISO 9001, ISO 42001, AZAV, BAFA etc.)
5. **Prozess/Ablauf** — How it works steps
6. **Über uns** — Team/company section with navy background
7. **Ergebnisse/Case Studies** — Results with metrics
8. **Testimonials** — Customer quotes
9. **FAQ** — Accordion
10. **CTA Section** — Final call-to-action
11. **Footer** — Links, legal, contact

## Image Handling
For each `src="https://api.builder.io/api/v1/image/assets/TEMP/..."`:
1. Download with curl to `assets/` using the hash as filename
2. Replace src in HTML with local `assets/filename.webp` (or png for transparency)
3. Add proper `alt` text based on Figma layer names
4. Use `loading="lazy"` for below-fold images

## Quality Checklist
- [ ] All sections from builder-export present
- [ ] All images downloaded locally
- [ ] Responsive on mobile/tablet/desktop
- [ ] Smooth scroll navigation
- [ ] Sticky header with backdrop blur
- [ ] Gold gradient CTAs match exactly
- [ ] Typography hierarchy preserved
- [ ] No horizontal scroll on any breakpoint
- [ ] Page speed: all images optimized
- [ ] Deployed to GitHub Pages
