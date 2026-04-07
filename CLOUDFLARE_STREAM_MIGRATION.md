# ☁️ Cloudflare Stream Migration Plan
> Moving all 30 videos from local `/public/videos/` to Cloudflare Stream for global CDN delivery, adaptive bitrate, and smooth playback.

---

## 📦 Full Video Inventory

### 🏠 Homepage — Hero (1 video)

| ID | File | Size | Location in Code |
|----|------|------|-----------------|
| `hero` | `Update 1 Show Reel.mp4` | 8.6 MB | `Hero.tsx` — full-screen background |

---

### 🎬 Homepage — Showreel Grid (5 videos)
> Defined in `constants.tsx` → rendered by `ShowreelGrid.tsx`

| ID | File | Size |
|----|------|------|
| `bad-driving` | `We've Had It In Us All Along - Chroma Awards - Official Denny's Music Video.mp4` | 170 MB |
| `atombit` | `Atombit Minisite v2 (with dialogue).mp4` | 80 MB |
| `hero-music` | `3. New hero music.mp4` | 88 MB |
| `football-law` | `4. Football Law.mp4` | 22 MB |
| `ugc` | `6. UGC.mp4` | 101 MB |

---

### 🏢 Portfolio Page — Commercial (13 videos)
> Defined in `AllWorks.tsx` → `COMMERCIAL_VIDEOS[]`

| ID | File | Size |
|----|------|------|
| `c1` | `We've Had It In Us All Along - Chroma Awards - Official Denny's Music Video.mp4` | 170 MB |
| `c2` | `Atombit Minisite v2 (with dialogue).mp4` | 80 MB |
| `c3` | `Atombit Keynote 1 Compilation (1).mp4` | 138 MB |
| `c4` | `Alpha Teaser.mp4` | 359 MB |
| `c5` | `BIONIC AWARDS OPENER.mp4` | 182 MB |
| `c6` | `Buckley Law Commercial (Broadcast Ready).mov` | 378 MB |
| `c7` | `Dead Clean.mp4` | 44 MB |
| `c8` | `Field to Flasks Demo Ad.mp4` | 47 MB |
| `c9` | `For Moddy's!!.mp4` | 16 MB |
| `c10` | `NoScrubs Laundry.mp4` | 101 MB |
| `c11` | `Skunks 1a.mp4` | 18 MB |
| `c12` | `Teleios Website Hero.mp4` | 88 MB |
| `c13` | `Trading App Demo.mp4` | 51 MB |

---

### 🎭 Portfolio Page — Narrative (12 videos)
> Defined in `AllWorks.tsx` → `NARRATIVE_VIDEOS[]`

| ID | File | Size |
|----|------|------|
| `n1` | `AOT Live action trailer.mp4` | 86 MB |
| `n2` | `Alpha Teaser.mp4` | 359 MB |
| `n3` | `Blood & Violence Teaser - Higgsfield Action Contest.mp4` | 20 MB |
| `n4` | `Burn.mp4` | 12 MB |
| `n5` | `Chinese water color.mp4` | 56 MB |
| `n6` | `Horror experiments.mp4` | 187 MB |
| `n7` | `Monster Movie.mp4` | 563 MB |
| `n8` | `Randomville Final 24fps.mp4` | 114 MB |
| `n9` | `Sage Footballer.mp4` | 23 MB |
| `n10` | `Sid.mov` | 64 MB |
| `n11` | `Surviving AI snippet.mp4` | 59 MB |
| `n12` | `Werewolf.mov` | 80 MB |

---

## 📊 Total Size Summary

| Category | Videos | Total Size |
|----------|--------|------------|
| Hero | 1 | 8.6 MB |
| Showreel Grid | 5 | ~461 MB |
| Commercial Portfolio | 13 | ~1.67 GB |
| Narrative Portfolio | 12 | ~1.62 GB |
| **TOTAL** | **31** | **~3.76 GB** |

> ⚠️ Note: Several files appear in multiple sections (e.g. Denny's and Atombit appear in both Showreel and Commercial). Cloudflare only needs **one upload per unique file** — we reuse the same Video ID in both places.

### Unique files to upload: **26**

---

## 💰 Cost Estimate

| Item | Amount | Cost |
|------|--------|------|
| Storage | ~3.76 GB / ~250 min of video | ~$5/mo |
| Delivery (est. 1k visitors, avg 3 min watched) | ~3,000 min/mo | ~$3/mo |
| **Monthly Total** | | **~$8/mo** |

---

## 🗺️ Migration Phases

### Phase 1 — Your Manual Work (Cloudflare Dashboard)

**Step 1.** Create a Cloudflare account at [dash.cloudflare.com](https://dash.cloudflare.com)

**Step 2.** Enable Cloudflare Stream (add payment method)

**Step 3.** Upload all **26 unique video files** via the Stream dashboard
- Drag & drop each video
- Wait for transcoding (1–2 min per video)
- Copy the **Video ID** for each one and paste it into the tracker table below

**Step 4.** Create an API Token:
- My Profile → API Tokens → Create Token → "Stream: Read & Write"
- Copy your **Account ID** and **API Token**

---

### Phase 2 — Code Changes (I Handle This)

Once you give me the Video IDs, I will:

#### 2a. Install HLS.js
```bash
npm install hls.js
```
Required for adaptive bitrate playback in Chrome/Firefox (Safari supports HLS natively).

#### 2b. Create a shared `CloudflareVideo` component
A reusable video component that:
- Uses HLS.js for grid/hero previews
- Falls back to native `<video>` for full playback in the modal
- Handles Safari vs Chrome detection automatically

#### 2c. Update `Hero.tsx`
```tsx
// Before
<source src="/videos/Update 1 Show Reel.mp4" type="video/mp4" />

// After
<CloudflareVideo videoId="HERO_VIDEO_ID" autoPlay muted loop />
```

#### 2d. Update `constants.tsx`
```tsx
// Before
videoUrl: '/videos/6. UGC.mp4'

// After
videoId: 'CLOUDFLARE_VIDEO_ID_HERE'
// (URL is constructed automatically: https://videodelivery.net/{id}/manifest/video.m3u8)
```

#### 2e. Update `AllWorks.tsx`
Replace all 25 `videoUrl` strings in `COMMERCIAL_VIDEOS` and `NARRATIVE_VIDEOS` with `videoId` references.

#### 2f. Update `ShowreelGrid.tsx` and `VideoModal.tsx`
Swap `<video src={...}>` for the new `<CloudflareVideo videoId={...} />` component.

#### 2g. Update `.env`
```env
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_STREAM_TOKEN=your_api_token
```

#### 2h. Update `TECH_STACK.md`
Add Cloudflare Stream to the infrastructure section.

---

## 📋 Video ID Tracker
> Fill this in as you upload videos to Cloudflare Stream dashboard

### Unique Files (26 total)

| # | Filename | Cloudflare Video ID | Used In |
|---|----------|---------------------|---------|
| 1 | `Update 1 Show Reel.mp4` | _d35cf4f1d13419580d45e7031f8c1efe_ | Hero |
| 2 | `We've Had It In Us All Along...mp4` | _879f3b1889a6fffe6b64424b87db217d_ | Showreel, Commercial c1 |
| 3 | `Atombit Minisite v2 (with dialogue).mp4` | _669327b049cc82804a8d68a6467cfc16_ | Showreel, Commercial c2 |
| 4 | `3. New hero music.mp4` | _9d3c10121731be3920317d1db4332570_ | Showreel |
| 5 | `4. Football Law.mp4` | _97cd74733ad7cf361bbd08fa45194641_ | Showreel |
| 6 | `6. UGC.mp4` | _d80155a66753086b6eecd7c7335ae2e1_ | Showreel |
| 7 | `Atombit Keynote 1 Compilation (1).mp4` | _07d35ef35bde696e2c086474718f7dc0_ | Commercial c3 |
| 8 | `Alpha Teaser.mp4` *(commercial)* | _dffaeb7e76e714d2a5a0fdd81c33ddd0_ | Commercial c4 |
| 9 | `BIONIC AWARDS OPENER.mp4` | _ee921e6772a9047fda2f4810daea6553_ | Commercial c5 |
| 10 | `Buckley Law Commercial (Broadcast Ready).mov` | _8b49d670b44204b8ab9b7b7f1f7bac79_ | Commercial c6 |
| 11 | `Dead Clean.mp4` | _7294005979f5795d96e6028a89a08dec_ | Commercial c7 |
| 12 | `Field to Flasks Demo Ad.mp4` | _150d3e6299f71e33ae547420dd2ec1c3_ | Commercial c8 |
| 13 | `For Moddy's!!.mp4` | _1a7ef2b2b168493d93f2f356775748ae_ | Commercial c9 |
| 14 | `NoScrubs Laundry.mp4` | _08a8f1d567a7512904bfd3f1871611dc_ | Commercial c10 |
| 15 | `Skunks 1a.mp4` | _cbf254596f9046bebd4d2a66ad475b3e_ | Commercial c11 |
| 16 | `Teleios Website Hero.mp4` | _33856860b6552ed4d7d3935c9ca0c6c7_ | Commercial c12 |
| 17 | `Trading App Demo.mp4` | _d3b8c4fa03d8b3e8a3f8e21577adbd3f_ | Commercial c13 |
| 18 | `AOT Live action trailer.mp4` | _90c463b4e96fcf2c5ab9da52f88dbab4_ | Narrative n1 |
| 19 | `Alpha Teaser.mp4` *(narrative)* | _5d90efa235aac32cffa03b5a29b409d7_ | Narrative n2 |
| 20 | `Blood & Violence Teaser.mp4` | _ff728e748ac94c1c1e286d43c1d9afc2_ | Narrative n3 |
| 21 | `Burn.mp4` | _c9298533a5a6c665ccf0fb79a314808e_ | Narrative n4 |
| 22 | `Chinese water color.mp4` | _0b69784aba21dde2a2dfd111de2ac331_ | Narrative n5 |
| 23 | `Horror experiments.mp4` | _b161683e94eb1355a45b5339c3a7d71d_ | Narrative n6 |
| 24 | `Monster Movie.mp4` | _0f47ba73b39222e6547083c0611178bf_ | Narrative n7 |
| 25 | `Randomville Final 24fps.mp4` | _b7b8dd2a38f5a54b26f4e4f82f5c8185_ | Narrative n8 |
| 26 | `Sage Footballer.mp4` | _64d40a263c638c998e516fe672021a6e_ | Narrative n9 |
| 27 | `Sid.mov` | _53ec0afcf87b7dc25b58e8dbd4573ef6_ | Narrative n10 |
| 28 | `Surviving AI snippet.mp4` | _a82e887e4799bf1cb1b280da7334679d_ | Narrative n11 |
| 29 | `Werewolf.mov` | _8a34cb1dbd3863163145e0b80041df12_ | Narrative n12 |

---

## ✅ Definition of Done

- [ ] All 26 unique videos uploaded and transcoded on Cloudflare Stream
- [ ] Video IDs tracked in the table above
- [ ] `hls.js` installed
- [ ] `CloudflareVideo` component built and tested
- [ ] `Hero.tsx` updated
- [ ] `constants.tsx` updated (showreel grid)
- [ ] `AllWorks.tsx` updated (commercial + narrative)
- [ ] `ShowreelGrid.tsx` updated
- [ ] `VideoModal.tsx` updated
- [ ] Local `/public/videos/` folder cleared (saves ~3.76 GB from repo)
- [ ] Tested on Chrome, Firefox, and Safari
- [ ] Pushed to GitHub → verified on Vercel production

---

*Last updated: April 2026*
