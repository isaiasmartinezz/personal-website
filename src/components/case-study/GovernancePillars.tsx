import type { GovernancePillar } from "@/data/biosurveillance-case-study";

export function GovernancePillars({ pillars }: { pillars: GovernancePillar[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {pillars.map((p) => (
        <div key={p.title} className="rounded-xl border border-border bg-surface p-5">
          <h3 className="text-base font-semibold text-fg">{p.title}</h3>
          <ul className="mt-3 space-y-1.5">
            {p.items.map((item) => (
              <li
                key={item}
                className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-accent/60"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
