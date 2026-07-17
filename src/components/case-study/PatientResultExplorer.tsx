"use client";

import { useState } from "react";
import type { PatientData, MetricRow } from "@/data/fontan-case-study";
import { cn } from "@/lib/utils";

function ResultTable({ rows }: { rows: MetricRow[] }) {
  return (
    <div>
      <table className="hidden w-full border-collapse text-left text-sm sm:table">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="py-2 pr-3 font-semibold text-fg">
              Metric
            </th>
            <th scope="col" className="py-2 pr-3 text-right font-semibold text-fg">
              Pre-stent
            </th>
            <th scope="col" className="py-2 pr-3 text-right font-semibold text-fg">
              Post-stent
            </th>
            <th scope="col" className="py-2 text-right font-semibold text-fg">
              Change
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.metric} className="border-b border-border last:border-0">
              <td className="py-2 pr-3 align-top text-muted">{r.metric}</td>
              <td className="py-2 pr-3 align-top text-right text-muted">{r.pre}</td>
              <td className="py-2 pr-3 align-top text-right font-medium text-fg">{r.post}</td>
              <td
                className={cn(
                  "py-2 align-top text-right font-medium",
                  r.change.startsWith("+")
                    ? "text-[color:var(--fontan-mixed)]"
                    : r.change === "—"
                      ? "text-subtle"
                      : "text-[color:var(--fontan-post)]",
                )}
              >
                {r.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="space-y-2 sm:hidden">
        {rows.map((r) => (
          <div key={r.metric} className="rounded-lg border border-border bg-surface p-3">
            <dt className="text-sm font-semibold text-fg">{r.metric}</dt>
            <dd className="mt-1 flex justify-between text-xs text-muted">
              <span>Pre: {r.pre}</span>
              <span>Post: {r.post}</span>
            </dd>
            <dd
              className={cn(
                "mt-1 text-xs font-medium",
                r.change.startsWith("+") ? "text-[color:var(--fontan-mixed)]" : "text-[color:var(--fontan-post)]",
              )}
            >
              Change: {r.change}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function PatientResultExplorer({ patients }: { patients: PatientData[] }) {
  const [key, setKey] = useState(patients[0].key);
  const patient = patients.find((p) => p.key === key) ?? patients[0];

  return (
    <div>
      <div role="group" aria-label="Patient" className="flex flex-wrap gap-2">
        {patients.map((p) => (
          <button
            key={p.key}
            type="button"
            aria-pressed={p.key === key}
            onClick={() => setKey(p.key)}
            className={cn(
              "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
              p.key === key
                ? "border-accent/40 bg-accent/10 text-accent-strong"
                : "border-border text-muted hover:text-fg",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-6" aria-live="polite">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-serif text-xl font-semibold text-fg">{patient.label}</h3>
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-xs font-medium",
              patient.responseType === "mixed"
                ? "border-[color:var(--fontan-mixed)] text-[color:var(--fontan-mixed)]"
                : "border-[color:var(--fontan-post)] text-[color:var(--fontan-post)]",
            )}
          >
            {patient.headline}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--fontan-rest)]">
              Rest
            </p>
            <div className="mt-2">
              <ResultTable rows={patient.restRows} />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--fontan-exercise)]">
              Exercise
            </p>
            <div className="mt-2">
              <ResultTable rows={patient.exerciseRows} />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-subtle">Interpretation</h4>
          <ul className="mt-2 space-y-2">
            {patient.interpretation.map((it, i) => (
              <li
                key={i}
                className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-accent/60"
              >
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
