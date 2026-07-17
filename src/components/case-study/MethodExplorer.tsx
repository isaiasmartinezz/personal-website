"use client";

import { useState } from "react";
import type { MethodDetail } from "@/data/gpt2-case-study";
import { METHOD_BORDER, METHOD_SOFT_BG, METHOD_TEXT } from "@/lib/methodColors";
import { cn } from "@/lib/utils";

const STACK_BLOCKS: { id: "input" | "attention" | "hidden" | "classifier"; label: string }[] = [
  { id: "input", label: "Input embeddings" },
  { id: "attention", label: "Attention projections (× 12 layers)" },
  { id: "hidden", label: "Hidden representations (× 12 layers)" },
  { id: "classifier", label: "Task classifier / output head" },
];

// The page's central interactive diagram: a simplified GPT-2 stack with
// method tabs that highlight where each adaptation strategy intervenes.
// Toggle buttons (not an ARIA tablist) keep keyboard support simple and
// robust — native buttons, default Tab order, no custom arrow-key handling
// required. A static default (first method) renders immediately.
export function MethodExplorer({ methods }: { methods: MethodDetail[] }) {
  const [selectedKey, setSelectedKey] = useState(methods[0].key);
  const selected = methods.find((m) => m.key === selectedKey) ?? methods[0];
  const isFull = selected.highlight === "full";
  const isDecode = selected.highlight === "decode";

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Adaptation method">
        {methods.map((m) => {
          const active = m.key === selectedKey;
          return (
            <button
              key={m.key}
              type="button"
              aria-pressed={active}
              onClick={() => setSelectedKey(m.key)}
              className={cn(
                "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
                active
                  ? cn(METHOD_BORDER[m.key], METHOD_SOFT_BG[m.key], METHOD_TEXT[m.key])
                  : "border-border text-muted hover:text-fg",
              )}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
        <div className="mx-auto flex w-full max-w-[240px] flex-col lg:mx-0">
          {STACK_BLOCKS.map((block, i) => {
            const isHighlighted = isFull || selected.highlight === block.id;
            return (
              <div key={block.id}>
                {i > 0 && <div aria-hidden="true" className="mx-auto h-4 w-px bg-border" />}
                <div
                  className={cn(
                    "rounded-lg border px-3 py-2.5 text-center text-xs font-medium transition-colors",
                    isHighlighted
                      ? cn(METHOD_BORDER[selectedKey], METHOD_SOFT_BG[selectedKey], METHOD_TEXT[selectedKey])
                      : "border-border text-subtle",
                  )}
                >
                  {block.label}
                </div>
              </div>
            );
          })}

          <div aria-hidden="true" className="mx-auto h-4 w-px bg-border" />
          <div
            className={cn(
              "rounded-lg border border-dashed px-3 py-2.5 text-center text-xs font-medium transition-colors",
              isDecode
                ? cn(METHOD_BORDER.decode, METHOD_SOFT_BG.decode, METHOD_TEXT.decode)
                : "border-subtle text-subtle",
            )}
          >
            Output-time candidate selection
          </div>
        </div>

        <div aria-live="polite">
          <h3 className="text-lg font-semibold text-fg">{selected.label}</h3>
          <dl className="mt-4 space-y-3.5 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-subtle">Where</dt>
              <dd className="mt-1 leading-relaxed text-muted">{selected.where}</dd>
            </div>
            {selected.mechanism && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-subtle">Mechanism</dt>
                <dd className="mt-1 leading-relaxed text-muted">{selected.mechanism}</dd>
              </div>
            )}
            {selected.equations?.map((eq) => (
              <div key={eq.label}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-subtle">{eq.label}</dt>
                <dd className="mt-1 inline-block rounded-lg bg-surface-2 px-3 py-2 font-mono text-sm text-fg">
                  {eq.expr}
                </dd>
              </div>
            ))}
            <div>
              <dt className={cn("text-xs font-semibold uppercase tracking-wide", METHOD_TEXT[selectedKey])}>
                Strength
              </dt>
              <dd className="mt-1 leading-relaxed text-muted">{selected.strength}</dd>
            </div>
            {selected.cost && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-subtle">Cost</dt>
                <dd className="mt-1 leading-relaxed text-muted">{selected.cost}</dd>
              </div>
            )}
            {selected.sensitivity && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-subtle">Sensitivity</dt>
                <dd className="mt-1 leading-relaxed text-muted">{selected.sensitivity}</dd>
              </div>
            )}
            {selected.limitation && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-subtle">
                  Observed limitation
                </dt>
                <dd className="mt-1 leading-relaxed text-muted">{selected.limitation}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
