# Personal Site × Life Dashboard: Build Plan

Oct 24, 2026 · @Isaias Martinez

## Overview

The personal side of isaiasmartinez.dev becomes a published view of the life dashboard: journal, places, films, travel, hikes, kitchen and collections. Nothing reaches it unless you approve that exact version of that exact item.

**Guiding rules**

- **Dashboard is the source of truth.** All data lives in the dashboard first, including anything imported from Letterboxd, Beli or a hike tracker.
- **Publish by approval only.** Every item starts private. No section defaults, no auto-publish, no import that goes straight to the site.
- **Approve a snapshot, not a record.** The site shows the version you approved. Editing a published item later does not change the site until you approve again.
- **The site never talks to your Mac.** The dashboard exports static files; the site is rebuilt from them.
- **Professional and personal stay separate.** The portfolio never links to the personal side, and the personal side is `noindex`.

**How to use this plan with Claude Code**

1. Work in two repos: the dashboard repo (SwiftUI app + local backend) and the website repo.
2. Run Phase 0 in the website repo first. Claude Code audits the existing site and writes down its stack before anything is built.
3. Run one phase per session. Paste the phase's prompt, let Claude Code plan in plan mode, approve, then build.
4. Do not start the next phase until the current phase's acceptance checks pass.
5. Keep the `CLAUDE.md` rules in the Repo setup section in both repos so every session inherits the privacy rules.

## Architecture

Data flows one way: sources into private dashboard records, through your approval, out as static files to the website. The site never calls your Mac.

&#91;embedded content: publishing pipeline · sources to site\]

The Review Queue is the only gate; the Publisher exports approved snapshots and nothing else.

**Audience tiers**

| Tier | Who sees it | Typical content |
| --- | --- | --- |
| Public | Anyone with the link; `noindex`, never linked from the portfolio | Films, places, recipes, hikes, travel map, collections |
| Friends | People on an email allowlist | Weekly recaps, trip photos, anything mentioning people |
| Private | Only you, inside the dashboard | Everything by default; finance, health, friends DB, opportunities, todos always |

**Domain layout**

- `isaiasmartinez.dev`: the portfolio, unchanged.
- Personal side: `life.isaiasmartinez.dev` (recommended) or `isaiasmartinez.dev/life`, replacing `/journal` with a redirect.
- `/friends/*` under the personal side, gated by the host's access control.

**Components**

- **Dashboard (SwiftUI + local backend):** records, Import Inboxes, Review Queue, redaction, Publisher, audit log.
- **Shared schema package:** one versioned definition of `PublishedItem`, used by both repos.
- **Website repo:** generated `content/life/` plus personal-section templates in the existing framework.
- **Host:** rebuilds on each push; serves the last good build if your Mac is off.

## Approval model

An item reaches the site only when you approve a specific snapshot of it. The Publisher exports approved snapshots and nothing else.

**Publish states**

| State | Meaning | On the site? |
| --- | --- | --- |
| Private | Default for every item, including every import | No |
| In review | You opened it in the Review Queue, picked a tier, and are editing its public version | No |
| Approved | You pressed Approve; a frozen snapshot and its hash are stored | Yes, after the next export |
| Changes pending | The live record changed after approval | Old approved snapshot stays up until you re-approve or unpublish |
| Unpublished | You withdrew it | Removed on the next export |

**Review Queue (new dashboard page)**

- Shows every item you have flagged for publishing, plus a "Changes pending" list.
- Each card shows a **public preview** of exactly what the site will render, after redaction.
- Separate public fields where needed: a private note and a public review, a private companions list and an optional public "with friends" line.
- Actions: Approve, Edit public version, Change tier (Public / Friends), Reject, Unpublish.
- Bulk approve exists, but only for items you have individually selected. There is no "approve all imports" button.

**Redaction rules (applied before preview, enforced again at export)**

- Friends' names and Friends-database links are stripped unless you type them into the public version yourself.
- Coordinates are rounded to about 100 m; anything within a set radius of home is reduced to city level.
- Hike tracks have the first and last 500 m trimmed so trailheads and parking spots near home are not exact.
- Photos are re-encoded with all EXIF and GPS metadata removed.
- Places and hikes carry a minimum publish delay (default 3 days after the visit date) so the site never shows where you are right now.
- Finance, health detail, friends, opportunities, todos and reminders have no publish path at all. The Publisher has no code to read them.

**Safety switches**

- **Kill switch:** one button that unpublishes everything and triggers an export with an empty manifest.
- **Export diff:** before each export, the dashboard shows added, changed and removed items. You confirm the diff, then it pushes.
- **Audit log:** every approve, unpublish and export is logged with a timestamp and snapshot hash.

## Data model

Every publishable item shares one envelope, so one Publisher, one Review Queue and one site renderer handle all types. The schema lives in a shared, versioned package that both repos import; the site build fails on any file that does not validate.

**Dashboard side: publish metadata attached to any record**

```
PublishState {
  itemId          // dashboard record ID (stable)
  itemType        // journal | place | film | trip | hike | recipe | collection_entry
  status          // private | in_review | approved | changes_pending | unpublished
  tier            // public | friends
  publicDraft     // the editable public version (title, body, rating, photos...)
  approvedSnapshot// frozen copy of publicDraft at approval time
  snapshotHash    // sha256 of approvedSnapshot
  approvedAt, unpublishedAt
  notBefore       // publish-delay date for places and hikes
}
```

**Export side: what the site receives**

```
PublishedItem {
  schemaVersion
  id, type, tier, slug
  title, date, updatedAt
  body            // markdown
  rating?         // normalized 0-5, plus sourceRating for display
  tags[]
  location?       // { name, city, lat, lng } already rounded
  photos[]        // { path, width, height, alt } EXIF-stripped
  data            // type-specific fields below
  provenance?     // { source: letterboxd | beli | strava | gpx | manual, sourceUrl? }
}
```

**Type-specific fields**

| Type | `data` fields | Dashboard source |
| --- | --- | --- |
| journal | weekNumber, kind (recap / essay), coverPhoto | Daylog + weekly AI review (you edit) |
| place | cuisine, priceLevel, visitDates\[\], dishes\[\], destinationId | Travel/Plan Places; Beli import |
| film | year, director, posterPath, watchedDate, rewatch, letterboxdUrl | Watchlist; Letterboxd import |
| trip | destination, startDate, endDate, days\[{stops}\] | Travel/Plan trip builder |
| hike | distanceKm, elevationGainM, durationMin, trackGeoJson (simplified), trailName | Hike import (GPX / Strava) |
| recipe | kind (meal / creami), servings, proteinPerServing, ingredients\[\], steps\[\] | Cooking page |
| collection\_entry | collection (board-games / cheeses), status (played / tried / owned) | Personality pages |

**Import provenance (dashboard records)**

Imported records also store `externalId`, `source`, `importedAt` and the raw payload. Re-importing the same `externalId` updates the record instead of duplicating it. If an approved item's source changes, it moves to "Changes pending"; the site keeps the old snapshot until you approve.

## External integrations

All three services feed the dashboard, never the site. Each import lands as a private record in a per-source Import Inbox; from there it follows the same approval path as anything you log by hand. Build them behind one adapter interface so a broken or retired source never touches the rest.

| Service | What it officially offers | Recommended approach | Risk |
| --- | --- | --- | --- |
| [Letterboxd](https://letterboxd.com/api-beta/) | API by request only, and not granted for private or personal projects. Official CSV import/export, plus a public RSS feed of new diary entries and reviews on every profile. | One-time CSV backfill, then poll your profile RSS feed every few hours for new diary entries. Posters and metadata from TMDB. | Low. RSS only covers recent entries, so long gaps need a fresh CSV import. |
| Beli | No official API found. Unofficial, reverse-engineered clients exist ([beli-api](https://github.com/ProjectBarks/beli-api)) that log in with your email and password. | Make the dashboard Places page your primary log. Add Beli as an optional adapter: manual "paste Beli link" first; an unofficial-client sync only if you accept it may break or conflict with Beli's terms. | Medium to high for automated sync: undocumented, can break without notice, uses your credentials. |
| Hikes: Strava | [Official API](https://developers.strava.com/docs) for your own activities via OAuth, including route polylines. Since 2026, new apps start with one athlete, and Standard access needs a Strava subscription ([details](https://tryterra.co/blog/strava-api-changes-2026)). Strava's policy bars using API data in AI applications. | Use only if you already pay for Strava. Keep Strava-sourced data out of the weekly AI review and Discover features. Confirm the display terms before publishing tracks publicly. | Medium: changing terms, AI-use ban, unclear public-display rules. |
| Hikes: AllTrails | No public API. Official per-activity GPX download from the website ([help article](https://support.alltrails.com/hc/en-gb/articles/37230403315476-Downloading-files-from-AllTrails)); full history via a privacy data request. | Download GPX after a hike and drop it in a watched folder. | Low. Manual step, but stable. |
| Hikes: Apple Watch | Workouts and routes live in Apple Health. | Export the workout as GPX (from Health or a GPX-export app) into the same watched folder. | Low. |

**Recommendation for hikes:** make **GPX the universal format**. Build one GPX-folder adapter that parses any file dropped into `~/LifeDashboard/Imports/hikes/`, computes distance, elevation gain and duration, simplifies the track, and creates a private hike record. Strava can come later as a second adapter that writes the same record shape.

**Adapter interface (all sources)**

```
protocol ImportAdapter {
  source: String                  // "letterboxd", "beli", "gpx", "strava"
  func fetchNew(since: Date) -> [RawImport]
  func normalize(_ raw: RawImport) -> DashboardRecord  // film, place or hike
  externalId(_ raw: RawImport) -> String              // for dedupe
}
```

Every adapter must: store credentials in the macOS Keychain, never write to the website repo, dedupe on `externalId`, log failures to the Import Inbox, and back off politely on errors.

## Build phases in Claude Code

Nine phases, each one Claude Code session in one repo. Phases 0 to 3 build the plumbing with fake data; real content appears in Phase 5; integrations come after the approval path is proven.

### Phase 0: Audit the existing site (website repo)

```text
Audit this repo before we change anything. Identify the framework, routing, content system, styling approach, hosting/deploy setup, and how /journal is currently built and hidden (noindex, robots, sitemap exclusion). Write the findings to docs/ARCHITECTURE.md. Then propose, without implementing, how to add a personal section that renders typed JSON content from content/life/ using the existing framework. Flag anything that conflicts with: static build, noindex on the personal section, no links from the portfolio.
```

- [ ] `docs/ARCHITECTURE.md` exists and names the stack and host
- [ ] You have chosen subdomain vs path (see Open decisions)

### Phase 1: Schema and site shell with fixtures (website repo)

```text
Create a shared schema for PublishedItem and its type-specific data (journal, place, film, trip, hike, recipe, collection_entry) as described in docs/PLAN.md. Use JSON Schema or zod, versioned with schemaVersion. Add fixture JSON for 3 items of each type in content/life/. Build the personal section: a home page, a list page and a detail page per type, a places map, using the existing design system. The build must fail on any content file that fails validation. Every personal page gets noindex, is excluded from the sitemap, and nothing in the portfolio links to it.
```

- [ ] All fixture pages render locally
- [ ] An invalid fixture breaks the build with a clear error
- [ ] `noindex` present on every personal page; sitemap has none of them

### Phase 2: Publish layer and Review Queue (dashboard repo)

```text
Add a PublishState model attachable to journal, place, film, trip, hike, recipe and collection records, as specified in docs/PLAN.md. Every record defaults to private. Add a Review Queue sidebar page: flagged items, a public-preview card rendered after redaction, a public-version editor, tier picker (public / friends), and Approve / Reject / Unpublish actions. Approve freezes publicDraft into approvedSnapshot with a sha256 hash. Editing a record after approval sets changes_pending and leaves the snapshot untouched. Implement the redaction rules (names, coordinates, home radius, track trimming, EXIF stripping, publish delay) as pure, unit-tested functions. Do not add any publish path for finance, health, friends, opportunities, todos or reminders.
```

- [ ] New records are private; there is no setting that changes that
- [ ] Editing an approved record never changes its snapshot
- [ ] Redaction unit tests pass, including a photo with GPS EXIF and a place inside the home radius

### Phase 3: Publisher and export (dashboard repo)

```text
Build the Publisher in the local backend. It reads only approved snapshots whose notBefore date has passed, writes one JSON file per item plus processed photos into the website repo's content/life/ (path configurable), and deletes files for unpublished items. Before writing, show an export diff (added / changed / removed) in the dashboard and require confirmation. After confirmation, commit with a summary message and push. Add a kill switch that unpublishes everything and exports an empty set, and an audit log of approvals, unpublishes and exports. Validate every file against the shared schema before writing; abort the whole export on any failure.
```

- [ ] Approving a fixture item, confirming the diff and pushing makes it appear on a deploy preview
- [ ] Unpublishing removes it on the next export
- [ ] Kill switch empties the personal section

### Phase 4: Friends tier (website repo)

```text
Add a friends tier. Friends-tier items build under a separate protected path (for example /friends/) and must never appear in public pages, list indexes, RSS, search JSON or the public JS bundle. Protect that path with the host's access control (Cloudflare Access email allowlist if on Cloudflare; otherwise propose the equivalent for our host). Add a build-time check that fails if any friends-tier ID appears in a public output file.
```

- [ ] Logged-out visitors cannot load any friends page
- [ ] The leak check fails the build when you deliberately mark a friends item public-indexed

### Phase 5: First real content end to end (both repos)

Publish real items for three types: **journal** (weekly recap from the AI review, edited by you), **film** (from the watchlist), **place** (from Travel/Plan, shown on the map). Prompt Claude Code per type to connect the existing dashboard page to the publish layer and polish that type's site templates.

- [ ] One real item of each type live, approved through the Review Queue

### Phase 6: Letterboxd adapter (dashboard repo)

```text
Add an ImportAdapter for Letterboxd. Step 1: import the official Letterboxd CSV export (diary, ratings, reviews) into film records, deduped by Letterboxd URL. Step 2: a scheduled job polls my public profile RSS feed every 3 hours and creates new film records. Fetch poster and metadata from TMDB with attribution. All imported films are private and appear in the Import Inbox; nothing is auto-flagged for review.
```

- [ ] CSV backfill imports full history without duplicates
- [ ] A newly logged Letterboxd film appears in the inbox within the poll window, private

### Phase 7: Hikes via GPX (both repos)

```text
Add a GPX folder adapter: watch ~/LifeDashboard/Imports/hikes/, parse each GPX file, compute distance, elevation gain and moving time, simplify the track (Douglas-Peucker), and create a private hike record. Add a Hikes page in the dashboard. On the site, add hike detail pages with the trimmed track on a map and a hikes index with totals.
```

- [ ] An AllTrails GPX and an Apple Watch GPX both import correctly
- [ ] Published tracks start and end at least 500 m from the true endpoints

### Phase 8: Beli, trips, kitchen, collections, /now

Add the remaining types. For Beli, start with the manual "paste a Beli link" flow into a place record; add an automated sync only after deciding you accept the risk in External integrations. Add trip pages, the recipe and Creami pages, board game and cheese logs, and a /now page fed by an approved "now" record.

### Phase 9: Polish

RSS feeds per public section, link-preview images per item, a "Year in numbers" page built only from approved items, and a hook so an approved weekly recap can also feed Newsletter Creator.

## Repo setup and checks

Save this document as `docs/PLAN.md` in both repos, add the rules below to each `CLAUDE.md`, and let CI enforce the privacy rules so no session can quietly break them.

**Website repo additions**

```
content/life/            # generated by the Publisher only, never hand-edited
  journal/ places/ films/ trips/ hikes/ recipes/ collections/
  friends/               # friends-tier items, built behind access control
  manifest.json          # list of IDs, hashes and tiers from the last export
public/life-media/       # EXIF-stripped photos from the Publisher
schema/                  # shared PublishedItem schema (versioned)
src/.../life/            # personal-section routes and components (framework-specific)
docs/ARCHITECTURE.md, docs/PLAN.md
```

**Dashboard repo additions**

```
backend/publish/         # PublishState, redaction, snapshot, Publisher, audit log
backend/importers/       # ImportAdapter protocol + letterboxd, gpx, strava, beli
app/ReviewQueue/         # Review Queue page
app/ImportInbox/         # per-source inboxes
schema/                  # same shared schema package (git submodule or published package)
```

**CLAUDE.md rules (both repos)**

```markdown
## Personal site privacy rules (non-negotiable)
- Every record is private by default. Never add a setting, default or job that publishes without an explicit per-item approval.
- The site renders only approvedSnapshot data. Never read live records in the Publisher.
- Never add a publish path for finance, health, friends, opportunities, todos or reminders.
- Importers write to the dashboard only, never to the website repo.
- All redaction lives in backend/publish/redaction and must stay unit-tested.
- Photos must be re-encoded with EXIF and GPS stripped before export.
- content/life/ is generated output. Never hand-edit it.
- Personal pages: noindex, out of the sitemap, never linked from the portfolio.
- Credentials live in the macOS Keychain, never in the repo or .env files committed to git.
```

**Automated checks**

| Check | Repo | Fails when |
| --- | --- | --- |
| Schema validation | Website (build) | Any content file does not match the schema version |
| Friends leak check | Website (build) | A friends-tier ID or slug appears in any public output, RSS or search index |
| Indexing check | Website (build) | A personal page lacks `noindex` or appears in the sitemap |
| Coordinate precision | Website (build) | Any coordinate has more than 3 decimal places |
| EXIF check | Website (CI) | Any image in `public/life-media/` still carries EXIF or GPS data |
| Redaction tests | Dashboard (tests) | Names, home-radius places, track ends or photo metadata survive redaction |
| Snapshot tests | Dashboard (tests) | Editing an approved record changes its exported content without re-approval |

## Open decisions and risks

Settle the first two before Phase 1; the rest can wait until the phase that needs them.

**Decisions**

- [ ] **Subdomain or path:** `life.isaiasmartinez.dev` (cleaner separation, own robots rules) or keep `/journal` and grow it into `/life`.
- [ ] **Site stack:** keep the current framework if Phase 0 shows it handles typed JSON content well; otherwise consider Astro content collections for the personal section only.
- [ ] **Friends gate:** Cloudflare Access email allowlist vs a shared passphrase; depends on the current host.
- [ ] **Daylog boundary:** whether any raw Daylog entries are eligible to publish, or only edited weekly recaps.
- [ ] **Beli:** manual links only, or accept an unofficial automated sync.
- [ ] **Strava:** worth a subscription for automatic hike import, or GPX-only.

**Risks**

| Risk | Mitigation |
| --- | --- |
| A private detail leaks through a public field | Separate public fields, redaction tests, preview before approve, export diff |
| Real-time location exposure | Publish delay, home radius, track trimming |
| Photo metadata leaks GPS | Re-encode on export plus the CI EXIF check |
| Third-party source changes or breaks | Adapter isolation; imports only feed the dashboard, so the site never breaks |
| Strava or Beli terms conflict with public display | Confirm terms before enabling; GPX and manual entry as fallbacks |
| Recruiters find the personal side | `noindex`, no portfolio links, sensitive content in the friends tier |
| The site depends on your Mac being awake | Static export; the site serves the last pushed build indefinitely |
