import type { TheoryFinding } from "@/data/coquest-case-study";

export function TheoryFindingGrid({ findings }: { findings: TheoryFinding[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {findings.map((f) => (
        <div key={f.concept} className="rounded-xl border border-border bg-surface p-6">
          <h3 className="font-serif text-lg font-semibold text-fg">{f.concept}</h3>
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Theory</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{f.theory}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--quest)]">
                Observed
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{f.observed}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
