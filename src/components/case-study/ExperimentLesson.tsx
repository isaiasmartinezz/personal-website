import type { ExperimentLessonEntry } from "@/data/gpt2-case-study";
import type { ChallengeEntry as FontanChallengeEntry } from "@/data/fontan-case-study";
import type { ChallengeEntry as CentrifugeChallengeEntry } from "@/data/centrifuge-case-study";

export function ExperimentLesson({
  entries,
}: {
  entries: (ExperimentLessonEntry | FontanChallengeEntry | CentrifugeChallengeEntry)[];
}) {
  return (
    <div className="space-y-6">
      {entries.map((c, i) => (
        <div key={c.title} className="rounded-xl border border-border bg-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-subtle">
            Challenge {i + 1}
          </p>
          <h3 className="mt-1.5 text-lg font-semibold text-fg">{c.title}</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">Decision</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.decision}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Lesson</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.lesson}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
