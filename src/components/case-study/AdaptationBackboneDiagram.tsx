import type { BackboneStage } from "@/data/gpt2-case-study";

// Static block diagram of the Transformer internals the team implemented —
// deliberately plain (bordered boxes, a connecting rule), not a literal
// neural-network illustration.
export function AdaptationBackboneDiagram({ stages }: { stages: BackboneStage[] }) {
  return (
    <ol className="mx-auto flex max-w-md flex-col items-stretch">
      {stages.map((stage, i) => (
        <li key={stage.label}>
          {i > 0 && <div aria-hidden="true" className="mx-auto h-5 w-px bg-border" />}
          <div className="rounded-lg border border-border bg-surface px-4 py-3 text-center">
            <p className="text-sm font-medium text-fg">{stage.label}</p>
            {stage.note && <p className="mt-1 text-xs leading-relaxed text-subtle">{stage.note}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
