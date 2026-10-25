// Validates everything under content/life/ against the shared schema and the
// privacy rules from docs/PLAN.md. One implementation, used by:
//   - scripts/validate-life.mjs   (npm `prebuild`, CI)
//   - src/lib/life/load.ts        (so a bad file fails `next build` too)
//   - tests/life.test.ts
// Plain ESM with no Next/TS dependencies so the dashboard repo can reuse it.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import AjvModule from "ajv/dist/2020.js";
import formatsModule from "ajv-formats";
import itemSchema from "./published-item.schema.json" with { type: "json" };
import manifestSchema from "./manifest.schema.json" with { type: "json" };

// ajv and ajv-formats are CommonJS; depending on the loader the class is either
// the module itself or its `.default`.
const Ajv2020 = AjvModule.default ?? AjvModule;
const addFormats = formatsModule.default ?? formatsModule;

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validateItem = ajv.compile(itemSchema);
const validateManifest = ajv.compile(manifestSchema);

/** content/life/<dir>/ that each item type must live in. */
export const TYPE_DIRS = {
  journal: "journal",
  place: "places",
  film: "films",
  trip: "trips",
  hike: "hikes",
  recipe: "recipes",
  collection_entry: "collections",
};

export const MAX_COORDINATE_DECIMALS = 3; // ~110 m

function posix(p) {
  return p.split(path.sep).join("/");
}

function decimalPlaces(n) {
  const s = String(n);
  if (s.includes("e") || s.includes("E")) return Infinity;
  const dot = s.indexOf(".");
  return dot === -1 ? 0 : s.length - dot - 1;
}

function formatAjvErrors(errors) {
  // Drop the `if`/`then` wrapper errors; the specific child error already says what is wrong.
  return (errors ?? []).filter((e) => e.keyword !== "if").map((e) => {
    const where = e.instancePath || "(root)";
    const extra = e.params && Object.keys(e.params).length ? ` ${JSON.stringify(e.params)}` : "";
    return `${where} ${e.message}${extra}`;
  });
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

/** Every [lat, lng] pair in an item that must respect the coordinate precision rule. */
function coordinateProblems(item) {
  const problems = [];
  const check = (label, value) => {
    if (typeof value === "number" && decimalPlaces(value) > MAX_COORDINATE_DECIMALS) {
      problems.push(`${label} = ${value} has more than ${MAX_COORDINATE_DECIMALS} decimal places`);
    }
  };
  if (item.location) {
    check("location.lat", item.location.lat);
    check("location.lng", item.location.lng);
  }
  const coords = item.data?.trackGeoJson?.coordinates;
  if (Array.isArray(coords)) {
    coords.forEach((pos, i) => {
      if (Array.isArray(pos)) {
        check(`data.trackGeoJson.coordinates[${i}][0] (lng)`, pos[0]);
        check(`data.trackGeoJson.coordinates[${i}][1] (lat)`, pos[1]);
      }
    });
  }
  return problems;
}

function mediaPaths(item) {
  const paths = (item.photos ?? []).map((p) => p.path);
  if (item.data?.coverPhoto) paths.push(item.data.coverPhoto);
  if (item.data?.posterPath) paths.push(item.data.posterPath);
  return paths;
}

/**
 * @param {{ root?: string }} [options] root = repo root (contains content/ and public/)
 * @returns {{ ok: boolean, errors: string[], items: { path: string, tier: string, item: any }[], manifest: any }}
 */
export function validateLife({ root = process.cwd() } = {}) {
  const lifeDir = path.join(root, "content", "life");
  const errors = [];
  const items = [];
  const hashes = new Map(); // rel path -> sha256 of file bytes

  const files = walk(lifeDir);
  const manifestFile = path.join(lifeDir, "manifest.json");

  for (const file of files) {
    const rel = posix(path.relative(lifeDir, file));
    const base = path.basename(file);

    if (file === manifestFile) continue;
    if (base === ".gitkeep") continue;
    if (!base.endsWith(".json")) {
      errors.push(`content/life/${rel}: unexpected file (only .json items and manifest.json belong here)`);
      continue;
    }

    const bytes = fs.readFileSync(file);
    hashes.set(rel, crypto.createHash("sha256").update(bytes).digest("hex"));

    let item;
    try {
      item = JSON.parse(bytes.toString("utf8"));
    } catch (err) {
      errors.push(`content/life/${rel}: invalid JSON (${err.message})`);
      continue;
    }

    if (!validateItem(item)) {
      for (const msg of formatAjvErrors(validateItem.errors)) errors.push(`content/life/${rel}: ${msg}`);
      continue;
    }

    // --- location in the tree must agree with the item ---------------------
    const parts = rel.split("/");
    const inFriends = parts[0] === "friends";
    if (inFriends && item.tier !== "friends") {
      errors.push(`content/life/${rel}: tier is "${item.tier}" but the file is under friends/ (friends/ is for tier "friends" only)`);
    }
    if (!inFriends && item.tier === "friends") {
      errors.push(`content/life/${rel}: tier "friends" item must live under content/life/friends/ (it would otherwise be built into public pages)`);
    }
    const typeDirIndex = inFriends ? (parts.length === 3 ? 1 : -1) : parts.length === 2 ? 0 : -1;
    if (typeDirIndex === -1 && !(inFriends && parts.length === 2)) {
      errors.push(`content/life/${rel}: unexpected location; expected ${inFriends ? "friends/[<type dir>/]" : "<type dir>/"}<slug>.json`);
    } else if (typeDirIndex !== -1 && parts[typeDirIndex] !== TYPE_DIRS[item.type]) {
      errors.push(`content/life/${rel}: type "${item.type}" items belong in "${TYPE_DIRS[item.type]}/", not "${parts[typeDirIndex]}/"`);
    }
    if (base !== `${item.slug}.json`) {
      errors.push(`content/life/${rel}: file name must be "${item.slug}.json" (matches slug)`);
    }

    // --- privacy rules the schema can't express ------------------------------
    for (const problem of coordinateProblems(item)) errors.push(`content/life/${rel}: ${problem}`);

    for (const media of mediaPaths(item)) {
      if (!fs.existsSync(path.join(root, "public", media))) {
        errors.push(`content/life/${rel}: referenced media file not found: public${media}`);
      }
    }

    if (item.type === "trip" && item.data.endDate < item.data.startDate) {
      errors.push(`content/life/${rel}: data.endDate is before data.startDate`);
    }

    items.push({ path: rel, tier: item.tier, item });
  }

  // --- uniqueness -------------------------------------------------------------
  const ids = new Map();
  const slugs = new Map();
  for (const { path: rel, item } of items) {
    if (ids.has(item.id)) errors.push(`content/life/${rel}: duplicate id "${item.id}" (also in ${ids.get(item.id)})`);
    else ids.set(item.id, rel);
    const key = `${item.type}/${item.slug}`;
    if (slugs.has(key)) errors.push(`content/life/${rel}: duplicate slug "${item.slug}" for type "${item.type}" (also in ${slugs.get(key)})`);
    else slugs.set(key, rel);
  }

  // --- manifest: detects hand-edited or stray generated files -----------------
  let manifest = null;
  if (!fs.existsSync(manifestFile)) {
    errors.push("content/life/manifest.json is missing (the Publisher writes it with every export)");
  } else {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
    } catch (err) {
      errors.push(`content/life/manifest.json: invalid JSON (${err.message})`);
    }
    if (manifest && !validateManifest(manifest)) {
      for (const msg of formatAjvErrors(validateManifest.errors)) errors.push(`content/life/manifest.json: ${msg}`);
      manifest = null;
    }
  }
  if (manifest) {
    const listed = new Map(manifest.items.map((m) => [m.path, m]));
    for (const [rel, hash] of hashes) {
      const entry = listed.get(rel);
      if (!entry) errors.push(`content/life/${rel}: not listed in manifest.json (generated content must come from the Publisher)`);
      else if (entry.sha256 !== hash) errors.push(`content/life/${rel}: does not match its manifest hash (was it hand-edited?)`);
    }
    for (const entry of manifest.items) {
      if (!hashes.has(entry.path)) errors.push(`content/life/manifest.json: lists ${entry.path}, which does not exist`);
    }
    for (const { path: rel, item } of items) {
      const entry = listed.get(rel);
      if (entry && (entry.id !== item.id || entry.type !== item.type || entry.tier !== item.tier || entry.slug !== item.slug)) {
        errors.push(`content/life/${rel}: manifest entry (id/type/tier/slug) disagrees with the file`);
      }
    }
  }

  items.sort((a, b) => a.path.localeCompare(b.path));
  return { ok: errors.length === 0, errors, items, manifest };
}

/** Helper for the Publisher and tests: sha256 of a file's bytes, hex. */
export function sha256File(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}
