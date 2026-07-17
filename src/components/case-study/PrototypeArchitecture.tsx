import type { ArchLayer } from "@/data/biosurveillance-case-study";
import { ArrowRightIcon } from "@/components/Icons";

export function PrototypeArchitecture({ layers }: { layers: ArchLayer[] }) {
  return (
    <div className="flex flex-col gap-3">
      {layers.map((layer, i) => (
        <div key={layer.title}>
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">{layer.title}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {layer.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {i < layers.length - 1 && (
            <div className="flex justify-center py-1" aria-hidden="true">
              <ArrowRightIcon className="size-4 rotate-90 text-subtle" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
