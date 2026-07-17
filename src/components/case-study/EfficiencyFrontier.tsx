"use client";

import { useId, useState } from "react";
import type { EfficiencyPoint } from "@/data/gpt2-case-study";
import { METHOD_LABEL } from "@/lib/methodColors";
import { cn } from "@/lib/utils";

// Accessible, dependency-free SVG scatter (no charting library is installed
// in this project). X is log-scaled since trainable-parameter share spans
// four orders of magnitude; point radius encodes peak GPU memory on a scale
// shared across both datasets so memory usage stays comparable when toggling.
const MEMORY_MIN = 500;
const MEMORY_MAX = 5000;
const RADIUS_MIN = 7;
const RADIUS_MAX = 24;
const X_MIN = 0.001;
const X_MAX = 100;
const PLOT_W = 560;
const PLOT_H = 260;
const MARGIN = { top: 20, right: 20, bottom: 46, left: 58 };
const X_TICKS = [0.001, 0.01, 0.1, 1, 10, 100];

function xScale(pct: number) {
  const t =
    (Math.log10(pct) - Math.log10(X_MIN)) / (Math.log10(X_MAX) - Math.log10(X_MIN));
  return MARGIN.left + t * PLOT_W;
}

function radiusScale(mb: number) {
  const t = Math.min(1, Math.max(0, (mb - MEMORY_MIN) / (MEMORY_MAX - MEMORY_MIN)));
  return RADIUS_MIN + t * (RADIUS_MAX - RADIUS_MIN);
}

export function EfficiencyFrontier({
  datasets,
}: {
  datasets: Record<"sst" | "cfimdb", EfficiencyPoint[]>;
}) {
  const [dataset, setDataset] = useState<"sst" | "cfimdb">("sst");
  const points = datasets[dataset];
  const titleId = useId();
  const descId = useId();

  const accuracies = points.map((p) => p.accuracy);
  const yMin = Math.min(...accuracies) - 0.02;
  const yMax = Math.max(...accuracies) + 0.02;
  const yScale = (acc: number) => MARGIN.top + PLOT_H - ((acc - yMin) / (yMax - yMin)) * PLOT_H;

  const yTickCount = 5;
  const yTickValues = Array.from(
    { length: yTickCount },
    (_, i) => yMin + (i / (yTickCount - 1)) * (yMax - yMin),
  );

  const width = MARGIN.left + PLOT_W + MARGIN.right;
  const height = MARGIN.top + PLOT_H + MARGIN.bottom;

  return (
    <div>
      <div className="mb-6 flex gap-2" role="group" aria-label="Dataset">
        {(["sst", "cfimdb"] as const).map((d) => (
          <button
            key={d}
            type="button"
            aria-pressed={dataset === d}
            onClick={() => setDataset(d)}
            className={cn(
              "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
              dataset === d
                ? "border-accent/40 bg-accent/10 text-accent-strong"
                : "border-border text-muted hover:text-fg",
            )}
          >
            {d === "sst" ? "SST" : "CFIMDB"}
          </button>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        className="w-full max-w-2xl"
      >
        <title id={titleId}>
          {`Accuracy versus trainable parameters on ${dataset === "sst" ? "SST" : "CFIMDB"}`}
        </title>
        <desc id={descId}>
          {points
            .map(
              (p) =>
                `${METHOD_LABEL[p.method]}: ${p.trainablePct}% trainable parameters, ${p.accuracy.toFixed(3)} accuracy, ${p.peakMemoryMb.toFixed(0)} MB peak GPU memory.`,
            )
            .join(" ")}
        </desc>

        {yTickValues.map((v) => (
          <g key={v}>
            <line
              x1={MARGIN.left}
              x2={MARGIN.left + PLOT_W}
              y1={yScale(v)}
              y2={yScale(v)}
              stroke="var(--border)"
              strokeWidth="1"
            />
            <text
              x={MARGIN.left - 8}
              y={yScale(v)}
              dy="0.32em"
              textAnchor="end"
              fontSize="10"
              fill="var(--subtle)"
            >
              {v.toFixed(3)}
            </text>
          </g>
        ))}

        {X_TICKS.map((t) => (
          <g key={t}>
            <line
              x1={xScale(t)}
              x2={xScale(t)}
              y1={MARGIN.top}
              y2={MARGIN.top + PLOT_H}
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            <text
              x={xScale(t)}
              y={MARGIN.top + PLOT_H + 16}
              textAnchor="middle"
              fontSize="10"
              fill="var(--subtle)"
            >
              {t}%
            </text>
          </g>
        ))}
        <text
          x={MARGIN.left + PLOT_W / 2}
          y={height - 6}
          textAnchor="middle"
          fontSize="10"
          fill="var(--subtle)"
        >
          Trainable parameters (%, log scale)
        </text>

        {points.map((p) => {
          const cx = xScale(p.trainablePct);
          const cy = yScale(p.accuracy);
          const r = radiusScale(p.peakMemoryMb);
          return (
            <g key={p.method}>
              <circle cx={cx} cy={cy} r={r} fill={`var(--m-${p.method})`} opacity={0.25} />
              <circle cx={cx} cy={cy} r={4} fill={`var(--m-${p.method})`} />
              <text
                x={cx}
                y={cy - r - 6}
                textAnchor="middle"
                fontSize="11"
                fontWeight={600}
                fill="var(--fg)"
              >
                {METHOD_LABEL[p.method]}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-subtle">
        Point size represents peak GPU memory — larger points used more memory.
      </p>

      <div className="mt-8">
        <table className="hidden w-full border-collapse text-left text-sm sm:table">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="py-2.5 pr-4 font-semibold text-fg">
                Method
              </th>
              <th scope="col" className="py-2.5 pr-4 text-right font-semibold text-fg">
                Trainable parameters
              </th>
              <th scope="col" className="py-2.5 pr-4 text-right font-semibold text-fg">
                Peak GPU memory
              </th>
              <th scope="col" className="py-2.5 text-right font-semibold text-fg">
                Accuracy
              </th>
            </tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={p.method} className="border-b border-border last:border-0">
                <td className="py-2.5 pr-4 align-top font-medium text-fg">{METHOD_LABEL[p.method]}</td>
                <td className="py-2.5 pr-4 align-top text-right text-muted">{p.trainablePct}%</td>
                <td className="py-2.5 pr-4 align-top text-right text-muted">
                  {p.peakMemoryMb.toFixed(2)} MB
                </td>
                <td className="py-2.5 align-top text-right text-muted">{p.accuracy.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="space-y-3 sm:hidden">
          {points.map((p) => (
            <div key={p.method} className="rounded-lg border border-border bg-surface p-4">
              <dt className="text-sm font-semibold text-fg">{METHOD_LABEL[p.method]}</dt>
              <dd className="mt-2 grid grid-cols-1 gap-1 text-xs text-muted">
                <span>Trainable parameters: {p.trainablePct}%</span>
                <span>Peak GPU memory: {p.peakMemoryMb.toFixed(2)} MB</span>
                <span>Accuracy: {p.accuracy.toFixed(3)}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
