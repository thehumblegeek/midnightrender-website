# CLAUDE.md — MidnightRender Project Context

> **Purpose:** This file is a full AI onboarding document. If the model session is lost or you're starting fresh with a new AI assistant, read this file first. It covers everything about the project — what it is, what's been built, what's next, and critical context to avoid repeating work.

---

## 🎬 What This Project Is

**MidnightRender** is a cinematic AI video production studio portfolio website. It showcases the work of a freelance AI video creator (Sage) — commercial and narrative AI-generated video content for brands, artists, and studios.

**Live URL:** `https://midnightrender.com`
**Local Dev:** `http://localhost:3000` (run `npm run dev` from project root)

---

## 🛠️ Tech Stack (Quick Reference)

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 5.8 |
| Build | Vite 6.2 |
| Routing | React Router DOM v7 (2 routes: `/` and `/works`) |
| Styling | Tailwind CSS via CDN + Google Fonts (Manrope + Playfair Display) |
| AI SDK | `@google/genai` v1.41 (Gemini + Veo video generation) |
| Version Control | GitHub → `main` branch |
| Hosting | Vercel — auto-deploys on push to `main` |
| Domain | `midnightrender.com` |

For the full dependency breakdown, see [`TECH_STACK.md`](./TECH_STACK.md).

---

## 📁 Project Structure

```
midnightrender-website/
├── components/
│   ├── Hero.tsx              # Full-screen background video hero section
│   ├── Navbar.tsx            # Fixed top nav (About Us, Work, All Works, Contact Us)
│   ├── ShowreelGrid.tsx      # Homepage video grid — LazyVideo w/ IntersectionObserver
│   ├── VideoModal.tsx        # Lightbox player (opens on grid click)
│   ├── Testimonials.tsx      # TestimonialCarousel + LogoMarquee (client logos)
│   ├── AllWorks.tsx          # /works page — full portfolio grid (Commercial + Narrative)
│   ├── BookingSection.tsx    # CTA / booking section
│   ├── About.tsx             # About blurb section
│   └── Footer.tsx            # Footer with social links
├── services/
│   └── videoService.ts       # Veo AI video generation via Gemini SDK
├── public/
│   ├── logo.png              # Site logo (also used as favicon + poster)
│   ├── studio-bg.jpg         # Background image used in BookingSection.tsx
│   ├── logos/                # 7 client logos for the LogoMarquee
│   ├── thumbnails/           # WebP poster frames for all portfolio videos
│   │   ├── (root)            # Showreel grid thumbnails
│   │   ├── commercial/       # Commercial portfolio thumbnails (13 files)
│   │   └── narrative/        # Narrative portfolio thumbnails (12 files)
│   └── videos/               # Local MP4/MOV video files (pre-Cloudflare)
│       ├── (root)            # Hero + showreel videos
│       ├── commercial/       # 13 commercial portfolio videos
│       └── narrative/        # 12 narrative portfolio videos
├── App.tsx                   # Root — defines routes, wires up all page components
├── constants.tsx             # SHOWREEL_DATA array (5 homepage grid items)
├── types.ts                  # ShowreelItem interface
├── index.html                # HTML entry — Tailwind CDN, Google Fonts, global CSS
├── index.tsx                 # React DOM render entry point
├── vite.config.ts            # Vite config — port 3000, Gemini API key injection
├── TECH_STACK.md             # Full tech stack documentation
├── DESIGN.md                 # Design system reference (colors, fonts, layout rules)
├── CLOUDFLARE_STREAM_MIGRATION.md  # Full migration plan (see "What's Next" below)
└── CLAUDE.md                 # This file
```

---

## 📄 Key Files to Know

### `constants.tsx`
Defines the 5 videos on the homepage showreel grid (`SHOWREEL_DATA`). Each item has:
- `id`, `title`, `category`, `videoUrl`, `thumbnailUrl`, `description`, `year`, `prompt`

### `components/AllWorks.tsx`
Contains two hardcoded arrays:
- `COMMERCIAL_VIDEOS` — 13 items
- `NARRATIVE_VIDEOS` — 12 items

All video URLs currently point to local `/public/videos/` paths.

### `components/ShowreelGrid.tsx`
- Uses `IntersectionObserver` — videos only load/play when scrolled into view
- 5-second preview loop (`PREVIEW_DURATION = 5`)
- Thumbnail shown while video loads, fades out once ready

### `components/Hero.tsx`
- Full-screen background video: `/videos/Update 1 Show Reel.mp4`
- `preload="auto"`, muted, loop, autoplay
- Poster fallback: `/logo.png`

---

## 🎨 Design System (Summary)

- **Theme:** Ultra-dark, cinematic, editorial, premium
- **Background:** Pure black `#000000` everywhere
- **Text:** White headings, `#9CA3AF` for body, `#4B5563` for muted
- **Fonts:** Manrope (UI/headings) + Playfair Display (accent)
- **Headings:** Uppercase, font-black, tight tracking (`tracking-tighter`)
- **Labels/Nav:** 11px, UPPERCASE, `tracking-[0.3em]`, bold
- **No cards, no visible borders** — content floats on black
- **Video hover:** grayscale lifts, slight scale-up (1.02), play icon fades in

Full design system in [`DESIGN.md`](./DESIGN.md).

---

## 🗺️ What's Been Done (Conversation History)

### ✅ Stable State (commit `ac55679`)
The site was reset to this commit on a previous session after changes were reverted. This is the known-good baseline.

### ✅ Project Cleanup (April 2026)
Removed before this backup was created:
- `public/videos/1. Show Reel.mp4` (64 MB) — unreferenced, superseded
- `public/videos/2. Shades of Blue - Atombit.mp4` (23 MB) — unreferenced
- 7 duplicate logo files from `public/logos/` (had both `.jpeg` and `.png` per logo)
- `public/thumbnails/showreel.webp` + `bad-driving.webp` — orphaned
- `services/geminiService.ts` — `generateDirectorVision()` was never imported

### ✅ Documentation Added
- `TECH_STACK.md` — full stack breakdown
- `CLOUDFLARE_STREAM_MIGRATION.md` — video CDN migration plan
- `CLAUDE.md` — this file

### ✅ Backup Created
A clean clone (no `node_modules`, no `.git`) was made at:
```
F:\Work\personal\Ai Coding\Ai Website\midnightrender-website-backup-pre-cloudflare\
```

---

## 🚀 What's Next — Cloudflare Stream Migration

**The big pending task.** All ~26 unique video files (~3.76 GB) need to move from local `/public/videos/` to Cloudflare Stream for global CDN delivery and adaptive bitrate.

**Full plan:** [`CLOUDFLARE_STREAM_MIGRATION.md`](./CLOUDFLARE_STREAM_MIGRATION.md)

### What the user still needs to do manually:
1. Create Cloudflare account at `dash.cloudflare.com`
2. Enable Cloudflare Stream (add payment method — ~$8/mo for this project)
3. Upload all 26 unique videos via the Stream dashboard
4. Fill in the **Video ID Tracker** table in `CLOUDFLARE_STREAM_MIGRATION.md`
5. Hand the Video IDs to the AI to complete the code migration

### What changes in the code once IDs are available:
- Install `hls.js` (`npm install hls.js`)
- Create a shared `CloudflareVideo` component (handles HLS + Safari fallback)
- Update `Hero.tsx` — swap `<source src="...">` for Cloudflare stream URL
- Update `constants.tsx` — swap `videoUrl` for `videoId`
- Update `AllWorks.tsx` — all 25 `videoUrl` strings across `COMMERCIAL_VIDEOS` + `NARRATIVE_VIDEOS`
- Update `ShowreelGrid.tsx` + `VideoModal.tsx` — use new component
- Remove `/public/videos/` folder after migration (saves ~3.76 GB from repo)

---

## ⚠️ Known Issues / Gotchas

- **Tailwind is CDN-loaded** — `<script src="https://cdn.tailwindcss.com">` in `index.html`. Not recommended for production (adds ~350KB, no purging). Should be migrated to PostCSS plugin eventually.
- **Videos are large** — `Monster Movie.mp4` is 563 MB, multiple files are 300+ MB. This is the primary reason for the Cloudflare migration.
- **`.mov` files** — Two portfolio videos (`Buckley Law.mov`, `Sid.mov`, `Werewolf.mov`) are in MOV format. `AllWorks.tsx` handles this with `type={url.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'}`. Cloudflare Stream will transcode these to HLS, solving the format issue entirely.
- **Git — uncommitted video changes** — As of April 2026, 3 video files (`1. Show Reel.mp4`, `5. Bad Driving Commercial 2 v5 (1).mp4`, `6. UGC.mp4`) showed as modified in git. These are binary files with size changes — not code changes. No commits are unpushed.
- **`window.aistudio`** — `App.tsx` references `window.aistudio` for API key selection. This is an AI Studio environment hook. It's safe to ignore in normal browser usage — the site works without it.

---

## 🔑 Environment Variables

Located in `.env` at the project root (not committed to git):

```
GEMINI_API_KEY=your_key_here
```

Injected into the app via `vite.config.ts` as `process.env.API_KEY` and `process.env.GEMINI_API_KEY`.

After Cloudflare Stream setup, also add:
```
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_STREAM_TOKEN=your_api_token
```

---

## 🖥️ Local Dev Commands

```bash
# Start dev server (localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📂 Backup Location

```
F:\Work\personal\Ai Coding\Ai Website\midnightrender-website-backup-pre-cloudflare\
```

This is a clean snapshot taken **before** the Cloudflare Stream migration. To restore: copy folder contents over the main project and run `npm install`.

---

*Last updated: April 6, 2026*
*Model context: Conversation ID `0c729660-d1a4-489d-8927-874980371fd9`*
