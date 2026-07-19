import Link from "next/link";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { projects } from "@/data/projects";
import {
  header,
  activitySignals,
  metrics,
  metricsFootnote,
  coordinationSpectrum,
  coordinationNote,
  questCardExample,
  questCallouts,
  lifecycleStages,
  walkthroughStages,
  behaviorPrinciples,
  creationTimeComparison,
  architectureFlow,
  locationFlow,
  applicationAreas,
  reusableComponents,
  postEventTrace,
  rsvpEventTrace,
  rsvpNote,
  dataEntities,
  dataRelationships,
  pilotDays,
  pilotMetricsTable,
  pilotNote,
  pyramidLevels,
  pyramidInsight,
  pyramidSecondaryInsight,
  theoryFindings,
  trustRows,
  contributionGroups,
  tensions,
  futureExperiments,
  sectionNav,
} from "@/data/coquest-case-study";
import { Tag, LinkButton } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon, ProjectLinkIcon } from "@/components/Icons";
import { ProjectMetricStrip } from "@/components/case-study/ProjectMetricStrip";
import { ProjectSectionNav } from "@/components/case-study/ProjectSectionNav";
import { CampusActivityHero } from "@/components/case-study/CampusActivityHero";
import { QuestSignalDemo } from "@/components/case-study/QuestSignalDemo";
import { CoordinationSpectrum } from "@/components/case-study/CoordinationSpectrum";
import { QuestLifecycle } from "@/components/case-study/QuestLifecycle";
import { ProductWalkthrough } from "@/components/case-study/ProductWalkthrough";
import { BehaviorPrinciples } from "@/components/case-study/BehaviorPrinciples";
import { SystemArchitecture } from "@/components/case-study/SystemArchitecture";
import { RealtimeEventFlow } from "@/components/case-study/RealtimeEventFlow";
import { ProjectDataModel } from "@/components/case-study/ProjectDataModel";
import { PilotTimeline } from "@/components/case-study/PilotTimeline";
import { ParticipationPyramid } from "@/components/case-study/ParticipationPyramid";
import { TheoryFindingGrid } from "@/components/case-study/TheoryFindingGrid";
import { TrustTable } from "@/components/case-study/TrustTable";
import { ContributionSection } from "@/components/case-study/ContributionSection";
import { ProductTension } from "@/components/case-study/ProductTension";

// Wider shell than the site's default Container (max-w-5xl / 1024px), matching
// the other custom case-study page.
function Shell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--quest)]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h2>
    </div>
  );
}

const project = projects.find((p) => p.slug === "coquest")!;

const featuredProjects = projects.filter((p) => p.featured);
const ownIndex = featuredProjects.findIndex((p) => p.slug === project.slug);
const prevProject = ownIndex > 0 ? featuredProjects[ownIndex - 1] : undefined;
const nextProject =
  ownIndex >= 0 && ownIndex < featuredProjects.length - 1
    ? featuredProjects[ownIndex + 1]
    : undefined;

export function CoQuestCaseStudy() {
  return (
    <div className="quest-accent pb-20 pt-10 sm:pt-14">
      <ReadingProgressBar />
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
          <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--quest)]">
            {header.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{header.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{header.intro}</p>
          <p className="mt-4 text-base leading-relaxed text-muted">{header.description}</p>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-10">
          {header.meta.map((item) => (
            <div key={item.label}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-subtle">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-fg">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <LinkButton key={link.label + link.href} href={link.href} variant="secondary">
              <ProjectLinkIcon type={link.type} className="size-4" />
              {link.label}
            </LinkButton>
          ))}
        </div>

        {/* ---------------- Hero ---------------- */}
        {project.image && (
          <div className="mt-10">
            <Reveal>
              <CampusActivityHero
                image={project.image}
                imageAlt={project.imageAlt ?? header.title}
                caption={header.heroCaption}
                signals={activitySignals}
              />
            </Reveal>
          </div>
        )}

        {/* ---------------- Mock "Broadcast a quest" demo ---------------- */}
        <div className="mt-12">
          <Reveal>
            <QuestSignalDemo />
          </Reveal>
        </div>
      </Shell>

      {/* ---------------- Pilot metrics ---------------- */}
      <Shell className="mt-12">
        <Reveal>
          <ProjectMetricStrip metrics={metrics} />
        </Reveal>
        <p className="mt-4 text-xs text-subtle">{metricsFootnote}</p>
      </Shell>

      {/* ---------------- Section nav ---------------- */}
      <Shell className="mt-10">
        <ProjectSectionNav items={sectionNav} />
      </Shell>

      {/* ---------------- The coordination gap ---------------- */}
      <Shell className="mt-16">
        <div id="overview" className="scroll-mt-32">
          <SectionHeading
            eyebrow="Overview"
            title="The space between a group chat and a calendar invite"
          />
          <CoordinationSpectrum columns={coordinationSpectrum} />
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">{coordinationNote}</p>
        </div>
      </Shell>

      {/* ---------------- The core interaction ---------------- */}
      <Shell className="mt-20">
        <div id="interaction" className="scroll-mt-32">
          <SectionHeading eyebrow="Interaction" title="Quests as signals" />
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
            <div className="rounded-2xl border border-[color:var(--quest-border)] bg-[color:var(--quest-soft)] p-6 sm:p-8">
              <p className="text-lg font-semibold text-fg">{questCardExample.title}</p>
              <p className="mt-2 text-sm text-muted">
                {questCardExample.location} · {questCardExample.timing}
              </p>
              <p className="mt-1 text-sm text-muted">
                Shared with: {questCardExample.audience}
              </p>
              <p className="mt-4 inline-flex items-center rounded-full border border-[color:var(--quest-border)] bg-surface px-3 py-1 text-xs font-medium text-fg">
                {questCardExample.joining}
              </p>
            </div>
            <div>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {questCallouts.map((c) => (
                  <div key={c.label}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-[color:var(--quest)]">
                      {c.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted">{c.text}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 max-w-md text-sm italic leading-relaxed text-muted">
                A quest is not a formal event. It is a temporary signal of availability.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <QuestLifecycle stages={lifecycleStages} />
          </div>
        </div>
      </Shell>

      {/* ---------------- Product walkthrough ---------------- */}
      <Shell className="mt-20">
        <div id="experience" className="scroll-mt-32">
          <SectionHeading eyebrow="Experience" title="A walk through the product" />
          <ProductWalkthrough stages={walkthroughStages} />
        </div>
      </Shell>

      {/* ---------------- Behavioral design principles ---------------- */}
      <Shell className="mt-20">
        <div id="behavior" className="scroll-mt-32">
          <SectionHeading eyebrow="Behavior" title="Designing for low-pressure participation" />
          <BehaviorPrinciples principles={behaviorPrinciples} comparison={creationTimeComparison} />
        </div>
      </Shell>

      {/* ---------------- System architecture ---------------- */}
      <Shell className="mt-20">
        <div id="architecture" className="scroll-mt-32">
          <SectionHeading
            eyebrow="Architecture"
            title="Built for real-time, location-aware coordination"
          />
          <SystemArchitecture
            mainFlow={architectureFlow}
            locationFlow={locationFlow}
            applicationAreas={applicationAreas}
            reusableComponents={reusableComponents}
          />
        </div>

        {/* ---------------- Real-time event flow ---------------- */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">What happens in real time</h3>
          <div className="mt-8">
            <RealtimeEventFlow
              postTrace={postEventTrace}
              rsvpTrace={rsvpEventTrace}
              rsvpNote={rsvpNote}
            />
          </div>
        </div>

        {/* ---------------- Data model ---------------- */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Data model</h3>
          <div className="mt-8">
            <ProjectDataModel entities={dataEntities} relationships={dataRelationships} />
          </div>
        </div>
      </Shell>

      {/* ---------------- Pilot findings ---------------- */}
      <Shell className="mt-20">
        <div id="pilot" className="scroll-mt-32">
          <SectionHeading eyebrow="Pilot" title="Three days in the wild" />
          <PilotTimeline days={pilotDays} metricsTable={pilotMetricsTable} note={pilotNote} />
        </div>

        {/* ---------------- Participation pyramid ---------------- */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Participation pyramid</h3>
          <div className="mt-8">
            <ParticipationPyramid
              levels={pyramidLevels}
              insight={pyramidInsight}
              secondaryInsight={pyramidSecondaryInsight}
            />
          </div>
        </div>

        {/* ---------------- Theory in practice ---------------- */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Social computing theory in practice</h3>
          <p className="mb-6 mt-3 max-w-2xl text-sm text-muted">
            The pilot cohort was small and socially connected, so these observations are read as
            directional, not conclusive.
          </p>
          <TheoryFindingGrid findings={theoryFindings} />
        </div>
      </Shell>

      {/* ---------------- Privacy, norms, and trust ---------------- */}
      <Shell className="mt-20">
        <div id="trust" className="scroll-mt-32">
          <SectionHeading eyebrow="Trust" title="Spontaneity without default oversharing" />
          <TrustTable rows={trustRows} />
          <p className="mt-5 max-w-2xl text-xs italic text-subtle">
            These are design safeguards and trust mechanisms, not a claim that the product is
            completely safe.
          </p>
        </div>
      </Shell>

      {/* ---------------- My contributions ---------------- */}
      <Shell className="mt-20">
        <div id="contributions" className="scroll-mt-32">
          <SectionHeading eyebrow="My role" title="My contributions" />
          <p className="mb-6 max-w-2xl text-sm text-muted">
            CoQuest was built by a four-person team. The contributions below describe what I
            personally worked on within that team, not sole ownership of the project.
          </p>
          <ContributionSection
            groups={contributionGroups}
            borderClassName="border-[color:var(--quest-border)]"
            textClassName="text-[color:var(--quest)]"
          />
        </div>
      </Shell>

      {/* ---------------- Product tensions and lessons ---------------- */}
      <Shell className="mt-20">
        <div id="lessons" className="scroll-mt-32">
          <SectionHeading eyebrow="Reflection" title="What worked — and what became harder" />
          <ProductTension tensions={tensions} />

          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-fg">What we would test next</h3>
            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {futureExperiments.map((item) => (
                <li
                  key={item}
                  className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-[color:var(--quest-dot)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
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
