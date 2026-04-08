# MidnightRender — Developer Handoff

Welcome. This document is the entry point for the new owner/developer taking over the **MidnightRender** website. Read this first, then read [`CLAUDE.md`](./CLAUDE.md) for the deeper architecture reference.

---

## 1. What This Project Is

**MidnightRender** is a cinematic AI video production portfolio site for a freelance AI video creator. It showcases commercial and narrative AI-generated video content via a homepage showreel, a full portfolio page, testimonials, and a booking CTA.

- **Live URL:** https://midnightrender.com
- **Repo:** https://github.com/thehumblegeek/midnightrender-website
- **Hosting:** Vercel — auto-deploys on every push to `main`
- **Local dev URL:** http://localhost:3000

---

## 2. First-Time Setup (Do This First)

### Prerequisites — Local Software

**Required (minimum to run the project):**

| Software | Why | Install |
|---|---|---|
| **Node.js 20+ (LTS)** | Runs Vite dev server and builds | https://nodejs.org |
| **npm** | Package manager | ships with Node.js |
| **Git** | Clone the repo, push commits | https://git-scm.com |
| **A modern browser** | Test locally (Chrome/Edge/Firefox/Safari) | — |

**Recommended (matches the previous developer's setup):**

| Software | Why |
|---|---|
| **Google Antigravity IDE** | Same editor environment used to build the site |
| **Claude Code** (CLI or extension) | Same AI coding assistant — already wired into the repo via `CLAUDE.md` |
| **GitHub account** with push access | To push commits to `thehumblegeek/midnightrender-website` |
| **Vercel account** linked to the repo | To view deploy logs and manage production env vars |

**Optional (only for specific tasks):**

| Software | When you'd need it |
|---|---|
| **Cloudflare account** with Stream access | Uploading or replacing portfolio videos |
| **FFmpeg** | Re-encoding videos locally before upload (`@ffmpeg/ffmpeg` is a dev dep but not required for normal dev) |
| **Image editor** (Photoshop, GIMP, Squoosh) | Creating new `.webp` thumbnails |

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/thehumblegeek/midnightrender-website.git
cd midnightrender-website

# 2. Install dependencies
npm install

# 3. Create a local env file (see section 3 below)
cp .env.example .env
# then edit .env and fill in your keys

# 4. Run the dev server
npm run dev
```

Open http://localhost:3000 in your browser. The site should load with all videos streaming from Cloudflare.

### Build / Preview / Deploy

```bash
npm run build      # Production build → dist/
npm run preview    # Preview the production build locally
```

Deployment happens automatically: **push to `main` → Vercel builds & deploys**. There is no separate deploy command.

---

## 3. Environment Variables

The repo includes a [`.env.example`](./.env.example) template. Copy it to `.env` and fill in the values.

**Required for the site to function fully:**

| Variable | Used By | Where to Get It |
|---|---|---|
| `GEMINI_API_KEY` | `services/videoService.ts` (Veo AI video generation) | https://aistudio.google.com/apikey |

**Note:** The site itself loads and runs without `GEMINI_API_KEY` — it only powers the optional AI video generation feature. If you don't plan to touch that feature, you can leave it empty for local dev.

### Accounts You'll Likely Need (Eventually)

The previous owner managed these. As the new owner, you should request access to or create your own:

| Service | What It's For | Action Needed |
|---|---|---|
| **Vercel** | Hosting & auto-deploy | Get the project transferred to your Vercel account, OR fork the repo and deploy fresh |
| **Cloudflare Stream** | Hosts all 26 portfolio videos (~3.76 GB) | Get account access OR re-upload videos to your own Cloudflare account and update video IDs in `constants.tsx` and `components/AllWorks.tsx` |
| **Domain registrar** | `midnightrender.com` DNS | Get the domain transferred to your registrar |
| **Google AI Studio** | `GEMINI_API_KEY` for the Veo feature | Create your own key — free tier is fine |

**Important:** None of these credentials live in this repo. You'll need to coordinate with the previous owner to receive them out-of-band (password manager, secure note, etc.). Claude Code will ask for any of these as needed when you start working on related features.

---

## 4. Tech Stack (Quick Reference)

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 5.8 |
| Build | Vite 6.2 |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS via CDN + Google Fonts (Manrope + Playfair Display) |
| AI SDK | `@google/genai` v1.41 (Gemini + Veo) |
| Video Streaming | `hls.js` v1.6 + Cloudflare Stream HLS |

For the full architecture breakdown, see [`CLAUDE.md`](./CLAUDE.md). For the design system, see [`DESIGN.md`](./DESIGN.md).

---

## 5. Project Structure (At a Glance)

```
midnightrender-website/
├── App.tsx                    # Router (/ and /works)
├── index.html                 # Entry HTML — Tailwind CDN, custom CSS animations
├── index.tsx                  # React mount point
├── constants.tsx              # SHOWREEL_DATA — homepage's 5 featured videos
├── types.ts                   # ShowreelItem interface
├── components/
│   ├── Hero.tsx               # Top-of-page hero video
│   ├── ShowreelGrid.tsx       # Homepage 5-video showreel + LazyVideo loader
│   ├── AllWorks.tsx           # /works page — full 25-video portfolio (data inline)
│   ├── Testimonials.tsx       # Client testimonials carousel
│   ├── BookingSection.tsx     # CTA to book + email link
│   ├── About.tsx, Footer.tsx, Navbar.tsx, VideoModal.tsx, CloudflareVideo.tsx
├── services/
│   └── videoService.ts        # Veo AI video generation (uses GEMINI_API_KEY)
├── public/
│   ├── logos/                 # Client logos shown in trust strip
│   ├── thumbnails/            # Video poster images (.webp)
│   └── studio-bg.jpg
├── CLAUDE.md                  # Deep architecture + Claude Code guidance
├── DESIGN.md                  # Design system reference
├── TECH_STACK.md              # Tech stack notes
└── CLOUDFLARE_STREAM_MIGRATION.md   # Cloudflare video ID tracker
```

**Note:** `public/videos/commercial/` and `public/videos/narrative/` are gitignored. All videos are hosted on Cloudflare Stream — the local folders are leftover originals and not needed to run the site.

---

## 6. How Videos Work

This is the most non-obvious part of the codebase, so it gets its own section.

1. **All 26 videos are hosted on Cloudflare Stream**, not locally.
2. Each video has a **Cloudflare video ID** (a 32-char hex string). These IDs are stored in:
   - [`constants.tsx`](./constants.tsx) — for the 5 homepage showreel items
   - [`components/AllWorks.tsx`](./components/AllWorks.tsx) — for the 25 portfolio items
3. The `CloudflareVideo` component builds the HLS URL:
   ```
   https://customer-{hash}.cloudflarestream.com/{videoId}/manifest/video.m3u8
   ```
4. `hls.js` plays HLS in Chrome/Firefox; Safari plays it natively.
5. `ShowreelGrid.tsx → LazyVideo` uses `IntersectionObserver` to load videos only when they scroll into view, then plays a 5-second preview loop and pauses.

**To add a new video:**
1. Upload it to Cloudflare Stream dashboard
2. Copy the video ID
3. Add a new entry to either `SHOWREEL_DATA` (homepage) or `COMMERCIAL_VIDEOS` / `NARRATIVE_VIDEOS` in `AllWorks.tsx`
4. Create a thumbnail `.webp` at ~1280x720 and drop it in `public/thumbnails/{commercial,narrative}/`

Full migration history and the video ID tracker is in [`CLOUDFLARE_STREAM_MIGRATION.md`](./CLOUDFLARE_STREAM_MIGRATION.md).

---

## 7. Known Gotchas

- **Tailwind via CDN, not PostCSS** — loaded in `index.html`. Adds ~350KB unpurged. Don't be surprised that there's no `tailwind.config.js`. Custom animations (`subtle-zoom`, `marquee`) live inline in `index.html`.
- **No tests, no linter configured** — `npm test` and `npm run lint` don't exist. Add them if you want them.
- **`.mov` files** — Two original portfolio videos were `.mov`. Cloudflare Stream transcoded them to HLS, so this no longer matters at runtime, but you'll see references in old commits.
- **Bundle size warning** — `hls.js` + `@google/genai` push the bundle past Vite's default warning threshold. This is expected and not a problem.
- **`window.aistudio` reference** — `App.tsx` references `window.aistudio` for API key selection in Google AI Studio's online environment. Safe to ignore in normal browser usage; it's a no-op outside AI Studio.

---

## 8. Recommended First Session With Claude Code

Once your env is set up and `npm run dev` works, open Claude Code in the project root and try this:

> "I just took over the MidnightRender website. Read CLAUDE.md and HANDOFF.md and give me a summary of the architecture and what I should know."

Claude will read the relevant docs and give you a tailored orientation. From there, ask it to walk you through any component you want to understand.

---

## 9. Open Items / Things the Previous Developer Recommends

- **Replace `README.md`** with something more public-facing (it's currently leftover AI Studio boilerplate).
- **Add a `LICENSE` file** if you plan to make the repo public.
- **Consider migrating Tailwind from CDN to PostCSS** if bundle size becomes an issue.
- **Cloudflare Stream account transfer** — coordinate with the previous owner so you can manage videos directly.

---

## 10. Contact

For anything that this doc doesn't cover, reach out to the previous owner/developer directly. Good luck — the codebase is small, clean, and Claude Code knows it well.
