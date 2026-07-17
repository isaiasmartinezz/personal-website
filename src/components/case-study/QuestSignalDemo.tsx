"use client";

import { useId, useState } from "react";
import { questDemoOptions } from "@/data/coquest-case-study";
import { MapPinIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";

// A recreation of the app's actual "Create Quest" flow (title / when / where
// / audience -> preview card), using the real screen's field names and
// layout — but every value is a preset chip, not free text. Local component
// state only, no network calls, no data collected.
const LOCATION_POINTS: Record<string, { x: number; y: number }> = {
  "Green Library": { x: 198, y: 36 },
  Tresidder: { x: 92, y: 60 },
  Arrillaga: { x: 148, y: 132 },
};

function PillGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <span className="text-sm font-medium text-fg">{label}</span>
      <div role="group" aria-label={label} className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(opt)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "border-[color-mix(in_oklab,var(--quest)_45%,transparent)] bg-[color:var(--quest-soft)] text-[color:var(--quest)]"
                  : "border-border text-muted hover:text-fg",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function QuestSignalDemo() {
  const [activity, setActivity] = useState(questDemoOptions.activities[0]);
  const [time, setTime] = useState(questDemoOptions.times[0]);
  const [audience, setAudience] = useState(questDemoOptions.audiences[0]);
  const [locationLabel, setLocationLabel] = useState(questDemoOptions.locations[0].label);
  const [posted, setPosted] = useState(false);
  const titleId = useId();

  const location =
    questDemoOptions.locations.find((l) => l.label === locationLabel) ?? questDemoOptions.locations[0];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPosted(true);
  }

  function handleReset() {
    setPosted(false);
    setActivity(questDemoOptions.activities[0]);
    setTime(questDemoOptions.times[0]);
    setAudience(questDemoOptions.audiences[0]);
    setLocationLabel(questDemoOptions.locations[0].label);
  }

  return (
    <div className="grid grid-cols-1 gap-8 rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <p className="text-sm font-semibold text-fg">Create Quest</p>
          <p className="mt-1 text-xs leading-relaxed text-subtle">
            A recreation of the real posting flow with a few preset options to try — not the live
            app, and nothing here is collected or sent anywhere.
          </p>
        </div>

        <PillGroup
          label="Quest title"
          options={questDemoOptions.activities}
          value={activity}
          onChange={setActivity}
        />
        <PillGroup label="When" options={questDemoOptions.times} value={time} onChange={setTime} />
        <PillGroup
          label="Where"
          options={questDemoOptions.locations.map((l) => l.label)}
          value={locationLabel}
          onChange={setLocationLabel}
        />
        <PillGroup
          label="Audience"
          options={questDemoOptions.audiences}
          value={audience}
          onChange={setAudience}
        />

        <div className="mt-1 flex items-center gap-4">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-[color:var(--quest)] px-4 py-2.5 text-sm font-medium text-[color:var(--quest-fg)] transition-opacity hover:opacity-90"
          >
            Post Quest
          </button>
          {posted && (
            <button
              type="button"
              onClick={handleReset}
              className="text-sm font-medium text-muted transition-colors hover:text-fg"
            >
              Reset
            </button>
          )}
        </div>
      </form>

      <div className="flex flex-col items-center justify-center">
        <svg
          viewBox="0 0 300 180"
          role="img"
          aria-labelledby={titleId}
          className="w-full max-w-xs"
        >
          <title id={titleId}>
            {posted
              ? `Simplified campus map with the new quest pinned at ${location.mapLabel}`
              : "Simplified campus map, no quest posted yet"}
          </title>
          <path
            d="M92 60 L198 36 M198 36 L148 132 M148 132 L92 60"
            stroke="var(--border)"
            strokeDasharray="3 4"
            strokeWidth="1"
            fill="none"
          />
          {questDemoOptions.locations.map((l) => {
            const active = posted && l.label === locationLabel;
            const p = LOCATION_POINTS[l.mapLabel];
            return (
              <g key={l.label}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={active ? 6 : 3.5}
                  fill={active ? "var(--quest)" : "var(--subtle)"}
                />
                <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize="9" fill="var(--muted)">
                  {l.mapLabel}
                </text>
              </g>
            );
          })}
        </svg>

        <div aria-live="polite" className="mt-5 w-full max-w-xs">
          {posted ? (
            <div className="quest-card-in rounded-xl border border-[color:var(--quest-border)] bg-[color:var(--quest-soft)] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--quest)]">
                {time} · Visible to {audience}
              </p>
              <p className="mt-1.5 text-sm font-semibold text-fg">{activity}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                <MapPinIcon className="size-3.5 shrink-0" />
                {location.label}
              </p>
            </div>
          ) : (
            <p className="text-center text-xs text-subtle">
              Choose a few options and post to see a quest appear on the map.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
