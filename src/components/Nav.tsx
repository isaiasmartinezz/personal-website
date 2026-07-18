"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CommandPalette } from "@/components/CommandPalette";
import { MenuIcon, CloseIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";

function useIsActive() {
  const pathname = usePathname();
  return (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");
}

export function Nav() {
  const pathname = usePathname();
  const isActive = useIsActive();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close the mobile menu when the route changes. Adjusting state during render
  // is React's recommended alternative to a setState-in-effect here.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-page/80 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="rounded-md font-serif text-lg font-semibold tracking-tight hover:text-accent"
        >
          {site.shortName}
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-accent"
                    : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <CommandPalette />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-accent md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile navigation panel */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-page md:hidden"
        >
          <ul className="mx-auto flex w-full max-w-5xl flex-col px-3 py-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-md px-3 py-3 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-surface-2 text-accent"
                      : "text-muted hover:bg-surface-2 hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
