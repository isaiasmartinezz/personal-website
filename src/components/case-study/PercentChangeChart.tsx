import type { PercentChangePoint, PatientKey } from "@/data/fontan-case-study";

const PATIENT_LABEL: Record<PatientKey, string> = { p18: "Patient 18", p21: "Patient 21", p23: "Patient 23" };
const METRIC_META = [
  { key: "pressure" as const, label: "Pressure drop", varName: "--fontan-pressure" },
  { key: "resistance" as const, label: "Resistance", varName: "--fontan-resistance" },
  { key: "power" as const, label: "Power loss", varName: "--fontan-power" },
];

const DOMAIN_MIN = -105;
const DOMAIN_MAX = 55;
const MARGIN = { top: 10, right: 50, bottom: 30, left: 130 };
const PLOT_W = 420;
const ROW_H = 84;

function xFor(v: number) {
  return MARGIN.left + ((v - DOMAIN_MIN) / (DOMAIN_MAX - DOMAIN_MIN)) * PLOT_W;
}

export function PercentChangeChart({ data }: { data: PercentChangePoint[] }) {
  const height = MARGIN.top + data.length * ROW_H + MARGIN.bottom;
  const width = MARGIN.left + PLOT_W + MARGIN.right;
  const zeroX = xFor(0);

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="pct-change-title pct-change-desc" className="w-full">
        <title id="pct-change-title">Percent change in pressure drop, resistance, and power loss after virtual stenting</title>
        <desc id="pct-change-desc">
          {data
            .map(
              (d) =>
                `${PATIENT_LABEL[d.patient]} ${d.physiologic}: pressure drop ${d.pressure}%, resistance ${d.resistance}%, power loss ${d.power}%.`,
            )
            .join(" ")}
        </desc>

        <line x1={zeroX} x2={zeroX} y1={MARGIN.top} y2={height - MARGIN.bottom} stroke="var(--fg)" strokeWidth="1" />
        <text x={zeroX} y={height - MARGIN.bottom + 16} textAnchor="middle" fontSize="9" fill="var(--subtle)">
          0%
        </text>

        {data.map((d, rowIndex) => {
          const rowY = MARGIN.top + rowIndex * ROW_H;
          const values = [d.pressure, d.resistance, d.power];
          return (
            <g key={`${d.patient}-${d.physiologic}`}>
              <text x={MARGIN.left - 10} y={rowY + ROW_H / 2} textAnchor="end" dy="0.32em" fontSize="11" fontWeight={600} fill="var(--fg)">
                {PATIENT_LABEL[d.patient]}
              </text>
              <text x={MARGIN.left - 10} y={rowY + ROW_H / 2 + 13} textAnchor="end" fontSize="9" fill="var(--subtle)">
                {d.physiologic === "rest" ? "Rest" : "Exercise"}
              </text>

              {values.map((v, i) => {
                const barY = rowY + 8 + i * 20;
                const x0 = Math.min(xFor(0), xFor(v));
                const barW = Math.abs(xFor(v) - xFor(0));
                return (
                  <g key={METRIC_META[i].key}>
                    <rect x={x0} y={barY} width={barW} height={14} fill={`var(${METRIC_META[i].varName})`} rx="2" />
                    <text
                      x={v >= 0 ? xFor(v) + 4 : xFor(v) - 4}
                      y={barY + 10.5}
                      textAnchor={v >= 0 ? "start" : "end"}
                      fontSize="9"
                      fill="var(--fg)"
                    >
                      {v >= 0 ? "+" : ""}
                      {v.toFixed(1)}%
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>

      <ul className="mt-4 flex flex-wrap gap-4">
        {METRIC_META.map((m) => (
          <li key={m.key} className="flex items-center gap-2 text-xs text-subtle">
            <span
              aria-hidden="true"
              className="inline-block size-2.5 rounded-full"
              style={{ backgroundColor: `var(${m.varName})` }}
            />
            {m.label}
          </li>
        ))}
      </ul>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="py-2 pr-4 font-semibold text-fg">
                Patient
              </th>
              <th scope="col" className="py-2 pr-4 font-semibold text-fg">
                State
              </th>
              <th scope="col" className="py-2 pr-4 text-right font-semibold text-fg">
                Pressure drop
              </th>
              <th scope="col" className="py-2 pr-4 text-right font-semibold text-fg">
                Resistance
              </th>
              <th scope="col" className="py-2 text-right font-semibold text-fg">
                Power loss
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={`${d.patient}-${d.physiologic}-row`} className="border-b border-border last:border-0">
                <td className="py-2 pr-4 text-muted">{PATIENT_LABEL[d.patient]}</td>
                <td className="py-2 pr-4 text-muted">{d.physiologic === "rest" ? "Rest" : "Exercise"}</td>
                <td className="py-2 pr-4 text-right text-fg">{d.pressure.toFixed(1)}%</td>
                <td className="py-2 pr-4 text-right text-fg">{d.resistance.toFixed(1)}%</td>
                <td className="py-2 text-right text-fg">
                  {d.power >= 0 ? "+" : ""}
                  {d.power.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
