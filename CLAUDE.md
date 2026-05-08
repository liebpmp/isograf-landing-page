# Isograf Landing Page — Builder.io Export → Responsive

## Mission
Take `builder-export.html` (the EXACT Figma design as HTML) and make it responsive + production-ready. DO NOT rebuild or reinterpret the design. The export IS the design.

## Approach: MINIMAL CHANGES
The builder-export.html already looks pixel-perfect at 1441px. Your job:

1. **Keep the HTML structure as close to builder-export.html as possible**
2. **Replace absolute positioning with flexbox/grid** — but preserve the EXACT same visual result at 1441px
3. **Add responsive breakpoints** for tablet (768px) and mobile (375px)
4. **Download images** from Builder.io CDN → local `assets/` folder
5. **Add interactivity**: smooth scroll, sticky nav, mobile hamburger, FAQ accordion
6. **DO NOT change**: colors, fonts, spacing, text content, element order, visual hierarchy

## Critical Rules

1. **PIXEL-PERFECT AT 1441px** — if your version looks different from builder-export.html at 1441px width, you've failed
2. **Copy exact CSS values** from the inline styles in builder-export.html — don't approximate
3. **Keep all inline SVGs** exactly as they are in the export
4. **Preserve layer-name attributes** as class names for semantic meaning
5. **Every gradient, shadow, border-radius, font-size, line-height** must match the export exactly
6. **Test by opening both files side-by-side** at 1441px — they must be indistinguishable

## Workflow

### Step 1: Download all images
```bash
# Extract all Builder.io CDN URLs from builder-export.html
grep -o 'src="https://api.builder.io[^"]*"' builder-export.html | sort -u
# Download each to assets/ with hash as filename
# Replace URLs in your new HTML
```

### Step 2: Convert to responsive
- Take builder-export.html section by section
- For each section: convert `position:absolute` + fixed px to flexbox
- VERIFY at 1441px it still looks identical
- Then add responsive rules

### Step 3: Add interactivity
- Smooth scroll for nav links
- Sticky nav with backdrop-blur
- Mobile hamburger menu
- FAQ accordion (if present)
- Intersection observer for scroll animations (subtle)

## Fonts (from export)
- `DM Sans` — weight 400, 500, 700
- `Libre Baskerville` — italic accent
- `Roboto` — body text, weight 400, 500

## DO NOT
- Rewrite the design from scratch
- Change the visual hierarchy
- Use different spacing than what's in the export
- Simplify or "clean up" the design
- Remove decorative elements
- Change any text content
