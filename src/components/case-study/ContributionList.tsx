import type { Contribution } from "@/data/epvo-case-study";

// First-person, team-aware contribution statements — deliberately not a
// percentage-ownership chart, since this was team work.
export function ContributionList({ items }: { items: Contribution[] }) {
  return (
    <ul className="space-y-5">
      {items.map((c) => (
        <li
          key={c.label}
          className="flex flex-col gap-1.5 border-l-2 border-accent/30 pl-4 sm:flex-row sm:gap-6"
        >
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-accent sm:w-44 sm:pt-0.5">
            {c.label}
          </span>
          <p className="text-sm leading-relaxed text-muted">{c.text}</p>
        </li>
      ))}
    </ul>
  );
}
