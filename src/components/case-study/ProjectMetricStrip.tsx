import type { CaseStudyMetric as EPVOMetric } from "@/data/epvo-case-study";
import type { CaseStudyMetric as CoQuestMetric } from "@/data/coquest-case-study";
import type { CaseStudyMetric as GPT2Metric } from "@/data/gpt2-case-study";
import { cn } from "@/lib/utils";

type Metric = EPVOMetric | CoQuestMetric | GPT2Metric;

// A restrained "at a glance" metric row: one bordered strip divided by rules,
// 2x2 on mobile, a single row on desktop (4 or 5 columns). Deliberately not a
// SaaS KPI-card grid — no icons, no color-coded deltas, just the numbers.
export function ProjectMetricStrip({ metrics }: { metrics: Metric[] }) {
  const lastRowStartMobile = Math.floor((metrics.length - 1) / 2) * 2;

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div
        className={cn(
          "grid grid-cols-2",
          metrics.length === 5 ? "sm:grid-cols-5" : "sm:grid-cols-4",
        )}
      >
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className={cn(
              "p-5 sm:p-6",
              i % 2 === 0 && i + 1 < metrics.length ? "border-r border-border" : "",
              i < lastRowStartMobile ? "border-b border-border sm:border-b-0" : "",
              i > 0 ? "sm:border-l sm:border-border" : "",
            )}
          >
            <div className="font-serif text-3xl font-semibold text-fg sm:text-4xl">
              {m.value}
            </div>
            <p className="mt-1.5 text-sm leading-snug text-muted">
              {m.label}
              {"isTarget" in m && m.isTarget && (
                <span className="ml-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-accent">
                  Target
                </span>
              )}
              {"note" in m && m.note && (
                <span className="ml-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-subtle">
                  {m.note}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
