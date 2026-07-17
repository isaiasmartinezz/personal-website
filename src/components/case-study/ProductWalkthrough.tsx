import type { WalkthroughStage } from "@/data/coquest-case-study";
import { cn } from "@/lib/utils";

// Only one real screenshot exists in the project assets (the campus map used
// in the hero), so that image is reused here as the large focal frame for
// "Discover," and the remaining stages use small schematic frames — abstract,
// labeled recreations rather than fabricated screenshots.
function SchematicScreen({ id }: { id: string }) {
  if (id === "browse") {
    return (
      <div className="flex h-full flex-col gap-2.5 p-4">
        <div className="h-2 w-16 rounded-full bg-border" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-border p-2.5">
            <span className="size-2 shrink-0 rounded-full bg-[color:var(--quest)]" />
            <div className="flex-1 space-y-1.5">
              <div className="h-1.5 w-3/4 rounded-full bg-border" />
              <div className="h-1.5 w-1/2 rounded-full bg-border" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (id === "broadcast") {
    return (
      <div className="flex h-full flex-col gap-3 p-4">
        <div className="h-2 w-20 rounded-full bg-border" />
        <div className="h-7 rounded-lg border border-border bg-page" />
        <div className="h-7 rounded-lg border border-border bg-page" />
        <div className="h-7 rounded-lg border border-border bg-page" />
        <div className="mt-auto h-8 rounded-lg bg-[color:var(--quest)]" />
      </div>
    );
  }
  if (id === "circles") {
    return (
      <div className="flex h-full flex-col justify-center gap-3 p-4">
        <div className="h-2 w-20 rounded-full bg-border" />
        <div className="flex -space-x-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="size-7 rounded-full border-2 bg-[color:var(--quest-soft)]"
              style={{ borderColor: "var(--surface)" }}
            />
          ))}
        </div>
        <div className="h-1.5 w-2/3 rounded-full bg-border" />
        <div className="h-1.5 w-1/2 rounded-full bg-border" />
      </div>
    );
  }
  return null;
}

export function ProductWalkthrough({
  stages,
  image,
  imageAlt,
}: {
  stages: WalkthroughStage[];
  image: string;
  imageAlt: string;
}) {
  return (
    <div className="space-y-14">
      {stages.map((stage, i) => {
        const isFocal = i === 0;
        const reversed = i % 2 === 1;
        return (
          <div
            key={stage.id}
            className={cn(
              "grid grid-cols-1 items-center gap-8 sm:gap-10",
              isFocal ? "sm:grid-cols-[1.1fr_1fr]" : "sm:grid-cols-[220px_1fr]",
              reversed && !isFocal && "sm:[&>*:first-child]:order-2",
            )}
          >
            <div
              className={cn(
                "overflow-hidden rounded-2xl border border-border bg-surface",
                isFocal
                  ? "aspect-[4/3]"
                  : "aspect-[3/4] max-w-[220px] justify-self-center sm:justify-self-start",
              )}
            >
              {isFocal ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
              ) : (
                <SchematicScreen id={stage.id} />
              )}
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
