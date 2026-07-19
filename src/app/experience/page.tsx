import type { Metadata } from "next";
import { experience } from "@/data/experience";
import { site } from "@/data/site";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/ui";
import { ExperienceList } from "@/components/ExperienceList";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";

export const metadata: Metadata = {
  title: "Experience",
  description: `Roles and research held by ${site.name} — internships, research, and teaching.`,
};

export default function ExperiencePage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Experience"
        title="Where I've worked"
        lead="Industry internships, research, and teaching — most recent first."
      />
      <div className="mt-12">
        <ExperienceTimeline items={experience} />
      </div>

      <div className="mt-12 max-w-3xl">
        <ExperienceList items={experience} />
      </div>
    </Container>
  );
}
