# Isograf Landing Page — Figma MCP → Pixel-Perfect Website

## Mission
Build a pixel-perfect responsive website from the Figma design using the Figma MCP server for exact design values.

## Figma File
- **File:** `zjXTHbWMJ85arqkgO17rxa`
- **Page:** "Isograf Landingpages (Stand 08.05.2026)"
- **Frame:** "Isograf_UI - Main" (node-id: `75:2473`)
- **Size:** 1441px × 14218px

## 17 Sections (in order)
| # | Name | Node ID |
|---|------|---------|
| 1 | NavBar | 75:2474 |
| 2 | Hero | 75:2492 |
| 3 | References | 75:2557 |
| 4 | 4 Columns | 75:2568 |
| 5 | 4 Columns | 75:2575 |
| 6 | Introduction | 75:2605 |
| 7 | Certificate | 75:2660 |
| 8 | Frame 16 | 75:2831 |
| 9 | Growth | 75:2839 |
| 10 | Contact Banner | 75:2941 |
| 11 | Routes / References | 75:2960 |
| 12 | 5 Methods | 75:3076 |
| 13 | Comparison | 75:3176 |
| 14 | Frame 14 | 75:3313 |
| 15 | Routes / References | 75:3321 |
| 16 | Contact Banner | 75:3402 |
| 17 | Footer | 75:3424 |

## Workflow — Section by Section

For EACH section:
1. **Use Figma MCP tools** to read the node and ALL its children (deep). Extract:
   - Layout mode (auto-layout → flexbox, or absolute)
   - Exact dimensions, padding, gap, itemSpacing
   - Fill colors (solid, gradient — copy exact stops)
   - Typography: fontFamily, fontSize, fontWeight, lineHeight, letterSpacing
   - Border radius, strokes, effects (shadows, blurs)
   - Image fills → export as PNG/JPG via Figma API to `assets/`
2. **Write the HTML + CSS** for that section using the EXACT values from Figma
3. **Move to the next section**

## Figma MCP Tools Available
You have a Figma MCP server connected. Use its tools to:
- Read node properties (layout, styles, typography)
- Get CSS for nodes
- Export images from nodes
- Navigate the node tree

## Also Available: builder-export.html
The file `builder-export.html` (248KB) is a Builder.io export of the same Figma frame. It contains:
- All text content (German)
- All inline SVGs (logo, icons, decorative)
- Image URLs on Builder.io CDN
- Approximate inline styles

Use builder-export.html as a SECONDARY reference for:
- Text content (copy verbatim)
- SVG code (copy verbatim)
- Image URLs (download to assets/)

But use Figma MCP as PRIMARY source for all layout and styling values.

## Design System (from Figma)

### Fonts
- **DM Sans** — Logo, navigation, headings (400, 500, 700)
- **Libre Baskerville** — Italic accents in headings
- **Roboto** — Body text (400, 500)

### Colors (verify via Figma MCP)
- Gold primary: `#E2AC26`
- Gold light: `#FCC846`
- Navy: `#14213D`, `#082742`
- Text: `#000`, `#6A7282`, `#272525`

## Output Files
```
index.html    — semantic HTML5, one <section> per Figma frame
styles.css    — all styles with CSS custom properties
script.js     — smooth scroll, sticky nav, mobile menu, FAQ accordion
assets/       — all images from Figma
```

## Responsive
- Desktop: 1441px (MUST match Figma exactly)
- Tablet: 768px (stack where needed)
- Mobile: 375px (single column, hamburger)

## Critical Rules
1. **Every CSS value must come from Figma MCP data** — no guessing
2. At 1441px width, the result MUST be indistinguishable from the Figma design
3. Download ALL images via Figma image export API
4. Keep all SVGs from builder-export.html (they're already correct)
5. Git commit and push to GitHub Pages when done

## ⚠️ IMPORTANT: Use LOCAL Figma JSON files (NOT the MCP API!)

The Figma API has rate limits. ALL section data has been pre-downloaded to local JSON files.

**DO NOT use mcp__figma__get_figma_data!** Instead, read the local JSON files:

```
figma-sections/01-navbar.json
figma-sections/02-hero.json
figma-sections/03-references.json
figma-sections/04-columns-1.json
figma-sections/05-columns-2.json
figma-sections/06-introduction.json
figma-sections/07-certificate.json
figma-sections/08-frame16.json
figma-sections/09-growth.json
figma-sections/10-contact-banner.json
figma-sections/11-routes-refs-1.json
figma-sections/12-five-methods.json
figma-sections/13-comparison.json
figma-sections/14-frame14.json
figma-sections/15-routes-refs-2.json
figma-sections/16-contact-banner-2.json
figma-sections/17-footer.json
```

Each JSON file contains the COMPLETE Figma node tree with ALL properties:
- `fills` → background colors, gradients
- `style` → typography (fontFamily, fontSize, fontWeight, lineHeight, letterSpacing)  
- `absoluteBoundingBox` → exact x, y, width, height
- `paddingLeft/Right/Top/Bottom` → padding
- `itemSpacing` → gap
- `layoutMode` → HORIZONTAL/VERTICAL = flexbox direction
- `cornerRadius` → border-radius
- `strokes` → borders
- `effects` → shadows, blurs
- `characters` → text content

### How to extract CSS from JSON:
1. Read the JSON file for the section
2. Parse the node tree recursively
3. Map Figma properties to CSS:
   - `fills[0].color` (r,g,b,a 0-1) → `rgb(r*255, g*255, b*255)`
   - `layoutMode: "HORIZONTAL"` → `display: flex; flex-direction: row`
   - `layoutMode: "VERTICAL"` → `display: flex; flex-direction: column`
   - `primaryAxisAlignItems` → `justify-content`
   - `counterAxisAlignItems` → `align-items`
   - `itemSpacing` → `gap`
   - `absoluteBoundingBox.width/height` → `width/height`

### For images: Use mcp__figma__download_figma_images
Image downloads still work. For any node with `type: "RECTANGLE"` and `fills[].type: "IMAGE"`, export via:
- mcp__figma__download_figma_images with fileKey "zjXTHbWMJ85arqkgO17rxa" and the node IDs
