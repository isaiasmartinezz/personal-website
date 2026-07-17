import type { DataEntity } from "@/data/coquest-case-study";
import { ArrowRightIcon } from "@/components/Icons";

export function ProjectDataModel({
  entities,
  relationships,
}: {
  entities: DataEntity[];
  relationships: string[];
}) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {entities.map((entity) => (
          <div key={entity.name} className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[color:var(--quest)]">
              {entity.name}
            </h3>
            <ul className="mt-3 space-y-1.5">
              {entity.fields.map((f) => (
                <li key={f} className="text-sm leading-relaxed text-muted">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ul className="mt-8 flex flex-col gap-2.5 border-t border-border pt-6 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2.5">
        {relationships.map((r) => (
          <li key={r} className="flex items-center gap-1.5 text-sm text-muted">
            <ArrowRightIcon
              aria-hidden="true"
              className="size-3.5 shrink-0 text-[color:var(--quest)]"
            />
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}
