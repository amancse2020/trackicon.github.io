# TrackIcon — We Deliver Results, Not Just Tools

A full marketing website for TrackIcon, a done-for-you digital solutions agency offering website development, e-commerce, Android app development, AI automation, and JEE counselling services.

## Tech Stack

- **Framework:** TanStack Start (React 19 + TanStack Router v1)
- **Build:** Vite 7
- **Styling:** Tailwind CSS 4 + custom CSS variables
- **Icons:** lucide-react
- **Forms:** Netlify Forms (serverless form handling)
- **Deployment:** Netlify

## Features

- Fully responsive dark-themed marketing site
- Animated hero section, marquee, and floating UI elements
- Services, pricing cards, FAQ accordion, and contact form
- **Craft.AI** — built-in keyword-based chatbot assistant
- WhatsApp floating button
- Netlify Forms integration for lead capture

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts on `http://localhost:3000`. When using Netlify Forms locally, use the Netlify CLI:

```bash
netlify dev
```

This starts on `http://localhost:8888` with full Netlify feature emulation.

## Environment Variables

No environment variables are required. The contact form uses Netlify Forms (no backend needed).

## Build

```bash
npm run build
```

Output goes to `dist/client` and is served via Netlify.
