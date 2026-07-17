"use client";

import { useState } from "react";
import type { Hotspot } from "@/data/centrifuge-case-study";
import { cn } from "@/lib/utils";

// Default state shows the clean photograph. Toggling "View components"
// overlays restrained numbered markers (desktop/tablet) or reveals a plain
// numbered list (mobile) — never both, so small screens never get dense
// overlay clutter.
export function HeroHotspots({
  image,
  imageAlt,
  hotspots,
}: {
  image: string;
  imageAlt: string;
  hotspots: Hotspot[];
}) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const selected = hotspots.find((h) => h.id === active);

  return (
    <div>
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          aria-pressed={visible}
          onClick={() => {
            setVisible((v) => !v);
            setActive(null);
          }}
          className={cn(
            "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
            visible
              ? "border-accent/40 bg-accent/10 text-accent-strong"
              : "border-border text-muted hover:text-fg",
          )}
        >
          {visible ? "Hide components" : "View components"}
        </button>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={imageAlt} className="w-full" />
        {visible && (
          <div className="absolute inset-0 hidden sm:block" aria-hidden={false}>
            {hotspots.map((h, i) => (
              <button
                key={h.id}
                type="button"
                aria-label={h.label}
                aria-pressed={active === h.id}
                onClick={() => setActive(active === h.id ? null : h.id)}
                className={cn(
                  "absolute flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-xs font-semibold shadow-sm transition-colors",
                  active === h.id
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-accent/60 bg-page/90 text-accent hover:bg-accent/10",
                )}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {visible && (
        <div className="mt-4">
          <div className="hidden sm:block" aria-live="polite">
            {selected ? (
              <div className="rounded-lg border border-border bg-surface p-4">
                <p className="text-sm font-semibold text-fg">{selected.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{selected.description}</p>
              </div>
            ) : (
              <p className="text-sm text-subtle">Select a numbered marker to learn about that component.</p>
            )}
          </div>

          <ol className="mt-2 space-y-3 sm:hidden">
            {hotspots.map((h, i) => (
              <li key={h.id} className="rounded-lg border border-border bg-surface p-3">
                <p className="text-sm font-semibold text-fg">
                  {i + 1}. {h.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{h.description}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
