import { ArrowRightIcon } from "@/components/Icons";

function FlowRow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-fg">
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

export function ExperimentPipeline({
  stages,
  branches,
  callout,
}: {
  stages: string[];
  branches: { title: string; steps: string[] }[];
  callout: string;
}) {
  return (
    <div>
      <FlowRow steps={stages} />

      <div className="mt-8 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3">
        {branches.map((b) => (
          <div key={b.title}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-subtle">{b.title}</h3>
            <div className="mt-3">
              <ol className="space-y-2">
                {b.steps.map((step, i) => (
                  <li key={step} className="flex items-center gap-2 text-sm text-muted">
                    <span className="text-xs text-subtle">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 rounded-lg border border-accent/25 bg-accent/5 px-4 py-3 text-sm font-medium text-fg">
        {callout}
      </p>
    </div>
  );
}
