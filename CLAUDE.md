@AGENTS.md

# CLAUDE.md — standing context for this repo

This is a **digital contact card** app, built to be cloned and customized. Read
[PRODUCT.md](PRODUCT.md) for what it is and [TECH.md](TECH.md) for the stack and conventions.
This file is the standing context you should hold while working in this repo.

## The rules that matter most
1. **One file to make it yours.** A person's details live only in
   [`src/data/profile.ts`](src/data/profile.ts). Never hardcode names, emails, phone numbers,
   or links anywhere else — read them from the profile.
2. **No backend or database to maintain.** Dynamism is fine via Next.js **route handlers**
   (`src/app/api/.../route.ts`), prepared API keys (env vars), or a third-party datastore like
   Google Sheets. The line is: don't stand up a server or DB we'd have to babysit.
3. **The data/save layer is decoupled from the visual layout.** `profile.ts` (data) and
   `src/lib/vcard.ts` (Save to Contacts) must not depend on how the card looks. A new skin
   should reuse them untouched.
4. **Theme via tokens, not hardcoded colors.** Use the CSS variables / `@theme` tokens in
   `globals.css`; the accent comes from `profile.ts`.
5. **Readable over clever.** This repo is read by people learning to clone-and-customize and by
   a live audience. Small components, clear names, comments where a newcomer would stumble.
6. **Server components by default.** Add `"use client"` only for browser APIs / interactivity.

## Build discipline
- Work **one step at a time, each revertible.** Build, deploy, verify — then move on.
- Every push to `main` auto-deploys to Vercel. Keep `main` deployable.
- **Directional, not pixel-perfect** on visual design — capture the vibe, don't chase exact
  fidelity to a reference shot.

## Next.js 16 note
Conventions changed from older versions you may know. Before writing Next-specific code, check
the bundled docs at `node_modules/next/dist/docs/` (per [AGENTS.md](AGENTS.md)).
