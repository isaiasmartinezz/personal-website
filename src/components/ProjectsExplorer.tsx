"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import { ProjectCard } from "@/components/ProjectCard";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Client-side project browser: a row of tag filters over a responsive grid.
// Filters are derived automatically from the tags on each project (in
// src/data/projects.ts) — add a tag there and it shows up here.
// ---------------------------------------------------------------------------
export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("All");

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) {
      for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    // Only surface tags shared by 2+ projects so the filter bar stays compact
    // and every filter yields a real comparison. (One-off tags still show on
    // the cards themselves.) Most-used first.
    const sorted = [...counts.entries()]
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t);
    return ["All", ...sorted];
  }, [projects]);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(active));

  return (
    <div>
      {/* Keeps the heading order sequential (page h1 → h2 → card h3). */}
      <h2 className="sr-only">All projects</h2>
      <div
        role="group"
        aria-label="Filter projects by tag"
        className="flex flex-wrap gap-2"
      >
        {tags.map((tag) => {
          const isActive = tag === active;
          return (
            <button
              key={tag}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(tag)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-border bg-surface text-muted hover:border-accent/40 hover:text-accent",
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-subtle" aria-live="polite">
        Showing {filtered.length} project{filtered.length === 1 ? "" : "s"}
        {active !== "All" && ` tagged “${active}”`}.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
