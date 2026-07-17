"use client";

import { useState } from "react";
import type { ReftPlacement } from "@/data/gpt2-case-study";
import { METHOD_BORDER, METHOD_SOFT_BG, METHOD_TEXT } from "@/lib/methodColors";
import { cn } from "@/lib/utils";

const reftBorder = METHOD_BORDER.reft;
const reftBg = METHOD_SOFT_BG.reft;
const reftText = METHOD_TEXT.reft;

export function ReFTLayerExplorer({ placements }: { placements: ReftPlacement[] }) {
  // Defaults to the distributed placement, the strongest individual SST
  // result — still a real, immediately-rendered default state.
  const [key, setKey] = useState(placements.find((p) => p.key === "distributed")?.key ?? placements[0].key);
  const selected = placements.find((p) => p.key === key) ?? placements[0];

  return (
    <div>
      {/* Interactive explorer — desktop/tablet only. */}
      <div className="hidden sm:block">
        <div className="flex flex-wrap gap-2">
          {placements.map((p) => (
            <button
              key={p.key}
              type="button"
              aria-pressed={p.key === key}
              onClick={() => setKey(p.key)}
              className={cn(
                "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                p.key === key ? cn(reftBorder, reftBg, reftText) : "border-border text-muted hover:text-fg",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div
          className="mt-8 flex flex-wrap justify-center gap-1.5"
          role="img"
          aria-label={`Simplified 12-layer GPT-2 stack with ${selected.label} highlighted`}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((layer) => {
            const active = selected.layers.includes(layer);
            return (
              <div
                key={layer}
                aria-hidden="true"
                className={cn(
                  "flex size-9 items-center justify-center rounded-md border text-xs font-medium transition-colors",
                  active ? cn(reftBorder, reftBg, reftText) : "border-border text-subtle",
                )}
              >
                {layer}
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-center text-xs text-subtle">
          Layer number within the 12-layer GPT-2 small stack
        </p>

        <div
          aria-live="polite"
          className="mx-auto mt-8 grid max-w-sm grid-cols-2 gap-4 rounded-xl border border-border bg-surface p-6"
        >
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-subtle">SST accuracy</p>
            <p className="mt-1 font-serif text-2xl font-semibold text-fg">{selected.sst.toFixed(3)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-subtle">CFIMDB accuracy</p>
            <p className="mt-1 font-serif text-2xl font-semibold text-fg">{selected.cfimdb.toFixed(3)}</p>
          </div>
        </div>
      </div>

      {/* Static vertical comparison — replaces the interactive stack on mobile. */}
      <dl className="space-y-3 sm:hidden">
        {placements.map((p) => (
          <div key={p.key} className="rounded-lg border border-border bg-surface p-4">
            <dt className="text-sm font-semibold text-fg">{p.label}</dt>
            <dd className="mt-2 flex gap-6 text-xs text-muted">
              <span>SST: {p.sst.toFixed(3)}</span>
              <span>CFIMDB: {p.cfimdb.toFixed(3)}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8">
        <table className="hidden w-full border-collapse text-left text-sm sm:table">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="py-2.5 pr-4 font-semibold text-fg">
                ReFT placement, rank 4
              </th>
              <th scope="col" className="py-2.5 pr-4 text-right font-semibold text-fg">
                SST accuracy
              </th>
              <th scope="col" className="py-2.5 text-right font-semibold text-fg">
                CFIMDB accuracy
              </th>
            </tr>
          </thead>
          <tbody>
            {placements.map((p) => (
              <tr key={p.key} className="border-b border-border last:border-0">
                <td className="py-2.5 pr-4 align-top text-muted">{p.label}</td>
                <td className="py-2.5 pr-4 align-top text-right text-muted">{p.sst.toFixed(3)}</td>
                <td className="py-2.5 align-top text-right text-muted">{p.cfimdb.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
