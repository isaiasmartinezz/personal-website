import type { SeedRow, SignificanceRow } from "@/data/gpt2-case-study";

export function SeedAnalysisTable({
  rows,
  significanceSst,
  significanceCfimdb,
  interpretation,
}: {
  rows: SeedRow[];
  significanceSst: SignificanceRow[];
  significanceCfimdb: SignificanceRow[];
  interpretation: string[];
}) {
  return (
    <div>
      <table className="hidden w-full border-collapse text-left text-sm sm:table">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="py-2.5 pr-4 font-semibold text-fg">
              Method
            </th>
            <th scope="col" className="py-2.5 pr-4 text-right font-semibold text-fg">
              SST mean ± std
            </th>
            <th scope="col" className="py-2.5 text-right font-semibold text-fg">
              CFIMDB mean ± std
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.method} className="border-b border-border last:border-0">
              <td className="py-2.5 pr-4 align-top font-medium text-fg">{r.method}</td>
              <td className="py-2.5 pr-4 align-top text-right font-mono text-xs text-muted">{r.sst}</td>
              <td className="py-2.5 align-top text-right font-mono text-xs text-muted">{r.cfimdb}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="space-y-3 sm:hidden">
        {rows.map((r) => (
          <div key={r.method} className="rounded-lg border border-border bg-surface p-4">
            <dt className="text-sm font-semibold text-fg">{r.method}</dt>
            <dd className="mt-1.5 flex flex-col gap-1 font-mono text-xs text-muted">
              <span>SST: {r.sst}</span>
              <span>CFIMDB: {r.cfimdb}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-subtle">
            SST significance (vs. full fine-tuning)
          </h3>
          <ul className="mt-3 space-y-2">
            {significanceSst.map((s) => (
              <li key={s.compare} className="flex items-baseline justify-between gap-4 text-sm">
                <span className="text-muted">{s.compare}</span>
                <span className="shrink-0 font-mono text-xs text-fg">p = {s.p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-subtle">
            CFIMDB significance (vs. full fine-tuning)
          </h3>
          <ul className="mt-3 space-y-2">
            {significanceCfimdb.map((s) => (
              <li key={s.compare} className="flex items-baseline justify-between gap-4 text-sm">
                <span className="text-muted">{s.compare}</span>
                <span className="shrink-0 font-mono text-xs text-fg">p = {s.p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="mt-8 max-w-2xl space-y-2.5">
        {interpretation.map((it, i) => (
          <li
            key={i}
            className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-accent/60"
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
