# Isograf Landing Page V12 — Pixel-Perfect Fix Round

## ⚠️ CRITICAL RULES
1. The current code is ALREADY responsive with 3 breakpoints — DO NOT rewrite responsive logic
2. Only fix the specific issues listed below
3. Use `figma-references-v11/figma-section-*.png` images (view with `image` tool) as the PIXEL REFERENCE
4. Use Figma MCP (`mcp__figma__get_figma_data` with file key `rvCwJ18rF7Fmm9i7vc9PK6`) to get exact CSS values and download missing assets
5. Save result as `versions/v12.html` + `versions/v12.css`, also update root files

## Architecture
- Vanilla HTML + CSS + minimal JS. Static GitHub Pages hosting.
- Fonts: DM Sans (headings), Libre Baskerville (italic), Roboto (body)
- Gold: #e2ac26, Navy: #14213d

## ===== 12 ISSUES TO FIX =====

### 🔴 1. Double "Jetzt starten" Button in Navbar
There are TWO "Jetzt starten" buttons visible on desktop. One has class `mobile-cta` (should be `display: none` on desktop) and one in `.site-header__cta`. Verify `.mobile-cta { display: none; }` is in the CSS (not inside a media query). Currently it might only be set inside a mobile media query.

### 🟡 2. Hero — Daniel Further Right
Daniel's photo cutout needs to move further right so there's better proportion when the background goes full-width. Check Figma section 1 (`figma-section-1.png`) for exact positioning. Daniel should bleed off the right edge slightly.

### 🟡 3. Content Sections Wider
The inner content areas are too narrow. Increase `max-width` on inner wrappers by ~100-150px where they look too constrained. Check against Figma proportions.

### 🟡 4. Modules Section (ISO 9001, AZAV, ZFU, Listung) — Bigger Font + Column Illustrations
- Increase font size for card descriptions (better desktop readability)
- The decorative column illustrations should be CLOSER to/touching the card edges (like in Figma)
- Check `figma-section-2.png` for reference

### 🔴 5. "Warum zum ISOGRAF" — WRONG Daniel Photo
Currently uses the same Daniel cutout as the hero (black suit, white shirt, arms crossed). The Figma shows a DIFFERENT photo: Daniel in a **gray/blue blazer, light blue shirt, slightly different angle, more relaxed expression**. 
- Download the correct image from Figma MCP using `mcp__figma__download_figma_images`
- The photo should be LARGER than current and properly layered over the columns background
- Check `figma-section-3.png` for reference

### 🟡 6. Done-4-You — Add Carousel Navigation (Visual)
The Figma shows carousel-style navigation below the 4 cards:
- Two circular arrow buttons (left outlined, right filled gold)
- 5 pagination dots below (3rd active/filled)
- The center card is "active" (larger, gold border), flanking cards are dimmed
- Currently V11 shows all 4 in a flat grid — change to: all 4 visible BUT with active card highlighted, plus add the arrow buttons + dots below
- Add basic JS: clicking arrows changes which card is "active" (gets gold border + full opacity, others dim)
- Check `figma-section-4.png` for reference

### 🔴 7. "Unkomplizierter Prozess" Card — Wrong Checkmark Icon
The current checkmark is CSS-generated. The Figma shows a **premium glassmorphism checkmark**: white checkmark inside a translucent circle with a subtle glow/radial light behind it.
- Download the actual asset from Figma MCP or recreate with CSS (radial gradient glow + frosted circle + white checkmark)
- Check `figma-section-5.png` for reference

### 🔴 8. Daniel Photo in Bento Grid — Missing Color Gradient
The Daniel photo in the bento grid ("Zertifizierung die Ihr Wachstum trägt" section, top-left card) should have a **dark navy-to-blue gradient overlay/tint** — it's desaturated/cool-toned in Figma, not the current warm/color photo.
- Add a CSS overlay (navy-to-blue gradient with mix-blend-mode or ::after pseudo-element)
- The testimonial cards floating on top are already there from V11
- Check `figma-section-5.png` for reference

### 🔴 9. "Echtes Wachstum" Card — Completely Different from Figma
In Figma this card has:
- A blend of dark navy gradient (left) transitioning to faded classical building photo (right)
- **Diamond/rhombus decorative shapes** (◇) at top-left and bottom-left
- Text on the LEFT side of the card
- Currently it's plain — needs the gradient, building photo background, and diamond decorations
- Check `figma-section-5.png` for reference

### 🔴 10. "Bereit für Ihre Zertifizierung?" CTA — Daniel Position
Daniel must be on the RIGHT side (not left) and his photo must EXTEND ABOVE the card boundary (head breaks out of the card). This creates the signature "breaking-bounds" effect from the Figma design.
- Use `position: relative` on the card + `position: absolute` or negative `margin-top` on Daniel's photo
- Check `figma-section-6.png` for reference

### 🟡 11. 5-Phasen-Methode — Fly-in Animation
Add subtle CSS animations: each phase card flies in from left/right alternately as the user scrolls to them.
- Use `@keyframes` + `IntersectionObserver` in JS
- Stagger the animations (each phase 150ms after the previous)
- Subtle: `opacity: 0; transform: translateX(-40px)` → `opacity: 1; transform: translateX(0)`
- Alternate direction: odd phases from left, even from right

### 🟡 12. General Colors — Match Figma More Closely
Some sections have slightly different colors than Figma. Use the Figma MCP to verify exact color values for:
- Navy backgrounds
- Gold accents
- Card backgrounds
- Text colors on dark backgrounds

## Available Resources
- **Figma section images:** `figma-references-v11/figma-section-{1..10}.png` — USE IMAGE TOOL to view these!
- **Figma MCP:** `mcp__figma__get_figma_data` (file key: `rvCwJ18rF7Fmm9i7vc9PK6`) for CSS values + `mcp__figma__download_figma_images` for assets
- **Anima source:** `anima-source/anima-v10/` — for understanding component structure
- **Current assets:** `assets/anima/` — 89+ images
