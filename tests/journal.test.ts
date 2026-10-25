import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { getAllPosts, getPost, renderMarkdown } from "@/lib/journal";
import { site } from "@/data/site";
import sitemap from "@/app/sitemap";

const ROOT = path.resolve(__dirname, "..");

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

describe("journal content", () => {
  const posts = getAllPosts({ includeDrafts: true });

  it("has a title, a valid date, and a unique URL-safe slug for every post", () => {
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
    for (const post of posts) {
      expect(post.title, `${post.slug}: title`).toBeTruthy();
      expect(post.date, `${post.slug}: date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(`${post.date}T00:00:00Z`).getTime()), `${post.slug}: real date`).toBe(false);
      expect(post.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("sorts newest first", () => {
    const dates = posts.map((p) => p.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("only references local images that exist in public/", () => {
    for (const post of posts) {
      const full = getPost(post.slug) ?? { html: "" };
      const srcs = [...full.html.matchAll(/<img src="(\/[^"]+)"/g)].map((m) => m[1]);
      for (const src of srcs) {
        expect(existsSync(path.join(ROOT, "public", src)), `${post.slug}: missing image ${src}`).toBe(true);
      }
    }
  });

  it("renders markdown with lazy-loaded images", () => {
    const html = renderMarkdown("Hello **world**\n\n![A photo](/journal/x.jpg)");
    expect(html).toContain("<strong>world</strong>");
    expect(html).toContain('loading="lazy"');
  });
});

describe("journal stays unlisted", () => {
  it("is not in the site nav or the sitemap", () => {
    expect(site.nav.some((n) => n.href.includes("journal"))).toBe(false);
    expect(sitemap().some((entry) => entry.url.includes("journal"))).toBe(false);
  });

  it("is never linked from the main site's source", () => {
    // Only the journal itself, the chrome gate that hides the main nav there,
    // the loader, and the config/test files may mention it.
    const allowed = [
      path.join("src", "app", "journal"),
      path.join("src", "components", "SiteChrome.tsx"),
      path.join("src", "lib", "journal.ts"),
    ];
    const offenders = walk(path.join(ROOT, "src"))
      .map((file) => path.relative(ROOT, file))
      .filter((rel) => !allowed.some((a) => rel.startsWith(a)))
      .filter((rel) => /\.(tsx?|css|md)$/.test(rel))
      .filter((rel) => /\/journal\b/i.test(readFileSync(path.join(ROOT, rel), "utf8")));
    expect(offenders).toEqual([]);
  });

  it("sends an X-Robots-Tag noindex header for /journal", () => {
    const config = readFileSync(path.join(ROOT, "next.config.ts"), "utf8");
    expect(config).toContain("/journal/:path*");
    expect(config).toContain("noindex");
  });
});
