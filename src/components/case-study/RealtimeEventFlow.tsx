import type { EventTraceStep } from "@/data/coquest-case-study";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

// A lane-tagged, once-only-animated event trace (via Reveal, which already
// disconnects its observer after firing and is neutralized for reduced
// motion) — a lightweight stand-in for a full sequence diagram.
const LANE_STYLES: Record<string, string> = {
  "Host device": "border-accent/40 bg-accent/5 text-accent-strong",
  Firestore: "border-[color:var(--quest-border)] bg-[color:var(--quest-soft)] text-fg",
  "Audience profiles": "border-[color:var(--quest-border)] bg-[color:var(--quest-soft)] text-fg",
  Listener: "border-dashed border-accent/50 text-accent-strong",
  "Map/dashboard": "border-accent/40 bg-accent/5 text-accent-strong",
};

function EventTrace({ steps, title }: { steps: EventTraceStep[]; title: string }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-subtle">{title}</h3>
      <ol className="relative mt-5 space-y-5 border-l border-border pl-6">
        {steps.map((step, i) => (
          <Reveal as="li" key={step.description} delay={i * 60} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[29px] top-1.5 size-2 rounded-full bg-border"
            />
            <span
              className={cn(
                "inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium",
                LANE_STYLES[step.lane] ?? "border-border text-muted",
              )}
            >
              {step.lane}
            </span>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.description}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export function RealtimeEventFlow({
  postTrace,
  rsvpTrace,
  rsvpNote,
}: {
  postTrace: EventTraceStep[];
  rsvpTrace: EventTraceStep[];
  rsvpNote: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <EventTrace steps={postTrace} title="What happens when someone posts?" />
      <div>
        <EventTrace steps={rsvpTrace} title="What happens when someone joins?" />
        <p className="mt-4 text-xs leading-relaxed text-subtle">{rsvpNote}</p>
      </div>
    </div>
  );
}
