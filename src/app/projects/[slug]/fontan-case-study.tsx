import Link from "next/link";
import { projects } from "@/data/projects";
import {
  header,
  projectSummary,
  centralFinding,
  strategicInterpretation,
  fourStateFramework,
  workflowMotif,
  factsMetrics,
  factsNote,
  physiologyPoints,
  normalCircuit,
  fontanCircuit,
  physiologyCallout,
  restPoints,
  exercisePoints,
  exerciseFraming,
  primaryQuestion,
  secondaryQuestion,
  outcomesList,
  studyDesignSummary,
  pipelineSteps,
  pipelineCategoryNote,
  reconstructionStages,
  reconstructionEffortCaption,
  centerlineImage,
  stentWorkflowSteps,
  stentQualification,
  stentGridImage,
  stentDetailImage,
  funnelStages,
  funnelExplanation,
  matrixPatients,
  matrixPatientLabels,
  simSpecRows,
  simTechnicalDetails,
  restConditions,
  exerciseConditions,
  exercisePrescriptionNote,
  groundingChecks,
  groundingNote,
  metricExplainers,
  metricLesson,
  pressureFieldImage,
  patients,
  percentChangeData,
  pairedPressure,
  pairedResistance,
  pairedPower,
  restExerciseNarrative,
  restExerciseConclusion,
  p18Factors,
  p18Observations,
  p18Mechanism,
  p18Insight,
  mainFindings,
  findingsConclusion,
  contributionAreas,
  contributionStatement,
  effortPhases,
  challenges,
  limitations,
  limitationsFraming,
  futureTracks,
  thesisDocument,
  sectionNav,
} from "@/data/fontan-case-study";
import { Tag, LinkButton } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon, ProjectLinkIcon } from "@/components/Icons";
import { ProjectMetricStrip } from "@/components/case-study/ProjectMetricStrip";
import { ProjectSectionNav } from "@/components/case-study/ProjectSectionNav";
import { FontanPhysiologyDiagram } from "@/components/case-study/FontanPhysiologyDiagram";
import { ComputationalPipeline } from "@/components/case-study/ComputationalPipeline";
import { VirtualStentComparison } from "@/components/case-study/VirtualStentComparison";
import { StudyFunnel } from "@/components/case-study/StudyFunnel";
import { SimulationMatrix } from "@/components/case-study/SimulationMatrix";
import { SimulationSpecification } from "@/components/case-study/SimulationSpecification";
import { HemodynamicMetricExplainer } from "@/components/case-study/HemodynamicMetricExplainer";
import { PatientResultExplorer } from "@/components/case-study/PatientResultExplorer";
import { PercentChangeChart } from "@/components/case-study/PercentChangeChart";
import { PrePostPairedChart } from "@/components/case-study/PrePostPairedChart";
import { MixedResponseCaseStudy } from "@/components/case-study/MixedResponseCaseStudy";
import { IndependentContributionTimeline } from "@/components/case-study/IndependentContributionTimeline";
import { ExperimentLesson } from "@/components/case-study/ExperimentLesson";
import { ThesisDocumentCard } from "@/components/case-study/ThesisDocumentCard";

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

const project = projects.find((p) => p.slug === "fontan-virtual-stenting")!;

const featuredProjects = projects.filter((p) => p.featured);
const ownIndex = featuredProjects.findIndex((p) => p.slug === project.slug);
const prevProject = ownIndex > 0 ? featuredProjects[ownIndex - 1] : undefined;
const nextProject =
  ownIndex >= 0 && ownIndex < featuredProjects.length - 1
    ? featuredProjects[ownIndex + 1]
    : undefined;

export function FontanCaseStudy() {
  return (
    <div className="fontan-accent pb-20 pt-10 sm:pt-14">
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
          <p className="mt-3 font-serif text-lg italic leading-snug text-muted">
            {header.formalTitle}
          </p>
          <p className="mt-5 text-lg leading-relaxed text-muted">{header.intro}</p>
          <p className="mt-4 text-base leading-relaxed text-muted">{header.description}</p>
          <p className="mt-4 text-sm leading-relaxed text-subtle">{header.ownershipNote}</p>
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
          <LinkButton href="#workflow" variant="ghost">
            Explore Methods
          </LinkButton>
        </div>

        {/* ---------------- Hero ---------------- */}
        {project.image && (
          <figure className="mt-10">
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.imageAlt ?? header.title}
                  className="w-full"
                />
              </div>
            </Reveal>
            <figcaption className="mx-auto mt-5 max-w-lg text-center text-sm leading-relaxed text-subtle">
              {header.heroCaption}
            </figcaption>
          </figure>
        )}
      </Shell>

      {/* ---------------- Thesis-at-a-glance strip ---------------- */}
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

      {/* ---------------- Overview: summary + finding ---------------- */}
      <Shell className="mt-16">
        <div id="overview" className="scroll-mt-32">
          <SectionHeading eyebrow="Overview" title="One patient, four computational states" />
          <p className="max-w-2xl text-base leading-relaxed text-muted">{projectSummary}</p>
          <p className="mt-4 max-w-2xl rounded-lg border border-[color:var(--fontan-post)]/30 bg-[color-mix(in_oklab,var(--fontan-post)_6%,transparent)] p-4 text-sm font-medium leading-relaxed text-fg">
            {centralFinding}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-subtle">{strategicInterpretation}</p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {fourStateFramework.map((s) => (
              <div key={s} className="rounded-lg border border-border bg-surface px-3 py-3 text-center text-sm font-medium text-fg">
                {s}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {workflowMotif.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
                  {step}
                </span>
                {i < workflowMotif.length - 1 && (
                  <ArrowRightIcon aria-hidden="true" className="size-3 shrink-0 text-subtle" />
                )}
              </span>
            ))}
          </div>
        </div>
      </Shell>

      {/* ---------------- Clinical problem + why exercise matters ---------------- */}
      <Shell className="mt-20">
        <div id="physiology" className="scroll-mt-32">
          <SectionHeading eyebrow="Physiology" title="A circulation without a subpulmonary ventricle" />
          <ul className="max-w-2xl space-y-2">
            {physiologyPoints.map((p) => (
              <li
                key={p}
                className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-accent/60"
              >
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <FontanPhysiologyDiagram normal={normalCircuit} fontan={fontanCircuit} />
          </div>
          <p className="mt-6 max-w-2xl font-serif text-lg italic leading-snug text-fg">
            {physiologyCallout}
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">
            What appears modest at rest may become important during exercise
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="rounded-xl border border-[color:var(--fontan-rest)]/30 bg-surface p-5">
              <h4 className="text-sm font-semibold text-[color:var(--fontan-rest)]">Rest</h4>
              <ul className="mt-2.5 space-y-1.5">
                {restPoints.map((p) => (
                  <li key={p} className="text-sm leading-relaxed text-muted">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[color:var(--fontan-exercise)]/30 bg-surface p-5">
              <h4 className="text-sm font-semibold text-[color:var(--fontan-exercise)]">Exercise</h4>
              <ul className="mt-2.5 space-y-1.5">
                {exercisePoints.map((p) => (
                  <li key={p} className="text-sm leading-relaxed text-muted">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-sm italic leading-relaxed text-subtle">{exerciseFraming}</p>
        </div>
      </Shell>

      {/* ---------------- Research question ---------------- */}
      <Shell className="mt-20">
        <div id="question" className="scroll-mt-32">
          <SectionHeading eyebrow="Question" title="Research question and hypothesis" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Primary question</p>
              <p className="mt-2 font-serif text-xl italic leading-snug text-fg">&ldquo;{primaryQuestion}&rdquo;</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Secondary question</p>
              <p className="mt-2 font-serif text-xl italic leading-snug text-fg">&ldquo;{secondaryQuestion}&rdquo;</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Outcomes</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {outcomesList.map((o) => (
                <li key={o} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 max-w-2xl border-l-2 border-accent/30 pl-4 text-sm leading-relaxed text-muted">
            {studyDesignSummary}
          </p>
        </div>
      </Shell>

      {/* ---------------- Full computational workflow ---------------- */}
      <Shell className="mt-20">
        <div id="workflow" className="scroll-mt-32">
          <SectionHeading eyebrow="Workflow" title="Full computational workflow" />
          <ComputationalPipeline steps={pipelineSteps} />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-subtle">{pipelineCategoryNote}</p>
        </div>

        {/* ---------------- Reconstruction from 4D flow MRI ---------------- */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Turning clinical imaging into simulation-ready anatomy</h3>
          <div className="mt-8 space-y-10">
            {reconstructionStages.map((stage) => (
              <div
                key={stage.title}
                className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_1.4fr] sm:gap-10"
              >
                {stage.image ? (
                  <div className="overflow-hidden rounded-xl border border-border bg-surface">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={stage.image} alt={stage.imageAlt} loading="lazy" className="w-full" />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-border bg-surface-2 text-center text-xs text-subtle">
                    Illustrative step — no source figure isolated for this stage
                  </div>
                )}
                <div>
                  <h4 className="text-base font-semibold text-fg">{stage.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{stage.body}</p>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_1.4fr] sm:gap-10">
              <div className="overflow-hidden rounded-xl border border-border bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={centerlineImage.src}
                  alt={centerlineImage.alt}
                  loading="lazy"
                  className="w-full"
                />
              </div>
              <div>
                <h4 className="text-base font-semibold text-fg">Centerline extraction</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  A centerline was computed through the reconstructed model and used to guide the
                  virtual intervention described next.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-sm italic leading-relaxed text-subtle">
            {reconstructionEffortCaption}
          </p>
        </div>
      </Shell>

      {/* ---------------- Virtual stent design ---------------- */}
      <Shell className="mt-20">
        <div id="stenting" className="scroll-mt-32">
          <SectionHeading eyebrow="Stenting" title="Testing the intervention without changing the patient" />
          <VirtualStentComparison
            steps={stentWorkflowSteps}
            gridImage={stentGridImage}
            detailImage={stentDetailImage}
            qualification={stentQualification}
          />
        </div>

        {/* ---------------- Study cohort and selection ---------------- */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Study cohort and selection</h3>
          <div className="mt-8">
            <StudyFunnel stages={funnelStages} explanation={funnelExplanation} />
          </div>
        </div>
      </Shell>

      {/* ---------------- Simulation experiment matrix + config + conditions + validation ---------------- */}
      <Shell className="mt-20">
        <div id="simulations" className="scroll-mt-32">
          <SectionHeading eyebrow="Simulations" title="Simulation experiment matrix" />
          <SimulationMatrix patients={matrixPatients} labels={matrixPatientLabels} />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Simulation configuration</h3>
          <div className="mt-8">
            <SimulationSpecification rows={simSpecRows} technicalDetails={simTechnicalDetails} />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Rest and exercise conditions</h3>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="rounded-xl border border-[color:var(--fontan-rest)]/30 bg-surface p-5">
              <h4 className="text-sm font-semibold text-[color:var(--fontan-rest)]">Rest</h4>
              <ul className="mt-2.5 space-y-1.5">
                {restConditions.map((c) => (
                  <li key={c} className="text-sm leading-relaxed text-muted">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[color:var(--fontan-exercise)]/30 bg-surface p-5">
              <h4 className="text-sm font-semibold text-[color:var(--fontan-exercise)]">Moderate exercise</h4>
              <ul className="mt-2.5 space-y-1.5">
                {exerciseConditions.map((c) => (
                  <li key={c} className="text-sm leading-relaxed text-muted">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-sm italic leading-relaxed text-subtle">
            {exercisePrescriptionNote}
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Grounding the simulations in patient data</h3>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {groundingChecks.map((g) => (
              <div key={g.from} className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-surface p-4">
                <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
                  {g.from}
                </span>
                <ArrowRightIcon aria-hidden="true" className="size-3.5 shrink-0 text-subtle" />
                <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
                  {g.through}
                </span>
                <ArrowRightIcon aria-hidden="true" className="size-3.5 shrink-0 text-subtle" />
                <span className="rounded-full border border-[color:var(--fontan-post)]/40 bg-[color-mix(in_oklab,var(--fontan-post)_8%,transparent)] px-3 py-1 text-xs font-medium text-[color:var(--fontan-post)]">
                  {g.to}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm italic leading-relaxed text-subtle">{groundingNote}</p>
        </div>
      </Shell>

      {/* ---------------- Hemodynamic metrics ---------------- */}
      <Shell className="mt-20">
        <div id="metrics" className="scroll-mt-32">
          <SectionHeading eyebrow="Metrics" title="Hemodynamic metrics" />
          <HemodynamicMetricExplainer metrics={metricExplainers} lesson={metricLesson} />

          <figure className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pressureFieldImage.src}
              alt={pressureFieldImage.alt}
              loading="lazy"
              className="w-full"
            />
            <figcaption className="border-t border-border px-4 py-2.5 text-xs text-subtle">
              A simulated pressure field before (left) and after (right) virtual stenting —
              qualitative visualization of the same pressure drop reported quantitatively below.
            </figcaption>
          </figure>
        </div>
      </Shell>

      {/* ---------------- Patient results explorer + charts ---------------- */}
      <Shell className="mt-20">
        <div id="results" className="scroll-mt-32">
          <SectionHeading eyebrow="Results" title="Interactive patient-results explorer" />
          <PatientResultExplorer patients={patients} />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Percent change after virtual stenting</h3>
          <div className="mt-8">
            <Reveal>
              <PercentChangeChart data={percentChangeData} />
            </Reveal>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Pre-versus-post paired values</h3>
          <div className="mt-8">
            <PrePostPairedChart
              datasets={{ pressure: pairedPressure, resistance: pairedResistance, power: pairedPower }}
            />
          </div>
        </div>
      </Shell>

      {/* ---------------- Interpretation: rest vs exercise, patient 18, findings ---------------- */}
      <Shell className="mt-20">
        <div id="interpretation" className="scroll-mt-32">
          <SectionHeading
            eyebrow="Interpretation"
            title="Exercise changed the magnitude — but not always the direction — of response"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {restExerciseNarrative.map((n) => (
              <div key={n.patient} className="rounded-xl border border-border bg-surface p-5">
                <h4 className="text-sm font-semibold text-fg">{n.patient}</h4>
                <ul className="mt-2.5 space-y-1.5">
                  {n.lines.map((l) => (
                    <li key={l} className="text-sm leading-relaxed text-muted">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl font-serif text-lg italic leading-snug text-fg">
            {restExerciseConclusion}
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">
            Why a wider pathway was not automatically a more efficient pathway
          </h3>
          <p className="mb-6 mt-3 max-w-2xl text-sm text-muted">Patient 18 deep dive</p>
          <MixedResponseCaseStudy
            factors={p18Factors}
            observations={p18Observations}
            mechanism={p18Mechanism}
            insight={p18Insight}
          />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Main findings</h3>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {mainFindings.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-surface p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">{f.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg">{f.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl font-serif text-lg italic leading-snug text-fg">
            {findingsConclusion}
          </p>
        </div>
      </Shell>

      {/* ---------------- Independent contribution, timeline, challenges ---------------- */}
      <Shell className="mt-20">
        <div id="my-work" className="scroll-mt-32">
          <SectionHeading eyebrow="My role" title="What 200+ hours of independent thesis work involved" />
          <IndependentContributionTimeline
            areas={contributionAreas}
            statement={contributionStatement}
            phases={effortPhases}
          />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Technical challenges and decisions</h3>
          <div className="mt-8">
            <ExperimentLesson entries={challenges} />
          </div>
        </div>
      </Shell>

      {/* ---------------- Limitations, future directions, thesis document ---------------- */}
      <Shell className="mt-20">
        <div id="limitations" className="scroll-mt-32">
          <SectionHeading eyebrow="Limitations" title="What the simulations cannot yet establish" />
          <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {limitations.map((l) => (
              <li
                key={l}
                className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:border before:border-subtle"
              >
                {l}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl font-serif text-lg italic leading-snug text-fg">
            {limitationsFraming}
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">From demonstration to defensible capability</h3>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
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
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Thesis document</h3>
          <div className="mt-8">
            <ThesisDocumentCard
              title={thesisDocument.title}
              author={thesisDocument.author}
              department={thesisDocument.department}
              advisor={thesisDocument.advisor}
              year={thesisDocument.year}
              honors={thesisDocument.honors}
              pageCount={thesisDocument.pageCount}
              href={project.links.find((l) => l.type === "paper")?.href ?? "#"}
            />
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
