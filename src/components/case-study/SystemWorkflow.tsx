import type { SystemStage } from "@/data/epvo-case-study";

// Horizontal (single row, connected by a thin rule) on large screens;
// stacks to a vertical sequence on smaller screens. Plain numbered nodes
// rather than icon illustrations, consistent with the site's restraint.
export function SystemWorkflow({ stages }: { stages: SystemStage[] }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-6 top-[18px] hidden h-px bg-border lg:block"
      />
      <ol className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-6 lg:gap-4">
        {stages.map((stage) => (
          <li key={stage.number} className="flex flex-col items-center gap-3 text-center">
            <div className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-page font-serif text-sm font-semibold text-accent">
              {stage.number}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-fg">{stage.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {stage.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
