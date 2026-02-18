# MidnightRender — Design System

## Brand Identity
Cinema-quality AI video production. The design is **ultra-dark, cinematic, editorial, and premium**. Every element should feel like a high-end film studio's portfolio — bold, confident, minimal, with dramatic use of negative space.

## Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Background | Pure Black | `#000000` |
| Text Primary | White | `#FFFFFF` |
| Text Secondary | Cool Gray | `#9CA3AF` |
| Text Muted | Dark Gray | `#4B5563` |
| Overlay Light | White 90% | `rgba(255,255,255,0.9)` |
| Overlay Dark | Black 80% | `rgba(0,0,0,0.8)` |
| Gradient Overlay | Bottom-up | `from-black/80 via-black/30 to-black/40` |

## Typography
| Role | Font | Weight | Size | Tracking |
|------|------|--------|------|----------|
| Body / UI | Manrope | 400 | base | normal |
| Headings | Manrope | 700-800 | 3xl–9xl | tight (`tracking-tighter`) |
| Nav / Labels | Manrope | 700 | 11px | ultra-wide (`0.3em`) |
| Taglines | Manrope | 700 | sm | widest (`tracking-widest`) |
| Editorial Accent | Playfair Display | 400/700 | varies | normal |

**Text style rules:**
- Navigation and labels: UPPERCASE, 11px, bold, letter-spacing 0.3em
- Headings: Bold/Black weight, tight tracking, large scale
- Body text: Gray (#9CA3AF), relaxed leading, 18-24px
- Footer meta: UPPERCASE, 10px, dark gray, 0.3em tracking

## Layout Principles
- **Full-bleed everything** — sections span edge-to-edge
- **Generous spacing** — py-32 for sections, p-8 to p-16 for content
- **Centered content** — max-w-4xl or max-w-5xl with mx-auto
- **No visible borders or cards** — content floats on black
- **Cinematic aspect ratios** — 21:9 for video showcases on desktop

## Component Patterns

### Navigation
- Fixed top, z-50, transparent background
- Two links only: left-aligned and right-aligned
- No logo in nav (logo lives in Hero)

### Video Sections
- Full-width, stacked vertically, no gaps
- Background video with 20% grayscale (removes on hover)
- Dark gradient overlay from bottom
- Title: bottom-left, font-black, 2xl–5xl
- Subtitle: below title, font-bold, white/90
- Hover: scale 1.02, centered play button (glass circle + triangle)

### CTA / Booking
- Massive heading (5xl–9xl), tight tracking
- Left-aligned on desktop, centered on mobile
- Widget or form area below

### Footer
- Centered layout
- Logo + massive bold tagline
- Underlined uppercase links
- Social links (X, IG) and legal text in muted gray

## Animations & Interactions
| Effect | Implementation |
|--------|----------------|
| Hero zoom | `scale(1) → scale(1.05)` over 20s, infinite alternate |
| Video hover | `grayscale(20%) → grayscale(0)`, `scale(1) → scale(1.02)`, 1s ease-out |
| Play button | Fade-in on hover (opacity 0 → 1), glass blur circle |
| Link hover | opacity transition to 70% |
| Scrollbar | 4px width, dark gray thumb on black track |

## Design System Notes for Stitch Generation

**Copy this block into every Stitch prompt to maintain consistency:**

```
**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Ultra-dark, cinematic, editorial, premium
- Background: Pure Black (#000000) everywhere
- Text Primary: White (#FFFFFF) for all headings
- Text Secondary: Cool Gray (#9CA3AF) for body/descriptions
- Text Muted: Dark Gray (#4B5563) for fine print
- Font: Manrope (sans-serif, bold/black for headings, ultra-wide tracking for labels)
- Font Accent: Playfair Display (serif) for editorial touches
- Layout: Full-bleed sections, no cards, no visible borders
- Spacing: Very generous — large padding (py-32), breathing room
- Nav/Labels: UPPERCASE, 11px, bold, 0.3em letter-spacing
- Headings: Bold/Black, tight tracking, 3xl–9xl scale
- Video areas: Use dark placeholder images with gradient overlay from bottom
- Hover effects: Slight scale-up, play button reveal (describe in prompt)
- Overall vibe: High-end film studio portfolio, confident, minimal, dramatic
```

## Workflow: Stitch → Code

1. **Design in Stitch** — Create new page layouts using the design system block above
2. **Export from Stitch** — Pull generated HTML structure and styling
3. **Integrate into React** — Convert to TSX components, wire up real video playback, add hover effects and animations from the patterns above
4. **Videos** — Replace Stitch placeholder images with actual `<video>` elements using files from `public/videos/`
