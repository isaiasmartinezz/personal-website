import type { SkillGroup } from "@/lib/types";

// A quick "at a glance" bar chart of how many tools/concepts fall in each
// category — real counts from the data, not a fabricated proficiency score.
// The detailed chip lists below remain the accessible, authoritative content;
// this is a decorative summary.
export function SkillsOverview({ groups }: { groups: SkillGroup[] }) {
  const maxCount = Math.max(...groups.map((g) => g.skills.length));

  return (
    <div aria-hidden="true" className="rounded-xl border border-border bg-surface p-6">
      <div className="space-y-3">
        {groups.map((g) => (
          <div key={g.name} className="flex items-center gap-3">
            <div className="w-40 shrink-0 truncate text-sm font-medium text-fg sm:w-48">
              {g.name}
            </div>
            <div className="relative h-5 flex-1 rounded bg-surface-2">
              <div
                className="absolute inset-y-0 left-0 rounded bg-accent/70"
                style={{ width: `${(g.skills.length / maxCount) * 100}%` }}
              />
            </div>
            <div className="w-6 shrink-0 text-right text-sm tabular-nums text-subtle">
              {g.skills.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
