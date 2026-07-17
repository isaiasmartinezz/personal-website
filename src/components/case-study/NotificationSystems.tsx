import type { OperatingState } from "@/data/centrifuge-case-study";
import { ArrowRightIcon } from "@/components/Icons";

const STATE_VAR: Record<OperatingState, string> = {
  ready: "--cf-ready",
  active: "--cf-active",
  complete: "--cf-complete",
};

export function NotificationSystems({
  visualStates,
  visualExplanation,
  accessibilityNote,
  exampleRun,
  audioFlow,
  audioDevelopmentPath,
  audioPseudocode,
}: {
  visualStates: { key: OperatingState; label: string; meaning: string }[];
  visualExplanation: string[];
  accessibilityNote: string;
  exampleRun: { totalMinutes: number; segments: { state: OperatingState; startMin: number; endMin: number; label: string }[] };
  audioFlow: string[];
  audioDevelopmentPath: string[];
  audioPseudocode: string;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {visualStates.map((s) => (
          <div
            key={s.key}
            className="rounded-xl border p-5"
            style={{ borderColor: `color-mix(in oklab, var(${STATE_VAR[s.key]}) 35%, transparent)` }}
          >
            <span aria-hidden="true" className="inline-block size-3 rounded-full" style={{ backgroundColor: `var(${STATE_VAR[s.key]})` }} />
            <h3 className="mt-2 text-sm font-semibold" style={{ color: `var(${STATE_VAR[s.key]})` }}>
              {s.label}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.meaning}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Example run</p>
        <div className="mt-2 flex h-6 overflow-hidden rounded-full border border-border">
          {exampleRun.segments.map((seg) => (
            <div
              key={seg.label}
              className="flex items-center justify-center text-[10px] font-medium text-fg"
              style={{
                width: `${((seg.endMin - seg.startMin) / exampleRun.totalMinutes) * 100}%`,
                backgroundColor: `color-mix(in oklab, var(${STATE_VAR[seg.state]}) 30%, transparent)`,
              }}
            >
              {seg.label}
            </div>
          ))}
        </div>
        <p className="mt-1.5 text-xs text-subtle">
          Illustrative {exampleRun.totalMinutes}-minute run — segment widths are proportional to duration.
        </p>
      </div>

      <ul className="mt-6 max-w-2xl space-y-1.5">
        {visualExplanation.map((e) => (
          <li key={e} className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-accent/60">
            {e}
          </li>
        ))}
      </ul>
      <p className="mt-4 max-w-2xl text-sm italic leading-relaxed text-subtle">{accessibilityNote}</p>

      <div className="mt-12 border-t border-border pt-8">
        <h3 className="text-2xl font-semibold text-fg">Distinct sounds for start and completion</h3>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {audioFlow.map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              <span className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-fg">{step}</span>
              {i < audioFlow.length - 1 && <ArrowRightIcon aria-hidden="true" className="size-3.5 shrink-0 text-subtle" />}
            </span>
          ))}
        </div>

        <ol className="mt-6 max-w-2xl space-y-1.5">
          {audioDevelopmentPath.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm">
              <span className="font-mono text-xs text-accent">{i + 1}</span>
              <span className="text-muted">{step}</span>
            </li>
          ))}
        </ol>

        <pre className="mt-6 overflow-x-auto rounded-lg bg-surface-2 p-4 font-mono text-xs leading-relaxed text-fg">
          <code>{audioPseudocode}</code>
        </pre>
      </div>
    </div>
  );
}
