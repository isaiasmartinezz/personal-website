import Link from "next/link";
import { site } from "@/data/site";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { LinkButton, Tag } from "@/components/ui";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import { ProjectCard } from "@/components/ProjectCard";
import { SocialLinks } from "@/components/SocialLinks";
import {
  MailIcon,
  FileTextIcon,
  ArrowRightIcon,
  MapPinIcon,
} from "@/components/Icons";

const featured = projects.filter((p) => p.featured);

export default function Home() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden">
        {/* soft accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-24 h-64 bg-[radial-gradient(60%_100%_at_50%_0%,color-mix(in_oklab,var(--accent)_14%,transparent),transparent)]"
        />
        <Container className="grid grid-cols-1 items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.4fr_1fr]">
          {/* Hero renders immediately (no scroll-reveal) so it's the LCP paint. */}
          <div>
            <p className="inline-flex items-center gap-1.5 text-sm font-medium text-muted">
              <MapPinIcon className="size-4 text-accent" />
              {site.location}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-6xl">
              {site.name}
            </h1>
            <p className="mt-4 text-xl text-muted sm:text-2xl">{site.role}</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {site.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/contact" variant="primary">
                <MailIcon className="size-4" />
                Get in touch
              </LinkButton>
              <LinkButton href="/resume" variant="secondary">
                <FileTextIcon className="size-4" />
                Resume
              </LinkButton>
            </div>

            <div className="mt-8">
              <SocialLinks size="md" />
            </div>
          </div>

          <div className="justify-self-center lg:justify-self-end">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/20 to-transparent blur-xl"
              />
              <ProfilePhoto
                src={profile.photo}
                alt={profile.photoAlt}
                priority
                className="relative aspect-square w-56 rounded-3xl border border-border shadow-xl sm:w-72"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------- Focus areas ---------------- */}
      <Container className="pb-4">
        <Reveal className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold uppercase tracking-widest text-subtle">
            Focus
          </span>
          <ul className="flex flex-wrap gap-2">
            {profile.focusAreas.map((area) => (
              <li key={area}>
                <Tag>{area}</Tag>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>

      {/* ---------------- Intro teaser (full story lives on /about) ---------------- */}
      <Container className="py-12">
        <Reveal className="max-w-3xl">
          <p className="text-xl leading-relaxed text-fg sm:text-2xl">
            {profile.homeTeaser}
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
          >
            More about me
            <ArrowRightIcon className="size-4" />
          </Link>
        </Reveal>
      </Container>

      {/* ---------------- Selected projects ---------------- */}
      {featured.length > 0 && (
        <Container className="py-12">
          <Reveal className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                Selected work
              </p>
              <h2 className="mt-2 text-3xl font-semibold">Featured projects</h2>
            </div>
            <Link
              href="/projects"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover sm:inline-flex"
            >
              All projects
              <ArrowRightIcon className="size-4" />
            </Link>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={i * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <Link
            href="/projects"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover sm:hidden"
          >
            All projects
            <ArrowRightIcon className="size-4" />
          </Link>
        </Container>
      )}

      {/* ---------------- CTA band ---------------- */}
      <Container className="py-12">
        <Reveal className="overflow-hidden rounded-2xl border border-border bg-surface p-8 sm:p-12">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Let&apos;s work together.
              </h2>
              <p className="mt-2 max-w-md text-muted">
                Whether it&apos;s a research collaboration, an internship, or
                just an interesting systems problem — I&apos;d love to hear from
                you.
              </p>
            </div>
            <LinkButton href="/contact" variant="primary" className="shrink-0">
              <MailIcon className="size-4" />
              Get in touch
            </LinkButton>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
