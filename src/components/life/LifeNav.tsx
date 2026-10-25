"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// The only place in the personal section that reads the pathname. Host rewrites
// can make the server and client disagree about the prefix, so strip "/life"
// before comparing.
export function LifeNav({ items }: { items: { href: string; label: string }[] }) {
  const pathname = (usePathname() ?? "/").replace(/^\/life(?=\/|$)/, "") || "/";
  return (
    <ul className="flex flex-wrap items-center gap-x-1 gap-y-1">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn("rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors", active ? "text-accent" : "text-muted hover:text-fg")}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
