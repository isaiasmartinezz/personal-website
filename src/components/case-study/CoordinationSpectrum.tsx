import type { SpectrumColumn } from "@/data/coquest-case-study";
import { cn } from "@/lib/utils";

// Three-column continuum from formal planning to CoQuest's "missing middle"
// niche. A thin rule ties the columns together into one spectrum instead of
// reading as three unrelated cards.
export function CoordinationSpectrum({ columns }: { columns: SpectrumColumn[] }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-4 top-[3.25rem] hidden h-px bg-border sm:block"
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
        {columns.map((col) => (
          <div key={col.heading}>
            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 mb-4 hidden size-2.5 rounded-full sm:block",
                col.emphasis ? "bg-[color:var(--quest)]" : "bg-subtle",
              )}
            />
            <div
              className={cn(
                "h-full rounded-xl border p-5",
                col.emphasis
                  ? "border-[color:var(--quest-border)] bg-[color:var(--quest-soft)]"
                  : "border-border bg-surface",
              )}
            >
              <h3 className="text-base font-semibold text-fg">{col.heading}</h3>
              <ul className="mt-3 space-y-1.5">
                {col.examples.map((ex) => (
                  <li key={ex} className="text-sm italic leading-relaxed text-muted">
                    {ex}
                  </li>
                ))}
              </ul>
              <ul className="mt-4 space-y-1.5 border-t border-border pt-4">
                {col.characteristics.map((c) => (
                  <li
                    key={c}
                    className="relative pl-4 text-xs leading-relaxed text-subtle before:absolute before:left-0 before:top-1.5 before:size-1 before:rounded-full before:bg-current"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
