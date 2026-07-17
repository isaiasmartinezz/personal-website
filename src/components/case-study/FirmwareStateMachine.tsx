import type { FirmwareEvent } from "@/data/centrifuge-case-study";
import { ArrowRightIcon } from "@/components/Icons";

function Flow({ steps, colorVar }: { steps: string[]; colorVar?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <span key={`${step}-${i}`} className="flex items-center gap-2">
          <span
            className="rounded-lg border px-3 py-1.5 text-xs font-medium"
            style={
              colorVar
                ? { borderColor: `var(${colorVar})`, color: `var(${colorVar})`, backgroundColor: `color-mix(in oklab, var(${colorVar}) 8%, transparent)` }
                : { borderColor: "var(--border)", color: "var(--fg)" }
            }
          >
            {step}
          </span>
          {i < steps.length - 1 && <ArrowRightIcon aria-hidden="true" className="size-3 shrink-0 text-subtle" />}
        </span>
      ))}
    </div>
  );
}

export function FirmwareStateMachine({
  states,
  events,
  explanation,
  highlight,
  patternAvoid,
  patternUsed,
}: {
  states: string[];
  events: FirmwareEvent[];
  explanation: string[];
  highlight: string;
  patternAvoid: string[];
  patternUsed: string[];
}) {
  return (
    <div>
      <Flow steps={states} />

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Flags and events</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {events.map((e) => (
            <li key={e.label} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
              {e.label}
            </li>
          ))}
        </ul>
      </div>

      <ul className="mt-6 max-w-2xl space-y-2">
        {explanation.map((e) => (
          <li key={e} className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-accent/60">
            {e}
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-2xl rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-fg">
        {highlight}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--cf-fault)" }}>
            Avoid
          </p>
          <Flow steps={patternAvoid} colorVar="--cf-fault" />
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--cf-complete)" }}>
            Implemented
          </p>
          <Flow steps={patternUsed} colorVar="--cf-complete" />
        </div>
      </div>
    </div>
  );
}
