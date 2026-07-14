"use client";

import { useSyncExternalStore } from "react";
import { SunIcon, MoonIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Light/dark toggle. The initial theme is applied before paint by the inline
// script in layout.tsx (no flash of the wrong theme); this component reads and
// flips that state. We subscribe to the DOM class via useSyncExternalStore so
// there's no hydration flash and no setState-in-effect.
// ---------------------------------------------------------------------------
function subscribe(callback: () => void) {
  window.addEventListener("themechange", callback); // our own toggle
  window.addEventListener("storage", callback); // changes from another tab
  return () => {
    window.removeEventListener("themechange", callback);
    window.removeEventListener("storage", callback);
  };
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => false;

export function ThemeToggle({ className }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage may be unavailable (private mode) — the class still flips.
    }
    window.dispatchEvent(new Event("themechange"));
  }

  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:text-accent",
        className,
      )}
    >
      {isDark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
    </button>
  );
}
