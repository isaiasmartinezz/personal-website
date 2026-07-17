import type { ConstraintRow } from "@/data/epvo-case-study";

// A real <table> on wider screens; the same data as stacked definition-list
// cards below sm, rather than forcing horizontal scroll on a two-column table.
export function ConstraintTable({ rows }: { rows: ConstraintRow[] }) {
  return (
    <div>
      <table className="hidden w-full border-collapse text-left text-sm sm:table">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="w-2/5 py-3 pr-6 font-semibold text-fg">
              Constraint
            </th>
            <th scope="col" className="py-3 font-semibold text-fg">
              Engineering implication
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.constraint} className="border-b border-border last:border-0">
              <td className="py-3.5 pr-6 align-top text-muted">{r.constraint}</td>
              <td className="py-3.5 align-top text-muted">{r.implication}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="space-y-3 sm:hidden">
        {rows.map((r) => (
          <div key={r.constraint} className="rounded-lg border border-border bg-surface p-4">
            <dt className="text-sm font-semibold text-fg">{r.constraint}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted">{r.implication}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
