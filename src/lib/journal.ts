import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

// ---------------------------------------------------------------------------
// Journal content loader
// ---------------------------------------------------------------------------
// The personal side of the site (/journal) is plain markdown on disk:
//   content/journal/posts/YYYY-MM-DD-some-title.md   → one post per file
//   content/journal/about.md                          → the "about me" page
// Add a file, commit, push — it deploys like everything else. Frontmatter:
//   title (required), date (YYYY-MM-DD, required), summary (optional),
//   draft: true (optional — hidden in production, visible in `npm run dev`).
// ---------------------------------------------------------------------------

const CONTENT_DIR = path.join(process.cwd(), "content", "journal");
const POSTS_DIR = path.join(CONTENT_DIR, "posts");

export interface JournalPostMeta {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  summary?: string;
  draft: boolean;
}

export interface JournalPost extends JournalPostMeta {
  html: string;
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Photos in posts load lazily so a long recap doesn't pull every image up front.
marked.use({
  renderer: {
    image({ href, title, text }) {
      const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
      return `<img src="${escapeAttr(href)}" alt="${escapeAttr(text)}"${titleAttr} loading="lazy" decoding="async" />`;
    },
  },
});

export function renderMarkdown(source: string): string {
  return marked.parse(source, { async: false });
}

// YAML parses an unquoted `date: 2026-10-24` into a Date; normalize either form.
function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

function readPostFile(file: string): { meta: JournalPostMeta; body: string } {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: String(data.title ?? ""),
      date: normalizeDate(data.date),
      summary: data.summary ? String(data.summary) : undefined,
      draft: data.draft === true,
    },
    body: content,
  };
}

/** All posts, newest first. Drafts are hidden in production builds. */
export function getAllPosts(options: { includeDrafts?: boolean } = {}): JournalPostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const includeDrafts = options.includeDrafts ?? process.env.NODE_ENV !== "production";
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => readPostFile(file).meta)
    .filter((meta) => includeDrafts || !meta.draft)
    .sort((a, b) => (a.date === b.date ? b.slug.localeCompare(a.slug) : b.date.localeCompare(a.date)));
}

export function getPost(slug: string): JournalPost | undefined {
  if (!/^[a-z0-9-]+$/i.test(slug)) return undefined;
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(POSTS_DIR, file))) return undefined;
  const { meta, body } = readPostFile(file);
  if (meta.draft && process.env.NODE_ENV === "production") return undefined;
  return { ...meta, html: renderMarkdown(body) };
}

export function getAboutPage(): { title: string; html: string } {
  const file = path.join(CONTENT_DIR, "about.md");
  if (!fs.existsSync(file)) return { title: "About me", html: "" };
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { title: String(data.title ?? "About me"), html: renderMarkdown(content) };
}

/** "2026-10-24" → "October 24, 2026" (UTC, so the day never shifts by timezone). */
export function formatJournalDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
