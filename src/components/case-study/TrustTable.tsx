import type { TrustRow } from "@/data/coquest-case-study";

export function TrustTable({ rows }: { rows: TrustRow[] }) {
  return (
    <div>
      <table className="hidden w-full border-collapse text-left text-sm sm:table">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="w-2/5 py-3 pr-6 font-semibold text-fg">
              Design concern
            </th>
            <th scope="col" className="py-3 font-semibold text-fg">
              Product response
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.concern} className="border-b border-border last:border-0">
              <td className="py-3.5 pr-6 align-top text-muted">{r.concern}</td>
              <td className="py-3.5 align-top text-muted">{r.response}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="space-y-3 sm:hidden">
        {rows.map((r) => (
          <div key={r.concern} className="rounded-lg border border-border bg-surface p-4">
            <dt className="text-sm font-semibold text-fg">{r.concern}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted">{r.response}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
