"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Shows the headshot from `profile.photo`. If that file doesn't exist yet
// (e.g. you haven't added one), it gracefully falls back to a clean monogram
// so the layout never looks broken. Drop a square image at the configured
// path and it appears automatically — no code change needed.
// ---------------------------------------------------------------------------
export function ProfilePhoto({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  const initials = site.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // No src (the default) or a failed load → show the monogram, and importantly
  // make no network request, so there's no 404 in the console.
  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-accent/15 to-accent/5 font-serif text-4xl font-semibold text-accent",
          className,
        )}
      >
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- graceful onError fallback; swap for next/image once a real photo is committed.
    <img
      // Callback ref catches the case where the image already 404'd during SSR
      // (before React attached onError) — checks completeness on mount.
      ref={(node) => {
        if (node && node.complete && node.naturalWidth === 0) setFailed(true);
      }}
      src={src}
      alt={alt}
      width={480}
      height={480}
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  );
}
