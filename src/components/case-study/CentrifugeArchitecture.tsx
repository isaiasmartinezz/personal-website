import { ArrowRightIcon } from "@/components/Icons";

const GROUP_STYLE: Record<string, string> = {
  "User interface": "border-accent/30 bg-accent/5",
  Controller: "border-border bg-surface",
  Sensing: "border-[color-mix(in_oklab,var(--cf-ready)_25%,transparent)] bg-surface",
  Actuation: "border-[color-mix(in_oklab,var(--cf-active)_25%,transparent)] bg-surface",
};

export function CentrifugeArchitecture({
  groups,
  support,
  flows,
  diagramImage,
}: {
  groups: { title: string; items: string[] }[];
  support: string;
  flows: string[];
  diagramImage: { src: string; alt: string };
}) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => (
          <div key={g.title} className={`rounded-xl border p-4 ${GROUP_STYLE[g.title] ?? "border-border bg-surface"}`}>
            <p className="text-xs font-semibold uppercase tracking-wide text-fg">{g.title}</p>
            <ul className="mt-2.5 space-y-1.5">
              {g.items.map((item) => (
                <li key={item} className="text-xs leading-relaxed text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-subtle">Supporting system: {support}</p>

      <ul className="mt-6 space-y-2">
        {flows.map((f) => (
          <li key={f} className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-fg">
            {f.split("→").map((step, i, arr) => (
              <span key={i} className="flex items-center gap-2">
                <span className="font-medium">{step.trim()}</span>
                {i < arr.length - 1 && <ArrowRightIcon aria-hidden="true" className="size-3.5 shrink-0 text-subtle" />}
              </span>
            ))}
          </li>
        ))}
      </ul>

      <figure className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={diagramImage.src} alt={diagramImage.alt} loading="lazy" className="w-full" />
        <figcaption className="border-t border-border px-4 py-2.5 text-xs text-subtle">
          Hand-drawn system diagram: green = control subsystem, blue = sensing subsystem, red = actuation subsystem.
        </figcaption>
      </figure>
    </div>
  );
}
