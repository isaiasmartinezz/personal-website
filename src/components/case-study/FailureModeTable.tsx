import type { FailureRow } from "@/data/biosurveillance-case-study";

export function FailureModeTable({ rows, principle }: { rows: FailureRow[]; principle: string }) {
  return (
    <div>
      <table className="hidden w-full border-collapse text-left text-sm sm:table">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="w-1/5 py-2.5 pr-4 font-semibold text-fg">
              Failure mode
            </th>
            <th scope="col" className="w-2/5 py-2.5 pr-4 font-semibold text-fg">
              Risk
            </th>
            <th scope="col" className="py-2.5 font-semibold text-fg">
              Potential mitigation
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.mode} className="border-b border-border last:border-0">
              <td className="py-3 pr-4 align-top font-medium text-fg">{r.mode}</td>
              <td className="py-3 pr-4 align-top text-muted">{r.risk}</td>
              <td className="py-3 align-top text-muted">{r.mitigation}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="space-y-3 sm:hidden">
        {rows.map((r) => (
          <div key={r.mode} className="rounded-lg border border-border bg-surface p-4">
            <dt className="text-sm font-semibold text-fg">{r.mode}</dt>
            <dd className="mt-1.5 text-sm text-muted">{r.risk}</dd>
            <dd className="mt-1.5 text-xs text-subtle">{r.mitigation}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 max-w-2xl rounded-lg border border-[color-mix(in_oklab,var(--alert-high)_30%,transparent)] bg-[color-mix(in_oklab,var(--alert-high)_6%,transparent)] px-4 py-3 text-sm font-medium text-fg">
        {principle}
      </p>
    </div>
  );
}
