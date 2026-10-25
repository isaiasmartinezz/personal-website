// Writes the sample content under content/life/ (ids prefixed `fixture-`) and a
// matching manifest.json. Phase 1 only: the Publisher replaces these in Phase 3.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const lifeDir = path.join(root, "content", "life");
const UPDATED = "2026-01-15T12:00:00.000Z";
const M = "/life-media/fixtures";
const photo = (n, alt) => ({ path: `${M}/photo-${n}.jpg`, width: 1200, height: 800, alt });

const base = (o) => ({ schemaVersion: 1, tier: "public", updatedAt: UPDATED, tags: [], photos: [], provenance: { source: "manual" }, ...o });
const items = [];
const add = (dir, o) => items.push({ dir, item: base({ id: `fixture-${o.slug}`, ...o }) });

// journal
[
  ["week-one-recap", "Week one: settling in", "2026-01-04", 1, "recap"],
  ["on-slow-mornings", "On slow mornings", "2026-01-11", 2, "essay"],
  ["week-three-recap", "Week three: a long weekend", "2026-01-18", 3, "recap"],
].forEach(([slug, title, date, weekNumber, kind], i) =>
  add("journal", {
    slug, type: "journal", title, date, tags: ["sample", kind],
    body: `This is **sample content** for the ${kind} layout.\n\n## What happened\n\n- A short list item\n- Another one\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    photos: [photo(i + 1, "Placeholder image")],
    data: { weekNumber, kind, coverPhoto: `${M}/photo-${i + 1}.jpg` },
  }));

// places
[
  ["sample-noodle-bar", "Sample Noodle Bar", "Japanese", 2, 37.427, -122.17, "Palo Alto", 4.5],
  ["sample-taqueria", "Sample Taqueria", "Mexican", 1, 37.444, -122.161, "Palo Alto", 4],
  ["sample-bistro", "Sample Bistro", "French", 3, 37.775, -122.418, "San Francisco", 3.5],
].forEach(([slug, title, cuisine, priceLevel, lat, lng, city, rating]) =>
  add("places", {
    slug, type: "place", title, date: "2026-01-10", rating, sourceRating: `${rating}/5`, tags: ["sample", cuisine.toLowerCase()],
    body: "Sample review text. Great place, would return.",
    location: { name: title, city, lat, lng },
    data: { cuisine, priceLevel, visitDates: ["2026-01-10"], dishes: ["House special", "Seasonal side"] },
  }));

// films
[
  ["sample-film-one", "Sample Film One", 1999, "A. Director", 4.5, false],
  ["sample-film-two", "Sample Film Two", 2012, "B. Director", 3, false],
  ["sample-film-three", "Sample Film Three", 2021, "C. Director", 5, true],
].forEach(([slug, title, year, director, rating, rewatch]) =>
  add("films", {
    slug, type: "film", title, date: "2026-01-08", rating, sourceRating: `${rating}/5`, tags: ["sample"],
    body: "Sample short note about the film.",
    data: { year, director, posterPath: `${M}/poster.jpg`, watchedDate: "2026-01-08", rewatch },
  }));

// trips
[
  ["sample-coast-weekend", "Coast weekend", "Big Sur", "2026-02-06", "2026-02-08"],
  ["sample-city-break", "City break", "Lisbon", "2026-03-12", "2026-03-15"],
  ["sample-mountain-week", "Mountain week", "Tahoe", "2026-04-01", "2026-04-05"],
].forEach(([slug, title, destination, startDate, endDate], i) =>
  add("trips", {
    slug, type: "trip", title, date: startDate, tags: ["sample"],
    body: "Sample itinerary notes.",
    photos: [photo(i + 1, "Placeholder image")],
    data: {
      destination, startDate, endDate,
      days: [
        { label: "Day 1", stops: [{ name: "Arrive and walk", note: "Sample note" }, { name: "Dinner" }] },
        { label: "Day 2", stops: [{ name: "Main activity" }] },
      ],
    },
  }));

// hikes
[
  ["sample-ridge-loop", "Sample Ridge Loop", 8.4, 420, 150],
  ["sample-creek-trail", "Sample Creek Trail", 5.1, 180, 95],
  ["sample-summit-day", "Sample Summit Day", 14.2, 980, 330],
].forEach(([slug, title, distanceKm, elevationGainM, durationMin], i) =>
  add("hikes", {
    slug, type: "hike", title, date: "2026-02-14", rating: 4, tags: ["sample"],
    body: "Sample trail report.",
    location: { name: title, lat: 37.3 + i * 0.1, lng: -122.2 },
    photos: [photo(i + 1, "Placeholder image")],
    provenance: { source: "gpx" },
    data: { trailName: title, distanceKm, elevationGainM, durationMin },
  }));

// recipes
[
  ["sample-chicken-bowl", "Sample chicken bowl", "meal", 4, 38],
  ["sample-lentil-stew", "Sample lentil stew", "meal", 6, 22],
  ["sample-creami-pint", "Sample Creami pint", "creami", 2, 30],
].forEach(([slug, title, kind, servings, proteinPerServing]) =>
  add("recipes", {
    slug, type: "recipe", title, date: "2026-01-20", tags: ["sample", kind],
    body: "Sample recipe intro.",
    data: {
      kind, servings, proteinPerServing,
      ingredients: [{ item: "Ingredient one", quantity: "200 g" }, { item: "Ingredient two", quantity: "1 tbsp" }, { item: "Salt" }],
      steps: ["Prepare everything.", "Cook until done.", "Serve."],
    },
  }));

// collections
[
  ["sample-board-game-one", "Sample Board Game One", "board-games", "played"],
  ["sample-board-game-two", "Sample Board Game Two", "board-games", "owned"],
  ["sample-cheese-one", "Sample Cheese One", "cheeses", "tried"],
].forEach(([slug, title, collection, status]) =>
  add("collections", {
    slug, type: "collection_entry", title, date: "2026-01-25", rating: 4, tags: ["sample"],
    body: "Sample notes.",
    data: { collection, status },
  }));

fs.rmSync(lifeDir, { recursive: true, force: true });
const manifestItems = [];
for (const { dir, item } of items) {
  const rel = `${dir}/${item.slug}.json`;
  const file = path.join(lifeDir, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const text = JSON.stringify(item, null, 2) + "\n";
  fs.writeFileSync(file, text);
  manifestItems.push({ id: item.id, type: item.type, tier: item.tier, slug: item.slug, path: rel, sha256: crypto.createHash("sha256").update(text).digest("hex") });
}
fs.mkdirSync(path.join(lifeDir, "friends"), { recursive: true });
fs.writeFileSync(path.join(lifeDir, "friends", ".gitkeep"), "");
fs.writeFileSync(path.join(lifeDir, "manifest.json"), JSON.stringify({ schemaVersion: 1, generatedAt: UPDATED, items: manifestItems }, null, 2) + "\n");
console.log(`wrote ${items.length} fixtures + manifest`);
