import type { PatientKey, GeometryState, PhysiologicState } from "@/data/fontan-case-study";
import { CheckIcon } from "@/components/Icons";

const columns: { physiologic: PhysiologicState; geometry: GeometryState; label: string }[] = [
  { physiologic: "rest", geometry: "pre", label: "Rest · Pre-stent" },
  { physiologic: "rest", geometry: "post", label: "Rest · Post-stent" },
  { physiologic: "exercise", geometry: "pre", label: "Exercise · Pre-stent" },
  { physiologic: "exercise", geometry: "post", label: "Exercise · Post-stent" },
];

function StateIcon({ geometry, physiologic }: { geometry: GeometryState; physiologic: PhysiologicState }) {
  const color = geometry === "pre" ? "var(--fontan-pre)" : "var(--fontan-post)";
  const ring = physiologic === "exercise" ? "var(--fontan-exercise)" : "var(--fontan-rest)";
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke={ring} strokeWidth="2" strokeDasharray={physiologic === "exercise" ? "3 2" : undefined} />
      <circle cx="12" cy="12" r="5" fill={color} />
    </svg>
  );
}

export function SimulationMatrix({
  patients,
  labels,
}: {
  patients: PatientKey[];
  labels: Record<PatientKey, string>;
}) {
  return (
    <div>
      {/* Desktop / tablet grid */}
      <div className="hidden overflow-x-auto sm:block">
        <div className="grid min-w-[640px] grid-cols-[140px_repeat(4,1fr)] gap-2">
          <div />
          {columns.map((c) => (
            <div key={c.label} className="text-center text-xs font-semibold uppercase tracking-wide text-subtle">
              {c.label}
            </div>
          ))}
          {patients.map((p) => (
            <div key={p} className="contents">
              <div className="flex items-center text-sm font-semibold text-fg">{labels[p]}</div>
              {columns.map((c) => (
                <div
                  key={`${p}-${c.label}`}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-surface p-3"
                >
                  <StateIcon geometry={c.geometry} physiologic={c.physiologic} />
                  <span className="inline-flex items-center gap-1 text-xs text-subtle">
                    <CheckIcon className="size-3 text-accent" />
                    Simulated
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: grouped by patient */}
      <div className="space-y-6 sm:hidden">
        {patients.map((p) => (
          <div key={p}>
            <h3 className="text-sm font-semibold text-fg">{labels[p]}</h3>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {columns.map((c) => (
                <div
                  key={`${p}-${c.label}-m`}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-surface p-3"
                >
                  <StateIcon geometry={c.geometry} physiologic={c.physiologic} />
                  <span className="text-center text-xs text-muted">{c.label}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-subtle">
                    <CheckIcon className="size-3 text-accent" />
                    Simulated
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
