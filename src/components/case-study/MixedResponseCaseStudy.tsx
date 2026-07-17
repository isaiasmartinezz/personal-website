import { ArrowRightIcon } from "@/components/Icons";

export function MixedResponseCaseStudy({
  factors,
  observations,
  mechanism,
  insight,
}: {
  factors: string[];
  observations: string[];
  mechanism: string[];
  insight: string;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-subtle">
            Anatomical complexity
          </h3>
          <ul className="mt-2 space-y-1.5">
            {factors.map((f) => (
              <li
                key={f}
                className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-[color:var(--fontan-mixed)]"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-subtle">
            What changed after enlargement
          </h3>
          <ul className="mt-2 space-y-1.5">
            {observations.map((o) => (
              <li
                key={o}
                className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-accent/60"
              >
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-dashed border-[color:var(--fontan-mixed)]/40 bg-surface p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-subtle">
          Proposed mechanism — not a proven causal pathway
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {mechanism.map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              <span className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm font-medium text-fg">
                {step}
              </span>
              {i < mechanism.length - 1 && (
                <ArrowRightIcon aria-hidden="true" className="size-3.5 shrink-0 text-subtle" />
              )}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-6 max-w-2xl font-serif text-lg italic leading-snug text-fg">{insight}</p>
    </div>
  );
}
