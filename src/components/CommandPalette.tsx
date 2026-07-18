"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { SearchIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";

type PaletteItem = {
  id: string;
  label: string;
  sublabel?: string;
  href: string;
  group: "Pages" | "Projects";
};

// Built once at module load — this is static site content, not user data.
const ITEMS: PaletteItem[] = [
  { id: "home", label: "Home", href: "/", group: "Pages" },
  ...site.nav.map((n) => ({ id: n.href, label: n.label, href: n.href, group: "Pages" as const })),
  { id: "resume", label: "Resume", href: "/resume", group: "Pages" as const },
  ...projects.map((p) => ({
    id: p.slug,
    label: p.title,
    sublabel: `${p.category} · ${p.year}`,
    href: `/projects/${p.slug}`,
    group: "Projects" as const,
  })),
];

// Global quick-nav: Cmd/Ctrl+K (or the header button) opens a searchable list
// of every page and project. Native <button role="option"> list instead of a
// full combobox ARIA pattern — keeps keyboard support simple and predictable.
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastQuery, setLastQuery] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.sublabel?.toLowerCase().includes(q),
    );
  }, [query]);

  // Reset the selection whenever the query changes, adjusted during render
  // (React's recommended alternative to a setState-in-effect) — same pattern
  // Nav.tsx uses to reset on route change.
  if (query !== lastQuery) {
    setLastQuery(query);
    setActiveIndex(0);
  }

  function openPalette() {
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          if (v) return false;
          setQuery("");
          setActiveIndex(0);
          return true;
        });
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Focus the input and lock scroll while open — genuine side effects on
  // external systems (the DOM), not state resets, so this stays an effect.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function go(item: PaletteItem) {
    setOpen(false);
    router.push(item.href);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[activeIndex];
      if (item) go(item);
    }
  }

  const grouped: Partial<Record<PaletteItem["group"], PaletteItem[]>> = {};
  for (const item of results) {
    (grouped[item.group] ??= []).push(item);
  }
  let flatIndex = -1;

  return (
    <>
      <button
        type="button"
        onClick={() => openPalette()}
        aria-label="Search (Cmd+K)"
        title="Search (Cmd+K)"
        className="hidden items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-muted transition-colors hover:border-accent/40 hover:text-accent lg:inline-flex"
      >
        <SearchIcon className="size-4" />
        Search
        <kbd className="rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-subtle">
          ⌘K
        </kbd>
      </button>
      <button
        type="button"
        onClick={() => openPalette()}
        aria-label="Search"
        className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:text-accent lg:hidden"
      >
        <SearchIcon className="size-4" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-4 pt-24 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <SearchIcon className="size-4 shrink-0 text-subtle" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search pages and projects…"
                aria-label="Search pages and projects"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-palette-list"
                autoComplete="off"
                className="w-full bg-transparent py-3.5 text-sm text-fg placeholder:text-subtle focus:outline-none"
              />
              <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 text-xs text-subtle sm:block">
                Esc
              </kbd>
            </div>

            <ul
              id="command-palette-list"
              role="listbox"
              aria-label="Search results"
              className="max-h-80 overflow-y-auto p-2"
            >
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-subtle">
                  No matches.
                </li>
              )}
              {(["Pages", "Projects"] as const).map((group) => {
                const items = grouped[group];
                if (!items || items.length === 0) return null;
                return (
                  <li key={group}>
                    <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-subtle">
                      {group}
                    </p>
                    <ul>
                      {items.map((item) => {
                        flatIndex += 1;
                        const isActive = flatIndex === activeIndex;
                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={isActive}
                              onMouseEnter={() => setActiveIndex(flatIndex)}
                              onClick={() => go(item)}
                              className={cn(
                                "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                                isActive
                                  ? "bg-accent text-accent-fg"
                                  : "text-fg hover:bg-surface-2",
                              )}
                            >
                              <span className="truncate font-medium">
                                {item.label}
                              </span>
                              {item.sublabel && (
                                <span
                                  className={cn(
                                    "shrink-0 text-xs",
                                    isActive ? "text-accent-fg/70" : "text-subtle",
                                  )}
                                >
                                  {item.sublabel}
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
