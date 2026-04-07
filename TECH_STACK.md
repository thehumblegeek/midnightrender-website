# 🛠️ MidnightRender — Tech Stack

A full breakdown of every tool, library, and service powering the MidnightRender website.

---

## ⚙️ Core Framework

| Layer | Technology | Version |
|---|---|---|
| **UI Framework** | React | 19.2.4 |
| **Language** | TypeScript | 5.8.2 |
| **Build Tool** | Vite | 6.2.0 |
| **Routing** | React Router DOM | 7.13.2 |

---

## 🎨 Styling & Design

| Layer | Technology | Notes |
|---|---|---|
| **CSS Framework** | Tailwind CSS | Loaded via CDN (`cdn.tailwindcss.com`) |
| **Primary Font** | Manrope | Weights: 200, 400, 700, 800 — via Google Fonts |
| **Accent Font** | Playfair Display | Italic & regular weights — via Google Fonts |
| **Custom Animations** | Vanilla CSS | `subtle-zoom`, `marquee`, scrollbar styles in `index.html` |

> ⚠️ **Note:** Tailwind is currently loaded via CDN. For production optimization, consider installing it as a PostCSS plugin to reduce bundle size and eliminate render-blocking.

---

## 🤖 AI & Services

| Service | Technology | Notes |
|---|---|---|
| **AI SDK** | `@google/genai` | v1.41.0 — Gemini API client |
| **Video Generation** | Google Veo | Called via `services/videoService.ts` |
| **AI Chat** | Gemini | Wrapped in `services/geminiService.ts` |
| **API Key Management** | `window.aistudio` | AI Studio environment hook for key selection |

---

## 📦 Dependencies

### Runtime
```
react                  ^19.2.4
react-dom              ^19.2.4
react-router-dom       ^7.13.2
@google/genai          ^1.41.0
```

### Development
```
vite                   ^6.2.0
@vitejs/plugin-react   ^5.0.0
typescript             ~5.8.2
@types/node            ^22.14.0
@ffmpeg/ffmpeg         ^0.12.15   (FFmpeg WASM — video processing experiments)
@ffmpeg/util           ^0.12.2
```

---

## 🗂️ Project Structure

```
midnightrender-website/
├── components/                  # React UI components
│   ├── Hero.tsx                 # Full-screen hero video section
│   ├── Navbar.tsx               # Top navigation bar
│   ├── ShowreelGrid.tsx         # Video grid / showreel
│   ├── VideoModal.tsx           # Lightbox video player
│   ├── Testimonials.tsx         # Testimonial carousel + logo marquee
│   ├── AllWorks.tsx             # Full portfolio page
│   ├── BookingSection.tsx       # Call-to-action / booking
│   ├── About.tsx                # About section
│   └── Footer.tsx               # Site footer
├── services/                    # API & AI integrations
│   ├── geminiService.ts         # Gemini chat/AI service
│   └── videoService.ts          # Veo video generation service
├── public/
│   └── videos/                  # Local MP4 video assets
├── App.tsx                      # Root component + routing (/ and /works)
├── constants.tsx                # Showreel data & content
├── types.ts                     # Shared TypeScript types
├── index.html                   # HTML entry + global CSS/fonts
├── index.tsx                    # React DOM render entry
├── vite.config.ts               # Vite configuration
└── tsconfig.json                # TypeScript configuration
```

---

## 🚀 Deployment & Infrastructure

| Tool | Role | Details |
|---|---|---|
| **GitHub** | Version control | Remote: `github.com/.../midnightrender-website`, branch: `main` |
| **Vercel** | Hosting & CI/CD | Auto-deploys on every push to `main` via GitHub integration |
| **Domain** | Live URL | `https://midnightrender.com` |

### Deployment Flow
```
Local Dev  →  git push origin main  →  GitHub  →  Vercel (auto-build)  →  midnightrender.com
```

Vercel runs `vite build` on every push and serves the output — no manual deploys needed.

---

## 🌐 SEO & Meta

| Feature | Implementation |
|---|---|
| **Page Title** | `MIDNIGHTRENDER — Cinema Quality AI Video Production` |
| **Meta Description** | Configured in `index.html` |
| **Open Graph Tags** | Title, description, image, URL — for social sharing |
| **Twitter Card** | `summary_large_image` |
| **JSON-LD** | `Organization` schema structured data in `App.tsx` |
| **Canonical URL** | Points to `https://midnightrender.com` |

---

## 🖥️ Local Development

```bash
# Install dependencies
npm install

# Start dev server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

*Last updated: April 2026*
