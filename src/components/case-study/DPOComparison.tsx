import type { DpoRow } from "@/data/gpt2-case-study";

export function DPOComparison({
  rows,
  explanation,
  lesson,
}: {
  rows: DpoRow[];
  explanation: string[];
  lesson: string;
}) {
  return (
    <div>
      <table className="hidden w-full border-collapse text-left text-sm sm:table">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="py-2.5 pr-4 font-semibold text-fg">
              Negative-construction strategy
            </th>
            <th scope="col" className="py-2.5 text-right font-semibold text-fg">
              Development chrF
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.strategy} className="border-b border-border last:border-0">
              <td className="py-2.5 pr-4 align-top text-muted">{r.strategy}</td>
              <td className="py-2.5 align-top text-right text-muted">{r.chrf.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="space-y-3 sm:hidden">
        {rows.map((r) => (
          <div key={r.strategy} className="rounded-lg border border-border bg-surface p-4">
            <dt className="text-sm font-semibold text-fg">{r.strategy}</dt>
            <dd className="mt-1.5 text-sm text-muted">chrF: {r.chrf.toFixed(2)}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-6 max-w-2xl space-y-2.5">
        {explanation.map((e, i) => (
          <li
            key={i}
            className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-accent/60"
          >
            {e}
          </li>
        ))}
      </ul>

      <p className="mt-6 max-w-2xl rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm font-medium italic text-fg">
        {lesson}
      </p>
    </div>
  );
}
