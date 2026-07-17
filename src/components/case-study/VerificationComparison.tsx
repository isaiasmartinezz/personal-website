"use client";

import { useState } from "react";
import type { VerificationCategory } from "@/data/centrifuge-case-study";
import { cn } from "@/lib/utils";

const CATEGORY_VAR: Record<VerificationCategory["category"], string> = {
  "Matched design": "--cf-complete",
  "Small fabrication deviation": "--cf-active",
  "Required manual adjustment": "--cf-fault",
};

export function VerificationComparison({
  categories,
  summary,
}: {
  categories: VerificationCategory[];
  summary: string;
}) {
  const [active, setActive] = useState(0);
  const current = categories[active];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Verification category">
        {categories.map((c, i) => (
          <button
            key={c.category}
            type="button"
            aria-pressed={active === i}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
              active === i ? "text-fg" : "border-border text-muted hover:text-fg",
            )}
            style={
              active === i
                ? {
                    borderColor: `var(${CATEGORY_VAR[c.category]})`,
                    backgroundColor: `color-mix(in oklab, var(${CATEGORY_VAR[c.category]}) 10%, transparent)`,
                  }
                : undefined
            }
          >
            {c.category}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <table className="hidden w-full border-collapse text-left text-sm sm:table">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="py-2 pr-4 font-semibold text-fg">Location</th>
              <th scope="col" className="py-2 pr-4 font-semibold text-fg">Part</th>
              <th scope="col" className="py-2 pr-4 text-right font-semibold text-fg">Designed</th>
              <th scope="col" className="py-2 text-right font-semibold text-fg">Measured</th>
            </tr>
          </thead>
          <tbody>
            {current.rows.map((r) => (
              <tr key={`${r.location}-${r.part}`} className="border-b border-border last:border-0">
                <td className="py-2 pr-4 align-top text-muted">{r.location}</td>
                <td className="py-2 pr-4 align-top text-muted">{r.part}</td>
                <td className="py-2 pr-4 align-top text-right text-muted">{r.designed}</td>
                <td className="py-2 align-top text-right font-medium text-fg">{r.measured}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="space-y-3 sm:hidden">
          {current.rows.map((r) => (
            <div key={`${r.location}-${r.part}-m`} className="rounded-lg border border-border bg-surface p-4">
              <dt className="text-sm font-semibold text-fg">{r.part} — {r.location}</dt>
              <dd className="mt-1.5 flex justify-between text-xs text-muted">
                <span>Designed: {r.designed}</span>
                <span>Measured: {r.measured}</span>
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-sm leading-relaxed text-muted">{current.note}</p>
      </div>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-fg">{summary}</p>
    </div>
  );
}
