"use client";

import { useRef, useState } from "react";
import type { OperatingState } from "@/data/centrifuge-case-study";
import { operatingStates } from "@/data/centrifuge-case-study";
import { cn } from "@/lib/utils";

const ORDER: OperatingState[] = ["ready", "active", "complete"];
const STATE_VAR: Record<OperatingState, string> = {
  ready: "--cf-ready",
  active: "--cf-active",
  complete: "--cf-complete",
};

function playTone(ctx: AudioContext, freq: number, delayMs: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.value = 0.035;
  osc.connect(gain);
  gain.connect(ctx.destination);
  const startAt = ctx.currentTime + delayMs / 1000;
  osc.start(startAt);
  osc.stop(startAt + 0.14);
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

// This is a portfolio demonstration of the notification logic, not a
// simulation of real rotor physics — advancing phases is manual, not a live
// countdown. Sound only ever plays in direct response to a click.
export function OperatingCycleDemo() {
  const [stateIndex, setStateIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [mode, setMode] = useState<"time" | "speed">("time");
  const [timeValue, setTimeValue] = useState(10);
  const [speedValue, setSpeedValue] = useState(1500);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const current = operatingStates[stateIndex];
  const isReady = current.key === "ready";

  function ensureContext() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }

  function cueFor(state: OperatingState) {
    if (muted) return;
    try {
      const ctx = ensureContext();
      if (state === "active") playTone(ctx, 880, 0);
      if (state === "complete") {
        playTone(ctx, 660, 0);
        playTone(ctx, 880, 160);
      }
    } catch {
      // Web Audio unavailable — visual and LCD state still update normally.
    }
  }

  function goToState(index: number) {
    setStateIndex(index);
    cueFor(ORDER[index]);
  }

  function handleStart() {
    goToState(1);
  }
  function handleAdvance() {
    goToState((stateIndex + 1) % ORDER.length);
  }
  function handleReset() {
    setStateIndex(0);
    setTimeValue(10);
    setSpeedValue(1500);
  }

  const lcdText =
    current.key === "active"
      ? `Running · ${mode === "time" ? `${pad(timeValue)}:00` : `${speedValue} RPM`}`
      : current.lcdText;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div
            className="rounded-xl border-2 px-5 py-4 font-mono text-base"
            style={{
              borderColor: `var(${STATE_VAR[current.key]})`,
              color: `var(${STATE_VAR[current.key]})`,
              backgroundColor: `color-mix(in oklab, var(${STATE_VAR[current.key]}) 8%, transparent)`,
            }}
          >
            {lcdText}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span
              aria-hidden="true"
              className="size-2.5 rounded-full"
              style={{ backgroundColor: `var(${STATE_VAR[current.key]})` }}
            />
            <span className="text-sm font-semibold" style={{ color: `var(${STATE_VAR[current.key]})` }}>
              {current.label}
            </span>
          </div>

          <ul className="mt-4 space-y-1.5">
            {current.behavior.map((b) => (
              <li
                key={b}
                className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-accent/60"
              >
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleStart}
              className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              Start simulation
            </button>
            <button
              type="button"
              onClick={handleAdvance}
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-fg"
            >
              Advance phase
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-fg"
            >
              Reset
            </button>
            <button
              type="button"
              aria-pressed={muted}
              onClick={() => setMuted((m) => !m)}
              className="ml-auto flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-fg"
            >
              <svg viewBox="0 0 24 12" width="20" height="10" aria-hidden="true">
                <path
                  d="M0 6 H4 L7 1 V11 L4 6 H0 Z M9 6 L12 2 V10 Z M15 6 L18 3 V9 Z"
                  fill="currentColor"
                  opacity={muted ? 0.3 : 1}
                />
              </svg>
              {muted ? "Unmute" : "Mute"}
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface-2 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Setup controls</p>
          <div className="mt-3 flex gap-2" role="group" aria-label="Mode">
            {(["time", "speed"] as const).map((m) => (
              <button
                key={m}
                type="button"
                disabled={!isReady}
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                  mode === m ? "border-accent/40 bg-accent/10 text-accent-strong" : "border-border text-muted hover:text-fg",
                )}
              >
                {m === "time" ? "Time" : "Speed"}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              disabled={!isReady}
              onClick={() => (mode === "time" ? setTimeValue((v) => Math.max(1, v - 1)) : setSpeedValue((v) => Math.max(500, v - 100)))}
              className="flex size-9 items-center justify-center rounded-lg border border-border text-fg transition-colors hover:border-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Decrease"
            >
              −
            </button>
            <span className="min-w-24 text-center font-mono text-lg text-fg">
              {mode === "time" ? `${timeValue} min` : `${speedValue} RPM`}
            </span>
            <button
              type="button"
              disabled={!isReady}
              onClick={() => (mode === "time" ? setTimeValue((v) => Math.min(15, v + 1)) : setSpeedValue((v) => Math.min(2500, v + 100)))}
              className="flex size-9 items-center justify-center rounded-lg border border-border text-fg transition-colors hover:border-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Increase"
            >
              +
            </button>
          </div>
          <p className="mt-2 text-xs text-subtle">
            {isReady ? "Adjustable while the device is in Ready." : "Locked while a run is active or complete."}
          </p>

          <p aria-live="polite" className="mt-6 text-sm leading-relaxed text-muted">
            Current state: <strong className="text-fg">{current.label}</strong>. LCD reads &ldquo;{lcdText}&rdquo;.
          </p>
        </div>
      </div>
    </div>
  );
}
