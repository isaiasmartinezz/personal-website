import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { site } from "@/data/site";
import { Container } from "@/components/Container";
import { PageHeader, Tag, LinkButton } from "@/components/ui";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import { Reveal } from "@/components/Reveal";
import { MailIcon, FileTextIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — background, focus areas, and what I'm looking for.`,
};

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="About"
        title="A bit about me"
        lead={profile.lookingFor}
      />

      {/* Quick facts strip */}
      <Reveal className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
        {profile.quickFacts.map((fact) => (
          <div key={fact.label} className="bg-surface p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-subtle">
              {fact.label}
            </dt>
            <dd className="mt-1 text-sm font-medium text-fg">{fact.value}</dd>
          </div>
        ))}
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_260px]">
        {/* Bio */}
        <Reveal className="max-w-2xl">
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            {profile.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-subtle">
              Focus areas
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.focusAreas.map((area) => (
                <li key={area}>
                  <Tag>{area}</Tag>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <LinkButton href={`mailto:${site.email}`} variant="primary">
              <MailIcon className="size-4" />
              Email me
            </LinkButton>
            <LinkButton href="/resume" variant="secondary">
              <FileTextIcon className="size-4" />
              View resume
            </LinkButton>
          </div>
        </Reveal>

        {/* Photo */}
        <Reveal delay={100} className="order-first lg:order-last">
          <ProfilePhoto
            src={profile.photo}
            alt={profile.photoAlt}
            className="aspect-square w-40 rounded-2xl border border-border shadow-lg lg:w-full"
          />
        </Reveal>
      </div>
    </Container>
  );
}
