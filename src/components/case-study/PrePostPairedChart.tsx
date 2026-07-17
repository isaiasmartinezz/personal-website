"use client";

import { useState } from "react";
import type { MetricKey, PairedPoint, PatientKey } from "@/data/fontan-case-study";
import { pairedMetricLabels, pairedMetricUnits } from "@/data/fontan-case-study";
import { cn } from "@/lib/utils";

const PATIENT_LABEL: Record<PatientKey, string> = { p18: "Patient 18", p21: "Patient 21", p23: "Patient 23" };
const PATIENT_COLOR: Record<PatientKey, string> = { p18: "#64748b", p21: "#2563eb", p23: "#059669" };

const MARGIN = { top: 20, right: 20, bottom: 36, left: 56 };
const PLOT_W = 320;
const PLOT_H = 220;

function log10(v: number) {
  return Math.log(Math.max(v, 1e-6)) / Math.LN10;
}

export function PrePostPairedChart({
  datasets,
}: {
  datasets: Record<MetricKey, PairedPoint[]>;
}) {
  const [metric, setMetric] = useState<MetricKey>("pressure");
  const points = datasets[metric];

  const allValues = points.flatMap((p) => [p.pre, p.post]);
  const logMin = Math.floor(Math.min(...allValues.map(log10)) - 0.2);
  const logMax = Math.ceil(Math.max(...allValues.map(log10)) + 0.2);

  const yFor = (v: number) =>
    MARGIN.top + PLOT_H - ((log10(v) - logMin) / (logMax - logMin)) * PLOT_H;
  const preX = MARGIN.left + PLOT_W * 0.25;
  const postX = MARGIN.left + PLOT_W * 0.75;

  const width = MARGIN.left + PLOT_W + MARGIN.right;
  const height = MARGIN.top + PLOT_H + MARGIN.bottom;

  const yTicks = Array.from({ length: logMax - logMin + 1 }, (_, i) => logMin + i);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Metric">
        {(Object.keys(pairedMetricLabels) as MetricKey[]).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={metric === k}
            onClick={() => setMetric(k)}
            className={cn(
              "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
              metric === k ? "border-accent/40 bg-accent/10 text-accent-strong" : "border-border text-muted hover:text-fg",
            )}
          >
            {pairedMetricLabels[k]}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="paired-title" className="mt-6 w-full max-w-md">
        <title id="paired-title">
          {`Pre-stent to post-stent ${pairedMetricLabels[metric].toLowerCase()} for each patient, log scale, in ${pairedMetricUnits[metric]}`}
        </title>

        {yTicks.map((t) => (
          <g key={t}>
            <line x1={MARGIN.left} x2={MARGIN.left + PLOT_W} y1={yFor(10 ** t)} y2={yFor(10 ** t)} stroke="var(--border)" strokeWidth="1" />
            <text x={MARGIN.left - 8} y={yFor(10 ** t)} dy="0.32em" textAnchor="end" fontSize="9" fill="var(--subtle)">
              {(10 ** t).toLocaleString(undefined, { maximumSignificantDigits: 2 })}
            </text>
          </g>
        ))}

        <text x={preX} y={height - 12} textAnchor="middle" fontSize="11" fontWeight={600} fill="var(--fg)">
          Pre-stent
        </text>
        <text x={postX} y={height - 12} textAnchor="middle" fontSize="11" fontWeight={600} fill="var(--fg)">
          Post-stent
        </text>

        {points.map((p) => {
          const color = PATIENT_COLOR[p.patient];
          const dashed = p.physiologic === "exercise";
          return (
            <g key={`${p.patient}-${p.physiologic}`}>
              <line
                x1={preX}
                y1={yFor(p.pre)}
                x2={postX}
                y2={yFor(p.post)}
                stroke={color}
                strokeWidth="2"
                strokeDasharray={dashed ? "5 3" : undefined}
              />
              <circle cx={preX} cy={yFor(p.pre)} r="3.5" fill={color} />
              <circle cx={postX} cy={yFor(p.post)} r="3.5" fill={color} />
            </g>
          );
        })}
      </svg>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        {(Object.keys(PATIENT_LABEL) as PatientKey[]).map((p) => (
          <span key={p} className="flex items-center gap-2 text-xs text-subtle">
            <span aria-hidden="true" className="inline-block h-0.5 w-4" style={{ backgroundColor: PATIENT_COLOR[p] }} />
            {PATIENT_LABEL[p]}
          </span>
        ))}
        <span className="flex items-center gap-2 text-xs text-subtle">
          <span aria-hidden="true" className="inline-block h-0.5 w-4 bg-subtle" />
          Solid = rest, dashed = exercise
        </span>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="py-2 pr-4 font-semibold text-fg">
                Patient
              </th>
              <th scope="col" className="py-2 pr-4 font-semibold text-fg">
                State
              </th>
              <th scope="col" className="py-2 pr-4 text-right font-semibold text-fg">
                Pre-stent ({pairedMetricUnits[metric]})
              </th>
              <th scope="col" className="py-2 text-right font-semibold text-fg">
                Post-stent ({pairedMetricUnits[metric]})
              </th>
            </tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={`${p.patient}-${p.physiologic}-row`} className="border-b border-border last:border-0">
                <td className="py-2 pr-4 text-muted">{PATIENT_LABEL[p.patient]}</td>
                <td className="py-2 pr-4 text-muted">{p.physiologic === "rest" ? "Rest" : "Exercise"}</td>
                <td className="py-2 pr-4 text-right text-fg">{p.pre}</td>
                <td className="py-2 text-right text-fg">{p.post}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
