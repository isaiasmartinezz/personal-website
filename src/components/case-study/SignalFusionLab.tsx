"use client";

import { useId, useMemo, useState } from "react";
import type { SignalKey } from "@/data/biosurveillance-case-study";

// Educational simulation only — synthetic, deterministic series (no
// Math.random, so server and client render identically) computed locally.
// Never connects to the live Streamlit backend or collects any input.
const N = 90;

function synth(opts: { base: number; amp: number; period: number; noise: number; rampStart: number; rampEnd: number; rampMag: number }) {
  const { base, amp, period, noise, rampStart, rampEnd, rampMag } = opts;
  return Array.from({ length: N }, (_, i) => {
    let v = base + amp * Math.sin((i / period) * Math.PI * 2);
    v += noise * (Math.sin(i * 12.9898) * 0.5 + Math.cos(i * 4.233) * 0.5);
    if (i >= rampStart && i <= rampEnd) {
      const t = (i - rampStart) / (rampEnd - rampStart);
      v += rampMag * Math.min(1, t * 1.6);
    }
    return Math.max(0, v);
  });
}

const RAW: Record<SignalKey, number[]> = {
  wastewater: synth({ base: 12, amp: 1.6, period: 13, noise: 0.7, rampStart: 50, rampEnd: 78, rampMag: 9 }),
  hospital: synth({ base: 6, amp: 0.9, period: 11, noise: 0.5, rampStart: 60, rampEnd: 85, rampMag: 5.5 }),
  env: synth({ base: 45, amp: 5, period: 9, noise: 2.2, rampStart: 54, rampEnd: 66, rampMag: 6 }),
};

const SIGNAL_LABEL: Record<SignalKey, string> = {
  wastewater: "Wastewater",
  hospital: "Hospital admissions",
  env: "Environment",
};
const SIGNAL_VAR: Record<SignalKey, string> = {
  wastewater: "--sig-wastewater",
  hospital: "--sig-hospital",
  env: "--sig-env",
};

function rollingStats(values: number[], window: number) {
  const mean: number[] = [];
  const std: number[] = [];
  for (let i = 0; i < values.length; i++) {
    const start = Math.max(0, i - window + 1);
    const slice = values.slice(start, i + 1);
    const m = slice.reduce((a, b) => a + b, 0) / slice.length;
    const variance = slice.reduce((a, b) => a + (b - m) ** 2, 0) / slice.length;
    mean.push(m);
    std.push(Math.sqrt(variance));
  }
  return { mean, std };
}

function zScores(values: number[], mean: number[], std: number[]) {
  return values.map((v, i) => (std[i] > 0.0001 ? (v - mean[i]) / std[i] : 0));
}

function pathFor(values: number[], w: number, h: number, min: number, max: number) {
  const span = max - min || 1;
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / span) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function tierFor(fused: number, med: number, high: number): "Baseline" | "Low" | "Medium" | "High" {
  if (fused >= high) return "High";
  if (fused >= med) return "Medium";
  if (fused > 0) return "Low";
  return "Baseline";
}

const TIER_VAR: Record<string, string> = {
  Baseline: "--subtle",
  Low: "--alert-low",
  Medium: "--alert-medium",
  High: "--alert-high",
};

const DEFAULTS = { window: 28, wWaste: 45, wHosp: 35, wEnv: 20, med: 1.5, high: 3 };

function SignalPanel({ signalKey, window }: { signalKey: SignalKey; window: number }) {
  const raw = RAW[signalKey];
  const { mean, std } = rollingStats(raw, window);
  const z = zScores(raw, mean, std);
  const last = raw.length - 1;
  const deviation = raw[last] - mean[last];
  const min = Math.min(...raw, ...mean);
  const max = Math.max(...raw, ...mean);
  const colorVar = SIGNAL_VAR[signalKey];

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: `var(${colorVar})` }}>
        {SIGNAL_LABEL[signalKey]}
      </p>
      <svg viewBox="0 0 280 70" className="mt-3 w-full" role="img" aria-label={`${SIGNAL_LABEL[signalKey]} raw signal with rolling baseline`}>
        <path d={pathFor(mean, 280, 70, min, max)} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d={pathFor(raw, 280, 70, min, max)} fill="none" stroke={`var(${colorVar})`} strokeWidth="1.75" />
      </svg>
      <div className="mt-2 flex justify-between text-xs text-muted">
        <span>Deviation: {deviation >= 0 ? "+" : ""}{deviation.toFixed(2)}</span>
        <span>z-score: {z[last] >= 0 ? "+" : ""}{z[last].toFixed(2)}</span>
      </div>
    </div>
  );
}

export function SignalFusionLab() {
  const [window, setWindow] = useState(DEFAULTS.window);
  const [wWaste, setWWaste] = useState(DEFAULTS.wWaste);
  const [wHosp, setWHosp] = useState(DEFAULTS.wHosp);
  const [wEnv, setWEnv] = useState(DEFAULTS.wEnv);
  const [med, setMed] = useState(DEFAULTS.med);
  const [high, setHigh] = useState(DEFAULTS.high);
  const summaryId = useId();

  function reset() {
    setWindow(DEFAULTS.window);
    setWWaste(DEFAULTS.wWaste);
    setWHosp(DEFAULTS.wHosp);
    setWEnv(DEFAULTS.wEnv);
    setMed(DEFAULTS.med);
    setHigh(DEFAULTS.high);
  }

  const { fused, contributions, tier } = useMemo(() => {
    const wasteStats = rollingStats(RAW.wastewater, window);
    const hospStats = rollingStats(RAW.hospital, window);
    const envStats = rollingStats(RAW.env, window);
    const zWaste = zScores(RAW.wastewater, wasteStats.mean, wasteStats.std);
    const zHosp = zScores(RAW.hospital, hospStats.mean, hospStats.std);
    const zEnv = zScores(RAW.env, envStats.mean, envStats.std);

    const sum = wWaste + wHosp + wEnv || 1;
    const nWaste = wWaste / sum;
    const nHosp = wHosp / sum;
    const nEnv = wEnv / sum;

    const fusedArr = zWaste.map((_, i) => nWaste * zWaste[i] + nHosp * zHosp[i] + nEnv * zEnv[i]);
    const last = fusedArr.length - 1;
    const contribs = [
      { signal: "wastewater" as SignalKey, value: nWaste * zWaste[last] },
      { signal: "hospital" as SignalKey, value: nHosp * zHosp[last] },
      { signal: "env" as SignalKey, value: nEnv * zEnv[last] },
    ];
    return { fused: fusedArr, contributions: contribs, tier: tierFor(fusedArr[last], med, high) };
  }, [window, wWaste, wHosp, wEnv, med, high]);

  const last = fused.length - 1;
  const currentRisk = fused[last];
  const domainMin = Math.min(...fused, -med, 0) - 0.4;
  const domainMax = Math.max(...fused, high) + 0.4;
  const chartW = 600;
  const chartH = 160;
  const yFor = (v: number) => chartH - ((v - domainMin) / (domainMax - domainMin)) * chartH;

  const maxAbsContribution = Math.max(...contributions.map((c) => Math.abs(c.value)), 0.1);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SignalPanel signalKey="wastewater" window={window} />
        <SignalPanel signalKey="hospital" window={window} />
        <SignalPanel signalKey="env" window={window} />
      </div>

      <div className="mt-8 rounded-xl border border-border bg-surface p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--sig-fused)]">
            Fused risk
          </p>
          <span
            className="rounded-full border px-3 py-1 text-xs font-semibold"
            style={{ borderColor: `var(${TIER_VAR[tier]})`, color: `var(${TIER_VAR[tier]})` }}
          >
            {tier} — {currentRisk >= 0 ? "+" : ""}
            {currentRisk.toFixed(2)}
          </span>
        </div>
        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="mt-3 w-full" role="img" aria-label="Fused risk index over time, with medium and high alert thresholds">
          <line x1="0" x2={chartW} y1={yFor(med)} y2={yFor(med)} stroke="var(--alert-medium)" strokeDasharray="4 4" strokeWidth="1" />
          <line x1="0" x2={chartW} y1={yFor(high)} y2={yFor(high)} stroke="var(--alert-high)" strokeDasharray="4 4" strokeWidth="1" />
          <line x1="0" x2={chartW} y1={yFor(0)} y2={yFor(0)} stroke="var(--border)" strokeWidth="1" />
          <path d={pathFor(fused, chartW, chartH, domainMin, domainMax)} fill="none" stroke="var(--sig-fused)" strokeWidth="2" />
          <circle cx={chartW} cy={yFor(currentRisk)} r="4" fill="var(--sig-fused)" />
        </svg>
        <div className="mt-1 flex justify-between text-xs text-subtle">
          <span>Medium threshold: {med.toFixed(1)}</span>
          <span>High threshold: {high.toFixed(1)}</span>
        </div>

        <div className="mt-5 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Signal contribution to current risk</p>
          {contributions.map((c) => (
            <div key={c.signal} className="flex items-center gap-3 text-xs">
              <span className="w-32 shrink-0 text-muted">{SIGNAL_LABEL[c.signal]}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(100, (Math.abs(c.value) / maxAbsContribution) * 100)}%`,
                    backgroundColor: `var(${SIGNAL_VAR[c.signal]})`,
                    marginLeft: c.value < 0 ? "auto" : undefined,
                  }}
                />
              </div>
              <span className="w-14 shrink-0 text-right font-mono text-fg">
                {c.value >= 0 ? "+" : ""}
                {c.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 rounded-xl border border-border bg-surface p-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="flex justify-between font-medium text-fg">
            <span>Rolling window</span>
            <span className="font-mono text-subtle">{window} days</span>
          </span>
          <input
            type="range"
            min={7}
            max={42}
            step={1}
            value={window}
            onChange={(e) => setWindow(Number(e.target.value))}
            className="accent-[var(--sig-fused)]"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="flex justify-between font-medium text-fg">
            <span>Wastewater weight</span>
            <span className="font-mono text-subtle">{wWaste}</span>
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={wWaste}
            onChange={(e) => setWWaste(Number(e.target.value))}
            style={{ accentColor: "var(--sig-wastewater)" }}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="flex justify-between font-medium text-fg">
            <span>Hospital weight</span>
            <span className="font-mono text-subtle">{wHosp}</span>
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={wHosp}
            onChange={(e) => setWHosp(Number(e.target.value))}
            style={{ accentColor: "var(--sig-hospital)" }}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="flex justify-between font-medium text-fg">
            <span>Environment weight</span>
            <span className="font-mono text-subtle">{wEnv}</span>
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={wEnv}
            onChange={(e) => setWEnv(Number(e.target.value))}
            style={{ accentColor: "var(--sig-env)" }}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="flex justify-between font-medium text-fg">
            <span>Medium alert threshold</span>
            <span className="font-mono text-subtle">{med.toFixed(1)}</span>
          </span>
          <input
            type="range"
            min={0.5}
            max={4}
            step={0.1}
            value={med}
            onChange={(e) => setMed(Number(e.target.value))}
            style={{ accentColor: "var(--alert-medium)" }}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="flex justify-between font-medium text-fg">
            <span>High alert threshold</span>
            <span className="font-mono text-subtle">{high.toFixed(1)}</span>
          </span>
          <input
            type="range"
            min={1}
            max={6}
            step={0.1}
            value={high}
            onChange={(e) => setHigh(Number(e.target.value))}
            style={{ accentColor: "var(--alert-high)" }}
          />
        </label>

        <div className="sm:col-span-2">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-fg"
          >
            Reset to defaults
          </button>
        </div>
      </div>

      <p id={summaryId} aria-live="polite" className="mt-4 text-sm leading-relaxed text-muted">
        With a {window}-day rolling window and weights of {wWaste} wastewater, {wHosp} hospital, and{" "}
        {wEnv} environment, the current fused risk is {currentRisk >= 0 ? "+" : ""}
        {currentRisk.toFixed(2)}, which falls in the <strong className="text-fg">{tier}</strong> tier.
      </p>
    </div>
  );
}
