"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { ArrowRightIcon } from "@/components/Icons";

// A horizontally-scrolling strip of project imagery at the top of /projects —
// meant to be browsed at a glance, not read. Native overflow-x scroll (so
// touch/trackpad/keyboard all work for free) with arrow buttons for mouse
// users, edge fades to hint there's more, and scroll-snap so it settles on a
// card instead of stopping mid-frame.
export function ProjectFilmstrip({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLUListElement>(null);

  function scroll(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.min(track.clientWidth * 0.8, 480) * direction;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: amount, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-subtle">
          Some of what I&apos;ve built
        </p>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scroll(-1)}
            className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            <ArrowRightIcon className="size-4 rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scroll(1)}
            className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
      </div>

      <div className="relative mt-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-page to-transparent sm:w-16"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-page to-transparent sm:w-16"
        />

        <ul
          ref={trackRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1"
        >
          {projects.map((project) => (
            <li key={project.slug} className="shrink-0 snap-start">
              <Link
                href={`/projects/${project.slug}`}
                className="group relative block aspect-[4/3] w-60 overflow-hidden rounded-xl border border-border sm:w-72"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.imageAlt ?? `${project.title} preview`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-white/70">
                    {project.category} · {project.year}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-snug text-white">
                    {project.title}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
