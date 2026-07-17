"use client";

import { useId, useState } from "react";
import type { Scenario } from "@/data/biosurveillance-case-study";
import { cn } from "@/lib/utils";

// Illustrative synthetic scenario shapes only (deterministic, no Math.random)
// — not derived from the live fusion math in the lab above, and not a
// forecast or detection model.
const N = 48;

function flat(base: number, amp: number, seed: number) {
  return Array.from({ length: N }, (_, i) => base + amp * Math.sin((i + seed) / 6) * 0.6 + amp * 0.4 * Math.cos(i * 3.1 + seed));
}
function ramp(base: number, amp: number, start: number, end: number, mag: number, seed: number) {
  return flat(base, amp, seed).map((v, i) => {
    if (i < start) return v;
    const t = Math.min(1, (i - start) / (end - start));
    return v + mag * t;
  });
}
function spike(base: number, amp: number, day: number, mag: number, seed: number) {
  return flat(base, amp, seed).map((v, i) => (i >= day && i <= day + 3 ? v + mag : v));
}

type Tier = "Baseline" | "Low" | "Medium" | "High";
function tiersFrom(fused: number[], med: number, high: number): Tier[] {
  return fused.map((v) => (v >= high ? "High" : v >= med ? "Medium" : v > med * 0.4 ? "Low" : "Baseline"));
}

const TIER_VAR: Record<Tier, string> = {
  Baseline: "--subtle",
  Low: "--alert-low",
  Medium: "--alert-medium",
  High: "--alert-high",
};

const SCENARIO_DATA = {
  baseline: {
    waste: flat(12, 1.5, 0),
    hosp: flat(6, 0.8, 5),
    env: flat(45, 4, 10),
    fused: flat(0, 0.4, 2),
  },
  outbreak: {
    waste: ramp(12, 1.5, 12, 34, 8, 0),
    hosp: ramp(6, 0.8, 20, 42, 5, 5),
    env: flat(45, 4, 10),
    fused: ramp(0, 0.3, 14, 44, 4.2, 2),
  },
  bioterror: {
    waste: spike(12, 1.2, 20, 9, 0),
    hosp: spike(6, 0.6, 21, 6, 5),
    env: spike(45, 3, 20, 8, 10),
    fused: spike(0, 0.3, 20, 5.5, 2),
  },
} as const;

const SCENARIO_TIERS = {
  baseline: tiersFrom(SCENARIO_DATA.baseline.fused, 1.5, 3),
  outbreak: tiersFrom(SCENARIO_DATA.outbreak.fused, 1.5, 3),
  bioterror: tiersFrom(SCENARIO_DATA.bioterror.fused, 1.5, 3),
};

function sparkPath(values: number[], w: number, h: number) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / span) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function ScenarioSelector({ scenarios, note }: { scenarios: Scenario[]; note: string }) {
  const [key, setKey] = useState<"baseline" | "outbreak" | "bioterror">("baseline");
  const selected = scenarios.find((s) => s.key === key) ?? scenarios[0];
  const data = SCENARIO_DATA[key];
  const tiers = SCENARIO_TIERS[key];
  const titleId = useId();

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Scenario">
        {scenarios.map((s) => (
          <button
            key={s.key}
            type="button"
            aria-pressed={s.key === key}
            onClick={() => setKey(s.key)}
            className={cn(
              "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
              s.key === key
                ? "border-accent/40 bg-accent/10 text-accent-strong"
                : "border-border text-muted hover:text-fg",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {(["waste", "hosp", "env"] as const).map((s) => {
          const label = s === "waste" ? "Wastewater" : s === "hosp" ? "Hospital admissions" : "Environment";
          const colorVar = s === "waste" ? "--sig-wastewater" : s === "hosp" ? "--sig-hospital" : "--sig-env";
          return (
            <div key={s} className="rounded-lg border border-border bg-surface p-3">
              <p className="text-xs font-medium text-subtle">{label}</p>
              <svg viewBox="0 0 200 50" className="mt-1.5 w-full" role="img" aria-label={`${label} synthetic signal for the ${selected.label} scenario`}>
                <path d={sparkPath(data[s], 200, 50)} fill="none" stroke={`var(${colorVar})`} strokeWidth="1.75" />
              </svg>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--sig-fused)]">
          Fused risk
        </p>
        <svg viewBox="0 0 560 90" className="mt-2 w-full" role="img" aria-labelledby={titleId}>
          <title id={titleId}>{`Fused risk curve for the ${selected.label} scenario`}</title>
          {(() => {
            const min = Math.min(...data.fused);
            const max = Math.max(...data.fused);
            const zeroY = 90 - ((0 - min) / (max - min || 1)) * 90;
            return <line x1="0" x2="560" y1={zeroY} y2={zeroY} stroke="var(--border)" strokeWidth="1" />;
          })()}
          <path d={sparkPath(data.fused, 560, 90)} fill="none" stroke="var(--sig-fused)" strokeWidth="2" />
        </svg>

        <div className="mt-3 flex gap-[2px]" aria-hidden="true">
          {tiers.map((t, i) => (
            <span key={i} className="h-2 flex-1 rounded-sm" style={{ backgroundColor: `var(${TIER_VAR[t]})` }} />
          ))}
        </div>
        <p className="mt-2 text-xs text-subtle">
          Alert timeline for this scenario: mostly{" "}
          <span className="font-medium text-fg">
            {Array.from(new Set(tiers)).join(", ")}
          </span>{" "}
          days.
        </p>
      </div>

      <div className="mt-6 max-w-2xl">
        <ul className="space-y-1.5">
          {selected.behavior.map((b) => (
            <li
              key={b}
              className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-accent/60"
            >
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm font-medium text-fg">{selected.purpose}</p>
      </div>

      <p className="mt-6 max-w-2xl rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm text-muted">
        {note}
      </p>
    </div>
  );
}
