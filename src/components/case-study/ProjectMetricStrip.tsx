import type { CaseStudyMetric } from "@/data/epvo-case-study";
import { cn } from "@/lib/utils";

// A restrained "at a glance" metric row: one bordered strip divided by rules,
// 2x2 on mobile, a single row on desktop. Deliberately not a SaaS KPI-card
// grid — no icons, no color-coded deltas, just the numbers.
export function ProjectMetricStrip({ metrics }: { metrics: CaseStudyMetric[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className={cn(
              "p-5 sm:p-6",
              i % 2 === 0 ? "border-r border-border" : "",
              i < metrics.length - 2 ? "border-b border-border sm:border-b-0" : "",
              i > 0 ? "sm:border-l sm:border-border" : "",
            )}
          >
            <div className="font-serif text-3xl font-semibold text-fg sm:text-4xl">
              {m.value}
            </div>
            <p className="mt-1.5 text-sm leading-snug text-muted">
              {m.label}
              {m.isTarget && (
                <span className="ml-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-accent">
                  Target
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
