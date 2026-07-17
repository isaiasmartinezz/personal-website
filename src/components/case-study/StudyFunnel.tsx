import { ArrowRightIcon } from "@/components/Icons";

export function StudyFunnel({ stages, explanation }: { stages: string[]; explanation: string[] }) {
  return (
    <div>
      <ol className="mx-auto flex max-w-md flex-col items-stretch">
        {stages.map((stage, i) => (
          <li key={stage}>
            {i > 0 && (
              <div className="flex justify-center py-1.5" aria-hidden="true">
                <ArrowRightIcon className="size-4 rotate-90 text-subtle" />
              </div>
            )}
            <div
              className="rounded-lg border border-border bg-surface px-4 py-3 text-center text-sm font-medium text-fg"
              style={{
                marginInline: `${i * 8}px`,
              }}
            >
              {stage}
            </div>
          </li>
        ))}
      </ol>

      <ul className="mx-auto mt-8 max-w-2xl space-y-2.5">
        {explanation.map((e) => (
          <li
            key={e}
            className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-accent/60"
          >
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}
