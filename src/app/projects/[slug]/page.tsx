import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Container } from "@/components/Container";
import { Tag, LinkButton } from "@/components/ui";
import { ProjectLinkIcon, ArrowRightIcon } from "@/components/Icons";
import { EPVOCaseStudy } from "@/app/projects/[slug]/epvo-case-study";
import { CoQuestCaseStudy } from "@/app/projects/[slug]/coquest-case-study";
import { GPT2CaseStudy } from "@/app/projects/[slug]/gpt2-case-study";
import { BiosurveillanceCaseStudy } from "@/app/projects/[slug]/biosurveillance-case-study";
import { FontanCaseStudy } from "@/app/projects/[slug]/fontan-case-study";
import { CentrifugeCaseStudy } from "@/app/projects/[slug]/centrifuge-case-study";

// Only featured projects get a detail page.
const detailProjects = projects.filter((p) => p.featured);

// These projects have a fully custom case-study layout instead of the
// generic template below (see epvo-case-study.tsx / coquest-case-study.tsx /
// gpt2-case-study.tsx / biosurveillance-case-study.tsx / fontan-case-study.tsx /
// centrifuge-case-study.tsx).
const CUSTOM_CASE_STUDY_SLUGS = new Set([
  "neonatal-photoacoustic-oximeter",
  "coquest",
  "gpt2-from-scratch",
  "biosurveillance-digital-immune-system",
  "fontan-virtual-stenting",
  "centrifuge",
]);

// Pre-render every featured project at build time (static export friendly).
export function generateStaticParams() {
  return detailProjects.map((p) => ({ slug: p.slug }));
}

// In Next 15+/16 route params are async.
type Params = Promise<{ slug: string }>;

function getProject(slug: string) {
  return detailProjects.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  if (CUSTOM_CASE_STUDY_SLUGS.has(slug)) {
    if (slug === "coquest") return <CoQuestCaseStudy />;
    if (slug === "gpt2-from-scratch") return <GPT2CaseStudy />;
    if (slug === "biosurveillance-digital-immune-system") return <BiosurveillanceCaseStudy />;
    if (slug === "fontan-virtual-stenting") return <FontanCaseStudy />;
    if (slug === "centrifuge") return <CentrifugeCaseStudy />;
    return <EPVOCaseStudy />;
  }

  return (
    <Container className="py-16 sm:py-20">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <ArrowRightIcon className="size-4 rotate-180" />
        All projects
      </Link>

      <article className="mt-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          {project.category} · {project.year}
        </p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          {project.summary}
        </p>

        {project.role && (
          <p className="mt-3 text-sm text-subtle">
            <span className="font-medium text-fg">Role:</span> {project.role}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <LinkButton
              key={link.label + link.href}
              href={link.href}
              variant="secondary"
            >
              <ProjectLinkIcon type={link.type} className="size-4" />
              {link.label}
            </LinkButton>
          ))}
        </div>

        {project.video ? (
          <div className="mt-10 overflow-hidden rounded-xl border border-border">
            <video
              controls
              preload="metadata"
              poster={project.image}
              className="w-full"
            >
              <source src={project.video} type="video/mp4" />
            </video>
          </div>
        ) : (
          project.image && (
            <div className="mt-10 overflow-hidden rounded-xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.imageAlt ?? `${project.title} screenshot`}
                className="w-full"
              />
            </div>
          )
        )}

        {project.description && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {project.description}
            </p>
          </div>
        )}

        {project.highlights && project.highlights.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold">Highlights</h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((h, i) => (
                <li
                  key={i}
                  className="relative pl-6 text-base leading-relaxed text-muted before:absolute before:left-0 before:top-2.5 before:size-2 before:rounded-full before:bg-accent/60"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-subtle">
            Tech & topics
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Container>
  );
}
