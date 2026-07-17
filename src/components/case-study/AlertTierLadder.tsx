import type { AlertTier } from "@/data/biosurveillance-case-study";

const TIER_VAR: Record<AlertTier["key"], string> = {
  baseline: "--subtle",
  low: "--alert-low",
  medium: "--alert-medium",
  high: "--alert-high",
};

export function AlertTierLadder({ tiers }: { tiers: AlertTier[] }) {
  return (
    <ol className="space-y-3">
      {tiers.map((t) => (
        <li key={t.key} className="flex gap-4 rounded-xl border border-border bg-surface p-4">
          <span
            aria-hidden="true"
            className="mt-0.5 size-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: `var(${TIER_VAR[t.key]})` }}
          />
          <div>
            <p className="text-sm font-semibold" style={{ color: `var(${TIER_VAR[t.key]})` }}>
              {t.label}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{t.description}</p>
            <p className="mt-1 text-sm leading-relaxed text-fg">{t.interpretation}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
