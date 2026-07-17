import type { ParaphraseRow } from "@/data/gpt2-case-study";

export function ParaphraseComparison({
  rows,
  warning,
  explanation,
}: {
  rows: ParaphraseRow[];
  warning: string;
  explanation: string[];
}) {
  return (
    <div>
      <p className="rounded-lg border border-[color-mix(in_oklab,var(--m-decode)_30%,transparent)] bg-[color-mix(in_oklab,var(--m-decode)_8%,transparent)] px-4 py-3 text-sm font-medium text-fg">
        {warning}
      </p>

      <div className="mt-6">
        <table className="hidden w-full border-collapse text-left text-sm sm:table">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="py-2.5 pr-4 font-semibold text-fg">
                Method
              </th>
              <th scope="col" className="py-2.5 pr-4 font-semibold text-fg">
                Training setting
              </th>
              <th scope="col" className="py-2.5 pr-4 text-right font-semibold text-fg">
                Dev accuracy
              </th>
              <th scope="col" className="py-2.5 text-right font-semibold text-fg">
                Test accuracy
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.method} className="border-b border-border last:border-0">
                <td className="py-2.5 pr-4 align-top font-medium text-fg">{r.method}</td>
                <td className="py-2.5 pr-4 align-top text-muted">{r.setting}</td>
                <td className="py-2.5 pr-4 align-top text-right text-muted">{r.dev.toFixed(3)}</td>
                <td className="py-2.5 align-top text-right text-muted">
                  {r.test !== null ? r.test.toFixed(3) : "Not reported"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="space-y-3 sm:hidden">
          {rows.map((r) => (
            <div key={r.method} className="rounded-lg border border-border bg-surface p-4">
              <dt className="text-sm font-semibold text-fg">{r.method}</dt>
              <dd className="mt-1.5 text-xs text-subtle">{r.setting}</dd>
              <dd className="mt-2 flex gap-6 text-xs text-muted">
                <span>Dev: {r.dev.toFixed(3)}</span>
                <span>Test: {r.test !== null ? r.test.toFixed(3) : "Not reported"}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

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
    </div>
  );
}
