import type { LifecycleStage } from "@/data/coquest-case-study";
import { ArrowRightIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";

// Create → Broadcast → Discover → Join → Meet → Expire. The final stage is
// styled as fading (dashed, dimmed) rather than just another pill, so the
// visual matches the "disappears gently" behavior it represents.
export function QuestLifecycle({ stages }: { stages: LifecycleStage[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
      {stages.map((stage, i) => (
        <li key={stage.label} className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium",
              stage.fading
                ? "border-dashed border-subtle text-subtle opacity-60"
                : "border-[color:var(--quest-border)] bg-[color:var(--quest-soft)] text-fg",
            )}
          >
            {stage.label}
          </span>
          {i < stages.length - 1 && (
            <ArrowRightIcon aria-hidden="true" className="size-3.5 shrink-0 text-subtle" />
          )}
        </li>
      ))}
    </ol>
  );
}
