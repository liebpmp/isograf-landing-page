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
