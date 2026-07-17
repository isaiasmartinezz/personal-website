"use client";

import { useEffect, useState } from "react";
import type { Milestone } from "@/data/epvo-case-study";
import { MilestoneEntry } from "@/components/case-study/MilestoneEntry";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

// Desktop: a sticky milestone index rail tracks scroll position alongside
// the full entries. Mobile: a plain stacked list, no sticky rail (per the
// site's mobile guidance — sticky rails just eat vertical space there).
export function ProjectTimeline({ milestones }: { milestones: Milestone[] }) {
  const [active, setActive] = useState(milestones[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-112px 0px -55% 0px", threshold: 0 },
    );
    const elements = milestones
      .map((m) => document.getElementById(m.id))
      .filter((el): el is HTMLElement => el !== null);
    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [milestones]);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[180px_1fr] lg:gap-12">
      <div className="hidden lg:block">
        <ol className="sticky top-32 space-y-1 border-l border-border pl-4">
          {milestones.map((m) => (
            <li key={m.id}>
              <a
                href={`#${m.id}`}
                aria-current={active === m.id ? "true" : undefined}
                className={cn(
                  "block py-2 text-sm transition-colors",
                  active === m.id ? "font-semibold text-accent" : "text-muted hover:text-fg",
                )}
              >
                <span className="block text-xs uppercase tracking-wide text-subtle">
                  {m.status}
                </span>
                Milestone {m.number}
              </a>
            </li>
          ))}
        </ol>
      </div>

      <ol className="space-y-14">
        {milestones.map((m, i) => (
          <Reveal as="li" key={m.id} delay={i * 70}>
            <MilestoneEntry milestone={m} />
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
