import type { PrincipleGroup } from "@/data/coquest-case-study";

export function BehaviorPrinciples({
  principles,
  comparison,
}: {
  principles: PrincipleGroup[];
  comparison: {
    before: { value: string; points: string[] };
    after: { value: string; points: string[] };
    note: string;
  };
}) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {principles.map((p, i) => (
          <div key={p.title} className="rounded-xl border border-border bg-surface p-6">
            <span className="font-serif text-2xl font-semibold text-[color:var(--quest)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-fg">{p.title}</h3>
            <ul className="mt-4 space-y-2">
              {p.decisions.map((d) => (
                <li
                  key={d}
                  className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-[color:var(--quest-dot)]"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 rounded-xl border border-border bg-surface p-6 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-subtle">
            Before iteration
          </p>
          <p className="mt-2 font-serif text-3xl font-semibold text-fg">
            {comparison.before.value}
          </p>
          <ul className="mt-3 space-y-1">
            {comparison.before.points.map((pt) => (
              <li key={pt} className="text-sm text-muted">
                {pt}
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:border-l sm:border-border sm:pl-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--quest)]">
            After iteration
          </p>
          <p className="mt-2 font-serif text-3xl font-semibold text-fg">
            {comparison.after.value}
          </p>
          <ul className="mt-3 space-y-1">
            {comparison.after.points.map((pt) => (
              <li key={pt} className="text-sm text-muted">
                {pt}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-4 text-xs italic text-subtle">{comparison.note}</p>
    </div>
  );
}
