import type { Milestone } from "@/data/epvo-case-study";
import { benchtopMatrix } from "@/data/epvo-case-study";

const statusStyles: Record<Milestone["status"], string> = {
  Computational: "border-accent/30 bg-accent/10 text-accent-strong",
  Anatomical: "border-accent/30 bg-accent/10 text-accent-strong",
  Benchtop: "border-accent/30 bg-accent/10 text-accent-strong",
  Experimental: "border-accent/30 bg-accent/10 text-accent-strong",
};

function BenchtopMatrixGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-subtle">
          Laser settings
        </h4>
        <p className="mt-1.5 text-sm text-muted">{benchtopMatrix.laserSettings.join(" · ")}</p>
      </div>
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-subtle">
          Source-to-target distances
        </h4>
        <p className="mt-1.5 text-sm text-muted">{benchtopMatrix.distances.join(" · ")}</p>
      </div>
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-subtle">
          Environmental &amp; medium variables
        </h4>
        <ul className="mt-1.5 space-y-1 text-sm text-muted">
          {benchtopMatrix.mediums.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-subtle">Metrics</h4>
        <ul className="mt-1.5 space-y-1 text-sm text-muted">
          {benchtopMatrix.metrics.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MilestoneEntry({ milestone }: { milestone: Milestone }) {
  const hasTechnicalDetail = Boolean(
    milestone.notes?.length || milestone.targets?.length || milestone.table || milestone.number === 3,
  );

  return (
    <div id={milestone.id} className="scroll-mt-32">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-accent/40 font-serif text-sm font-semibold text-accent">
          {milestone.number}
        </span>
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[milestone.status]}`}
        >
          {milestone.status}
        </span>
        <span className="text-sm text-subtle">{milestone.date}</span>
      </div>

      <p className="mt-4 max-w-2xl font-serif text-xl italic leading-snug text-fg">
        “{milestone.question}”
      </p>

      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-subtle">
            What we did
          </h4>
          <ul className="mt-2 space-y-1.5">
            {milestone.whatWeDid.map((item, i) => (
              <li
                key={i}
                className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-accent/60"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-subtle">Outcome</h4>
          <ul className="mt-2 space-y-1.5">
            {milestone.outcome.map((item, i) => (
              <li
                key={i}
                className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-accent/60"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {hasTechnicalDetail && (
        <details className="group mt-5 rounded-lg border border-border bg-surface open:pb-5">
          <summary className="cursor-pointer select-none list-none px-4 py-3 text-sm font-medium text-accent [&::-webkit-details-marker]:hidden">
            <span className="inline-flex items-center gap-1.5">
              Technical details
              <span aria-hidden="true" className="transition-transform group-open:rotate-180">
                ▾
              </span>
            </span>
          </summary>

          <div className="space-y-5 px-4">
            {milestone.notes && milestone.notes.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-subtle">
                  Modeling assumptions
                </h4>
                <ul className="mt-2 space-y-1.5">
                  {milestone.notes.map((note, i) => (
                    <li key={i} className="text-sm leading-relaxed text-muted">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {milestone.number === 3 && <BenchtopMatrixGrid />}

            {milestone.table && (
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[420px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        {milestone.table.headers.map((h) => (
                          <th key={h} scope="col" className="py-2 pr-4 font-semibold text-fg">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {milestone.table.rows.map((row, i) => (
                        <tr key={i} className="border-b border-border last:border-0">
                          {row.map((cell, j) => (
                            <td key={j} className="py-2 pr-4 text-muted">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {milestone.tableEmphasis && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {milestone.tableEmphasis}
                  </p>
                )}
              </div>
            )}

            {milestone.targets && milestone.targets.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-subtle">
                  Project success targets
                </h4>
                <ul className="mt-2 space-y-1.5">
                  {milestone.targets.map((t, i) => (
                    <li key={i} className="text-sm leading-relaxed text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs italic text-subtle">
                  Criteria the team set for itself — not achieved clinical findings.
                </p>
              </div>
            )}
          </div>
        </details>
      )}
    </div>
  );
}
