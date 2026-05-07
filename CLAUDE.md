# Isograf Landing Page — Pixel-Perfect Figma Implementation

## TASK
Recreate the Figma design EXACTLY as a responsive HTML/CSS/JS one-page website.
The design is in `isograf-main-design.png` (1441x14218px full page) and split into sections in `sections/`.

## CRITICAL: Use the `image` tool!
You MUST use the `image` tool to look at `sections/01-nav-hero.png` through `sections/10-team-footer.png` BEFORE writing any code. Each section image shows the exact design to replicate. Look at EVERY section image.

## Brand
- **Company:** Isograf — ISO 9001 / ISO 42001 Zertifizierungsbegleitung (Done-4-You für KMU)
- **GF:** Daniel Graf ("Mr. Normen")
- **Tone:** Premium, vertrauenswürdig, professionell

## Design System (extracted from Figma)

### Colors
- Primary Dark Navy: `#1A2341`
- Accent Gold: `#D4A843`
- White: `#FFFFFF`
- Light Gray BG: `#F5F5F5`
- Text Dark: `#1A2341`
- Text Gray: `#6B7280`
- Muted Text (on dark): `#B0B8C8`

### Typography
- Body: Inter or similar clean sans-serif (use Inter from Google Fonts)
- Accent/Script headings: Playfair Display Italic for gold accent words
- Heading sizes: 36-42px (H1), 28-32px (H2), 20-22px (H3)
- Body: 14-16px
- Line-height: 1.2 (headings), 1.6-1.7 (body)

### Design Patterns
- Alternating section backgrounds: White → Navy → White → Navy
- Gold accent words in headings (script/italic font)
- Cards with subtle borders on dark bg: `rgba(255,255,255,0.1)` border, `rgba(255,255,255,0.05)` bg
- Border-radius: 12-16px on cards, 8px on buttons
- Shadows: `0 10px 40px rgba(0,0,0,0.1)` on cards
- Max container width: ~1200px centered

## Sections (top to bottom — reference sections/ images)

### 1. Navigation Bar (sections/01-nav-hero.png)
- Sticky top, dark navy bg
- Logo left, nav links center-right, gold CTA button right
- Height ~60-70px

### 2. Hero Section (sections/01-nav-hero.png + sections/02-hero-stats.png)
- Dark navy background
- Left: Headline "Der einfache Weg zu deiner Zertifizierung" (gold accent on key word)
- Left: Subtext, trust badges row (grayscale logos), stats row (gold numbers)
- Right: Professional photo of man in suit
- Stats: "+800", "+20", "+1.200" with labels

### 3. Video Section (sections/03-video-social.png)
- White/light bg
- Centered video thumbnail with play button
- Floating testimonial cards around video (slight rotation, shadows)

### 4. "Warum zum Isograf?" (sections/04-warum-isograf.png)
- White bg
- Centered heading with "Isograf" in gold script
- Testimonial quote block with gold quote marks

### 5. "Done-4-You Zertifizierung" (sections/05-done4you.png)
- Dark navy bg
- 3 icon cards inline (semi-transparent bg, gold icons)
- "Zertifizierung" in gold script

### 6. "Zertifizierung, Die Ihr Wachstum Trägt" (sections/06-wachstum.png)
- White bg, two-column layout
- Left: Text + checklist with gold checkmarks
- Right: Photo with floating stat card overlay

### 7. Features/Benefits (sections/07-features.png)
- Light gray bg
- Feature list with icons
- CTA: "Bereit für Ihre Zertifizierung?"

### 8-9. "5-Phasen-Methode" (sections/08-ergebnisse-phasen.png + sections/09-phasen-continued.png)
- Results stats section (dark navy)
- Then vertical timeline with 5 steps, alternating left-right layout
- Step circles with gold borders, connecting vertical line
- Each step has title, description, small image

### 10. Team + Footer (sections/10-team-footer.png)
- Team section: Grid of headshot cards (3-4 columns)
- Footer: Dark navy, logo, nav links, contact info

## Technical Requirements
- Single HTML file with embedded CSS (or separate CSS file)
- Vanilla HTML/CSS/JS — NO frameworks
- Google Fonts: Inter + Playfair Display
- Fully responsive (Desktop pixel-perfect → Tablet → Mobile)
- Smooth scroll for nav links
- Images: Use placeholder images from picsum.photos or placeholder.com for photos
- Icons: Use inline SVG or simple CSS shapes (no icon library dependency)
- Deploy-ready for GitHub Pages

## File Structure
```
index.html
styles.css
script.js
assets/ (if needed)
```

## Quality Bar
- Desktop MUST look identical to the Figma screenshots
- Mobile must be clean and professional (stack columns, adjust font sizes)
- No visual bugs, no overflow, no misaligned elements
- Smooth animations (fade-in on scroll, hover effects on cards/buttons)

## Image References
ALWAYS look at the section images before coding each section:
- `sections/01-nav-hero.png` → Nav + Hero top
- `sections/02-hero-stats.png` → Hero bottom + stats
- `sections/03-video-social.png` → Video + social proof
- `sections/04-warum-isograf.png` → Why Isograf
- `sections/05-done4you.png` → Done-4-You cards
- `sections/06-wachstum.png` → Growth section
- `sections/07-features.png` → Features
- `sections/08-ergebnisse-phasen.png` → Results + phases start
- `sections/09-phasen-continued.png` → Phases continued
- `sections/10-team-footer.png` → Team + Footer
