import type { MetricExplainer } from "@/data/fontan-case-study";

const METRIC_VAR: Record<string, string> = {
  pressure: "--fontan-pressure",
  resistance: "--fontan-resistance",
  power: "--fontan-power",
};

export function HemodynamicMetricExplainer({
  metrics,
  lesson,
}: {
  metrics: MetricExplainer[];
  lesson: string;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {metrics.map((m) => (
          <div
            key={m.key}
            className="rounded-xl border p-5"
            style={{ borderColor: `color-mix(in oklab, var(${METRIC_VAR[m.key]}) 35%, transparent)` }}
          >
            <h3 className="text-base font-semibold" style={{ color: `var(${METRIC_VAR[m.key]})` }}>
              {m.title}
            </h3>
            <p className="mt-3 font-serif text-lg italic leading-snug text-fg">&ldquo;{m.question}&rdquo;</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{m.definition}</p>
            {m.equation && (
              <p className="mt-3 inline-block rounded-lg bg-surface-2 px-3 py-2 font-mono text-sm text-fg">
                {m.equation}
              </p>
            )}
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-subtle">
              Clinical relevance
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{m.relevance}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-2xl text-sm font-medium leading-relaxed text-fg">{lesson}</p>
    </div>
  );
}
