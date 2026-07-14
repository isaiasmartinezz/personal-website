import type { Metadata } from "next";
import { education } from "@/data/education";
import { site } from "@/data/site";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { GraduationCapIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Education",
  description: `Education of ${site.name} — degrees, coursework, and honors.`,
};

export default function EducationPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Education"
        title="Education"
        lead="Degrees, relevant coursework, and honors."
      />

      <div className="mt-12 max-w-3xl space-y-6">
        {education.map((ed, i) => (
          <Reveal
            key={`${ed.institution}-${ed.degree}`}
            delay={i * 70}
            className="rounded-xl border border-border bg-surface p-6 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <span className="mt-1 hidden shrink-0 rounded-lg border border-border bg-surface-2 p-2.5 text-accent sm:block">
                <GraduationCapIcon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="text-lg font-semibold">
                    {ed.degree}, {ed.field}
                  </h2>
                  <span className="text-sm text-subtle">
                    {ed.start} – {ed.end}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">
                  <span className="font-medium text-fg">{ed.institution}</span>
                  {ed.location && <span> · {ed.location}</span>}
                  {ed.gpa && <span> · GPA {ed.gpa}</span>}
                </p>

                {ed.thesis && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    <span className="font-medium text-fg">Thesis: </span>
                    {ed.thesis}
                  </p>
                )}

                {ed.honors && ed.honors.length > 0 && (
                  <div className="mt-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-subtle">
                      Honors
                    </h3>
                    <ul className="mt-1.5 flex flex-wrap gap-2">
                      {ed.honors.map((h) => (
                        <li
                          key={h}
                          className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent-strong"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {ed.coursework && ed.coursework.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-subtle">
                      Selected coursework
                    </h3>
                    <ul className="mt-1.5 flex flex-wrap gap-1.5">
                      {ed.coursework.map((c) => (
                        <li
                          key={c}
                          className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
