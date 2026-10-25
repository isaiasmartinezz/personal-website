// Usage: npm run journal:new            → "Week of <Month D>" dated today
//        npm run journal:new -- "My title"
// Creates content/journal/posts/YYYY-MM-DD-<slug>.md with a recap template.
import fs from "node:fs";
import path from "node:path";

const now = new Date();
const pad = (n) => String(n).padStart(2, "0");
const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const monthDay = now.toLocaleDateString("en-US", { month: "long", day: "numeric" });

const title = process.argv.slice(2).join(" ").trim() || `Week of ${monthDay}`;
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const dir = path.join(process.cwd(), "content", "journal", "posts");
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, `${date}-${slug}.md`);

if (fs.existsSync(file)) {
  console.error(`Already exists: ${path.relative(process.cwd(), file)}`);
  process.exit(1);
}

fs.writeFileSync(
  file,
  `---
title: ${JSON.stringify(title)}
date: ${date}
summary: ""
draft: true
---

## This week

## Highlights

## Next week
`,
);

console.log(`Created ${path.relative(process.cwd(), file)}`);
console.log("It starts as a draft (visible in `npm run dev`, hidden in production). Remove `draft: true` to publish.");
