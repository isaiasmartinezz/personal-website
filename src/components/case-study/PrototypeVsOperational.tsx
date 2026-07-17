import type { MaturityColumn } from "@/data/biosurveillance-case-study";
import { ArrowRightIcon } from "@/components/Icons";

export function PrototypeVsOperational({
  current,
  proposed,
}: {
  current: MaturityColumn;
  proposed: MaturityColumn;
}) {
  return (
    <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
      <div className="rounded-xl border border-border bg-surface p-5">
        <h3 className="text-sm font-semibold text-fg">{current.heading}</h3>
        <ul className="mt-3 space-y-1.5">
          {current.items.map((item) => (
            <li
              key={item}
              className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-accent/60"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-center py-4 sm:py-0">
        <ArrowRightIcon aria-hidden="true" className="size-5 rotate-90 text-subtle sm:rotate-0" />
      </div>

      <div className="rounded-xl border border-dashed border-border bg-surface-2 p-5">
        <h3 className="text-sm font-semibold text-fg">{proposed.heading}</h3>
        <ul className="mt-3 space-y-1.5">
          {proposed.items.map((item) => (
            <li
              key={item}
              className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:border before:border-subtle"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
