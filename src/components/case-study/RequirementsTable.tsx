import type { RequirementRow } from "@/data/centrifuge-case-study";
import { CheckIcon, CloseIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";

const MET_STYLE: Record<RequirementRow["met"], { var: string; icon: "check" | "close" | "question" }> = {
  Yes: { var: "--cf-complete", icon: "check" },
  No: { var: "--cf-fault", icon: "close" },
  Unsure: { var: "--cf-active", icon: "question" },
};

function MetBadge({ met }: { met: RequirementRow["met"] }) {
  const style = MET_STYLE[met];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold"
      style={{ borderColor: `var(${style.var})`, color: `var(${style.var})` }}
    >
      {style.icon === "check" && <CheckIcon className="size-3" />}
      {style.icon === "close" && <CloseIcon className="size-3" />}
      {style.icon === "question" && <span aria-hidden="true">?</span>}
      {met}
    </span>
  );
}

export function RequirementsTable({ rows }: { rows: RequirementRow[] }) {
  return (
    <div>
      <table className="hidden w-full border-collapse text-left text-sm sm:table">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="w-16 py-2 pr-4 font-semibold text-fg">ID</th>
            <th scope="col" className="py-2 pr-4 font-semibold text-fg">Requirement</th>
            <th scope="col" className="w-24 py-2 pr-4 font-semibold text-fg">Met?</th>
            <th scope="col" className="py-2 font-semibold text-fg">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-border last:border-0">
              <td className="py-2.5 pr-4 align-top font-mono text-xs text-subtle">{r.id}</td>
              <td className="py-2.5 pr-4 align-top text-muted">{r.description}</td>
              <td className="py-2.5 pr-4 align-top">
                <MetBadge met={r.met} />
              </td>
              <td className="py-2.5 align-top text-muted">{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="space-y-3 sm:hidden">
        {rows.map((r) => (
          <div key={`${r.id}-m`} className="rounded-lg border border-border bg-surface p-4">
            <div className={cn("flex items-center justify-between gap-3")}>
              <dt className="text-sm font-semibold text-fg">{r.id}</dt>
              <MetBadge met={r.met} />
            </div>
            <dd className="mt-1.5 text-sm text-muted">{r.description}</dd>
            <dd className="mt-1.5 text-xs italic text-subtle">{r.note}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
