"use client";

import { useId, useState } from "react";
import { questDemoOptions } from "@/data/coquest-case-study";

// Lightweight portfolio interaction demonstrating the product concept — not
// the actual app. Local component state only, no network calls, no data
// collected. All controls are native <select>/<button> elements so keyboard
// and screen-reader support come for free.
const LOCATION_POINTS: Record<string, { x: number; y: number }> = {
  Tresidder: { x: 92, y: 60 },
  "Green Library": { x: 198, y: 36 },
  Arrillaga: { x: 148, y: 132 },
};

export function QuestSignalDemo() {
  const [activity, setActivity] = useState(questDemoOptions.activities[0]);
  const [time, setTime] = useState(questDemoOptions.times[0]);
  const [audience, setAudience] = useState(questDemoOptions.audiences[0]);
  const [location, setLocation] = useState(questDemoOptions.locations[0]);
  const [posted, setPosted] = useState(false);
  const titleId = useId();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPosted(true);
  }

  function handleReset() {
    setPosted(false);
    setActivity(questDemoOptions.activities[0]);
    setTime(questDemoOptions.times[0]);
    setAudience(questDemoOptions.audiences[0]);
    setLocation(questDemoOptions.locations[0]);
  }

  const selectClasses =
    "rounded-lg border border-border bg-page px-3 py-2 text-sm text-fg focus-visible:outline-2 focus-visible:outline-[color:var(--quest)]";

  return (
    <div className="grid grid-cols-1 gap-8 rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-4">
          <legend className="text-sm font-semibold text-fg">Broadcast a quest</legend>
          <p className="-mt-1 text-xs leading-relaxed text-subtle">
            A lightweight demo of the interaction — not the live app, and nothing you enter is
            collected or sent anywhere.
          </p>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-fg">Activity</span>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className={selectClasses}
            >
              {questDemoOptions.activities.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-fg">Time</span>
            <select value={time} onChange={(e) => setTime(e.target.value)} className={selectClasses}>
              {questDemoOptions.times.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-fg">Audience</span>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className={selectClasses}
            >
              {questDemoOptions.audiences.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-fg">Location</span>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={selectClasses}
            >
              {questDemoOptions.locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>
        </fieldset>

        <div className="mt-1 flex items-center gap-4">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-[color:var(--quest)] px-4 py-2.5 text-sm font-medium text-[color:var(--quest-fg)] transition-opacity hover:opacity-90"
          >
            Post quest
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
              ? `Simplified campus map with the new quest pinned at ${location}`
              : "Simplified campus map, no quest posted yet"}
          </title>
          <path
            d="M92 60 L198 36 M198 36 L148 132 M148 132 L92 60"
            stroke="var(--border)"
            strokeDasharray="3 4"
            strokeWidth="1"
            fill="none"
          />
          {Object.entries(LOCATION_POINTS).map(([name, p]) => {
            const active = posted && name === location;
            return (
              <g key={name}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={active ? 6 : 3.5}
                  fill={active ? "var(--quest)" : "var(--subtle)"}
                />
                <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize="9" fill="var(--muted)">
                  {name}
                </text>
              </g>
            );
          })}
        </svg>

        <div aria-live="polite" className="mt-5 w-full max-w-xs">
          {posted ? (
            <div className="quest-card-in rounded-xl border border-[color:var(--quest-border)] bg-[color:var(--quest-soft)] p-4">
              <p className="text-sm font-semibold text-fg">{activity}</p>
              <p className="mt-1 text-xs text-muted">
                {location} · {time}
              </p>
              <p className="mt-1 text-xs text-muted">Shared with: {audience}</p>
            </div>
          ) : (
            <p className="text-center text-xs text-subtle">
              Fill out the form and post to see a quest appear on the map.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
