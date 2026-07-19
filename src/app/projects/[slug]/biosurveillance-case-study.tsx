import Image from "next/image";
import Link from "next/link";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { projects } from "@/data/projects";
import {
  header,
  projectSummary,
  systemStatement,
  strategicStatement,
  immuneResponseFlow,
  factsMetrics,
  factsNote,
  signalNarratives,
  signalInsight,
  zScoreTerms,
  zScoreNotes,
  riskEquationLabels,
  combinationNote,
  rawVsStandardized,
  scenarios,
  scenarioNote,
  dashboardPanels,
  dataSourceNote,
  weightNote,
  exampleDecomposition,
  interpretabilityGoal,
  alertTiers,
  alertTierNote,
  prototypeArchitecture,
  dataContractRows,
  dataContractNotes,
  dataContractCallout,
  currentPrototype,
  proposedOperational,
  roadmapPhases,
  futureArchitecture,
  governancePillars,
  governanceFraming,
  failureModes,
  failureModePrinciple,
  contributionsIntro,
  contributionGroups,
  systemDecisions,
  demonstrated,
  notClaimed,
  futureTracks,
  sectionNav,
} from "@/data/biosurveillance-case-study";
import { Tag, LinkButton } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon, ProjectLinkIcon } from "@/components/Icons";
import { ProjectMetricStrip } from "@/components/case-study/ProjectMetricStrip";
import { ProjectSectionNav } from "@/components/case-study/ProjectSectionNav";
import { SignalFusionLab } from "@/components/case-study/SignalFusionLab";
import { RollingZScoreExplainer } from "@/components/case-study/RollingZScoreExplainer";
import { ScenarioSelector } from "@/components/case-study/ScenarioSelector";
import { DashboardWalkthrough } from "@/components/case-study/DashboardWalkthrough";
import { RiskContributionChart } from "@/components/case-study/RiskContributionChart";
import { AlertTierLadder } from "@/components/case-study/AlertTierLadder";
import { PrototypeArchitecture } from "@/components/case-study/PrototypeArchitecture";
import { InputContractTable } from "@/components/case-study/InputContractTable";
import { PrototypeVsOperational } from "@/components/case-study/PrototypeVsOperational";
import { ScalingRoadmap } from "@/components/case-study/ScalingRoadmap";
import { NationalArchitecture } from "@/components/case-study/NationalArchitecture";
import { GovernancePillars } from "@/components/case-study/GovernancePillars";
import { FailureModeTable } from "@/components/case-study/FailureModeTable";
import { ContributionSection } from "@/components/case-study/ContributionSection";
import { SystemDecision } from "@/components/case-study/SystemDecision";

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

const project = projects.find((p) => p.slug === "biosurveillance-digital-immune-system")!;

const featuredProjects = projects.filter((p) => p.featured);
const ownIndex = featuredProjects.findIndex((p) => p.slug === project.slug);
const prevProject = ownIndex > 0 ? featuredProjects[ownIndex - 1] : undefined;
const nextProject =
  ownIndex >= 0 && ownIndex < featuredProjects.length - 1
    ? featuredProjects[ownIndex + 1]
    : undefined;

export function BiosurveillanceCaseStudy() {
  return (
    <div className="biosurv-accent pb-20 pt-10 sm:pt-14">
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
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
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
          <figure className="mt-10">
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? header.title}
                  width={1600}
                  height={900}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
                {immuneResponseFlow.map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
                      {step}
                    </span>
                    {i < immuneResponseFlow.length - 1 && (
                      <ArrowRightIcon aria-hidden="true" className="size-3 shrink-0 text-subtle" />
                    )}
                  </span>
                ))}
              </div>
            </Reveal>

            <figcaption className="mx-auto mt-5 max-w-lg text-center text-sm leading-relaxed text-subtle">
              {header.heroCaption}
            </figcaption>
          </figure>
        )}
      </Shell>

      {/* ---------------- At-a-glance system strip ---------------- */}
      <Shell className="mt-12">
        <Reveal>
          <ProjectMetricStrip metrics={factsMetrics} />
        </Reveal>
        <p className="mt-4 text-xs text-subtle">{factsNote}</p>
      </Shell>

      {/* ---------------- Section nav ---------------- */}
      <Shell className="mt-10">
        <ProjectSectionNav items={sectionNav} />
      </Shell>

      {/* ---------------- The early-warning problem ---------------- */}
      <Shell className="mt-16">
        <div id="overview" className="scroll-mt-32">
          <SectionHeading eyebrow="Overview" title="Biological threats rarely appear as one obvious signal" />
          <p className="max-w-2xl text-base leading-relaxed text-muted">{projectSummary}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-subtle">{systemStatement}</p>
          <p className="mt-4 max-w-2xl border-l-2 border-accent/30 pl-4 text-sm italic leading-relaxed text-subtle">
            {strategicStatement}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {signalNarratives.map((s) => (
              <div key={s.key} className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-sm font-semibold" style={{ color: `var(--sig-${s.key})` }}>
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-subtle">
                  Prototype signal
                </p>
                <p className="mt-1 text-sm text-muted">{s.prototypeSignal}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm font-medium leading-relaxed text-fg">{signalInsight}</p>
        </div>
      </Shell>

      {/* ---------------- Interactive signal-fusion explainer ---------------- */}
      <Shell className="mt-20">
        <div id="signals" className="scroll-mt-32">
          <SectionHeading eyebrow="Signals" title="How three weak signals become one interpretable warning" />
          <p className="mb-6 max-w-2xl text-sm text-muted">
            An educational simulation with synthetic, illustrative data — local to this page and
            disconnected from the live Streamlit application.
          </p>
          <SignalFusionLab />
        </div>
      </Shell>

      {/* ---------------- Mathematics ---------------- */}
      <Shell className="mt-20">
        <div id="fusion" className="scroll-mt-32">
          <SectionHeading eyebrow="Fusion" title="Standardize first, then combine" />
          <RollingZScoreExplainer
            terms={zScoreTerms}
            notes={zScoreNotes}
            riskLabels={riskEquationLabels}
            combinationNote={combinationNote}
            rawVsStandardized={rawVsStandardized}
          />
        </div>
      </Shell>

      {/* ---------------- Scenario laboratory ---------------- */}
      <Shell className="mt-20">
        <div id="scenarios" className="scroll-mt-32">
          <SectionHeading eyebrow="Scenarios" title="Stress-testing the sensing logic" />
          <ScenarioSelector scenarios={scenarios} note={scenarioNote} />
        </div>
      </Shell>

      {/* ---------------- Dashboard walkthrough ---------------- */}
      <Shell className="mt-20">
        <div id="dashboard" className="scroll-mt-32">
          <SectionHeading eyebrow="Dashboard" title="A walkthrough of the Streamlit interface" />
          <DashboardWalkthrough panels={dashboardPanels} dataSourceNote={dataSourceNote} weightNote={weightNote} />
        </div>

        {/* ---------------- Risk decomposition ---------------- */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">An alert should explain itself</h3>
          <p className="mb-6 mt-3 max-w-2xl text-sm text-muted">{interpretabilityGoal}</p>
          <RiskContributionChart
            totalRisk={exampleDecomposition.totalRisk}
            tier={exampleDecomposition.tier}
            contributions={exampleDecomposition.contributions}
          />
        </div>

        {/* ---------------- Alert tiers ---------------- */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Alert tiers</h3>
          <div className="mt-6">
            <AlertTierLadder tiers={alertTiers} />
          </div>
          <p className="mt-4 max-w-2xl text-sm italic leading-relaxed text-subtle">{alertTierNote}</p>
        </div>
      </Shell>

      {/* ---------------- Architecture ---------------- */}
      <Shell className="mt-20">
        <div id="architecture" className="scroll-mt-32">
          <SectionHeading eyebrow="Architecture" title="What the prototype implements" />
          <PrototypeArchitecture layers={prototypeArchitecture} />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Data contract</h3>
          <div className="mt-6">
            <InputContractTable rows={dataContractRows} notes={dataContractNotes} callout={dataContractCallout} />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Prototype versus operational system</h3>
          <div className="mt-6">
            <PrototypeVsOperational current={currentPrototype} proposed={proposedOperational} />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Proposed future architecture</h3>
          <div className="mt-6">
            <NationalArchitecture layers={futureArchitecture} />
          </div>
        </div>
      </Shell>

      {/* ---------------- National scaling roadmap ---------------- */}
      <Shell className="mt-20">
        <div id="scaling" className="scroll-mt-32">
          <SectionHeading eyebrow="Scaling" title="A phased national scaling roadmap" />
          <ScalingRoadmap phases={roadmapPhases} />
        </div>
      </Shell>

      {/* ---------------- Governance ---------------- */}
      <Shell className="mt-20">
        <div id="governance" className="scroll-mt-32">
          <SectionHeading
            eyebrow="Governance"
            title="Detection is only useful when institutions know what to do next"
          />
          <GovernancePillars pillars={governancePillars} />
          <p className="mt-6 max-w-2xl text-sm italic leading-relaxed text-subtle">{governanceFraming}</p>
        </div>
      </Shell>

      {/* ---------------- Failure modes ---------------- */}
      <Shell className="mt-20">
        <div id="risks" className="scroll-mt-32">
          <SectionHeading eyebrow="Risks" title="What could go wrong?" />
          <FailureModeTable rows={failureModes} principle={failureModePrinciple} />
        </div>
      </Shell>

      {/* ---------------- Contributions ---------------- */}
      <Shell className="mt-20">
        <div id="contributions" className="scroll-mt-32">
          <SectionHeading eyebrow="My role" title="Built end to end, on my own" />
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted">{contributionsIntro}</p>
          <ContributionSection groups={contributionGroups} />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Technical and strategic decisions</h3>
          <div className="mt-6">
            <SystemDecision entries={systemDecisions} />
          </div>
        </div>
      </Shell>

      {/* ---------------- What the prototype demonstrated / next steps ---------------- */}
      <Shell className="mt-20">
        <div id="next-steps" className="scroll-mt-32">
          <SectionHeading eyebrow="Reflection" title="What this experiment does — and does not — establish" />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-subtle">
                What the prototype demonstrated
              </h4>
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
              <h4 className="text-sm font-semibold uppercase tracking-wide text-subtle">Not claimed</h4>
              <ul className="mt-3 space-y-2.5">
                {notClaimed.map((item, i) => (
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

          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-fg">From demonstration to defensible capability</h3>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {futureTracks.map((t) => (
                <div key={t.track} className="border-l-2 border-accent/30 pl-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-accent">{t.track}</h4>
                  <ul className="mt-2.5 space-y-1.5">
                    {t.items.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                  {t.note && <p className="mt-2 text-xs italic text-subtle">{t.note}</p>}
                </div>
              ))}
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
