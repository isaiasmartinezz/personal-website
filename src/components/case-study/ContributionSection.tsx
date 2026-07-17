import type { ContributionGroup } from "@/data/coquest-case-study";

// Grouped (not flat) contribution list — this was a four-person team project,
// so statements are phrased as "contributed to" / "helped," never sole
// ownership.
export function ContributionSection({ groups }: { groups: ContributionGroup[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      {groups.map((g) => (
        <div key={g.category} className="border-l-2 border-[color:var(--quest-border)] pl-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-[color:var(--quest)]">
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
