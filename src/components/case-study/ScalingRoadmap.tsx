import type { RoadmapPhase } from "@/data/biosurveillance-case-study";

export function ScalingRoadmap({ phases }: { phases: RoadmapPhase[] }) {
  return (
    <ol className="relative space-y-8 border-l border-border pl-6 sm:pl-8">
      {phases.map((p) => (
        <li key={p.phase} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[31px] top-1 flex size-4 items-center justify-center rounded-full border-2 border-accent bg-page sm:-left-[39px]"
          />
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">{p.phase}</p>
          <h3 className="mt-1 font-serif text-xl font-semibold text-fg">{p.title}</h3>
          <div className="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Scope</p>
              <ul className="mt-1.5 space-y-1">
                {p.scope.map((s) => (
                  <li key={s} className="text-sm leading-relaxed text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Goals</p>
              <ul className="mt-1.5 space-y-1">
                {p.goals.map((g) => (
                  <li key={g} className="text-sm leading-relaxed text-muted">
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
