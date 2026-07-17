import type { TaskCard, DatasetRow } from "@/data/gpt2-case-study";

export function TaskDatasetMatrix({
  tasks,
  dataset,
}: {
  tasks: TaskCard[];
  dataset: DatasetRow[];
}) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {tasks.map((t) => (
          <div key={t.title} className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-base font-semibold text-fg">{t.title}</h3>

            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-subtle">
              Dataset{t.datasets.length > 1 ? "s" : ""}
            </p>
            <p className="mt-1 text-sm text-muted">{t.datasets.join(", ")}</p>

            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-subtle">Objective</p>
            <ul className="mt-1 space-y-1">
              {t.objective.map((o) => (
                <li key={o} className="text-sm text-muted">
                  {o}
                </li>
              ))}
            </ul>

            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-subtle">Compared</p>
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {t.compared.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-border bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted"
                >
                  {c}
                </li>
              ))}
            </ul>

            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-subtle">Metric</p>
            <p className="mt-1 text-sm text-muted">{t.metric}</p>

            {t.note && (
              <p className="mt-3 rounded-lg border border-accent/25 bg-accent/5 px-3 py-2 text-xs leading-relaxed text-muted">
                {t.note}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <table className="hidden w-full border-collapse text-left text-sm sm:table">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="py-2.5 pr-4 font-semibold text-fg">
                Dataset
              </th>
              <th scope="col" className="py-2.5 pr-4 font-semibold text-fg">
                Task
              </th>
              <th scope="col" className="py-2.5 pr-4 text-right font-semibold text-fg">
                Train
              </th>
              <th scope="col" className="py-2.5 pr-4 text-right font-semibold text-fg">
                Dev
              </th>
              <th scope="col" className="py-2.5 text-right font-semibold text-fg">
                Test
              </th>
            </tr>
          </thead>
          <tbody>
            {dataset.map((row) => (
              <tr key={row.dataset} className="border-b border-border last:border-0">
                <td className="py-2.5 pr-4 align-top font-medium text-fg">{row.dataset}</td>
                <td className="py-2.5 pr-4 align-top text-muted">{row.task}</td>
                <td className="py-2.5 pr-4 align-top text-right text-muted">{row.train}</td>
                <td className="py-2.5 pr-4 align-top text-right text-muted">{row.dev}</td>
                <td className="py-2.5 align-top text-right text-muted">{row.test}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="space-y-3 sm:hidden">
          {dataset.map((row) => (
            <div key={row.dataset} className="rounded-lg border border-border bg-surface p-4">
              <dt className="text-sm font-semibold text-fg">
                {row.dataset} <span className="font-normal text-subtle">— {row.task}</span>
              </dt>
              <dd className="mt-2 grid grid-cols-3 gap-2 text-xs text-muted">
                <span>Train: {row.train}</span>
                <span>Dev: {row.dev}</span>
                <span>Test: {row.test}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
