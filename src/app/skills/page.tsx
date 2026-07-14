import type { Metadata } from "next";
import { skills } from "@/data/skills";
import { site } from "@/data/site";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Skills",
  description: `Technical skills of ${site.name} — languages, frameworks, tools, and domains.`,
};

export default function SkillsPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Skills"
        title="Tools of the trade"
        lead="What I reach for, grouped by kind. Depth varies — happy to talk specifics."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal
            key={group.name}
            delay={i * 70}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
              {group.name}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-sm font-medium text-fg"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
