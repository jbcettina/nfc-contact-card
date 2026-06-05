# PRODUCT — Contact Card

## What this is
A personal **digital contact card** you tap to share. One screen: your name, role, and the
ways to reach you, plus a **Save to Contacts** button that drops a real `.vcf` into someone's
phone. It's the thing an NFC business card points at — tap the card, this opens, save, done.

## Who it's for
Two audiences, and they matter equally:

1. **The person sharing** — anyone who wants a fast, modern way to hand over their details
   without an app install or a typo'd phone number. Edit one file, deploy, point an NFC chip
   at it.
2. **The person reading the repo** — this is built to be **cloned and customized**. The whole
   thing is meant to be forked, so "make it yours" must mean editing a single, obvious file
   ([`src/data/profile.ts`](src/data/profile.ts)) — not hunting through components.

## What it does
- Renders your details from a single source of truth.
- **Tap to email / call / open links** — every contact method is one tap.
- **Save to Contacts** — builds a vCard (`.vcf`) in the browser and downloads it; works on
  iOS and Android with no backend.
- **Fist-bump intro** — on a fresh visit, a short animation plays and resolves into the card.
  A small moment of delight, not a gate.

## Why it's built the way it is
- **No backend or database to babysit.** Everything the card needs is static or client-side.
  Room is left for *dynamism* later (serverless route handlers, prepared API keys, a Google
  Sheet as a datastore) — but the foundation stands up nothing you'd have to maintain.
- **Skin-independent core.** The data and the Save-to-Contacts logic don't care what the card
  looks like, so the visual design can be swapped without touching the plumbing.
- **Simple idea, serious craft.** It's a contact card — but a real stack, real structure, and
  a polished UI. Not a toy.

## Explicitly out of scope (for the foundation)
- Any specific dynamic feature (visitor capture, tap analytics, Sheets logging) — only the
  *convention* for adding one is set up.
- The NFC chip programming and prize logistics (handled outside the app).

See [TECH.md](TECH.md) for the stack and conventions, and [README.md](README.md) to clone it
and make it yours.
