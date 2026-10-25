import path from "node:path";
import { validateLife } from "../../../schema/validate.mjs";
import type { LifeType, PublishedItem } from "./types";

// Reads content/life/ at build time. Any invalid file throws, which fails
// `next build`. Phase 1 serves the public tier only; content/life/friends/ is
// validated but never exposed.

let cache: PublishedItem[] | null = null;

function loadAll(): PublishedItem[] {
  if (cache) return cache;
  const result = validateLife({ root: path.join(process.cwd()) });
  if (!result.ok) {
    throw new Error(`content/life is invalid:\n${result.errors.map((e: string) => `  - ${e}`).join("\n")}`);
  }
  cache = (result.items as unknown as { tier: string; item: PublishedItem }[])
    .filter((i) => i.tier === "public")
    .map((i) => i.item)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  return cache;
}

export function getAllItems(): PublishedItem[] {
  return loadAll();
}

export function getItems<T extends LifeType>(type: T): PublishedItem<T>[] {
  return loadAll().filter((i) => i.type === type) as PublishedItem<T>[];
}

export function getItem<T extends LifeType>(type: T, slug: string): PublishedItem<T> | undefined {
  return getItems(type).find((i) => i.slug === slug);
}
