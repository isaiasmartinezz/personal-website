# Architecture audit (Phase 0)

Audit of this repo against `PLAN.md` ("Personal Site × Life Dashboard Build Plan"), done 2026-10-24 at commit `99deb08`. **No code was changed.** Everything below is either read from the repo, observed on the live site/DNS, or taken from vendor docs (marked *external* with the source). Anything I could not verify is listed in [section 10](#10-unverified--needs-your-input).

## 1. Summary

| Question | Answer |
| --- | --- |
| Framework | **Next.js 16.2.10, App Router**, React 19.2.4, TypeScript (strict), Tailwind CSS v4 |
| Rendering | Statically prerendered at build; the only dynamic route is `POST /api/contact` |
| Content system | Typed TypeScript data modules in `src/data/`, plus markdown files for the journal. **No JSON content, no schema-validation library, no CMS** |
| Host | **Vercel**. Deploys on every push to `main` via the GitHub integration |
| DNS | **Vercel DNS** (`ns1/ns2.vercel-dns.com`). A wildcard already points every `*.isaiasmartinez.dev` at Vercel |
| CI | **None** (`.github/` does not exist). Tests run only when run by hand |
| `/journal` today | Unlisted and `noindex`, but **not** structurally isolated from the portfolio (see §6) |
| Plan assumptions that are wrong for this repo | Static *export* (impossible here), Cloudflare Access (not on Cloudflare), "deploy preview" on push to `main` (that is production). See §7 |
| Recommendation | **Subdomain `life.isaiasmartinez.dev`**, same repo, same Vercel project, with a structural split instead of path-sniffing (§9) |

## 2. Stack and tooling

- **Framework:** `next@16.2.10`, App Router only (no `pages/`). `AGENTS.md` instructs agents to read `node_modules/next/dist/docs/` first; that folder is real Next.js documentation shipped in the package, and this audit used it. Next 16 renamed `middleware` to **`proxy`** (`proxy.ts`).
- **Language/tooling:** TypeScript strict; ESLint 9 + `eslint-config-next`; Vitest 4 (`npm test`); no formatter config. Local Node is v25.2.1; there is no `engines` field or `.nvmrc`, so the Node version on Vercel is whatever the project setting says (not verified).
- **Runtime dependencies:** `@vercel/analytics`, `@vercel/speed-insights`, `resend` (contact form), `gray-matter` + `marked` (journal markdown). No UI/icon library (icons are inline SVG), no state library, no `zod`/`ajv`, no map library, no image-processing library of our own.
- **Scripts:** `dev`, `build`, `start`, `lint`, `test`, `journal:new` (scaffolds a draft post).
- **Config:** `next.config.ts` sets only `turbopack.root` and a `headers()` rule (`X-Robots-Tag` on `/journal/:path*`). There is no `vercel.json`. Images use Next's default optimizer (`next/image`).
- **Env:** `RESEND_API_KEY` is set locally (`.env.local`, git-ignored) and in Vercel Production.

## 3. Routing and rendering

Build output (`next build`): `○` static, `●` SSG via `generateStaticParams`, `ƒ` dynamic.

```
○ /  /about  /contact  /education  /experience  /projects  /publications  /resume  /skills
● /projects/[slug]            (11 projects; 6 have custom case-study layouts)
● /projects/[slug]/opengraph-image
○ /journal   /journal/about   /journal/opengraph-image
● /journal/[slug]             (dynamicParams = false; drafts excluded in production)
○ /opengraph-image  /manifest.webmanifest  /robots.txt  /sitemap.xml
ƒ /api/contact                (POST, Resend)
```

**One root layout** (`src/app/layout.tsx`) wraps everything. It renders `<html>`, fonts, theme script, and then `<SiteChrome header={<Nav/>} footer={<Footer/>}>`. `SiteChrome` is a **client component that hides the portfolio nav/footer when `usePathname()` starts with `/journal`**. The journal layout (`src/app/journal/layout.tsx`) supplies its own header/footer.

Things the root layout injects into **every** page, including `/journal` (verified on the live site):

| Injected by root layout | On `/journal`? | Why it matters |
| --- | --- | --- |
| Person JSON-LD (`@type: Person`, name, job title, GitHub/LinkedIn) | Yes | Ties personal pages to the professional identity |
| Console greeting ("Hey, curious engineer…" with your email) | Yes | Portfolio-specific |
| `?owner=1` analytics opt-out script, theme script | Yes | Fine, but shared |
| `metadataBase = https://isaiasmartinez.dev`, root OG/Twitter, `alternates.canonical = "/"` | Partly overridden | The journal layout overrides canonical, OG title and robots, but **`metadataBase` is inherited**, so absolute URLs (e.g. the `og:image`) resolve to the portfolio host |
| Vercel Analytics + Speed Insights | Yes | Personal page views are counted in the same project |

## 4. Content system

- **Portfolio content** lives in typed modules: `src/data/{site,profile,experience,education,skills,publications,projects}.ts` plus one `*-case-study.ts` per featured project, typed by `src/lib/types.ts` and per-file interfaces. It is compiled into the bundle; there is no runtime content loading.
- **Journal content** is markdown under `content/journal/` (`posts/*.md` with frontmatter `title`, `date`, `summary`, `draft`; and `about.md`), read with `fs` at build time by `src/lib/journal.ts` and rendered with `marked`. Pages are fully prerendered, so nothing is read at request time.
- **Validation today** is TypeScript types (checked by `next build`) plus Vitest tests in `tests/` (13 tests): unique slugs, required fields, referenced assets exist in `public/`, journal frontmatter valid, and "journal is never referenced from the main site". There is **no runtime/schema validation of data files** and no JSON content anywhere.
- **Implication for the plan:** typed JSON from `content/life/` is a *new* content type for this repo. The existing journal loader is the closest precedent (build-time `fs` read in a server component), and it works on Vercel because every page is prerendered.

## 5. Styling and design system

Tailwind v4 via `@tailwindcss/postcss`. Design tokens are CSS custom properties in `src/app/globals.css` (`--page`, `--surface`, `--fg`, `--muted`, `--border`, `--accent`, …), mapped to Tailwind colors with `@theme inline`, with a `.dark` override and a class-based `dark:` variant. The palette is silver/black/white. Per-case-study accent scopes (`.quest-accent`, `.fontan-accent`, …) are intentionally local. Shared primitives are in `src/components/ui.tsx` (`Tag`, `LinkButton`, `PageHeader`), `Container`, `Reveal`, `ThemeToggle`. The personal section can reuse all of this; `.journal-prose` already styles rendered markdown.

## 6. How `/journal` is built and hidden today

| Control | Mechanism | File | Holds? |
| --- | --- | --- | --- |
| No links from the portfolio | Nothing links to it; `SiteChrome` is the only main-site code that names it | `src/components/SiteChrome.tsx` | Yes; enforced by `tests/journal.test.ts` (scans `src/`, checks nav and sitemap) |
| Not in the sitemap | `sitemap.ts` is derived from `site.nav` + `projects`, so it never lists `/journal` | `src/app/sitemap.ts` | Yes (live sitemap has no match) |
| Not advertised in robots.txt | `robots.ts` is `Allow: /` with no mention; deliberately no `Disallow` (it would publish the path and stop crawlers from seeing `noindex`) | `src/app/robots.ts` | Yes |
| `noindex` in page metadata | `robots: { index:false, follow:false, nocache:true, googleBot:{…noimageindex:true} }` in the journal layout, inherited by every journal page | `src/app/journal/layout.tsx` | Yes (`<meta name="robots" content="noindex, nofollow, nocache">` live) |
| `noindex` at HTTP level | `X-Robots-Tag: noindex, nofollow, noarchive` for `/journal/:path*` | `next.config.ts` | Yes (live header verified) |
| Separate look | Own header/footer; main nav/footer hidden by `SiteChrome` | `journal/layout.tsx` | Yes |
| Neutral share card | Own `opengraph-image.tsx` (no role/tagline) | `src/app/journal/opengraph-image.tsx` | Yes |
| Access control | **None.** Anyone with the URL can read it | n/a | By design |

Known weaknesses: (a) it shares the root layout's JSON-LD, console greeting and `metadataBase` (§3); (b) `SiteChrome` decides what to show by sniffing the URL on the client, which is fragile under rewrites (§7, #4); (c) analytics counts it; (d) the path `/journal` is guessable, though that is true of any unlisted URL and is why the Friends tier needs real access control.

## 7. Conflicts with `PLAN.md`

Each row is a place where the plan's assumption does not match this repo. "Constraint" refers to your three: static build, `noindex` on the personal section, no links from the portfolio.

| # | Plan assumes | Reality in this repo | Severity | Constraint | Resolution |
| --- | --- | --- | --- | --- | --- |
| 1 | "Static export; the site serves the last pushed build indefinitely" | The site is **not** `output: "export"` and **cannot** be. Per the bundled docs, static export does not support rewrites, redirects, `headers()`, Proxy, request-based Route Handlers, or the default image optimizer; the site uses all of those (`/api/contact`, `X-Robots-Tag`, `next/image`). | Low | static build | Don't switch to export. Prerendering every personal page at build and serving it from Vercel's CDN meets the plan's *intent*: the site never calls your Mac, and a failed build leaves the last good deployment live. |
| 2 | Friends gate via "Cloudflare Access … if on Cloudflare" | **Not on Cloudflare.** DNS is Vercel's. Cloudflare Access would need Cloudflare to proxy the hostname: either move nameservers to Cloudflare, or use Cloudflare's CNAME/partial setup, which Cloudflare lists as Business/Enterprise only (*external*: developers.cloudflare.com/dns/zone-setups/partial-setup/). | **High** for Phase 4 | friends tier | See §8. Decide in Phase 4, not now. |
| 3 | Friends gate via "the host's access control" | Vercel's protection is **project-wide**, not path-scoped. Vercel Authentication (all plans) needs Vercel accounts; Password Protection is $20/month per protected project on Pro and unavailable on Hobby (*external*: vercel.com/docs/deployment-protection). Neither can protect only `/friends`. | **High** for Phase 4 | friends tier | App-level gate in `proxy.ts`, or a separate project for friends. See §8. |
| 4 | Personal section is a sub-area of the same layout (implied by Phase 1 "using the existing design system") | The chrome gate in `SiteChrome` reads `usePathname()`. The Next docs warn that on prerendered pages with rewrites (`next.config` or Proxy) `usePathname()` can differ from the server value and cause hydration mismatches. A host rewrite for a subdomain would hit exactly this. | **High** if subdomain | no-links / separation | Replace path-sniffing with a **structural split** (route groups, each with its own layout). See §9.2. |
| 5 | "`life.` has its own robots rules" | `robots.ts`, `sitemap.ts`, `manifest.ts` and `opengraph-image.tsx` are single, host-agnostic files. Unattached today, a `life.` host would serve the **portfolio's** robots, sitemap (listing portfolio URLs) and manifest. | Medium | noindex, separation | Host-specific route handlers for `/robots.txt` etc. via the rewrite. See §9.2. |
| 6 | `X-Robots-Tag` keyed by path | `headers()` is evaluated **before** rewrites, so a rule on `/life/:path*` would not match a request to `life.…/places`. | Medium | noindex | Key the header rule on host (`has: [{ type: "host", … }]`), keep a `noindex` metadata default as the second layer, and extend the existing test. |
| 7 | Publisher "commits and pushes", "appears on a deploy preview" | There is one branch (`main`) and the GitHub integration deploys it straight to **production**. A push to `main` is not a preview. | Medium | static build | Have the Publisher push to a `publish` branch (Vercel builds a preview; with Standard Protection, preview URLs are limited to your Vercel team per *external* vercel.com/docs/deployment-protection), then fast-forward `main` after you've looked. |
| 8 | Dashboard hands off through `content/life/` | No CI, no schema check in CI, no leak/EXIF/precision checks exist. The privacy checks in the plan's "Automated checks" table have nowhere to run yet. | Medium | all three | Add a minimal GitHub Actions workflow in Phase 1 and mirror the same checks in `npm run build` so Vercel enforces them even without CI. |
| 9 | `CLAUDE.md` carries the non-negotiable privacy rules; `docs/PLAN.md` exists | `CLAUDE.md` is just `@AGENTS.md`; `docs/` did not exist; `PLAN.md` currently lives only in Downloads. Phase 1's prompt references `docs/PLAN.md`. | Low | n/a | Copy the plan to `docs/PLAN.md` and add the rules to `CLAUDE.md` as the first step of Phase 1 (not done here, since this phase is audit-only). |
| 10 | `/journal` is replaced by a redirect | A redirect from the portfolio host would tell anyone who guesses `/journal` where the personal site lives. | Low | no-links | Prefer a plain 404 on the main host once `life.` is live (you are the only person who has this URL). Your call. |

**What does *not* conflict:** `noindex` is straightforward (metadata + header + test already exist); a static build is fully compatible with a Vercel-hosted prerendered site; "no links from the portfolio" is already enforced by a test, and a separate hostname makes it stronger.

## 8. Friends tier: the host question the plan did not anticipate

Because the host is Vercel with Vercel DNS, the plan's Cloudflare option is not available without moving DNS. Options, with the honest tradeoffs:

| Option | Gate | Cost / effort | Notes |
| --- | --- | --- | --- |
| A. **App-level email allowlist** in `proxy.ts`: a magic link sent by Resend (already a dependency), then a signed, host-only cookie | Real email allowlist, as the plan describes | Free; most code to write and own; must be tested like security code | Static friends pages sit in the deployment; the gate is the Proxy matcher, so the plan's friends-leak build check is essential. Cookie is scoped to `life.` only if you go subdomain. |
| B. **Separate Vercel project** for `friends.isaiasmartinez.dev` with Password Protection | One shared passphrase (not per-person email) | $20/month on Pro (*external*) | Strongest isolation: friends content isn't in the public project's output at all. Simple to operate. |
| C. **Move DNS to Cloudflare** (free full setup) and use Access | Email allowlist, managed by Cloudflare | Moves the whole domain's DNS; Vercel's guidance is DNS-only mode unless you accept proxy caveats (*external*: vercel.com/kb/guide/cloudflare-with-vercel) | Largest blast radius for something you just want to work. |
| D. Vercel Authentication | Vercel account holders only | Free | Doesn't fit "friends on an email allowlist". |

No decision is needed now. The subdomain recommendation below keeps A and B both open (A works on one host; B needs the subdomain anyway).

## 9. Proposal (not implemented): a personal section that renders typed JSON from `content/life/`

### 9.1 Content pipeline

- **Source of truth for the shape:** a language-neutral **JSON Schema** (`schema/published-item.schema.json`, with `schemaVersion`), not zod. The dashboard is SwiftUI, and zod can't be consumed from Swift; JSON Schema can. The site validates with `ajv`, the Publisher validates with whatever Swift-side check you prefer, and both share the same fixtures (`content/life/` fixtures double as conformance tests).
- **Loader:** a server-only module (e.g. `src/lib/life.ts`) reads `content/life/**/*.json` at build time with `fs`, validates each file, and throws on the first failure, so `next build` fails with a clear message. Same pattern as `src/lib/journal.ts`; the types are inferred from the schema so templates are typed.
- **Early failure:** an `npm run validate:life` script wired as `prebuild`, so a bad export fails before a long Next build, and the same script runs in CI.
- **Generated-only guarantee:** `content/life/manifest.json` (IDs, hashes, tiers) is checked at build: if any file's hash doesn't match the manifest, someone hand-edited generated output and the build fails. This enforces the plan's "never hand-edit `content/life/`".
- **Server-only data:** friends-tier loaders live behind `import "server-only"` and are never imported from client components, so friends data cannot enter the public JS bundle.
- **Media:** `public/life-media/` served through the existing `next/image` pipeline. EXIF/GPS check is a script run in CI and `prebuild` (no image library is installed today; the check can use a small EXIF reader).
- **Map:** no map library exists. Phase 1 picks one (e.g. MapLibre with a tile provider, or static SVG for the places page). Note that tile requests send visitors' IPs to the tile provider, which matters little for an unlisted site but is worth knowing.

### 9.2 Routing and structure (the key decision)

Replace `SiteChrome` path-sniffing with a **structural split** using nested route groups under one root layout. The root layout keeps only what is truly shared (`<html>`, fonts, theme script, analytics). Everything portfolio-specific moves into the portfolio group.

```
src/app/
  layout.tsx                  # shared shell only: html, fonts, theme, analytics
  (portfolio)/
    layout.tsx                # Nav + Footer + <main>, Person JSON-LD, console greeting,
                              #   metadataBase = https://isaiasmartinez.dev, canonical
    page.tsx  about/  projects/  experience/  skills/  ...   (existing pages, moved)
  (life)/
    life/
      layout.tsx              # own chrome, noindex, metadataBase = https://life.isaiasmartinez.dev
      page.tsx                # home
      [type]/ …               # list + detail per type (journal, films, places, trips, hikes, recipes, collections)
      friends/…               # Phase 4
      robots.txt/route.ts     # host-specific robots
  api/contact/route.ts        # unchanged
```

- **Host mapping** in `next.config.ts` with `beforeFiles` rewrites: requests on host `life.isaiasmartinez.dev` map `/:path*` to `/life/:path*`; requests to `/life/*` on any other host (including `*.vercel.app` deployment URLs) are mapped to a 404 via a `missing: [{ type: "host", … }]` rule. `rewrites` with `has: [{ type: "host" }]` is documented. Exact 404-routing is the one detail to confirm while implementing.
- **Moving the portfolio is mechanical:** about ten directories move into `(portfolio)/` and six import lines in `projects/[slug]/page.tsx` change (`@/app/projects/[slug]/…-case-study`). Route groups don't change URLs. Verification is cheap: `next build` route table and rendered HTML for the main pages should be byte-for-byte equivalent apart from the moved-in head scripts.
- **Why not `middleware`/`proxy` for the host mapping:** `next.config` rewrites do the job without a function in the request path; keep `proxy.ts` for Phase 4's friends gate only.
- **What this fixes:** items #4, #5, #6 in §7, plus the JSON-LD/console-greeting/`metadataBase` leakage in §3, with no runtime sniffing.

### 9.3 Page templates

Reuse `Container`, `PageHeader`, `Tag`, `Reveal`, the token system and `.journal-prose`. Per type: list page + detail page (+ map on places, track on hikes). All pages `generateStaticParams` from the loader with `dynamicParams = false`. Every personal page is `noindex` by layout metadata, the host-keyed `X-Robots-Tag`, and a build check that no personal route appears in `sitemap.xml`.

### 9.4 Migration of today's `/journal`

Keep it running until Phase 5. When the first real journal item is approved through the Review Queue, import the existing post and `about.md` into the dashboard, delete `content/journal/`, `src/lib/journal.ts`, `scripts/new-post.mjs` and `tests/journal.test.ts`, and replace them with the `content/life/journal/` type. Until then the two coexist; they don't share routes (`/journal` vs the `life.` host).

## 10. Unverified / needs your input

- **Vercel plan** (Hobby vs Pro): not determinable from here (the CLI session on this Mac is logged out, so I can't query the API). It decides whether option B in §8 is even available.
- **Whether `life.isaiasmartinez.dev` is attached to the Vercel project:** it is not (the host returns Vercel's 404 today). DNS already resolves it via a wildcard, so attaching it is a Vercel-dashboard step, not a DNS change. I can't do that step from here.
- **Whether the wildcard DNS record is intentional:** every `*.isaiasmartinez.dev` resolves to Vercel. Harmless (unattached hosts 404) but worth knowing it exists.
- **Registrar:** RDAP lookup failed; not needed since nameservers are Vercel's.
- **Node version on Vercel:** not verified; no `engines` pin.
- **Whether you want Phase 1 to include the route-group refactor** (my recommendation) or a smaller change.

## 11. Phase 0 checklist

- [x] `docs/ARCHITECTURE.md` exists and names the stack (Next.js 16 App Router) and host (Vercel, Vercel DNS)
- [x] You chose the subdomain (`life.isaiasmartinez.dev`, same repo and Vercel project)

## 12. Phase 1 result

Built and verified locally; pushed to `main` only after every check below passed.

**What exists**
- `schema/published-item.schema.json`, `schema/manifest.schema.json` (JSON Schema 2020-12, `schemaVersion: 1`) and `schema/validate.mjs`, the single validator used by `npm run validate:life` (also `prebuild`), the build-time loader (`src/lib/life/load.ts`), and the tests. An invalid file fails `next build` and names the file and field.
- Rules enforced beyond the schema: coordinates ≤ 3 decimals (location and track points), friends-tier items only under `content/life/friends/` (and nothing else there), filename = slug, unique ids and per-type slugs, referenced media exists, and every file's sha256 must match `manifest.json` (detects hand-edits).
- `scripts/check-life-media.mjs` rejects EXIF/GPS/XMP/IPTC in `public/life-media/` and any file that is not jpg/png/webp.
- 21 fixtures (3 per type, ids `fixture-*`) from `scripts/generate-life-fixtures.mjs`, with a visible "Sample content" banner. The Publisher replaces them in Phase 3.
- The personal section under `src/app/(life)/life/` (home, 7 lists, 21 details, places map with Leaflet + OpenStreetMap, own 404, `robots.txt`, OG image). Phase 1 serves the public tier only; `content/life/friends/` is validated but never read.
- `next.config.ts`: on `life.isaiasmartinez.dev` (dev: `life.localhost:3000`) requests are rewritten to `/life/*` and carry `X-Robots-Tag: noindex, nofollow, noarchive`; `/life/*` on any other host is a 404 (except Vercel Preview deployments, which are team-protected, so Phase 3 can preview).
- `postbuild` (`scripts/check-life-build.mjs`) fails the build if any prerendered personal page lacks `noindex`, contains portfolio identity/JSON-LD/manifest, or if `sitemap.xml` mentions the personal section. CI (`.github/workflows/ci.yml`) runs lint, tsc, tests, both content checks, and the build.
- Old `/journal` removed (404), with `gray-matter`, `scripts/new-post.mjs`, and `tests/journal.test.ts`.

**Things that differ from the §9 proposal**
- The root `not-found.tsx` is deliberately neutral. Next serializes the root not-found boundary into every page's RSC payload, so a portfolio-styled one leaked the portfolio name and nav into personal pages. The styled portfolio 404 lives in `(portfolio)/not-found.tsx`, reached through a `(portfolio)/[...rest]` catch-all. Both catch-alls (`/[...rest]`, `/life/[...rest]`) are dynamic routes that only ever render a 404; everything else is still prerendered apart from `POST /api/contact`.
- Personal-page titles are `absolute` because a layout's `default` title still passes through the parent's `%s · Isaias Martinez` template.
- `manifest.ts` and `opengraph-image.tsx` stay at `src/app/` root (inside a route group the manifest was silently dropped and the OG URL gained a hash). Per-project OG images now have a hashed path (`/projects/<slug>/opengraph-image-1c0t56`); the HTML output of 11 portfolio pages was otherwise byte-identical before and after the split.
- Rewrites chain, so the pass-through rule excludes anything already under `/life`; consequently `life.<host>/life/films` also resolves (harmless: same host, noindex).

**Still open**
- Attach `life.isaiasmartinez.dev` to the Vercel project (dashboard step; no DNS change). Until then the host 404s and the fixtures are not visible anywhere.
- Analytics and Speed Insights are shared with the portfolio (the scripts load on the life host too). Decide in a later phase whether the personal side should be excluded.
- Friends tier gating is still the Phase 4 decision in §8.
