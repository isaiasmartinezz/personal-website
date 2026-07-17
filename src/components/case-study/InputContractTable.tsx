import type { DataContractRow } from "@/data/biosurveillance-case-study";

export function InputContractTable({
  rows,
  notes,
  callout,
}: {
  rows: DataContractRow[];
  notes: string[];
  callout: string;
}) {
  return (
    <div>
      <table className="hidden w-full border-collapse text-left text-sm sm:table">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="py-2.5 pr-4 font-semibold text-fg">
              Input
            </th>
            <th scope="col" className="py-2.5 pr-4 font-semibold text-fg">
              Required content
            </th>
            <th scope="col" className="py-2.5 font-semibold text-fg">
              Example value
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.input} className="border-b border-border last:border-0">
              <td className="py-2.5 pr-4 align-top font-medium text-fg">{r.input}</td>
              <td className="py-2.5 pr-4 align-top text-muted">{r.content}</td>
              <td className="py-2.5 align-top text-muted">{r.example}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="space-y-3 sm:hidden">
        {rows.map((r) => (
          <div key={r.input} className="rounded-lg border border-border bg-surface p-4">
            <dt className="text-sm font-semibold text-fg">{r.input}</dt>
            <dd className="mt-1.5 text-sm text-muted">{r.content}</dd>
            <dd className="mt-1 text-xs text-subtle">{r.example}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-5 flex flex-wrap gap-2">
        {notes.map((n) => (
          <li key={n} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
            {n}
          </li>
        ))}
      </ul>

      <p className="mt-5 max-w-2xl text-sm italic leading-relaxed text-subtle">{callout}</p>
    </div>
  );
}
