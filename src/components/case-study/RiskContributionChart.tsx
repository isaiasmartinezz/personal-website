import type { RiskContribution, SignalKey } from "@/data/biosurveillance-case-study";

const SIGNAL_VAR: Record<SignalKey, string> = {
  wastewater: "--sig-wastewater",
  hospital: "--sig-hospital",
  env: "--sig-env",
};

export function RiskContributionChart({
  totalRisk,
  tier,
  contributions,
}: {
  totalRisk: number;
  tier: string;
  contributions: RiskContribution[];
}) {
  const max = Math.max(...contributions.map((c) => c.value));

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Example decomposition</p>
      <div className="mt-2 flex flex-wrap items-baseline gap-3">
        <span className="font-serif text-3xl font-semibold text-fg">{totalRisk.toFixed(1)}</span>
        <span className="text-sm text-muted">current fused risk — {tier} tier</span>
      </div>

      <div className="mt-6 space-y-3">
        {contributions.map((c) => (
          <div key={c.signal} className="flex items-center gap-3">
            <span className="w-40 shrink-0 text-sm text-muted">{c.label}</span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full"
                style={{ width: `${(c.value / max) * 100}%`, backgroundColor: `var(${SIGNAL_VAR[c.signal]})` }}
              />
            </div>
            <span className="w-14 shrink-0 text-right font-mono text-sm text-fg">+{c.value.toFixed(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
