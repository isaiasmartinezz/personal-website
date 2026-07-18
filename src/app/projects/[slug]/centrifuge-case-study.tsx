import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import {
  header,
  projectSummary,
  supportingStatement,
  engineeringStatement,
  hotspots,
  factsMetrics,
  designProblemPoints,
  designQuestion,
  designSafetyNote,
  architectureGroups,
  architectureSupport,
  architectureFlows,
  systemDiagramImage,
  circuitDiagramImage,
  anatomyLayers,
  enclosureExplanation,
  enclosureFlow,
  enclosureCadImage,
  rotorExplanation,
  rotorFlow,
  rotorCadImage,
  rotorTradeoff,
  verificationCategories,
  verificationSummary,
  motorControlFlow,
  motorControlExplanation,
  motorControlNote,
  sensingSteps,
  rpmEquation,
  rpmEquationNote,
  oscilloscopeNote,
  firmwareStates,
  firmwareEvents,
  firmwareExplanation,
  firmwareHighlight,
  firmwarePatternAvoid,
  firmwarePatternUsed,
  visualStates,
  visualExplanation,
  visualAccessibilityNote,
  exampleRun,
  audioFlow,
  audioDevelopmentPath,
  audioPseudocode,
  challenges,
  functionalTestNotes,
  requirementRows,
  requirementsFraming,
  requirementsNote,
  contributionGroups,
  lessons,
  futureImprovements,
  sectionNav,
} from "@/data/centrifuge-case-study";
import { Tag, LinkButton } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon, ProjectLinkIcon } from "@/components/Icons";
import { ProjectMetricStrip } from "@/components/case-study/ProjectMetricStrip";
import { ProjectSectionNav } from "@/components/case-study/ProjectSectionNav";
import { HeroHotspots } from "@/components/case-study/HeroHotspots";
import { OperatingCycleDemo } from "@/components/case-study/OperatingCycleDemo";
import { CentrifugeArchitecture } from "@/components/case-study/CentrifugeArchitecture";
import { ExplodedAnatomy } from "@/components/case-study/ExplodedAnatomy";
import { FabricationTracks } from "@/components/case-study/FabricationTracks";
import { VerificationComparison } from "@/components/case-study/VerificationComparison";
import { OpticalSensingExplainer } from "@/components/case-study/OpticalSensingExplainer";
import { FirmwareStateMachine } from "@/components/case-study/FirmwareStateMachine";
import { NotificationSystems } from "@/components/case-study/NotificationSystems";
import { RequirementsTable } from "@/components/case-study/RequirementsTable";
import { ContributionSection } from "@/components/case-study/ContributionSection";
import { ExperimentLesson } from "@/components/case-study/ExperimentLesson";

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
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h2>
    </div>
  );
}

const project = projects.find((p) => p.slug === "centrifuge")!;

const featuredProjects = projects.filter((p) => p.featured);
const ownIndex = featuredProjects.findIndex((p) => p.slug === project.slug);
const prevProject = ownIndex > 0 ? featuredProjects[ownIndex - 1] : undefined;
const nextProject =
  ownIndex >= 0 && ownIndex < featuredProjects.length - 1
    ? featuredProjects[ownIndex + 1]
    : undefined;

const buildFlow = ["User input", "Embedded controller", "Sensing & control", "Motor", "Rotor", "Sample motion", "Operator feedback"];
const runStates = ["Ready", "Running & ramping down", "Complete"];

export function CentrifugeCaseStudy() {
  return (
    <div className="centrifuge-accent pb-20 pt-10 sm:pt-14">
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
          <p className="mt-3 font-serif text-lg italic leading-snug text-muted">{header.formalTitle}</p>
          <p className="mt-5 text-lg leading-relaxed text-muted">{header.intro}</p>
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
          <LinkButton href="#architecture" variant="ghost">
            Explore System
          </LinkButton>
        </div>

        {/* ---------------- Hero ---------------- */}
        {project.image && (
          <figure className="mt-10">
            <Reveal>
              <HeroHotspots image={project.image} imageAlt={project.imageAlt ?? header.title} hotspots={hotspots} />
            </Reveal>
            <figcaption className="mx-auto mt-5 max-w-lg text-center text-sm leading-relaxed text-subtle">
              {header.heroCaption}
            </figcaption>
          </figure>
        )}
      </Shell>

      {/* ---------------- Facts strip ---------------- */}
      <Shell className="mt-12">
        <Reveal>
          <ProjectMetricStrip metrics={factsMetrics} />
        </Reveal>
      </Shell>

      {/* ---------------- Section nav ---------------- */}
      <Shell className="mt-10">
        <ProjectSectionNav items={sectionNav} />
      </Shell>

      {/* ---------------- Overview ---------------- */}
      <Shell className="mt-16">
        <div id="overview" className="scroll-mt-32">
          <SectionHeading eyebrow="Overview" title="A centrifuge built from the inside out" />
          <p className="max-w-2xl text-base leading-relaxed text-muted">{projectSummary}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-subtle">{supportingStatement}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-subtle">{engineeringStatement}</p>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {buildFlow.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
                  {step}
                </span>
                {i < buildFlow.length - 1 && (
                  <ArrowRightIcon aria-hidden="true" className="size-3 shrink-0 text-subtle" />
                )}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {runStates.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-fg">
                  {step}
                </span>
                {i < runStates.length - 1 && (
                  <ArrowRightIcon aria-hidden="true" className="size-3 shrink-0 text-subtle" />
                )}
              </span>
            ))}
          </div>
        </div>
      </Shell>

      {/* ---------------- Design problem ---------------- */}
      <Shell className="mt-20">
        <div id="problem" className="scroll-mt-32">
          <SectionHeading eyebrow="Problem" title="A centrifuge should not require constant supervision" />
          <ul className="max-w-2xl space-y-2">
            {designProblemPoints.map((p) => (
              <li
                key={p}
                className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-accent/60"
              >
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl font-serif text-lg italic leading-snug text-fg">&ldquo;{designQuestion}&rdquo;</p>
          <p className="mt-4 max-w-2xl rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm text-muted">
            {designSafetyNote}
          </p>
        </div>
      </Shell>

      {/* ---------------- Operating-cycle demonstration ---------------- */}
      <Shell className="mt-20">
        <div id="demo" className="scroll-mt-32">
          <SectionHeading eyebrow="Demo" title="One run, three clearly communicated states" />
          <OperatingCycleDemo />
        </div>
      </Shell>

      {/* ---------------- System architecture + exploded anatomy ---------------- */}
      <Shell className="mt-20">
        <div id="architecture" className="scroll-mt-32">
          <SectionHeading eyebrow="Architecture" title="Full system architecture" />
          <CentrifugeArchitecture
            groups={architectureGroups}
            support={architectureSupport}
            flows={architectureFlows}
            diagramImage={systemDiagramImage}
          />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Built from mechanical, electrical, and software layers</h3>
          <div className="mt-8">
            <ExplodedAnatomy layers={anatomyLayers} />
          </div>
        </div>
      </Shell>

      {/* ---------------- Mechanical design and fabrication ---------------- */}
      <Shell className="mt-20">
        <div id="fabrication" className="scroll-mt-32">
          <SectionHeading eyebrow="Fabrication" title="From CAD to a physical rotating system" />
          <FabricationTracks
            enclosureExplanation={enclosureExplanation}
            enclosureFlow={enclosureFlow}
            enclosureImage={enclosureCadImage}
            rotorExplanation={rotorExplanation}
            rotorFlow={rotorFlow}
            rotorImage={rotorCadImage}
            rotorTradeoff={rotorTradeoff}
          />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Designed, fabricated, measured, adjusted</h3>
          <div className="mt-8">
            <VerificationComparison categories={verificationCategories} summary={verificationSummary} />
          </div>
        </div>
      </Shell>

      {/* ---------------- Electronics and control ---------------- */}
      <Shell className="mt-20">
        <div id="electronics" className="scroll-mt-32">
          <SectionHeading eyebrow="Electronics" title="Turning a user-selected speed into motor motion" />
          <div className="flex flex-wrap items-center gap-2">
            {motorControlFlow.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-fg">
                  {step}
                </span>
                {i < motorControlFlow.length - 1 && (
                  <ArrowRightIcon aria-hidden="true" className="size-3.5 shrink-0 text-subtle" />
                )}
              </span>
            ))}
          </div>
          <ul className="mt-6 max-w-2xl space-y-2">
            {motorControlExplanation.map((e) => (
              <li
                key={e}
                className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-accent/60"
              >
                {e}
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-2xl text-sm italic leading-relaxed text-subtle">{motorControlNote}</p>

          <figure className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
            <Image
              src={circuitDiagramImage.src}
              alt={circuitDiagramImage.alt}
              width={circuitDiagramImage.width}
              height={circuitDiagramImage.height}
              className="h-auto w-full"
            />
            <figcaption className="border-t border-border px-4 py-2.5 text-xs text-subtle">
              Full circuit schematic: optical sensing stage, motor and speaker MOSFET drivers, and the Arduino, LCD, and RGB LED connections.
            </figcaption>
          </figure>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Measuring rotation without touching the rotor</h3>
          <div className="mt-8">
            <OpticalSensingExplainer
              steps={sensingSteps}
              equation={rpmEquation}
              equationNote={rpmEquationNote}
              oscilloscopeNote={oscilloscopeNote}
            />
          </div>
        </div>
      </Shell>

      {/* ---------------- Embedded firmware ---------------- */}
      <Shell className="mt-20">
        <div id="firmware" className="scroll-mt-32">
          <SectionHeading eyebrow="Firmware" title="The centrifuge as a state machine" />
          <FirmwareStateMachine
            states={firmwareStates}
            events={firmwareEvents}
            explanation={firmwareExplanation}
            highlight={firmwareHighlight}
            patternAvoid={firmwarePatternAvoid}
            patternUsed={firmwarePatternUsed}
          />
        </div>
      </Shell>

      {/* ---------------- Notification systems ---------------- */}
      <Shell className="mt-20">
        <div id="notifications" className="scroll-mt-32">
          <SectionHeading eyebrow="Notifications" title="One light, three understandable states" />
          <NotificationSystems
            visualStates={visualStates}
            visualExplanation={visualExplanation}
            accessibilityNote={visualAccessibilityNote}
            exampleRun={exampleRun}
            audioFlow={audioFlow}
            audioDevelopmentPath={audioDevelopmentPath}
            audioPseudocode={audioPseudocode}
          />
        </div>
      </Shell>

      {/* ---------------- Integration challenges, functional testing, requirements ---------------- */}
      <Shell className="mt-20">
        <div id="testing" className="scroll-mt-32">
          <SectionHeading eyebrow="Testing" title="Integration challenges" />
          <ExperimentLesson entries={challenges} />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Functional testing</h3>
          <ul className="mt-8 max-w-2xl space-y-2.5">
            {functionalTestNotes.map((n) => (
              <li
                key={n}
                className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-accent/60"
              >
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Requirements verification</h3>
          <p className="mb-6 mt-3 max-w-2xl text-sm text-subtle">{requirementsFraming}</p>
          <RequirementsTable rows={requirementRows} />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-fg">{requirementsNote}</p>
        </div>
      </Shell>

      {/* ---------------- Team contributions ---------------- */}
      <Shell className="mt-20">
        <div id="contributions" className="scroll-mt-32">
          <SectionHeading eyebrow="My role" title="Team contributions" />
          <ContributionSection groups={contributionGroups} />
        </div>
      </Shell>

      {/* ---------------- Lessons and future improvements ---------------- */}
      <Shell className="mt-20">
        <div id="lessons" className="scroll-mt-32">
          <SectionHeading eyebrow="Reflection" title="Lessons and future improvements" />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-subtle">What we learned</h4>
              <ul className="mt-3 space-y-2.5">
                {lessons.map((l, i) => (
                  <li
                    key={i}
                    className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-accent/60"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-subtle">What we&rsquo;d do next</h4>
              <ul className="mt-3 space-y-2.5">
                {futureImprovements.map((f, i) => (
                  <li
                    key={i}
                    className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:border before:border-subtle"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
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
