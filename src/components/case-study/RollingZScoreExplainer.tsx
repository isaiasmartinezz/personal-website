import type { MathTerm } from "@/data/biosurveillance-case-study";

export function RollingZScoreExplainer({
  terms,
  notes,
  riskLabels,
  combinationNote,
  rawVsStandardized,
}: {
  terms: MathTerm[];
  notes: string[];
  riskLabels: string[];
  combinationNote: string;
  rawVsStandardized: { raw: string; standardized: string };
}) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
      <div>
        <p className="rounded-lg bg-surface-2 px-4 py-3 font-mono text-base text-fg">
          z(t) = [x(t) − μroll(t)] / σroll(t)
        </p>
        <dl className="mt-4 space-y-2">
          {terms.map((t) => (
            <div key={t.symbol} className="flex gap-3 text-sm">
              <dt className="w-24 shrink-0 font-mono text-fg">{t.symbol}</dt>
              <dd className="text-muted">{t.meaning}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-4 space-y-1.5">
          {notes.map((n) => (
            <li key={n} className="text-sm leading-relaxed text-muted">
              {n}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="rounded-lg bg-surface-2 px-4 py-3 font-mono text-base text-fg">
          R(t) = w₁z₁(t) + w₂z₂(t) + w₃z₃(t)
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">R(t) =</p>
        <ul className="mt-1.5 space-y-1">
          {riskLabels.map((l, i) => (
            <li key={l} className="text-sm text-muted">
              {i > 0 && <span className="mr-1.5 text-subtle">+</span>}
              {l}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-subtle">{combinationNote}</p>

        <div className="mt-6 rounded-lg border border-border bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-subtle">
            Raw values cannot be directly added
          </p>
          <p className="mt-1 font-mono text-sm text-muted">{rawVsStandardized.raw}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent">
            Standardized values can be compared
          </p>
          <p className="mt-1 font-mono text-sm text-fg">{rawVsStandardized.standardized}</p>
        </div>
      </div>
    </div>
  );
}
