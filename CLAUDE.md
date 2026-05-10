# Isograf Landing Page V10 — Anima Export → Responsive

## Mission
Take the pixel-perfect Anima export (React + Tailwind, 1440px fixed) and convert it into a fully responsive, production-ready landing page. The result MUST look IDENTICAL to Figma at 1440px AND work perfectly on all screen sizes.

## Source: Anima Export
The Anima export is at `./anima-source/` (inside this project). It's a React + TypeScript + Tailwind + Vite project that perfectly reproduces the Figma design at 1440px width. BUT:
- All dimensions are fixed pixel values (w-[896px], absolute top-[47px], etc.)
- Images reference Anima CDN URLs (c.animaapp.com) — must be downloaded locally
- One section is a flat image ("4-coloumns.png") — must become real HTML
- Zero responsive design — breaks on any width != 1440px

## Target: THIS Project
Build everything here in `/Users/nexus/.openclaw/workspace/projects/isograf-landing-page/`.
Output: single `index.html` (or React build that produces it) deployed via GitHub Pages.

## Architecture Decision
Convert from React/Tailwind to **vanilla HTML + CSS + minimal JS**. Reasons:
- GitHub Pages = static hosting, no build step needed
- Simpler maintenance for non-developers
- Faster loading (no React runtime)
- The page has zero interactivity beyond smooth scroll + mobile menu + maybe FAQ accordion

## The 17 Sections (from Anima export)

### Header/Navbar (inline in IsografUiMain.tsx)
- Logo "ISOGRAF" + nav links + gold "Jetzt starten" button
- Must become sticky on scroll

### Sections from components:
1. **CertificationHeroSection** (125 LOC) — Hero with gradient card, CTA, customer logos
2. **IntroVideoSection** (57 LOC) — Video introduction area
3. **4-Columns** (FLAT IMAGE in main — `4-coloumns.png`) — MUST be rebuilt as real HTML from `figma-css/04-columns-1-css.md`
4. **CourseModulesSection** (135 LOC) — Course module cards
5. **CourseIntroductionSection** (139 LOC) — Introduction to courses
6. **ExamPrepEbookSection** (461 LOC) — Biggest section, exam prep content
7. **CertificationFactorsSection** (56 LOC) — Certification factors
8. **CertificationAssuranceSection** (291 LOC) — Quality assurance details
9. **ValuePropositionSection** (80 LOC) — Value proposition
10. **MobileAppFeaturesSection** (242 LOC) — Mobile app features showcase
11. **SevenPointMethodSection** (253 LOC) — 7-point method explanation
12. **RelatedContentSection** (60 LOC) — Related content links
13. **TeamSection** (149 LOC) — Team members
14. **ConsultationSection** (71 LOC) — CTA consultation banner
15. **FooterSection** (144 LOC) — Footer with links

## Conversion Rules — CRITICAL

### 1. Visual Fidelity at 1440px = NON-NEGOTIABLE
At exactly 1440px viewport width, the page MUST look IDENTICAL to the Anima export.
- Same colors, fonts, spacing, gradients, shadows, border-radius
- Same layout, proportions, alignments
- Extract EVERY CSS value from the Anima Tailwind classes — don't guess

### 2. Responsive Strategy
- **Desktop (1200px+):** `max-width: 1440px; margin: 0 auto;` container. Content identical to Figma.
- **Tablet (768px-1199px):** Scale proportionally, stack columns where needed
- **Mobile (< 768px):** Single column, hamburger menu, touch-friendly tap targets (44px min)
- Use CSS Grid and Flexbox — NO absolute positioning
- Use `clamp()` for fluid typography where appropriate
- Use `rem` for spacing, derived from the pixel values in the Anima export

### 3. Image Handling
- Download ALL images from `c.animaapp.com` URLs to local `assets/` directory
- Use descriptive filenames (not random hashes)
- Optimize: convert large PNGs to WebP where possible
- Use `loading="lazy"` for below-fold images
- Keep SVGs inline for icons/logos (they're already inline in Anima)

### 4. The "4-Columns" Image Section
This is rendered as a flat PNG in the Anima export (`4-coloumns.png`).
Rebuild it as real HTML using the CSS data from `figma-css/04-columns-1-css.md` AND `figma-css/05-columns-2-css.md`.

### 5. Fonts
- DM Sans (logo, headings, nav) — Google Fonts
- Libre Baskerville (italic accents) — Google Fonts
- Roboto (body text) — Google Fonts

### 6. Colors (from Figma, verified)
- Gold primary: #e2ac26
- Gold gradient: linear-gradient(~58deg, #ffe5ac, #f5c253, #f1b53d, #ffe5ac, #eecb75)
- Navy dark: #14213d
- Text dark: #000000, #272525
- Text gray: #6a7282
- White: #ffffff
- Light bg: #f9f7f2, #faf9f6
- Border light: #f2f4f6

## Available Resources

### Figma CSS files (pre-extracted, EXACT values)
Located in `figma-css/` — 17 files with precise CSS for every element.
**USE THESE for the 4-Columns section** and to VERIFY your conversion matches.

### Figma reference images
Located in `figma-reference-images/` — 17 PNG screenshots from Figma.
**Compare your output against these** at 1440px width.

### Previously downloaded assets
Located in `assets/` — 157 images already downloaded from Figma.
Check if any match the Anima CDN images before re-downloading.

### Builder.io export
`builder-export.html` — 248KB with all German text + inline SVGs.
Use for TEXT CONTENT verification.

## Workflow

1. **Read** the Anima export section by section
2. **Extract** all CSS values from Tailwind classes
3. **Convert** to semantic HTML + CSS (BEM naming)
4. **Replace** absolute positioning with Flexbox/Grid
5. **Add** responsive breakpoints
6. **Download** all Anima CDN images to `assets/`
7. **Rebuild** the 4-Columns image section as real HTML
8. **Test** at 1440px (must match Figma) + 1024px + 768px + 375px
9. **Take screenshots** at each breakpoint for verification

## Output Files
```
index.html    — single HTML file with all sections
styles.css    — all styles, CSS custom properties
script.js     — smooth scroll, sticky nav, mobile menu, FAQ accordion
assets/       — all images (local, optimized)
```

## Quality Bar
- At 1440px: 95%+ visual match with Figma (pixel-perfect goal)
- Responsive: clean, professional look at ALL breakpoints
- Performance: < 3s load on 4G
- Accessibility: semantic HTML, alt texts, focus states
- No broken images, no layout shifts, no horizontal scroll
