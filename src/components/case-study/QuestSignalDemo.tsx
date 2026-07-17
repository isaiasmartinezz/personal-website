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
  "Green Library": { x: 210, y: 52 },
  Tresidder: { x: 88, y: 78 },
  Arrillaga: { x: 152, y: 158 },
};

// Solid teardrop pin, traced from the site's MapPinIcon path but re-based so
// the tip sits at the origin — lets each pin be positioned with a plain
// translate instead of fiddling with icon offsets.
const PIN_PATH = "M0,0 S7,-6.2 7,-11 A7,7 0 1 0 -7,-11 C-7,-6.2 0,0 0,0 Z";

function MapPin({ x, y, active }: { x: number; y: number; active: boolean }) {
  const scale = active ? 1.15 : 0.85;
  return (
    <g>
      <ellipse cx={x} cy={y + 2} rx={6 * scale} ry={2} fill="#000000" opacity={0.14} />
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d={PIN_PATH} fill={active ? "var(--quest)" : "var(--subtle)"} />
        <circle cx="0" cy="-11" r="2.6" fill="var(--quest-map-bg)" />
      </g>
    </g>
  );
}

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
        <div className="w-full max-w-xs overflow-hidden rounded-xl border border-border">
          <svg viewBox="0 0 300 200" role="img" aria-labelledby={titleId} className="w-full">
            <title id={titleId}>
              {posted
                ? `Simplified campus map with the new quest pinned at ${location.mapLabel}`
                : "Simplified campus map, no quest posted yet"}
            </title>

            <rect x="0" y="0" width="300" height="200" fill="var(--quest-map-bg)" />

            {/* Streets */}
            <g stroke="var(--quest-map-road)" strokeWidth="7" strokeLinecap="round">
              <line x1="-10" y1="120" x2="310" y2="95" />
              <line x1="60" y1="-10" x2="120" y2="210" />
              <line x1="230" y1="-10" x2="190" y2="210" />
            </g>
            <g stroke="var(--quest-map-road-border)" strokeWidth="7" strokeLinecap="round" opacity={0.5}>
              <line x1="-10" y1="120" x2="310" y2="95" strokeWidth="0.75" />
              <line x1="60" y1="-10" x2="120" y2="210" strokeWidth="0.75" />
              <line x1="230" y1="-10" x2="190" y2="210" strokeWidth="0.75" />
            </g>

            {/* Quad / green space */}
            <path
              d="M100,55 C130,40 175,42 190,65 C205,88 195,120 165,128 C130,137 95,120 88,90 C85,75 88,63 100,55 Z"
              fill="var(--quest-map-green)"
            />

            {/* Building blocks */}
            <rect x="30" y="130" width="34" height="24" rx="3" fill="var(--quest-map-building)" />
            <rect x="220" y="120" width="30" height="40" rx="3" fill="var(--quest-map-building)" />
            <rect x="235" y="30" width="28" height="22" rx="3" fill="var(--quest-map-building)" />

            {/* Current-location marker */}
            <circle cx="150" cy="105" r="10" fill="var(--accent)" opacity={0.16} />
            <circle cx="150" cy="105" r="4" fill="var(--accent)" stroke="var(--quest-map-bg)" strokeWidth="1.5" />

            {questDemoOptions.locations.map((l) => {
              const active = posted && l.label === locationLabel;
              const p = LOCATION_POINTS[l.mapLabel];
              return <MapPin key={l.label} x={p.x} y={p.y} active={active} />;
            })}

            {questDemoOptions.locations.map((l) => {
              const p = LOCATION_POINTS[l.mapLabel];
              return (
                <text
                  key={l.label}
                  x={p.x}
                  y={p.y - 20}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight={600}
                  fill="var(--fg)"
                  stroke="var(--quest-map-bg)"
                  strokeWidth="3"
                  paintOrder="stroke"
                >
                  {l.mapLabel}
                </text>
              );
            })}
          </svg>
        </div>

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
