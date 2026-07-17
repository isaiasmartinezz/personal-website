import type { Tension } from "@/data/coquest-case-study";

export function ProductTension({ tensions }: { tensions: Tension[] }) {
  return (
    <div className="space-y-6">
      {tensions.map((t, i) => (
        <div key={t.title} className="rounded-xl border border-border bg-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-subtle">
            Tension {i + 1}
          </p>
          <h3 className="mt-1.5 text-lg font-semibold text-fg">{t.title}</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--quest)]">
                Finding
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.finding}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-subtle">
                Implication
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.implication}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
