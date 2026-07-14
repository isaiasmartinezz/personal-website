# Isaias Martinez — Personal Website

A fast, accessible, content-driven personal/portfolio site. Built to read as a
clean academic + software portfolio: static-first, dark mode, and easy to keep
up to date because **all content lives in typed data files** — you add an
experience, project, or paper by editing data, not markup.

**Stack:** [Next.js 16 (App Router)](https://nextjs.org) · TypeScript ·
[Tailwind CSS v4](https://tailwindcss.com) · self-hosted Google fonts via
`next/font`. No UI or icon libraries — icons are inline SVG.

---

## Quick start

```bash
npm install      # first time only
npm run dev      # start the dev server → http://localhost:3000
```

That's it. The page hot-reloads as you edit.

Other scripts:

| Command          | What it does                                  |
| ---------------- | --------------------------------------------- |
| `npm run dev`    | Local dev server with hot reload              |
| `npm run build`  | Production build (also type-checks the site)  |
| `npm start`      | Serve the production build locally            |
| `npm run lint`   | Run ESLint                                     |

---

## Editing your content (start here)

You almost never touch the components. Everything you'll want to change is in
**`src/data/`**. Each file is commented and has example entries. Search the repo
for **`TODO`** to jump to every placeholder you should replace.

| File                        | Controls                                                        |
| --------------------------- | -------------------------------------------------------------- |
| `src/data/site.ts`          | Your name, tagline, contact email, **social links**, nav, resume path, canonical URL |
| `src/data/profile.ts`       | Bio paragraphs, "what I'm looking for", focus areas, quick facts, photo |
| `src/data/experience.ts`    | Roles (internships, research, teaching) — reverse chronological |
| `src/data/projects.ts`      | Projects grid + flagship detail pages                          |
| `src/data/skills.ts`        | Skill groups (Languages, Frameworks, Tools, Concepts)          |
| `src/data/education.ts`     | Degrees, coursework, honors, thesis                            |
| `src/data/publications.ts`  | Papers / research (your name is auto-bolded)                   |

The shapes of these entries are defined and documented in `src/lib/types.ts`,
so your editor autocompletes fields and flags anything missing.

### Common tasks

**Add a project**

1. Open `src/data/projects.ts` and copy an existing entry.
2. Give it a unique `slug` (lowercase, hyphens).
3. Set `featured: true` to give it a dedicated page at `/projects/<slug>` and
   surface it on the home page (aim for 2–3 featured). Otherwise `false` for a
   card-only project.
4. `tags` automatically become filter buttons on the Projects page.

**Add your photo**

Add a square image to `public/` (e.g. `public/images/profile.jpg`) and set
`photo` to that path in `src/data/profile.ts`. Until you do, a clean monogram of
your initials shows automatically — nothing looks broken.

**Add project thumbnails**

Put images in `public/images/projects/` and set `image` / `imageAlt` on the
project (the commented examples in `projects.ts` show the exact fields). Without
one, a tasteful gradient placeholder renders.

**Add your resume**

Put your PDF at `public/resume.pdf` (or change `resumePath` in `site.ts`). The
`/resume` page embeds it inline and offers a download button.

**Turn Publications on/off**

If you have no papers yet, set `export const publications = []` in
`publications.ts` (the page shows a tidy empty state) or remove the link from
`nav` in `site.ts`.

---

## Design & theming

The whole palette is a handful of CSS variables at the top of
`src/app/globals.css` (`--accent`, `--fg`, `--page`, …), defined once for light
mode and once for `.dark`. Change `--accent` and the entire site re-tints.

- **Light/dark mode**: respects the OS setting by default, with a header toggle
  that persists the choice. The correct theme is applied before first paint, so
  there's no flash.
- **Fonts**: Newsreader (serif headings), Inter (body), JetBrains Mono (code),
  all self-hosted — swap them in `src/app/layout.tsx`.
- **Motion**: subtle scroll-reveal (`src/components/Reveal.tsx`), fully disabled
  for `prefers-reduced-motion`, and gated behind a `.js` class so content is
  never hidden without JavaScript.

---

## Contact form

The form (`src/components/ContactForm.tsx`) posts to `src/app/api/contact/route.ts`.
Out of the box that route **validates** the message and returns success but does
**not** send email yet — so the UX works immediately, and there's always a
direct `mailto:` link as a fallback.

To actually receive messages, pick one:

- **Resend (recommended, has a free tier):** `npm install resend`, add
  `RESEND_API_KEY` to your environment, and uncomment the "SEND EMAIL" block in
  `route.ts` (instructions are inline).
- **No-backend services:** point the form's `fetch` at a
  [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com)
  endpoint and delete the API route.

See `.env.example` for the environment variables.

---

## Deployment

### Vercel (recommended — one click, free)

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new). Vercel auto-detects
   Next.js — no configuration needed.
3. Set env vars (if using the contact email provider) under **Settings →
   Environment Variables**.
4. Deploy. Every push to `main` redeploys automatically.

> Update `url` in `src/data/site.ts` to your production URL so canonical tags,
> the sitemap, and social cards use the right domain.

### Netlify

Also zero-config for Next.js — import the repo and deploy. (Build command
`next build` is detected automatically.)

### Fully static hosts (GitHub Pages, etc.)

This site uses one server route (`/api/contact`) and a dynamic Open Graph image,
so it isn't a pure static export as-is. To host on a static-only platform:

1. Replace the contact form's `fetch` with a Formspree/Web3Forms endpoint and
   delete `src/app/api/contact/`.
2. Add `output: "export"` to `next.config.ts`.
3. Run `npm run build` and deploy the generated `out/` directory.

### Custom domain

- **Vercel/Netlify:** add your domain in the dashboard, then create the DNS
  records they show you (an `A`/`ALIAS` record for the apex and a `CNAME` for
  `www`). HTTPS is provisioned automatically.
- After the domain is live, set `url` in `site.ts` to `https://yourdomain.com`.

---

## Accessibility & performance

Built in from the start: semantic landmarks, a skip-to-content link, keyboard
support (including the mobile menu and theme toggle), visible focus rings,
`aria-current` on the active nav item, alt text, AA-contrast colors in both
themes, and `prefers-reduced-motion` support. Pages are static-rendered and ship
minimal JS (only the toggle, mobile menu, and project filter are interactive).

To measure locally:

```bash
npm run build && npm start
npx lighthouse http://localhost:3000 --view    # in another terminal
```

---

## Project structure

```
src/
├─ app/                 # routes (one folder per page) + sitemap/robots/manifest/OG image
│  ├─ layout.tsx        # fonts, metadata, theme script, nav + footer
│  ├─ page.tsx          # home / hero
│  ├─ about|experience|projects|skills|education|publications|contact|resume/
│  ├─ projects/[slug]/  # flagship project detail pages
│  └─ api/contact/      # contact form endpoint
├─ components/          # reusable UI (Nav, Footer, cards, Reveal, icons, …)
├─ data/                # ← your content lives here
└─ lib/                 # shared types + helpers
```

---

## Next steps & ideas

- Add a `/blog` (Next.js + MDX) if you want to write.
- Wire up privacy-friendly analytics (Vercel Analytics or Plausible).
- Add real screenshots/diagrams for flagship projects.
- Add per-project `opengraph-image` for richer link previews.
