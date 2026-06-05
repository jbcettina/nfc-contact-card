# NFC Contact Card

A tap-to-share digital contact card. Point an NFC chip (or a QR code, or a link) at it, and
anyone can see your details and **save you to their phone** with one tap — no app, no backend.

Built with Next.js + TypeScript + Tailwind, deployed free on Vercel. Designed to be **forked
and made yours by editing a single file.**

> Want to know *why* it's built this way? See [PRODUCT.md](PRODUCT.md) (the what/why) and
> [TECH.md](TECH.md) (the stack + conventions).

## Make it yours

1. **Fork / clone** this repo.
2. **Edit one file:** [`src/data/profile.ts`](src/data/profile.ts). Put in your name, role,
   company, email, phone, website, links, avatar, and accent color. That's the whole
   customization — every part of the card reads from this file.
3. **Run it locally** to check:
   ```bash
   npm install
   npm run dev      # http://localhost:3000
   ```
4. **Deploy** (see below).

## Deploy on Vercel (free)

1. Push your fork to GitHub.
2. In [Vercel](https://vercel.com/new), **Import** the repo. Framework auto-detects as Next.js;
   no settings to change.
3. Deploy. You'll get a public URL like `your-card.vercel.app`. Every push to `main`
   re-deploys automatically.

> **Make the site public:** if your Vercel URL shows a login wall, go to **Settings →
> Deployment Protection** and turn **Vercel Authentication** off (or limit it to Preview
> deployments) so anyone can open your card.

## Set up the NFC chip

This card is shared by writing a **URL** to an NFC tag — *not* a vCard. (A URL record lets you
update the page anytime without re-writing the chip, and it shows your polished card instead of
a raw contact import.)

1. **Get a tag.** An **NTAG215** sticker or card works well (large enough capacity, widely
   supported by phones).
2. **Get a writer app.** On Android, [NFC Tools](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc)
   (also on [iOS](https://apps.apple.com/app/nfc-tools/id1252962749)) is the common pick.
3. **NDEF-format & write a URL record.** In the app: *Write → Add a record → URL/URI* → enter
   your deployed URL (e.g. `https://your-card.vercel.app`). Write it to the tag. The app
   NDEF-formats the tag as part of writing.
4. **Test it.** Tap the tag with a phone — it should open your card in the browser. Most modern
   iPhones and Androids read NDEF URL tags with no app needed.

> Tip: you can also just share the URL directly or as a QR code — the NFC chip is optional.

## How it works (the short version)

- **Data** comes from `src/data/profile.ts` (single source of truth).
- **Save to Contacts** builds a vCard (`.vcf`) in the browser and downloads it — works on iOS
  and Android, no server involved (`src/lib/vcard.ts`).
- **Fist-bump intro** plays once per session on a fresh visit, then resolves into the card.
- **No backend.** If you want dynamic features later (e.g. logging taps), add a Next.js route
  handler under `src/app/api/` — the convention is already stubbed. See [TECH.md](TECH.md).

## Credits

- Fist-bump intro animation from [LottieFiles](https://lottiefiles.com/free-animation/fist-bump-79hI3NROvn)
  (Lottie Simple License). The asset is bundled in `public/animations/`.

## License

[MIT](LICENSE) — fork it, ship it, make it yours.
