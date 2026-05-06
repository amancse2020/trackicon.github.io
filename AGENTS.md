# AGENTS.md

This document describes the project architecture for AI agents and developers working on this codebase.

## Project Overview

TrackIcon is a single-page marketing website for a done-for-you digital solutions agency. It is built with TanStack Start and deployed on Netlify. The site promotes website development, e-commerce, Android app development, AI automation, and JEE counselling services.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + inline style props |
| Icons | lucide-react |
| Forms | Netlify Forms (serverless, no backend) |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
src/
├── routes/
│   ├── __root.tsx       # Root HTML shell, head metadata, hidden Netlify Form for build detection
│   └── index.tsx        # Entire marketing site — all sections as React components
├── data/
│   └── products.ts      # Unused legacy template file (safe to ignore)
├── styles.css           # Tailwind import + custom keyframe animations + base body styles
└── router.tsx           # TanStack Router setup
public/                  # Static assets (favicon, placeholder image)
netlify.toml             # Build config: vite build → dist/client, dev port 8888
README.md                # Project overview and local setup instructions
```

## Architecture Decisions

### Single-file Page Component
The entire marketing site lives in `src/routes/index.tsx`. All sections — NavBar, MobileMenu, HeroSection, Marquee, WhyDifferent, Services, AIShowcase, PricingSection, OfferSection, FAQSection, ContactSection, Footer, CraftAIChatbot, Toast — are React components defined in the same file. This keeps routing simple for a single-page marketing site.

### Netlify Forms
Contact form uses Netlify Forms with `data-netlify="true"`. Submissions POST to `/` as `application/x-www-form-urlencoded`. A hidden duplicate form exists in `__root.tsx` so Netlify's build-time crawler detects it (required for SSR/SPA apps where the form is client-rendered).

### Craft.AI Chatbot
The chatbot (`CraftAIChatbot` component) is pure client-side keyword matching — no external API. `getBotResponse()` matches keywords in the user's message and returns canned responses from the `chatResponses` record. Typing delay is simulated with `setTimeout`.

### Styling Approach
- Tailwind CSS 4 utility classes for layout/spacing
- Inline `style` props for all color/brand values to avoid Tailwind class purging dynamic values
- Design token colors hardcoded as constants: `#0E0F11` (bg), `#15171B` (bgAlt), `#FF006E` (accent), `#F5F5F5` (textPrimary), `#A1A1A6` (textSecondary), `#52525B` (textWeak), `#23252B` (border)
- Custom animations (float, marquee, typing, chatPulse, msgIn, pulse-glow) defined in `styles.css`

### No Backend Required
- Contact form → Netlify Forms dashboard
- Chatbot → client-side only
- No database, no API routes, no environment variables needed

## Conventions

- Components: PascalCase
- No `cn()` helper needed — inline styles handle dynamic values
- TypeScript strict mode; use `type` imports where possible
- `@/` alias maps to `src/`

## Key External Dependencies

- **Netlify Forms** — form submissions at https://app.netlify.com/sites/bejewelled-bienenstitch-958023/forms
- **WhatsApp** — `https://wa.me/919795445292`
- **Email** — trackiconofficial@gmail.com
- **Logo** — loaded from external CDN (replace with `public/logo.png` for production reliability)
- **Picsum Photos** — placeholder images in Services/AI sections (replace with real photos)
