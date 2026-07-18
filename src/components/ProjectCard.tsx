import Link from "next/link";
import type { Project } from "@/lib/types";
import { Tag } from "@/components/ui";
import { ProjectLinkIcon, ArrowUpRightIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";

// Deterministic accent-tinted placeholder thumbnail when a project has no image.
function Thumbnail({ project }: { project: Project }) {
  if (project.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image}
        alt={project.imageAlt ?? `${project.title} preview`}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/10 via-surface-2 to-surface-2"
    >
      <span className="font-serif text-2xl font-semibold text-accent/70">
        {project.category}
      </span>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const detailHref = `/projects/${project.slug}`;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent/40">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
        <Thumbnail project={project} />
        <span className="absolute left-3 top-3 rounded-full bg-page/85 px-2.5 py-0.5 text-xs font-medium text-muted backdrop-blur">
          {project.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug">
          <Link
            href={detailHref}
            className="after:absolute after:inset-0 hover:text-accent"
          >
            {/* stretched link makes the whole card clickable */}
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-4 pt-1">
          {project.links.map((link) => {
            const isHttp = link.href.startsWith("http");
            return (
              <a
                key={link.label + link.href}
                href={link.href}
                {...(isHttp
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                // relative + z ensures these sit above the stretched card link
                className={cn(
                  "relative z-10 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent",
                )}
              >
                <ProjectLinkIcon type={link.type} className="size-4" />
                {link.label}
              </a>
            );
          })}
          <Link
            href={detailHref}
            className="relative z-10 ml-auto inline-flex items-center gap-1 text-sm font-medium text-accent"
          >
            Details
            <ArrowUpRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
