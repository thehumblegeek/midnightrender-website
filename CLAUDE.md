# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**MidnightRender** is a cinematic AI video production studio portfolio website for a freelance AI video creator (Sage). It serves commercial and narrative AI-generated video content.

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

- `constants.tsx` — `SHOWREEL_DATA` array: 5 homepage showreel items. Each has `id`, `title`, `category`, `videoUrl` (or `videoId` for Cloudflare), `thumbnailUrl`, `description`, `year`, `prompt`.
- `AllWorks.tsx` — Two hardcoded arrays (`COMMERCIAL_VIDEOS`, `NARRATIVE_VIDEOS`) with 25 total items, defined in the component file itself.
- `types.ts` — `ShowreelItem` interface.

### Video Handling

`ShowreelGrid.tsx` contains a `LazyVideo` sub-component that:
- Uses `IntersectionObserver` to load/play only when scrolled into view
- Plays a 5-second preview loop (`PREVIEW_DURATION = 5`) then pauses
- Supports two modes: `videoId` (Cloudflare Stream HLS) or `videoUrl` (local/fallback)
- Uses `hls.js` for Chrome/Firefox, native HLS for Safari

`CloudflareVideo.tsx` is the shared Cloudflare Stream player component handling HLS + Safari fallback.

Cloudflare Stream video URLs follow this pattern:
```
https://customer-{hash}.cloudflarestream.com/{videoId}/manifest/video.m3u8
```

### AI Integration

`services/videoService.ts` handles Veo AI video generation via the Gemini SDK. `App.tsx` references `window.aistudio` for API key selection in the AI Studio environment — this is safe to ignore in normal browser usage.

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

Located in `.env` at project root (not committed):

```
GEMINI_API_KEY=your_key_here
```

Injected via `vite.config.ts` as both `process.env.API_KEY` and `process.env.GEMINI_API_KEY`.

After Cloudflare Stream setup, also add:
```
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_STREAM_TOKEN=your_api_token
```

---

## Pending Work: Cloudflare Stream Migration

All ~26 unique video files (~3.76 GB) need to migrate from local `/public/videos/` to Cloudflare Stream. Full plan in [`CLOUDFLARE_STREAM_MIGRATION.md`](./CLOUDFLARE_STREAM_MIGRATION.md).

**User must first:** Upload videos to Cloudflare Stream dashboard and record the Video IDs in the tracker table in `CLOUDFLARE_STREAM_MIGRATION.md`.

**Code changes needed once IDs are provided:**
- Update `constants.tsx` — swap `videoUrl` for `videoId` in `SHOWREEL_DATA`
- Update `AllWorks.tsx` — all 25 `videoUrl` strings
- Update `Hero.tsx` — swap `<source src="...">` for Cloudflare stream URL
- Remove `/public/videos/` folder after migration

---

## Known Gotchas

- **Tailwind via CDN** — loaded in `index.html` via `<script src="https://cdn.tailwindcss.com">`. Adds ~350KB with no purging. Custom animations (`subtle-zoom`, `marquee`) are also defined inline in `index.html`.
- **`.mov` files** — Two portfolio videos are in MOV format. `AllWorks.tsx` handles with `type={url.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'}`. Cloudflare Stream will transcode these to HLS.
- **Large video files** — `Monster Movie.mp4` is 563 MB; multiple files are 300+ MB. Primary driver for Cloudflare migration.
- **Git binary diffs** — Some video files may show as modified in git due to binary size changes, not actual code changes.
