# TECH — Stack & Conventions

## Stack
- **Next.js 16 (App Router)** + **TypeScript** — `src/app/`.
- **Tailwind CSS v4** — configured in CSS (`@import "tailwindcss"` + `@theme`), not a
  `tailwind.config.js`. Design tokens live in [`src/app/globals.css`](src/app/globals.css).
- **@lottiefiles/dotlottie-react** — the fist-bump intro animation.
- **Vercel** — hosting. Every push to `main` auto-deploys. No custom server.

No database, no backend service to run. If a feature ever needs server work, it goes through a
Next.js **route handler** (`src/app/api/.../route.ts`) calling an external API or datastore —
never a server we stand up and maintain ourselves.

## Conventions

### 1. Single source of truth for profile data
All of a person's details live in **one typed file**, [`src/data/profile.ts`](src/data/profile.ts).
Name, role, company, email, phone, website, links, avatar, and the accent theme — every
component reads from it. **Cloning the repo = editing this one file.** Do not hardcode personal
details anywhere else.

### 2. Theming via tokens
Colors, radii, and shadows are driven by **CSS custom properties** (design tokens) defined in
`globals.css` and exposed to Tailwind through `@theme`. The card's *accent* color is set from
`profile.ts` at runtime (a CSS variable on the root). This keeps the visual skin swappable:
a new look = new token values + a layout variant, not a rewrite of the card's logic.

### 3. Dynamism convention (stubbed, not built)
The pattern for later dynamic features is established but no live feature is built:
- **Route handlers** under `src/app/api/` — see [`src/app/api/health/route.ts`](src/app/api/health/route.ts)
  for the shape (a simple `GET` returning JSON).
- **Secrets via environment variables**, read server-side with `process.env`, never committed.
  See [`.env.example`](.env.example) for the convention. Real values go in Vercel's env vars.

To add a dynamic feature later (e.g. log a tap to a Google Sheet): add a `route.ts`, read the
API key from `process.env`, call the external service. The card can `fetch()` that route.

### 4. Client vs. server components
Default to **server components**. Mark a file `"use client"` only when it needs browser APIs or
interactivity — the fist-bump intro (`sessionStorage`, Lottie) and the Save-to-Contacts button
(Blob download) are client components; the data layer and page shell stay on the server.

## Project layout
```
src/
  app/
    layout.tsx          Root layout + metadata
    page.tsx            Home — composes the intro + card
    globals.css         Tailwind import + design tokens (@theme)
    api/
      health/route.ts   Example route handler (the dynamism convention)
  components/           UI components (ContactCard, SaveToContactsButton, FistBumpIntro, …)
  data/
    profile.ts          ← THE single source of truth — edit this to make it yours
  lib/
    vcard.ts            Builds the .vcf string from profile data
public/
  animations/           The fist-bump .lottie asset (downloaded, not hotlinked)
```

## Local development
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (what Vercel runs)
npm run lint
```

## A note for AI tools reading this repo
This is Next.js **16** — several App Router conventions changed from earlier versions. The
bundled docs at `node_modules/next/dist/docs/` are the source of truth; see also
[AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md).
