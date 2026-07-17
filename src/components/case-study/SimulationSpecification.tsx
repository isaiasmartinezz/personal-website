import type { SimSpecRow } from "@/data/fontan-case-study";

export function SimulationSpecification({
  rows,
  technicalDetails,
}: {
  rows: SimSpecRow[];
  technicalDetails: { title: string; body: string }[];
}) {
  return (
    <div>
      <table className="hidden w-full border-collapse text-left text-sm sm:table">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="w-2/5 py-2.5 pr-4 font-semibold text-fg">
              Parameter
            </th>
            <th scope="col" className="py-2.5 font-semibold text-fg">
              Study configuration
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.parameter} className="border-b border-border last:border-0">
              <td className="py-2.5 pr-4 align-top text-muted">{r.parameter}</td>
              <td className="py-2.5 align-top text-fg">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="space-y-3 sm:hidden">
        {rows.map((r) => (
          <div key={r.parameter} className="rounded-lg border border-border bg-surface p-4">
            <dt className="text-sm font-semibold text-fg">{r.parameter}</dt>
            <dd className="mt-1.5 text-sm text-muted">{r.value}</dd>
          </div>
        ))}
      </dl>

      <details className="group mt-6 rounded-lg border border-border bg-surface open:pb-5">
        <summary className="cursor-pointer select-none list-none px-4 py-3 text-sm font-medium text-accent [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-1.5">
            Numerical solver details
            <span aria-hidden="true" className="transition-transform group-open:rotate-180">
              ▾
            </span>
          </span>
        </summary>
        <div className="space-y-4 px-4">
          {technicalDetails.map((t) => (
            <div key={t.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-subtle">{t.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted">{t.body}</p>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
