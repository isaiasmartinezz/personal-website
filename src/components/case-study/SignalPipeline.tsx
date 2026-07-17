"use client";

import { useState } from "react";
import type { PipelineStage } from "@/data/epvo-case-study";
import { cn } from "@/lib/utils";

function Stage({ stage, index }: { stage: PipelineStage; index: number }) {
  const [open, setOpen] = useState(false);
  const detailId = `pipeline-stage-${index}-detail`;

  return (
    <li className="w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={detailId}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors sm:w-auto",
          open
            ? "border-accent/50 bg-accent/10 text-accent"
            : "border-border bg-surface text-fg hover:border-accent/30",
        )}
      >
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[11px] font-semibold text-subtle">
          {index + 1}
        </span>
        {stage.label}
      </button>
      {open && (
        <p id={detailId} className="mt-2 max-w-xs text-xs leading-relaxed text-muted">
          {stage.detail}
        </p>
      )}
    </li>
  );
}

// A click-to-reveal process chain (native buttons -> free keyboard support).
// The faint sine-wave behind it is a generated SVG motif, not a stock chart.
export function SignalPipeline({ stages }: { stages: PipelineStage[] }) {
  return (
    <div className="relative">
      <svg
        aria-hidden="true"
        viewBox="0 0 800 40"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-4 hidden h-10 w-full opacity-[0.12] sm:block"
      >
        <path
          d="M0 20 Q 33 2 66 20 T 133 20 T 200 20 T 266 20 T 333 20 T 400 20 T 466 20 T 533 20 T 600 20 T 666 20 T 733 20 T 800 20"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
      </svg>
      <ol className="relative flex flex-col flex-wrap gap-3 sm:flex-row">
        {stages.map((stage, i) => (
          <Stage key={stage.label} stage={stage} index={i} />
        ))}
      </ol>
    </div>
  );
}
