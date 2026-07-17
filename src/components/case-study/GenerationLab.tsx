import type { CandidateDemoItem } from "@/data/gpt2-case-study";
import { ArrowRightIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";

export function GenerationLab({
  stages,
  results,
  candidates,
}: {
  stages: { title: string; points: string[] }[];
  results: { bestDevChrf: string; testChrf: string; bestPool: string; poolNote: string };
  candidates: CandidateDemoItem[];
}) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stages.map((s, i) => (
          <div
            key={s.title}
            className="rounded-xl border border-[color-mix(in_oklab,var(--m-decode)_30%,transparent)] bg-[color-mix(in_oklab,var(--m-decode)_6%,transparent)] p-5"
          >
            <span className="font-serif text-2xl font-semibold text-[color:var(--m-decode)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-fg">{s.title}</h3>
            <ul className="mt-3 space-y-1.5">
              {s.points.map((p) => (
                <li key={p} className="text-sm leading-relaxed text-muted">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-border">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {[
            { value: results.bestDevChrf, label: "Best development chrF" },
            { value: results.testChrf, label: "Final test chrF" },
            { value: results.bestPool, label: "Best candidate strategy" },
          ].map((m, i) => (
            <div
              key={m.label}
              className={cn(
                "p-5",
                i % 2 === 0 ? "border-r border-border" : "",
                i === 0 ? "border-b border-border sm:border-b-0" : "",
                i > 0 ? "sm:border-l sm:border-border" : "",
              )}
            >
              <div className="font-serif text-2xl font-semibold text-fg sm:text-3xl">{m.value}</div>
              <p className="mt-1.5 text-sm leading-snug text-muted">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs text-subtle">{results.poolNote}</p>

      <div className="mt-10">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-subtle">
          How reranking picks a continuation
        </h3>
        <p className="mt-1.5 max-w-xl text-xs text-subtle">
          Illustrative diagram of the mechanism — not real project output. Descriptors are
          representative structural scores, not recorded generations.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-medium text-fg">
            Prompt
          </span>
          <ArrowRightIcon aria-hidden="true" className="size-3.5 shrink-0 text-subtle" />
          {candidates.map((c, i) => (
            <span key={c.id} className="flex items-center gap-3">
              <span
                className={cn(
                  "rounded-lg border px-3.5 py-2 text-sm font-medium",
                  c.selected
                    ? "border-[color-mix(in_oklab,var(--m-decode)_45%,transparent)] bg-[color-mix(in_oklab,var(--m-decode)_10%,transparent)] text-[color:var(--m-decode)]"
                    : "border-border text-muted",
                )}
              >
                Candidate {c.id}
                <span className="ml-2 font-normal text-subtle">({c.descriptor})</span>
              </span>
              {i < candidates.length - 1 && (
                <ArrowRightIcon aria-hidden="true" className="size-3.5 shrink-0 text-subtle" />
              )}
            </span>
          ))}
          <ArrowRightIcon aria-hidden="true" className="size-3.5 shrink-0 text-subtle" />
          <span className="rounded-lg border border-[color-mix(in_oklab,var(--m-decode)_45%,transparent)] bg-[color-mix(in_oklab,var(--m-decode)_10%,transparent)] px-3.5 py-2 text-sm font-medium text-[color:var(--m-decode)]">
            Selected: Candidate {candidates.find((c) => c.selected)?.id}
          </span>
        </div>
      </div>
    </div>
  );
}
