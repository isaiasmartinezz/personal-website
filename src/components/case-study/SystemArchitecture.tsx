import type { ArchNode, ArchNodeKind } from "@/data/coquest-case-study";
import { ArrowRightIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";

const KIND_LABEL: Record<ArchNodeKind, string> = {
  client: "Client interface",
  firebase: "Firebase service",
  external: "External service",
  event: "Real-time event",
};

// Text labels always accompany color (legend below), so the diagram never
// communicates information through color alone.
const KIND_STYLES: Record<ArchNodeKind, string> = {
  client: "border-accent/40 bg-accent/5 text-accent-strong",
  firebase: "border-[color:var(--quest-border)] bg-[color:var(--quest-soft)] text-fg",
  external: "border-dashed border-subtle text-subtle",
  event: "border-dashed border-accent/50 bg-transparent text-accent-strong",
};

const KIND_DOT: Record<ArchNodeKind, string> = {
  client: "bg-accent",
  firebase: "bg-[color:var(--quest)]",
  external: "border border-dashed border-subtle",
  event: "border border-dashed border-accent",
};

function FlowRow({ nodes }: { nodes: ArchNode[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
      {nodes.map((node, i) => (
        <li key={node.label} className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-lg border px-3.5 py-2 text-sm font-medium",
              KIND_STYLES[node.kind],
            )}
          >
            {node.label}
          </span>
          {i < nodes.length - 1 && (
            <ArrowRightIcon aria-hidden="true" className="size-3.5 shrink-0 text-subtle" />
          )}
        </li>
      ))}
    </ol>
  );
}

export function SystemArchitecture({
  mainFlow,
  locationFlow,
  applicationAreas,
  reusableComponents,
}: {
  mainFlow: ArchNode[];
  locationFlow: ArchNode[];
  applicationAreas: string[];
  reusableComponents: string[];
}) {
  const kinds = Array.from(new Set([...mainFlow, ...locationFlow].map((n) => n.kind)));

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-subtle">
          Core data flow
        </h3>
        <div className="mt-4">
          <FlowRow nodes={mainFlow} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-subtle">
          Location lookup
        </h3>
        <div className="mt-4">
          <FlowRow nodes={locationFlow} />
        </div>
      </div>

      <ul className="flex flex-wrap gap-4 border-t border-border pt-6" aria-label="Diagram legend">
        {kinds.map((kind) => (
          <li key={kind} className="flex items-center gap-2 text-xs text-subtle">
            <span
              className={cn("inline-block size-2.5 shrink-0 rounded-full", KIND_DOT[kind])}
              aria-hidden="true"
            />
            {KIND_LABEL[kind]}
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 gap-8 border-t border-border pt-8 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-subtle">
            Application areas
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {applicationAreas.map((a) => (
              <li
                key={a}
                className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-subtle">
            Reusable components
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {reusableComponents.map((c) => (
              <li
                key={c}
                className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
