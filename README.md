# Saif Dababseh — Portfolio

A premium, production-ready personal portfolio built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. Dark futuristic aesthetic inspired by ArtStation, Naughty Dog, and Unreal Engine showcase sites.

## ✨ Features

- **Fully responsive** — mobile-first design, tested across all breakpoints
- **Premium animations** — Framer Motion page transitions, parallax hero, skill bar animations, particle background
- **4 pages** — Home, Projects (grid + filter), Project Detail (gallery, video, challenges, results), About (bio, skills, experience, contact), Blog
- **CMS-style data system** — edit one JSON file to update all content
- **Image management** — drop images in folders, they auto-appear
- **Related projects** — auto-generated on project detail pages
- **Production-ready** — security headers, SEO metadata, optimized builds

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
# → Open http://localhost:3000

# 3. Build for production
npm run build
npm start
```

---

## 📁 Project Structure

```
saif-portfolio/
├── public/
│   ├── data/
│   │   └── portfolio.json        ← ✏️  YOUR CONTENT — edit this file
│   ├── projects/
│   │   ├── game-world-alpha/
│   │   │   ├── thumbnail.jpg     ← Card image (16:9)
│   │   │   ├── hero.jpg          ← Full-width banner (21:9 or 16:9)
│   │   │   └── gallery/
│   │   │       ├── 01.jpg
│   │   │       ├── 02.jpg
│   │   │       └── ...           ← Add as many as you want
│   │   ├── void-protocol/
│   │   ├── nexus-city/
│   │   └── arena-combat/
│   ├── blog/                     ← Blog post thumbnails
│   └── resume-saif-dababseh.pdf  ← Your resume (replace placeholder)
└── src/
    ├── app/                      ← Next.js App Router pages
    │   ├── layout.tsx            ← Root layout (nav, footer, fonts)
    │   ├── page.tsx              ← Home page
    │   ├── projects/
    │   │   ├── page.tsx          ← Projects grid
    │   │   └── [id]/
    │   │       ├── page.tsx      ← SSG project detail route
    │   │       └── ProjectDetailClient.tsx
    │   ├── about/page.tsx        ← About + contact
    │   ├── blog/
    │   │   ├── page.tsx          ← Blog listing
    │   │   └── [id]/             ← Blog post detail
    │   └── not-found.tsx
    ├── components/
    │   ├── layout/
    │   │   ├── Navigation.tsx    ← Sticky nav + mobile menu
    │   │   └── Footer.tsx
    │   ├── sections/
    │   │   ├── HeroSection.tsx   ← Cinematic hero with parallax
    │   │   ├── FeaturedProjects.tsx
    │   │   └── SkillsPreview.tsx
    │   └── ui/
    │       ├── index.tsx         ← Button, Tag, SectionTitle, etc.
    │       ├── ParticleBackground.tsx
    │       └── ProjectImage.tsx  ← Smart image with fallback
    └── lib/
        ├── data.ts               ← All data accessors
        └── utils.ts              ← cn(), formatDate()
```

---

## 🖼️ Adding Images

**No code changes needed.** Drop files in the right folder and they appear automatically.

### Project Images
```
public/projects/YOUR-PROJECT-ID/thumbnail.jpg   ← card image
public/projects/YOUR-PROJECT-ID/hero.jpg        ← detail page banner
public/projects/YOUR-PROJECT-ID/gallery/01.jpg  ← gallery image 1
public/projects/YOUR-PROJECT-ID/gallery/02.jpg  ← gallery image 2
...
```

**Recommended sizes:**
| File | Size | Ratio |
|------|------|-------|
| `thumbnail.jpg` | 1920×1080px | 16:9 |
| `hero.jpg` | 2560×1080px | 21:9 |
| Gallery images | 1920×1080px | 16:9 |
| Blog thumbnails | 1200×675px | 16:9 |

> **Format:** JPEG recommended for photos, PNG for renders with alpha. WebP works too.

---

## ✏️ Editing Content

All content lives in **`public/data/portfolio.json`**. Open it in VS Code or any editor.

### Adding a New Project

```json
// In the "projects" array:
{
  "id": "my-project",           // URL: /projects/my-project
  "title": "My Project",
  "subtitle": "Short description for hero",
  "category": "Environment Art", // or "Game Design"
  "tags": ["Unity", "Blender", "HDRP"],
  "year": "2024",
  "status": "Completed",        // "Completed" | "In Progress" | "Prototype"
  "featured": true,             // true = shows on home page (max 3)
  "thumbnail": "/projects/my-project/thumbnail.jpg",
  "heroImage": "/projects/my-project/hero.jpg",
  "gallery": [
    "/projects/my-project/gallery/01.jpg",
    "/projects/my-project/gallery/02.jpg"
  ],
  "videoUrl": "https://youtube.com/watch?v=...",  // optional
  "videoEmbed": "",             // paste raw <iframe> HTML here if preferred
  "shortDescription": "One-liner shown on project cards.",
  "fullDescription": "Full description for the detail page. Can be long.",
  "role": "Lead Environment Artist & Unity Developer",
  "tools": ["Unity HDRP", "Blender", "Substance Painter"],
  "challenges": "Describe the main technical/creative challenge you solved.",
  "results": "Outcomes — downloads, views, awards, technical metrics.",
  "links": {
    "artstation": "https://artstation.com/artwork/...",
    "github": "https://github.com/username/repo",
    "live": ""
  }
}
```

Then create: `public/projects/my-project/gallery/` and drop your images in.

### Adding a Blog Post

```json
// In the "blog" array:
{
  "id": "post-slug",
  "title": "Article Title",
  "category": "Environment Art",  // "Environment Art" | "Game Design" | "Technical"
  "date": "2024-08-15",
  "readTime": "8 min read",
  "excerpt": "Summary shown on blog listing page.",
  "thumbnail": "/blog/post-slug.jpg",
  "tags": ["Unity", "Design Theory"]
}
```

### Updating Contact Info

```json
// In the "about" object:
"email": "your@email.com",
"linkedin": "https://linkedin.com/in/username",
"github": "https://github.com/username",
"whatsapp": "+970591234567"
```

---

## 🎨 Customizing Colors

Edit `tailwind.config.ts` → `theme.extend.colors`:

```typescript
"neon-blue": "#00d4ff",    // primary accent (buttons, glow, links)
"neon-purple": "#a855f7",  // secondary accent
"neon-cyan": "#06ffd8",    // tertiary (availability badge)
"background": "#050508",   // page background
"surface": "#0d0d14",      // card backgrounds
```

---

## 🌐 Deploy to Vercel

### Option 1: Via GitHub (recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Framework will auto-detect as **Next.js**
4. Click **Deploy**

Every `git push main` triggers an automatic deploy.

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Environment Variables
No environment variables required for the base portfolio.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 14.2.5 | Framework, SSG, routing |
| React | 18 | UI library |
| Tailwind CSS | 3.4 | Styling |
| Framer Motion | 11 | Animations |
| TypeScript | 5 | Type safety |
| Lucide React | 0.414 | Icons |

---

## 📝 Scripts

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🗂️ Adding More Project Categories

To add a new filter category on the projects page:

1. Add your project with the new category in `portfolio.json`
2. Open `src/app/projects/page.tsx`
3. Add to the `CATEGORIES` array:

```typescript
const CATEGORIES = ["All", "Environment Art", "Game Design", "YOUR NEW CATEGORY"];
```

---

Built by Saif Dababseh · [saif.dababseh@email.com](mailto:saif.dababseh@email.com)
