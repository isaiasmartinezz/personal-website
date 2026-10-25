// `npm run check:life-media` — fails if any file under public/life-media/ carries
// EXIF/GPS, XMP or IPTC metadata, or is not a jpg/png/webp. The Publisher strips
// metadata on export; this is the independent second check.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp"]);

/** @returns {string[]} human-readable problems for one image buffer ([] = clean) */
export function scanImage(buf, ext) {
  const problems = [];
  if (ext === ".jpg" || ext === ".jpeg") {
    if (buf[0] !== 0xff || buf[1] !== 0xd8) return ["not a valid JPEG"];
    let i = 2;
    while (i + 4 <= buf.length) {
      if (buf[i] !== 0xff) break;
      const marker = buf[i + 1];
      if (marker === 0xda || marker === 0xd9) break; // start of scan / EOI
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
      const len = buf.readUInt16BE(i + 2);
      const seg = buf.subarray(i + 4, i + 2 + len);
      if (marker === 0xe1) {
        const head = seg.subarray(0, 29).toString("latin1");
        problems.push(head.startsWith("Exif") ? "EXIF (APP1) segment" : head.includes("ns.adobe.com/xap") ? "XMP (APP1) segment" : "APP1 segment");
      } else if (marker === 0xed) problems.push("IPTC/Photoshop (APP13) segment");
      else if (marker === 0xe2 && seg.subarray(0, 12).toString("latin1").startsWith("MPF")) problems.push("MPF (APP2) segment");
      i += 2 + len;
    }
  } else if (ext === ".png") {
    if (buf.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") return ["not a valid PNG"];
    let i = 8;
    while (i + 8 <= buf.length) {
      const len = buf.readUInt32BE(i);
      const type = buf.subarray(i + 4, i + 8).toString("latin1");
      if (type === "eXIf") problems.push("EXIF (eXIf chunk)");
      if (type === "iTXt" && buf.subarray(i + 8, i + 8 + 22).toString("latin1").startsWith("XML:com.adobe.xmp")) problems.push("XMP (iTXt chunk)");
      if (type === "IEND") break;
      i += 12 + len;
    }
  } else if (ext === ".webp") {
    if (buf.subarray(0, 4).toString("latin1") !== "RIFF" || buf.subarray(8, 12).toString("latin1") !== "WEBP") return ["not a valid WebP"];
    let i = 12;
    while (i + 8 <= buf.length) {
      const type = buf.subarray(i, i + 4).toString("latin1");
      const len = buf.readUInt32LE(i + 4);
      if (type === "EXIF") problems.push("EXIF chunk");
      if (type === "XMP ") problems.push("XMP chunk");
      i += 8 + len + (len % 2);
    }
  }
  return problems;
}

export function checkMedia(dir) {
  const errors = [];
  const walk = (d) => {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name === ".gitkeep") continue;
      else {
        const ext = path.extname(e.name).toLowerCase();
        const rel = path.relative(process.cwd(), full);
        if (!ALLOWED.has(ext)) errors.push(`${rel}: file type not allowed (jpg, png, webp only)`);
        else for (const p of scanImage(fs.readFileSync(full), ext)) errors.push(`${rel}: ${p}`);
      }
    }
  };
  walk(dir);
  return errors;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const errors = checkMedia(path.join(process.cwd(), "public", "life-media"));
  if (errors.length) {
    console.error(`\n✗ life-media check failed:\n`);
    for (const e of errors) console.error(`  - ${e}`);
    console.error("\nStrip metadata (EXIF/GPS/XMP/IPTC) before publishing images.\n");
    process.exit(1);
  }
  console.log("✓ public/life-media: no embedded metadata");
}
