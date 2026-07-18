import Image from "next/image";
import type { WalkthroughStage } from "@/data/coquest-case-study";
import { cn } from "@/lib/utils";

export function ProductWalkthrough({ stages }: { stages: WalkthroughStage[] }) {
  return (
    <div className="space-y-14">
      {stages.map((stage, i) => {
        const reversed = i % 2 === 1;
        return (
          <div
            key={stage.id}
            className={cn(
              "grid grid-cols-1 items-center gap-8 sm:grid-cols-[1.3fr_1fr] sm:gap-10",
              reversed && "sm:[&>*:first-child]:order-2",
            )}
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-surface">
              <Image
                src={stage.image}
                alt={stage.imageAlt}
                fill
                sizes="(min-width: 640px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--quest)]">
                {stage.eyebrow}
              </p>
              <h3 className="mt-1.5 text-xl font-semibold text-fg">{stage.title}</h3>
              <ul className="mt-4 space-y-2">
                {stage.points.map((p) => (
                  <li
                    key={p}
                    className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-[color:var(--quest-dot)]"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
