import type { PilotDay, PilotMetricRow } from "@/data/coquest-case-study";

export function PilotTimeline({
  days,
  metricsTable,
  note,
}: {
  days: PilotDay[];
  metricsTable: PilotMetricRow[];
  note: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
      <ol className="relative space-y-8 border-l border-border pl-6">
        {days.map((d) => (
          <li key={d.day} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[29px] top-1 size-3.5 rounded-full border-2 border-[color:var(--quest)] bg-page"
            />
            <h3 className="font-serif text-lg font-semibold text-fg">{d.day}</h3>
            <div className="mt-1.5 space-y-1.5">
              {d.body.map((line) => (
                <p key={line} className="text-sm leading-relaxed text-muted">
                  {line}
                </p>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div>
        <table className="hidden w-full border-collapse text-left text-sm sm:table">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="py-2.5 pr-4 font-semibold text-fg">
                Pilot measure
              </th>
              <th scope="col" className="py-2.5 text-right font-semibold text-fg">
                Observation
              </th>
            </tr>
          </thead>
          <tbody>
            {metricsTable.map((row) => (
              <tr key={row.measure} className="border-b border-border last:border-0">
                <td className="py-2.5 pr-4 align-top text-muted">{row.measure}</td>
                <td className="py-2.5 align-top text-right text-muted">{row.observation}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="space-y-3 sm:hidden">
          {metricsTable.map((row) => (
            <div key={row.measure} className="rounded-lg border border-border bg-surface p-4">
              <dt className="text-sm font-semibold text-fg">{row.measure}</dt>
              <dd className="mt-1 text-sm text-muted">{row.observation}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-xs italic text-subtle">{note}</p>
      </div>
    </div>
  );
}
