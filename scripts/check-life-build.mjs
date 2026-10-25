// `postbuild`: fails the build if the personal section could be indexed or leak
// the portfolio. Reads the prerendered output in .next/server/app/.
import fs from "node:fs";
import path from "node:path";

const appDir = path.join(process.cwd(), ".next", "server", "app");
const errors = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
}

const lifeHtml = [...walk(path.join(appDir, "life")), path.join(appDir, "life.html")].filter((f) => f.endsWith(".html") && fs.existsSync(f));
if (lifeHtml.length === 0) errors.push("no prerendered /life pages found (expected the personal section in the build output)");

for (const file of lifeHtml) {
  const rel = path.relative(process.cwd(), file);
  const html = fs.readFileSync(file, "utf8");
  if (!/<meta name="robots" content="[^"]*noindex/.test(html)) errors.push(`${rel}: missing noindex robots meta`);
  if (/Isaias Martinez|application\/ld\+json|rel="manifest"/.test(html)) errors.push(`${rel}: contains portfolio identity/structured data`);
}

const sitemapFile = ["sitemap.xml.body", "sitemap.xml"].map((n) => path.join(appDir, n)).find((f) => fs.existsSync(f));
if (!sitemapFile) errors.push("sitemap.xml not found in build output");
else if (/life\.|\/life\b/.test(fs.readFileSync(sitemapFile, "utf8"))) errors.push("sitemap.xml mentions the personal section");

if (errors.length) {
  console.error("\n✗ life build check failed:\n");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ life build check: ${lifeHtml.length} personal pages noindex, no portfolio leakage, sitemap clean`);
