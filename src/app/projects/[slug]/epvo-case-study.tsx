import Link from "next/link";
import { projects } from "@/data/projects";
import {
  header,
  metrics,
  clinicalNeed,
  designResponse,
  pathwayComparison,
  systemStages,
  milestones,
  constraints,
  pipelineStages,
  results,
  resultsConclusions,
  demonstrated,
  remaining,
  contributions,
  challenges,
  sectionNav,
} from "@/data/epvo-case-study";
import { Tag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon } from "@/components/Icons";
import { ProjectMetricStrip } from "@/components/case-study/ProjectMetricStrip";
import { SystemWorkflow } from "@/components/case-study/SystemWorkflow";
import { ProjectSectionNav } from "@/components/case-study/ProjectSectionNav";
import { ProjectTimeline } from "@/components/case-study/ProjectTimeline";
import { ConstraintTable } from "@/components/case-study/ConstraintTable";
import { SignalPipeline } from "@/components/case-study/SignalPipeline";
import { ResultsComparison } from "@/components/case-study/ResultsComparison";
import { ContributionList } from "@/components/case-study/ContributionList";

// Wider shell than the site's default Container (max-w-5xl / 1024px) — this
// page is deliberately given more room, per the case-study design brief.
function Shell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h2>
    </div>
  );
}

const project = projects.find((p) => p.slug === "neonatal-photoacoustic-oximeter")!;

const featuredProjects = projects.filter((p) => p.featured);
const ownIndex = featuredProjects.findIndex((p) => p.slug === project.slug);
const prevProject = ownIndex > 0 ? featuredProjects[ownIndex - 1] : undefined;
const nextProject =
  ownIndex >= 0 && ownIndex < featuredProjects.length - 1
    ? featuredProjects[ownIndex + 1]
    : undefined;

export function EPVOCaseStudy() {
  return (
    <div className="pb-20 pt-10 sm:pt-14">
      {/* ---------------- Header ---------------- */}
      <Shell>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          <ArrowRightIcon className="size-4 rotate-180" />
          All projects
        </Link>

        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            {header.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{header.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{header.intro}</p>
        </div>

        {project.image && (
          <figure className="mt-10">
            <div className="overflow-hidden rounded-xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.imageAlt ?? header.title}
                className="w-full"
              />
            </div>
            <figcaption className="mt-3 text-sm text-subtle">{header.heroCaption}</figcaption>
          </figure>
        )}
      </Shell>

      {/* ---------------- At-a-glance metrics ---------------- */}
      <Shell className="mt-12">
        <Reveal>
          <ProjectMetricStrip metrics={metrics} />
        </Reveal>
      </Shell>

      {/* ---------------- Section nav ---------------- */}
      <Shell className="mt-10">
        <ProjectSectionNav items={sectionNav} />
      </Shell>

      {/* ---------------- Clinical problem & design response ---------------- */}
      <Shell className="mt-14">
        <div id="overview" className="scroll-mt-32">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12">
            <div>
              <h2 className="text-2xl font-semibold">{clinicalNeed.heading}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{clinicalNeed.body}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{designResponse.heading}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{designResponse.body}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 rounded-xl border border-border bg-surface p-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-subtle">
                {pathwayComparison.current.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {pathwayComparison.current.description}
              </p>
            </div>
            <div className="sm:border-l sm:border-border sm:pl-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                {pathwayComparison.proposed.label}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {pathwayComparison.proposed.steps.map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="text-sm font-medium text-fg">{step}</span>
                    {i < pathwayComparison.proposed.steps.length - 1 && (
                      <ArrowRightIcon aria-hidden="true" className="size-3.5 text-subtle" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Shell>

      {/* ---------------- How the system works ---------------- */}
      <Shell className="mt-20">
        <div id="system" className="scroll-mt-32">
          <SectionHeading eyebrow="System" title="How the system works" />
          <Reveal>
            <SystemWorkflow stages={systemStages} />
          </Reveal>
        </div>
      </Shell>

      {/* ---------------- Milestone timeline ---------------- */}
      <Shell className="mt-20">
        <div id="timeline" className="scroll-mt-32">
          <SectionHeading eyebrow="Development" title="Four staged milestones" />
          <ProjectTimeline milestones={milestones} />
        </div>
      </Shell>

      {/* ---------------- Constraints ---------------- */}
      <Shell className="mt-20">
        <div id="constraints" className="scroll-mt-32">
          <SectionHeading eyebrow="Constraints" title="Designing within neonatal constraints" />
          <ConstraintTable rows={constraints} />
        </div>
      </Shell>

      {/* ---------------- Signal-processing pipeline ---------------- */}
      <Shell className="mt-20">
        <div id="pipeline" className="scroll-mt-32">
          <SectionHeading eyebrow="Analysis" title="Signal-processing pipeline" />
          <p className="mb-6 max-w-2xl text-sm text-muted">
            The final experimental processing sequence, from raw oscilloscope traces to
            statistical comparison. Tap a stage for a one-line explanation.
          </p>
          <SignalPipeline stages={pipelineStages} />
        </div>
      </Shell>

      {/* ---------------- Results ---------------- */}
      <Shell className="mt-20">
        <div id="results" className="scroll-mt-32">
          <SectionHeading eyebrow="Results" title="What the experiments showed" />
          <Reveal>
            <ResultsComparison hemoglobin={results.hemoglobin} fibrinogen={results.fibrinogen} />
          </Reveal>
          <ul className="mt-8 max-w-2xl space-y-3">
            {resultsConclusions.map((c, i) => (
              <li
                key={i}
                className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-accent/60"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Shell>

      {/* ---------------- Contributions ---------------- */}
      <Shell className="mt-20">
        <div id="contributions" className="scroll-mt-32">
          <SectionHeading eyebrow="My role" title="My contributions" />
          <p className="mb-6 max-w-2xl text-sm text-muted">
            This was a five-person team effort. The contributions below describe what I
            personally worked on within that team, not sole ownership of the project.
          </p>
          <ContributionList items={contributions} />
        </div>
      </Shell>

      {/* ---------------- Challenges & decisions ---------------- */}
      <Shell className="mt-20">
        <SectionHeading eyebrow="Engineering judgment" title="Technical challenges and decisions" />
        <div className="space-y-6">
          {challenges.map((c, i) => (
            <div key={c.title} className="rounded-xl border border-border bg-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-subtle">
                Challenge {i + 1}
              </p>
              <h3 className="mt-1.5 text-lg font-semibold text-fg">{c.title}</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    Decision
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.decision}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-subtle">
                    Why it mattered
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.whyItMattered}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Shell>

      {/* ---------------- Key learning & next steps ---------------- */}
      <Shell className="mt-20">
        <div id="next-steps" className="scroll-mt-32">
          <SectionHeading eyebrow="Reflection" title="What we learned and what comes next" />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-subtle">
                What we demonstrated
              </h3>
              <ul className="mt-3 space-y-2.5">
                {demonstrated.map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-accent/60"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-subtle">
                What remains
              </h3>
              <ul className="mt-3 space-y-2.5">
                {remaining.map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:border before:border-subtle"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-subtle">
            Taken together, this capstone was a successful de-risking effort: it established
            technical feasibility questions across simulation, anatomy, and hardware, and
            defined the specific validation work still required before oxygen saturation
            itself can be measured experimentally.
          </p>
        </div>
      </Shell>

      {/* ---------------- Tech & topics ---------------- */}
      <Shell className="mt-20">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-subtle">
          Tech &amp; topics
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
      </Shell>

      {/* ---------------- Prev / next project ---------------- */}
      {(prevProject || nextProject) && (
        <Shell className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex flex-col text-left"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-subtle">
                  <ArrowRightIcon className="size-3.5 rotate-180" />
                  Previous
                </span>
                <span className="mt-1 text-base font-medium text-fg transition-colors group-hover:text-accent">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex flex-col text-left sm:text-right"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-subtle sm:justify-end">
                  Next
                  <ArrowRightIcon className="size-3.5" />
                </span>
                <span className="mt-1 text-base font-medium text-fg transition-colors group-hover:text-accent">
                  {nextProject.title}
                </span>
              </Link>
            )}
          </div>
        </Shell>
      )}
    </div>
  );
}
