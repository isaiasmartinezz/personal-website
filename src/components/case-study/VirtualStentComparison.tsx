export function VirtualStentComparison({
  steps,
  gridImage,
  detailImage,
  qualification,
}: {
  steps: string[];
  gridImage: { src: string; alt: string };
  detailImage: { src: string; alt: string };
  qualification: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
      <div>
        <ol className="space-y-2.5">
          {steps.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm">
              <span className="font-mono text-xs text-[color:var(--fontan-post)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-muted">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-md rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm leading-relaxed text-fg">
          {qualification}
        </p>
      </div>

      <div className="space-y-4">
        <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={gridImage.src} alt={gridImage.alt} loading="lazy" className="w-full" />
          <figcaption className="border-t border-border px-4 py-2.5 text-xs text-subtle">
            Pre-stent, stenting-process, and post-stent geometry for all three modeled patients.
          </figcaption>
        </figure>
        <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={detailImage.src} alt={detailImage.alt} loading="lazy" className="w-full" />
          <figcaption className="border-t border-border px-4 py-2.5 text-xs text-subtle">
            The intervention region, shown between the model&rsquo;s capped inlet and outlet faces.
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
