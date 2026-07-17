import type { SystemDecisionEntry } from "@/data/biosurveillance-case-study";

export function SystemDecision({ entries }: { entries: SystemDecisionEntry[] }) {
  return (
    <div className="space-y-6">
      {entries.map((d, i) => (
        <div key={d.title} className="rounded-xl border border-border bg-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Decision {i + 1}</p>
          <h3 className="mt-1.5 text-lg font-semibold text-fg">{d.title}</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">Reason</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{d.reason}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Tradeoff</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{d.tradeoff}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
