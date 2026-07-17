import { ArrowRightIcon } from "@/components/Icons";

function FlowRow({ steps, missingIndex }: { steps: string[]; missingIndex?: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span
            className={
              i === missingIndex
                ? "rounded-lg border border-dashed border-[color:var(--fontan-mixed)] px-3 py-2 text-sm font-medium text-[color:var(--fontan-mixed)]"
                : "rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-fg"
            }
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <ArrowRightIcon aria-hidden="true" className="size-3.5 shrink-0 text-subtle" />
          )}
        </li>
      ))}
    </ol>
  );
}

export function FontanPhysiologyDiagram({
  normal,
  fontan,
}: {
  normal: string[];
  fontan: string[];
}) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      <div className="rounded-xl border border-border bg-surface p-5">
        <h3 className="text-sm font-semibold text-fg">Normal circulation</h3>
        <div className="mt-4">
          <FlowRow steps={normal} />
        </div>
      </div>
      <div className="rounded-xl border border-border bg-surface p-5">
        <h3 className="text-sm font-semibold text-fg">Fontan circulation</h3>
        <div className="mt-4">
          <FlowRow steps={fontan} missingIndex={1} />
        </div>
        <p className="mt-3 text-xs italic text-subtle">
          Dashed outline marks the missing pumping chamber — flow passes through a passive conduit
          instead.
        </p>
      </div>
    </div>
  );
}
