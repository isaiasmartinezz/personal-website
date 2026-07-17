import type { FutureArchLayer } from "@/data/biosurveillance-case-study";
import { ArrowRightIcon } from "@/components/Icons";

// Dashed borders and a muted surface throughout signal that this is a
// proposed concept, not implemented functionality.
export function NationalArchitecture({ layers }: { layers: FutureArchLayer[] }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface-2 p-5 sm:p-6">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-subtle">
        Proposed future architecture — not implemented
      </p>
      <div className="flex flex-col gap-3">
        {layers.map((layer, i) => (
          <div key={layer.title}>
            <div className="rounded-xl border border-dashed border-border bg-page p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">{layer.title}</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-dashed border-border px-2.5 py-1 text-xs font-medium text-muted"
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
    </div>
  );
}
