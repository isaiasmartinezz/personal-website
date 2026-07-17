import type { ContributionGroup as CoQuestGroup } from "@/data/coquest-case-study";
import type { ContributionGroup as GPT2Group } from "@/data/gpt2-case-study";
import type { ContributionGroup as BiosurvGroup } from "@/data/biosurveillance-case-study";
import { cn } from "@/lib/utils";

type Group = CoQuestGroup | GPT2Group | BiosurvGroup;

// Grouped (not flat) contribution list — these were team projects, so
// statements are phrased as "contributed to" / "helped," never sole
// ownership. `borderClassName`/`textClassName` let each case study use its
// own accent color instead of hardcoding one project's tokens.
export function ContributionSection({
  groups,
  borderClassName = "border-accent/30",
  textClassName = "text-accent",
}: {
  groups: Group[];
  borderClassName?: string;
  textClassName?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      {groups.map((g) => (
        <div key={g.category} className={cn("border-l-2 pl-4", borderClassName)}>
          <h3 className={cn("text-xs font-semibold uppercase tracking-wide", textClassName)}>
            {g.category}
          </h3>
          <ul className="mt-2.5 space-y-2">
            {g.items.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
