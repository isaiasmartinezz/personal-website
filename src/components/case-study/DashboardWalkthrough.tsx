import type { DashboardPanel } from "@/data/biosurveillance-case-study";

// The hero screenshot is the only real dashboard asset available, and it's
// already shown once at full size above — repeating or cropping it here
// risked misrepresenting UI it doesn't actually show at this scale, so this
// walkthrough is presented as structured text describing each real screen.
export function DashboardWalkthrough({
  panels,
  dataSourceNote,
  weightNote,
}: {
  panels: DashboardPanel[];
  dataSourceNote: string;
  weightNote: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {panels.map((p) => (
        <div key={p.title} className="rounded-xl border border-border bg-surface p-5">
          <h3 className="text-sm font-semibold text-fg">{p.title}</h3>
          <ul className="mt-3 space-y-1.5">
            {p.points.map((point) => (
              <li
                key={point}
                className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-accent/60"
              >
                {point}
              </li>
            ))}
          </ul>
          {p.title === "Data sources" && (
            <p className="mt-3 text-xs italic leading-relaxed text-subtle">{dataSourceNote}</p>
          )}
          {p.title === "Detection parameters" && (
            <p className="mt-3 text-xs italic leading-relaxed text-subtle">{weightNote}</p>
          )}
        </div>
      ))}
    </div>
  );
}
