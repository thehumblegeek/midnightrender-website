# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **New developer?** Read [`HANDOFF.md`](./HANDOFF.md) first for setup, accounts, and the high-level orientation. This file is the architecture deep-dive Claude Code will lean on while editing the codebase.

---

## Project Overview

**MidnightRender** is a cinematic AI video production studio portfolio website. It showcases commercial and narrative AI-generated video content for a freelance AI video creator.

- **Live URL:** `https://midnightrender.com`
- **Hosting:** Vercel — auto-deploys on push to `main`
- **Local Dev:** `http://localhost:3000`

---

## Commands

```bash
npm run dev      # Start dev server on localhost:3000
npm run build    # Production build (Vite)
npm run preview  # Preview production build locally
```

No test or lint commands are configured.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 5.8 |
| Build | Vite 6.2 |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS via CDN + Google Fonts (Manrope + Playfair Display) |
| AI SDK | `@google/genai` v1.41 (Gemini + Veo video generation) |
| Video Streaming | `hls.js` v1.6 (Cloudflare Stream HLS) |

---

## Architecture

### Routing

Two routes defined in `App.tsx`:
- `/` — `HomePage`: Hero + showreel grid (5 videos) + testimonials + booking CTA
- `/works` — `AllWorks`: Full portfolio grid (13 commercial + 12 narrative)

### Data / Content

- `constants.tsx` — `SHOWREEL_DATA` array: 5 homepage showreel items. Each has `id`, `title`, `category`, `videoId` (Cloudflare Stream), `thumbnailUrl`, `description`, `year`, `prompt`.
- `AllWorks.tsx` — Two hardcoded arrays (`COMMERCIAL_VIDEOS`, `NARRATIVE_VIDEOS`) with 25 total items, defined in the component file itself.
- `types.ts` — `ShowreelItem` interface.

### Video Handling

All portfolio videos are hosted on **Cloudflare Stream** and referenced by `videoId`. There are no local video files in production — `public/videos/commercial/` and `public/videos/narrative/` are gitignored.

`ShowreelGrid.tsx` contains a `LazyVideo` sub-component that:
- Uses `IntersectionObserver` to load/play only when scrolled into view
- Plays a 5-second preview loop (`PREVIEW_DURATION = 5`) then pauses
- Supports two modes: `videoId` (Cloudflare Stream HLS) or `videoUrl` (local fallback, unused in production)
- Uses `hls.js` for Chrome/Firefox, native HLS for Safari

`CloudflareVideo.tsx` is the shared Cloudflare Stream player component handling HLS + Safari fallback.

Cloudflare Stream HLS URLs follow this pattern:
```
https://customer-{hash}.cloudflarestream.com/{videoId}/manifest/video.m3u8
```

For 1080p immediate playback (bypassing ABR warmup), append `?clientBandwidthHint=10`.

The full Cloudflare video ID tracker lives in [`CLOUDFLARE_STREAM_MIGRATION.md`](./CLOUDFLARE_STREAM_MIGRATION.md).

### AI Integration

`services/videoService.ts` handles Veo AI video generation via the Gemini SDK. `App.tsx` references `window.aistudio` for API key selection in the Google AI Studio environment — this is safe to ignore in normal browser usage (it's a no-op outside AI Studio).

---

## Design System

- **Theme:** Ultra-dark, cinematic, editorial, premium
- **Background:** Pure black `#000000` everywhere
- **Text:** White headings, `#9CA3AF` body, `#4B5563` muted
- **Fonts:** Manrope (UI/headings) + Playfair Display (accent)
- **Headings:** Uppercase, font-black, tight tracking (`tracking-tighter`)
- **Labels/Nav:** 11px, UPPERCASE, `tracking-[0.3em]`
- **No cards, no visible borders** — content floats on black
- **Video hover:** grayscale lifts, slight scale-up (1.02), play icon fades in

Full design reference in [`DESIGN.md`](./DESIGN.md).

---

## Environment Variables

A template is provided in [`.env.example`](./.env.example). Copy to `.env` and fill in values:

```bash
cp .env.example .env
```

| Variable | Required? | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | Optional | Powers `services/videoService.ts` AI video generation. Site runs fine without it. |

Vite injects this via `vite.config.ts` as both `process.env.API_KEY` and `process.env.GEMINI_API_KEY`.

**No Cloudflare credentials are needed at runtime** — videos are referenced by ID and served publicly from Cloudflare Stream. Cloudflare account credentials are only needed if you want to upload/manage videos directly via the dashboard or API. If Claude needs them for a specific task, ask the developer to provide them out-of-band.

---

## Common Tasks

### Adding a new video
1. Upload to Cloudflare Stream dashboard
2. Copy the 32-char video ID
3. Add to `SHOWREEL_DATA` (homepage) or `COMMERCIAL_VIDEOS` / `NARRATIVE_VIDEOS` in `AllWorks.tsx`
4. Drop a `.webp` thumbnail in `public/thumbnails/{commercial,narrative}/`

### Updating copy
- Hero text → `components/Hero.tsx`
- About section → `components/About.tsx`
- Booking CTA → `components/BookingSection.tsx`
- Testimonials → `components/Testimonials.tsx`
- Footer (email, links) → `components/Footer.tsx`

### Deploying
Push to `main`. Vercel handles the rest. There is no manual deploy step.

---

## Known Gotchas

- **Tailwind via CDN** — loaded in `index.html` via `<script src="https://cdn.tailwindcss.com">`. Adds ~350KB with no purging. There is no `tailwind.config.js`. Custom animations (`subtle-zoom`, `marquee`) are defined inline in `index.html`.
- **No tests, no linter** — `npm test` and `npm run lint` don't exist. Don't suggest running them.
- **`.mov` references in old code/commits** — Two original portfolio videos were `.mov`. Cloudflare Stream transcoded everything to HLS, so this no longer matters at runtime.
- **Bundle size warning during build** — `hls.js` + `@google/genai` push past Vite's default warning threshold. Expected, not a problem.
- **`window.aistudio` in `App.tsx`** — only meaningful inside Google AI Studio's hosted environment. Ignore it in normal browser usage.
