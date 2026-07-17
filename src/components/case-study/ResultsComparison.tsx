import type { ResultsGroup } from "@/data/epvo-case-study";

// Lightweight, dependency-free grouped bar chart (the repo has no charting
// package, so this is hand-built SVG rather than a new dependency) plus a
// full semantic table with the same numbers underneath — the chart is a
// visual aid, the table is the accessible source of truth.
export function ResultsComparison({
  hemoglobin,
  fibrinogen,
}: {
  hemoglobin: ResultsGroup;
  fibrinogen: ResultsGroup;
}) {
  const maxVal = Math.max(
    ...hemoglobin.rows.map((r) => r.meanVpp + r.sd),
    ...fibrinogen.rows.map((r) => r.meanVpp + r.sd),
  );
  const yMax = Math.ceil(maxVal);

  const W = 640;
  const H = 260;
  const padding = { top: 12, right: 12, bottom: 32, left: 40 };
  const chartW = W - padding.left - padding.right;
  const chartH = H - padding.top - padding.bottom;
  const groupWidth = chartW / hemoglobin.rows.length;
  const barWidth = groupWidth * 0.26;
  const gap = groupWidth * 0.11;

  const yScale = (v: number) => chartH - (v / yMax) * chartH;

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-labelledby="results-chart-title results-chart-desc"
        className="w-full max-w-2xl"
      >
        <title id="results-chart-title">
          Mean peak-to-peak voltage by concentration and sample type
        </title>
        <desc id="results-chart-desc">
          Grouped bar chart comparing mean peak-to-peak voltage in millivolts for
          hemoglobin-only and fibrinogen-plus-hemoglobin samples at 25, 75, and 150
          milligrams per milliliter. Hemoglobin-only samples show distinguishable
          amplitude differences, largest at 150 milligrams per milliliter. Fibrinogen
          samples show nearly flat responses across concentrations. Exact values are
          listed in the table below the chart.
        </desc>
        <g transform={`translate(${padding.left},${padding.top})`}>
          {[0, 0.25, 0.5, 0.75, 1].map((f) => (
            <line
              key={f}
              x1={0}
              x2={chartW}
              y1={chartH * (1 - f)}
              y2={chartH * (1 - f)}
              stroke="var(--border)"
              strokeWidth={1}
            />
          ))}

          {hemoglobin.rows.map((row, i) => {
            const fibRow = fibrinogen.rows[i];
            const groupX = i * groupWidth;
            const hbX = groupX + gap;
            const fibX = hbX + barWidth + gap * 0.6;

            return (
              <g key={row.concentration}>
                <rect
                  x={hbX}
                  y={yScale(row.meanVpp)}
                  width={barWidth}
                  height={chartH - yScale(row.meanVpp)}
                  fill="var(--accent)"
                  rx={2}
                />
                <line
                  x1={hbX + barWidth / 2}
                  x2={hbX + barWidth / 2}
                  y1={yScale(row.meanVpp + row.sd)}
                  y2={yScale(Math.max(row.meanVpp - row.sd, 0))}
                  stroke="var(--fg)"
                  strokeWidth={1}
                />

                <rect
                  x={fibX}
                  y={yScale(fibRow.meanVpp)}
                  width={barWidth}
                  height={chartH - yScale(fibRow.meanVpp)}
                  fill="var(--subtle)"
                  opacity={0.55}
                  rx={2}
                />
                <line
                  x1={fibX + barWidth / 2}
                  x2={fibX + barWidth / 2}
                  y1={yScale(fibRow.meanVpp + fibRow.sd)}
                  y2={yScale(Math.max(fibRow.meanVpp - fibRow.sd, 0))}
                  stroke="var(--fg)"
                  strokeWidth={1}
                  opacity={0.55}
                />

                <text
                  x={groupX + groupWidth / 2}
                  y={chartH + 22}
                  textAnchor="middle"
                  fontSize={11}
                  fill="var(--muted)"
                >
                  {row.concentration}
                </text>
              </g>
            );
          })}

          {[0, yMax / 2, yMax].map((v) => (
            <text
              key={v}
              x={-8}
              y={yScale(v) + 4}
              textAnchor="end"
              fontSize={10}
              fill="var(--subtle)"
            >
              {v.toFixed(1)}
            </text>
          ))}
        </g>
      </svg>

      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted">
        <li className="flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block size-2.5 rounded-sm bg-accent" />
          Hemoglobin only
        </li>
        <li className="flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block size-2.5 rounded-sm bg-subtle opacity-55" />
          Fibrinogen + hemoglobin
        </li>
        <li>Error bars show ± 1 SD</li>
      </ul>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="py-2 pr-4 font-semibold text-fg">
                Concentration
              </th>
              <th scope="col" className="py-2 pr-4 font-semibold text-fg">
                {hemoglobin.label} (mean Vpp)
              </th>
              <th scope="col" className="py-2 font-semibold text-fg">
                {fibrinogen.label} (mean Vpp)
              </th>
            </tr>
          </thead>
          <tbody>
            {hemoglobin.rows.map((row, i) => (
              <tr key={row.concentration} className="border-b border-border last:border-0">
                <td className="py-2 pr-4 text-muted">{row.concentration}</td>
                <td className="py-2 pr-4 text-muted">
                  {row.meanVpp.toFixed(3)} ± {row.sd.toFixed(3)} mV
                </td>
                <td className="py-2 text-muted">
                  {fibrinogen.rows[i].meanVpp.toFixed(3)} ± {fibrinogen.rows[i].sd.toFixed(3)} mV
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-subtle">
        Hemoglobin only: one-way ANOVA F = {hemoglobin.anovaF}, p {hemoglobin.pValue}. Fibrinogen +
        hemoglobin: one-way ANOVA F = {fibrinogen.anovaF}, p = {fibrinogen.pValue}.
      </p>
    </div>
  );
}
