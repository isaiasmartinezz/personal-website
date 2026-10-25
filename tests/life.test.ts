import { describe, expect, it, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { validateLife } from "../schema/validate.mjs";
import { scanImage } from "../scripts/check-life-media.mjs";
import { TYPES } from "@/lib/life/registry";
import { renderMarkdown } from "@/lib/life/markdown";
import { metadata as lifeMetadata } from "@/app/(life)/life/layout";
import sitemap from "@/app/sitemap";

const ROOT = path.resolve(__dirname, "..");

// ---- helpers: work on a throwaway copy of content/life + public/life-media ----
let tmp: string;
const sha = (text: string) => crypto.createHash("sha256").update(text).digest("hex");

function copyDir(src: string, dest: string) {
  fs.cpSync(src, dest, { recursive: true });
}
const itemPath = (rel: string) => path.join(tmp, "content", "life", rel);
const readItem = (rel: string) => JSON.parse(fs.readFileSync(itemPath(rel), "utf8"));
/** Rewrite an item and keep the manifest hash in sync, so only the mutation under test can fail. */
function writeItem(rel: string, value: unknown) {
  const text = JSON.stringify(value, null, 2) + "\n";
  fs.writeFileSync(itemPath(rel), text);
  const mp = itemPath("manifest.json");
  const manifest = JSON.parse(fs.readFileSync(mp, "utf8"));
  const entry = manifest.items.find((m: { path: string }) => m.path === rel);
  if (entry) entry.sha256 = sha(text);
  fs.writeFileSync(mp, JSON.stringify(manifest, null, 2) + "\n");
}

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "life-test-"));
  copyDir(path.join(ROOT, "content"), path.join(tmp, "content"));
  copyDir(path.join(ROOT, "public", "life-media"), path.join(tmp, "public", "life-media"));
});
afterEach(() => fs.rmSync(tmp, { recursive: true, force: true }));

const errorsOf = () => validateLife({ root: tmp }).errors.join("\n");

describe("life content validation", () => {
  it("accepts the committed fixtures", () => {
    const result = validateLife({ root: ROOT });
    expect(result.errors).toEqual([]);
    expect(result.ok).toBe(true);
  });

  it("has exactly three fixtures for each of the seven types", () => {
    const { items } = validateLife({ root: ROOT });
    for (const t of TYPES) expect(items.filter((i) => (i.item as { type: string }).type === t.type), t.type).toHaveLength(3);
  });

  it("rejects a missing required field and names the file", () => {
    const item = readItem("films/sample-film-one.json");
    delete item.title;
    writeItem("films/sample-film-one.json", item);
    expect(errorsOf()).toMatch(/films\/sample-film-one\.json.*title/);
  });

  it("rejects a field of the wrong type", () => {
    const item = readItem("films/sample-film-one.json");
    item.rating = "five";
    writeItem("films/sample-film-one.json", item);
    expect(errorsOf()).toMatch(/films\/sample-film-one\.json.*\/rating/);
  });

  it("rejects per-type data that does not match its type", () => {
    const item = readItem("places/sample-bistro.json");
    item.data.priceLevel = 9;
    writeItem("places/sample-bistro.json", item);
    expect(errorsOf()).toMatch(/places\/sample-bistro\.json.*priceLevel/);
  });

  it("rejects coordinates with more than 3 decimal places", () => {
    const item = readItem("places/sample-bistro.json");
    item.location.lat = 37.77493;
    writeItem("places/sample-bistro.json", item);
    expect(errorsOf()).toMatch(/location\.lat.*decimal places/);
  });

  it("rejects a friends-tier item outside content/life/friends/", () => {
    const item = readItem("films/sample-film-one.json");
    item.tier = "friends";
    writeItem("films/sample-film-one.json", item);
    expect(errorsOf()).toMatch(/must live under content\/life\/friends\//);
  });

  it("rejects a public item inside content/life/friends/", () => {
    fs.mkdirSync(itemPath("friends/films"), { recursive: true });
    fs.copyFileSync(itemPath("films/sample-film-one.json"), itemPath("friends/films/sample-film-one.json"));
    fs.rmSync(itemPath("films/sample-film-one.json"));
    expect(errorsOf()).toMatch(/friends\/films\/sample-film-one\.json.*under friends\//);
  });

  it("rejects a hand-edited file whose hash no longer matches the manifest", () => {
    const p = itemPath("films/sample-film-one.json");
    fs.writeFileSync(p, fs.readFileSync(p, "utf8").replace("Sample Film One", "Edited By Hand"));
    expect(errorsOf()).toMatch(/does not match its manifest hash/);
  });

  it("rejects a generated file that is not in the manifest", () => {
    fs.copyFileSync(itemPath("films/sample-film-one.json"), itemPath("films/stray.json"));
    expect(errorsOf()).toMatch(/stray\.json/);
  });

  it("rejects a file name that does not match the slug and duplicate ids", () => {
    const item = readItem("films/sample-film-two.json");
    item.id = "fixture-sample-film-one";
    writeItem("films/sample-film-two.json", item);
    expect(errorsOf()).toMatch(/duplicate id/);
  });

  it("rejects a reference to a media file that does not exist", () => {
    const item = readItem("hikes/sample-ridge-loop.json");
    item.photos[0].path = "/life-media/fixtures/missing.jpg";
    writeItem("hikes/sample-ridge-loop.json", item);
    expect(errorsOf()).toMatch(/media file not found/);
  });
});

describe("personal section isolation", () => {
  it("registry covers all seven item types with unique URL segments", () => {
    expect(TYPES.map((t) => t.type).sort()).toEqual(["collection_entry", "film", "hike", "journal", "place", "recipe", "trip"]);
    expect(new Set(TYPES.map((t) => t.segment)).size).toBe(7);
  });

  it("the life layout declares noindex and removes portfolio metadata", () => {
    expect(lifeMetadata.robots).toMatchObject({ index: false, follow: false });
    expect(lifeMetadata.manifest).toBeNull();
    expect(lifeMetadata.keywords).toBeNull();
    expect(lifeMetadata.authors).toBeNull();
  });

  it("the sitemap lists no personal URL", () => {
    for (const entry of sitemap()) expect(entry.url).not.toMatch(/life/i);
  });

  it("nothing in the portfolio source references the personal section", () => {
    const roots = ["src/data", "src/components", "src/app"].map((r) => path.join(ROOT, r));
    const skip = (f: string) => /[\\/](life)[\\/]|\(life\)|LifeNav|[\\/]lib[\\/]life/.test(f) || /[\\/]tests?[\\/]/.test(f);
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name);
        if (skip(full)) continue;
        if (e.isDirectory()) walk(full);
        else if (/\.(tsx?|mdx?|json)$/.test(e.name) && /life\.isaiasmartinez|["'`]\/life\b|LIFE_HOST|lib\/life/.test(fs.readFileSync(full, "utf8"))) offenders.push(path.relative(ROOT, full));
      }
    };
    roots.forEach(walk);
    expect(offenders).toEqual([]);
  });
});

describe("markdown renderer", () => {
  it("escapes raw HTML", () => {
    const html = renderMarkdown("<script>alert(1)</script>\n\nhello <img src=x onerror=alert(1)>");
    expect(html).not.toContain("<script");
    expect(html).not.toContain("<img src=x");
  });

  it("only allows local life-media images", () => {
    expect(renderMarkdown("![ok](/life-media/fixtures/photo-1.jpg)")).toContain('<img src="/life-media/fixtures/photo-1.jpg"');
    expect(renderMarkdown("![bad](https://evil.example/x.png)")).not.toContain("<img");
  });

  it("drops javascript: links but keeps http(s) links", () => {
    expect(renderMarkdown("[x](javascript:alert(1))")).not.toContain("<a");
    expect(renderMarkdown("[x](https://example.com)")).toContain('href="https://example.com"');
  });
});

describe("media metadata scan", () => {
  const jpeg = (segments: Buffer[]) => Buffer.concat([Buffer.from([0xff, 0xd8]), ...segments, Buffer.from([0xff, 0xda, 0, 2, 0xff, 0xd9])]);
  const app1 = (payload: string) => {
    const body = Buffer.from(payload, "latin1");
    const len = Buffer.alloc(2);
    len.writeUInt16BE(body.length + 2);
    return Buffer.concat([Buffer.from([0xff, 0xe1]), len, body]);
  };

  it("accepts the committed placeholder images", () => {
    for (const f of fs.readdirSync(path.join(ROOT, "public/life-media/fixtures"))) {
      expect(scanImage(fs.readFileSync(path.join(ROOT, "public/life-media/fixtures", f)), path.extname(f))).toEqual([]);
    }
  });

  it("flags an EXIF segment in a JPEG", () => {
    expect(scanImage(jpeg([app1("Exif\0\0GPSDATA")]), ".jpg")).toEqual(["EXIF (APP1) segment"]);
  });

  it("flags XMP in a JPEG and an eXIf chunk in a PNG", () => {
    expect(scanImage(jpeg([app1("http://ns.adobe.com/xap/1.0/\0<x/>")]), ".jpg")).toEqual(["XMP (APP1) segment"]);
    const chunk = (type: string, data: Buffer) => {
      const len = Buffer.alloc(4);
      len.writeUInt32BE(data.length);
      return Buffer.concat([len, Buffer.from(type, "latin1"), data, Buffer.alloc(4)]);
    };
    const png = Buffer.concat([Buffer.from("89504e470d0a1a0a", "hex"), chunk("eXIf", Buffer.from("II*\0")), chunk("IEND", Buffer.alloc(0))]);
    expect(scanImage(png, ".png")).toEqual(["EXIF (eXIf chunk)"]);
  });
});
