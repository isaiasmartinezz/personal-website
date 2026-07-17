import type { AnatomyLayer } from "@/data/centrifuge-case-study";

export function ExplodedAnatomy({ layers }: { layers: AnatomyLayer[] }) {
  return (
    <ol className="space-y-3">
      {layers.map((l) => (
        <li key={l.layer} className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="shrink-0 sm:w-40">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">{l.layer}</p>
            <p className="mt-0.5 text-sm font-semibold text-fg">{l.title}</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {l.items.map((item) => (
              <li key={item} className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
