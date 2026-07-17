"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Sticky in-page section nav. Tracks which section is in view via
// IntersectionObserver and highlights it. Horizontally scrollable on
// narrow screens instead of a separate mobile pattern — keeps one
// implementation instead of two.
export function ProjectSectionNav({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-112px 0px -65% 0px", threshold: 0 },
    );

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Case study sections"
      className="sticky top-16 z-30 -mx-5 border-b border-border bg-page/90 backdrop-blur-md sm:mx-0 sm:rounded-xl sm:border"
    >
      <ul className="flex gap-1 overflow-x-auto px-3 py-2 sm:px-2">
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "inline-block whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                active === item.id
                  ? "bg-surface-2 text-accent"
                  : "text-muted hover:text-fg",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
