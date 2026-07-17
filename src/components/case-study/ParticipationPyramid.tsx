import type { PyramidLevel } from "@/data/coquest-case-study";

// Width decreases top -> bottom to read as a literal pyramid: a narrow tip of
// initiators, widening out to the base of browsers. Width encodes population
// size only — the text explicitly says so, and the closing insight makes
// sure "widest" doesn't read as "least valuable."
const WIDTHS = ["sm:w-1/3", "sm:w-2/3", "sm:w-full"];

export function ParticipationPyramid({
  levels,
  insight,
  secondaryInsight,
}: {
  levels: PyramidLevel[];
  insight: string;
  secondaryInsight: string;
}) {
  return (
    <div>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3">
        {levels.map((level, i) => (
          <div
            key={level.title}
            className={`w-full rounded-xl border border-[color:var(--quest-border)] bg-[color:var(--quest-soft)] p-5 text-center ${WIDTHS[i] ?? ""}`}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-fg">
              {level.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{level.description}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-3 max-w-2xl text-center text-xs text-subtle">
        Block width reflects roughly how many participants fell into each role, not their value
        to the pilot.
      </p>

      <div className="mx-auto mt-8 max-w-2xl space-y-3 border-t border-border pt-6">
        <p className="text-sm font-medium leading-relaxed text-fg">{insight}</p>
        <p className="text-sm leading-relaxed text-muted">{secondaryInsight}</p>
      </div>
    </div>
  );
}
