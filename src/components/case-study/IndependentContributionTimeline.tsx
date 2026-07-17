import type { ContributionArea, EffortPhase } from "@/data/fontan-case-study";

export function IndependentContributionTimeline({
  areas,
  statement,
  phases,
}: {
  areas: ContributionArea[];
  statement: string;
  phases: EffortPhase[];
}) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {areas.map((a) => (
          <div key={a.category} className="border-l-2 border-accent/30 pl-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">{a.category}</h3>
            <ul className="mt-2.5 space-y-2">
              {a.items.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-2xl rounded-xl border border-border bg-surface p-6 font-serif text-lg italic leading-snug text-fg">
        {statement}
      </p>

      <div className="mt-14">
        <h3 className="text-2xl font-semibold text-fg">Research timeline</h3>
        <ol className="relative mt-8 space-y-8 border-l border-border pl-6 sm:pl-8">
          {phases.map((p) => (
            <li key={p.phase} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-1 flex size-4 items-center justify-center rounded-full border-2 border-accent bg-page sm:-left-[39px]"
              />
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">{p.phase}</p>
              <h4 className="mt-1 text-base font-semibold text-fg">{p.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
