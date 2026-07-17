import Link from "next/link";
import { projects } from "@/data/projects";
import {
  header,
  projectQuestion,
  findingsMetrics,
  findingsFootnote,
  adaptationSpectrum,
  primaryQuestion,
  secondaryQuestion,
  backboneStages,
  backboneTable,
  backboneNote,
  methodDetails,
  taskCards,
  datasetTable,
  pipelineStages,
  pipelineBranches,
  pipelineCallout,
  efficiencyDatasets,
  efficiencyCaption,
  efficiencyTakeaways,
  reftPlacements,
  reftInterpretation,
  loraConfigs,
  loraConclusion,
  paraphraseWarning,
  paraphraseRows,
  paraphraseExplanation,
  generationStages,
  generationResults,
  candidateDemo,
  dpoRows,
  dpoExplanation,
  dpoLesson,
  seedRows,
  significanceSst,
  significanceCfimdb,
  significanceInterpretation,
  contributionsIntro,
  contributionGroups,
  challenges,
  worked,
  didNotWork,
  limitations,
  nextSteps,
  sectionNav,
} from "@/data/gpt2-case-study";
import { Tag, LinkButton } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon, ProjectLinkIcon } from "@/components/Icons";
import { ProjectMetricStrip } from "@/components/case-study/ProjectMetricStrip";
import { ProjectSectionNav } from "@/components/case-study/ProjectSectionNav";
import { AdaptationBackboneDiagram } from "@/components/case-study/AdaptationBackboneDiagram";
import { MethodExplorer } from "@/components/case-study/MethodExplorer";
import { TaskDatasetMatrix } from "@/components/case-study/TaskDatasetMatrix";
import { ExperimentPipeline } from "@/components/case-study/ExperimentPipeline";
import { EfficiencyFrontier } from "@/components/case-study/EfficiencyFrontier";
import { ReFTLayerExplorer } from "@/components/case-study/ReFTLayerExplorer";
import { LoRAConfigurationGrid } from "@/components/case-study/LoRAConfigurationGrid";
import { ParaphraseComparison } from "@/components/case-study/ParaphraseComparison";
import { GenerationLab } from "@/components/case-study/GenerationLab";
import { DPOComparison } from "@/components/case-study/DPOComparison";
import { SeedAnalysisTable } from "@/components/case-study/SeedAnalysisTable";
import { ContributionSection } from "@/components/case-study/ContributionSection";
import { ExperimentLesson } from "@/components/case-study/ExperimentLesson";

// Wider shell than the site's default Container (max-w-5xl / 1024px), matching
// the other custom case-study pages.
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

const project = projects.find((p) => p.slug === "gpt2-from-scratch")!;

const featuredProjects = projects.filter((p) => p.featured);
const ownIndex = featuredProjects.findIndex((p) => p.slug === project.slug);
const prevProject = ownIndex > 0 ? featuredProjects[ownIndex - 1] : undefined;
const nextProject =
  ownIndex >= 0 && ownIndex < featuredProjects.length - 1
    ? featuredProjects[ownIndex + 1]
    : undefined;

const heroFlow = ["Input", "Frozen backbone", "Selected intervention", "Task output"];

export function GPT2CaseStudy() {
  return (
    <div className="method-accent pb-20 pt-10 sm:pt-14">
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.imageAlt ?? header.title}
                  className="w-full"
                />
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
                {heroFlow.map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
                      {step}
                    </span>
                    {i < heroFlow.length - 1 && (
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

      {/* ---------------- Key findings strip ---------------- */}
      <Shell className="mt-12">
        <Reveal>
          <ProjectMetricStrip metrics={findingsMetrics} />
        </Reveal>
        <p className="mt-4 text-xs text-subtle">{findingsFootnote}</p>
      </Shell>

      {/* ---------------- Section nav ---------------- */}
      <Shell className="mt-10">
        <ProjectSectionNav items={sectionNav} />
      </Shell>

      {/* ---------------- Research question ---------------- */}
      <Shell className="mt-16">
        <div id="overview" className="scroll-mt-32">
          <SectionHeading eyebrow="Overview" title="How much of a language model actually needs to change?" />

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-x-4 top-[1.1rem] hidden h-px bg-border sm:block"
            />
            <ol className="grid grid-cols-1 gap-6 sm:grid-cols-5 sm:gap-4">
              {adaptationSpectrum.map((s) => (
                <li key={s.stage} className="text-center">
                  <span
                    aria-hidden="true"
                    className="relative z-10 mx-auto mb-3 hidden size-2.5 rounded-full bg-accent sm:block"
                  />
                  <p className="text-xs font-semibold uppercase tracking-wide text-subtle">{s.stage}</p>
                  <p className="mt-1.5 text-sm font-medium text-fg">{s.method}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted">{primaryQuestion}</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{secondaryQuestion}</p>
          <p className="mt-6 max-w-2xl border-l-2 border-accent/30 pl-4 text-sm italic leading-relaxed text-subtle">
            {projectQuestion}
          </p>
        </div>
      </Shell>

      {/* ---------------- What we implemented ---------------- */}
      <Shell className="mt-20">
        <div id="backbone" className="scroll-mt-32">
          <SectionHeading eyebrow="Backbone" title="What we implemented" />
          <p className="max-w-2xl text-sm leading-relaxed text-muted">{backboneNote}</p>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <AdaptationBackboneDiagram stages={backboneStages} />

            <div>
              <table className="hidden w-full border-collapse text-left text-sm sm:table">
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="w-2/5 py-2.5 pr-4 font-semibold text-fg">
                      Component
                    </th>
                    <th scope="col" className="py-2.5 font-semibold text-fg">
                      Implementation detail
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {backboneTable.map((row) => (
                    <tr key={row.component} className="border-b border-border last:border-0">
                      <td className="py-2.5 pr-4 align-top text-muted">{row.component}</td>
                      <td className="py-2.5 align-top text-muted">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <dl className="space-y-3 sm:hidden">
                {backboneTable.map((row) => (
                  <div key={row.component} className="rounded-lg border border-border bg-surface p-4">
                    <dt className="text-sm font-semibold text-fg">{row.component}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-muted">{row.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Shell>

      {/* ---------------- Method explorer ---------------- */}
      <Shell className="mt-20">
        <div id="methods" className="scroll-mt-32">
          <SectionHeading eyebrow="Methods" title="Where does each method modify the model?" />
          <MethodExplorer methods={methodDetails} />
        </div>
      </Shell>

      {/* ---------------- Task and dataset matrix ---------------- */}
      <Shell className="mt-20">
        <div id="tasks" className="scroll-mt-32">
          <SectionHeading eyebrow="Tasks" title="One backbone, three different adaptation problems" />
          <TaskDatasetMatrix tasks={taskCards} dataset={datasetTable} />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">Experimental workflow</h3>
          <div className="mt-8">
            <ExperimentPipeline
              stages={pipelineStages}
              branches={pipelineBranches}
              callout={pipelineCallout}
            />
          </div>
        </div>
      </Shell>

      {/* ---------------- Sentiment efficiency ---------------- */}
      <Shell className="mt-20">
        <div id="efficiency" className="scroll-mt-32">
          <SectionHeading
            eyebrow="Efficiency"
            title="Sentiment classification: performance versus efficiency"
          />
          <p className="mb-6 max-w-2xl text-sm text-muted">{efficiencyCaption}</p>
          <Reveal>
            <EfficiencyFrontier datasets={efficiencyDatasets} />
          </Reveal>
          <ul className="mt-8 max-w-2xl space-y-2.5">
            {efficiencyTakeaways.map((t, i) => (
              <li
                key={i}
                className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-accent/60"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Shell>

      {/* ---------------- ReFT layer placement ---------------- */}
      <Shell className="mt-20">
        <div id="layers" className="scroll-mt-32">
          <SectionHeading
            eyebrow="Layers"
            title="Where you intervene mattered more than how large the intervention was"
          />
          <ReFTLayerExplorer placements={reftPlacements} />
          <ul className="mt-8 max-w-2xl space-y-2.5">
            {reftInterpretation.map((r, i) => (
              <li
                key={i}
                className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-[color:var(--m-reft)]"
              >
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------------- LoRA rank/scaling ---------------- */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">More adaptation capacity was not always better</h3>
          <div className="mt-8">
            <LoRAConfigurationGrid configs={loraConfigs} />
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">{loraConclusion}</p>
        </div>
      </Shell>

      {/* ---------------- Paraphrase detection ---------------- */}
      <Shell className="mt-20">
        <div id="paraphrase" className="scroll-mt-32">
          <SectionHeading
            eyebrow="Paraphrase"
            title="Parameter efficiency did not transfer equally to every task"
          />
          <ParaphraseComparison
            rows={paraphraseRows}
            warning={paraphraseWarning}
            explanation={paraphraseExplanation}
          />
        </div>
      </Shell>

      {/* ---------------- Sonnet generation lab ---------------- */}
      <Shell className="mt-20">
        <div id="generation" className="scroll-mt-32">
          <SectionHeading
            eyebrow="Generation"
            title="For generation, inference strategy mattered more than another training objective"
          />
          <GenerationLab stages={generationStages} results={generationResults} candidates={candidateDemo} />
        </div>

        {/* ---------------- DPO ---------------- */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">When preference optimization made generation worse</h3>
          <div className="mt-8">
            <DPOComparison rows={dpoRows} explanation={dpoExplanation} lesson={dpoLesson} />
          </div>
        </div>
      </Shell>

      {/* ---------------- Multi-seed statistics ---------------- */}
      <Shell className="mt-20">
        <div id="statistics" className="scroll-mt-32">
          <SectionHeading eyebrow="Statistics" title="Single best runs were not the whole story" />
          <SeedAnalysisTable
            rows={seedRows}
            significanceSst={significanceSst}
            significanceCfimdb={significanceCfimdb}
            interpretation={significanceInterpretation}
          />
        </div>
      </Shell>

      {/* ---------------- Contributions ---------------- */}
      <Shell className="mt-20">
        <div id="contributions" className="scroll-mt-32">
          <SectionHeading eyebrow="My role" title="My focus: paraphrase detection and generation" />
          <p className="mb-6 max-w-2xl text-sm text-muted">{contributionsIntro}</p>
          <ContributionSection groups={contributionGroups} />
        </div>
      </Shell>

      {/* ---------------- Technical challenges, what worked, limitations ---------------- */}
      <Shell className="mt-20">
        <div id="lessons" className="scroll-mt-32">
          <SectionHeading eyebrow="Engineering judgment" title="Technical challenges and decisions" />
          <ExperimentLesson entries={challenges} />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">What worked and what did not</h3>
          <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-subtle">What worked</h4>
              <ul className="mt-3 space-y-2.5">
                {worked.map((item, i) => (
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
              <h4 className="text-sm font-semibold uppercase tracking-wide text-subtle">
                What did not consistently work
              </h4>
              <ul className="mt-3 space-y-2.5">
                {didNotWork.map((item, i) => (
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
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-fg">What this experiment does — and does not — establish</h3>
          <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-subtle">Limitations</h4>
              <ul className="mt-3 space-y-2.5">
                {limitations.map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:border before:border-subtle"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-subtle">Next steps</h4>
              <ul className="mt-3 space-y-2.5">
                {nextSteps.map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-accent/60"
                  >
                    {item}
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
