"use client";

import { useId, useState } from "react";
import type { PipelineStep } from "@/data/fontan-case-study";
import { cn } from "@/lib/utils";

const CATEGORY_BORDER: Record<PipelineStep["category"], string> = {
  Manual: "border-solid",
  "Semi-automated": "border-dashed",
  Computational: "border-double",
  Analytical: "border-dotted",
};

export function ComputationalPipeline({ steps }: { steps: PipelineStep[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div>
      <ol className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:gap-4">
        {steps.map((step, i) => {
          const open = openIndex === i;
          const panelId = `${baseId}-panel-${i}`;
          return (
            <li key={step.label} className="sm:w-[calc(25%-0.75rem)] sm:min-w-[200px]">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className={cn(
                  "w-full rounded-lg border-2 bg-surface px-3.5 py-3 text-left transition-colors",
                  CATEGORY_BORDER[step.category],
                  open ? "border-accent" : "border-border hover:border-accent/40",
                )}
              >
                <span className="text-xs font-semibold text-subtle">{i + 1}.</span>
                <span className="ml-1.5 text-sm font-medium text-fg">{step.label}</span>
                <span className="mt-1 block text-xs uppercase tracking-wide text-subtle">
                  {step.category}
                </span>
              </button>
              {open && (
                <p id={panelId} className="mt-2 px-1 text-sm leading-relaxed text-muted">
                  {step.detail}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
