import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { CUSTOM_CASE_STUDY_SLUGS } from "@/lib/case-study-slugs";

// These catch exactly the bug class this site has shipped before: a project
// that silently has no working page, or points at an asset that doesn't
// exist in /public.
const PUBLIC_DIR = path.resolve(__dirname, "../public");

function publicFileExists(publicPath: string): boolean {
  return existsSync(path.join(PUBLIC_DIR, publicPath));
}

describe("projects data", () => {
  it("has a unique, URL-safe slug for every project", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("has required non-empty fields for every project", () => {
    for (const p of projects) {
      expect(p.title, `${p.slug}: title`).toBeTruthy();
      expect(p.summary, `${p.slug}: summary`).toBeTruthy();
      expect(p.year, `${p.slug}: year`).toBeTruthy();
      expect(Array.isArray(p.tags) && p.tags.length > 0, `${p.slug}: tags`).toBe(true);
      expect(Array.isArray(p.links), `${p.slug}: links`).toBe(true);
    }
  });

  it("only references image/video/PDF assets that actually exist in public/", () => {
    for (const p of projects) {
      if (p.image) {
        expect(publicFileExists(p.image), `${p.slug}: missing image ${p.image}`).toBe(true);
      }
      if (p.video) {
        expect(publicFileExists(p.video), `${p.slug}: missing video ${p.video}`).toBe(true);
      }
      for (const link of p.links) {
        const isRelative = !link.href.startsWith("http") && !link.href.startsWith("mailto:");
        if (isRelative) {
          expect(publicFileExists(link.href), `${p.slug}: missing linked file ${link.href}`).toBe(true);
        }
      }
    }
  });

  it("gives every image an alt description", () => {
    for (const p of projects) {
      if (p.image) {
        expect(p.imageAlt, `${p.slug}: image is set but imageAlt is missing`).toBeTruthy();
      }
    }
  });

  it("only lists custom case-study slugs that still exist in projects.ts", () => {
    const slugs = new Set(projects.map((p) => p.slug));
    for (const slug of CUSTOM_CASE_STUDY_SLUGS) {
      expect(slugs.has(slug), `CUSTOM_CASE_STUDY_SLUGS references missing project "${slug}"`).toBe(true);
    }
  });
});

describe("skills data", () => {
  it("only links to 'seen in' projects that still exist in projects.ts", () => {
    const slugs = new Set(projects.map((p) => p.slug));
    for (const group of skills) {
      for (const slug of group.seenIn ?? []) {
        expect(slugs.has(slug), `${group.name}: seenIn references missing project "${slug}"`).toBe(true);
      }
    }
  });
});
