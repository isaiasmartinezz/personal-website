import type { ExperienceEntry, ExperienceType } from "@/lib/types";
import { cn } from "@/lib/utils";

// A compact Gantt-style visual showing how roles overlap in time — the
// reverse-chronological list below tells the same story in full detail, so
// this is purely a decorative "at a glance" supplement (aria-hidden).
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const typeLabel: Record<ExperienceType, string> = {
  industry: "Industry",
  research: "Research",
  teaching: "Teaching",
  other: "Other",
};

// Every date is reduced to a single absolute month index (year * 12 + month)
// so all comparisons/positioning are plain integer arithmetic.
function monthIndex(label: string, nowIndex: number): number {
  if (label === "Present") return nowIndex;
  const [mon, yearStr] = label.split(" ");
  return Number(yearStr) * 12 + MONTHS.indexOf(mon);
}

export function ExperienceTimeline({ items }: { items: ExperienceEntry[] }) {
  const today = new Date();
  const nowIndex = today.getFullYear() * 12 + today.getMonth();

  const parsed = items.map((job) => ({
    job,
    startIdx: monthIndex(job.start, nowIndex),
    endIdx: monthIndex(job.end, nowIndex),
  }));

  const earliest = Math.min(...parsed.map((p) => p.startIdx));
  const totalMonths = Math.max(...parsed.map((p) => p.endIdx)) - earliest + 1;

  // Oldest-first so the timeline reads left-to-right like a calendar.
  const sorted = [...parsed].sort((a, b) => a.startIdx - b.startIdx);

  // Year gridlines/labels, one per January that falls inside the range.
  const years: { label: string; leftPct: number }[] = [];
  const startYear = Math.floor(earliest / 12);
  const endYear = Math.floor((earliest + totalMonths) / 12);
  for (let y = startYear; y <= endYear; y++) {
    const offset = y * 12 - earliest;
    if (offset >= 0 && offset <= totalMonths) {
      years.push({ label: String(y), leftPct: (offset / totalMonths) * 100 });
    }
  }

  return (
    <div aria-hidden="true" className="hidden overflow-x-auto sm:block">
      <div className="min-w-[640px]">
        {sorted.map(({ job, startIdx, endIdx }) => {
          const left = ((startIdx - earliest) / totalMonths) * 100;
          const width = Math.max(((endIdx - startIdx) / totalMonths) * 100, 1.2);
          return (
            <div key={`${job.organization}-${job.title}`} className="flex items-center gap-3 py-1">
              <div
                className="w-52 shrink-0 truncate text-xs text-subtle"
                title={`${job.title} — ${job.organization}`}
              >
                <span className="text-fg">{job.organization}</span>
                <span className="ml-1.5 text-subtle">· {typeLabel[job.type]}</span>
              </div>
              <div className="relative h-5 flex-1 rounded bg-surface-2">
                <div
                  className={cn(
                    "absolute inset-y-0 rounded",
                    job.end === "Present" ? "bg-accent" : "bg-accent/50",
                  )}
                  style={{ left: `${left}%`, width: `${width}%` }}
                  title={`${job.start} – ${job.end}`}
                />
              </div>
            </div>
          );
        })}

        <div className="mt-2 flex items-center gap-3">
          <div className="w-52 shrink-0" aria-hidden="true" />
          <div className="relative h-4 flex-1 border-t border-border">
            {years.map((y) => (
              <span
                key={y.label}
                className="absolute top-1.5 -translate-x-1/2 text-[11px] text-subtle"
                style={{ left: `${y.leftPct}%` }}
              >
                {y.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
