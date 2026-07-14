import type { ExperienceEntry, ExperienceType } from "@/lib/types";
import { Tag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ExternalLinkIcon } from "@/components/Icons";

const typeLabel: Record<ExperienceType, string> = {
  industry: "Industry",
  research: "Research",
  teaching: "Teaching",
  other: "Other",
};

function TypePill({ type }: { type: ExperienceType }) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent-strong">
      {typeLabel[type]}
    </span>
  );
}

// A left-timeline list of roles. Each entry animates in as it enters view.
export function ExperienceList({ items }: { items: ExperienceEntry[] }) {
  return (
    <ol className="relative space-y-10 border-l border-border pl-6 sm:pl-8">
      {items.map((job, i) => (
        <Reveal as="li" key={`${job.organization}-${job.title}`} delay={i * 60}>
          <span
            aria-hidden="true"
            className="absolute -left-[6.5px] mt-1.5 size-3 rounded-full border-2 border-page bg-accent"
          />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <TypePill type={job.type} />
          </div>

          <p className="mt-1 text-sm text-muted">
            {job.href ? (
              <a
                href={job.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-fg hover:text-accent"
              >
                {job.organization}
                <ExternalLinkIcon className="size-3.5" />
              </a>
            ) : (
              <span className="font-medium text-fg">{job.organization}</span>
            )}
            {job.location && <span> · {job.location}</span>}
          </p>

          <p className="mt-0.5 text-sm text-subtle">
            {job.start} – {job.end}
          </p>

          {job.summary && (
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {job.summary}
            </p>
          )}

          <ul className="mt-3 space-y-2">
            {job.highlights.map((h, hi) => (
              <li
                key={hi}
                className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2.5 before:size-1.5 before:rounded-full before:bg-accent/60"
              >
                {h}
              </li>
            ))}
          </ul>

          {job.tech && job.tech.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {job.tech.map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      ))}
    </ol>
  );
}
