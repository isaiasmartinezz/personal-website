import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/ui";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";

export const metadata: Metadata = {
  title: "Projects",
  description: `Projects by ${site.name} — ML systems, distributed systems, and more. Filter by topic or tech.`,
};

export default function ProjectsPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Projects"
        title="Things I've built"
        lead="A mix of research prototypes, systems work, and side projects. Use the filters to narrow by topic or tech."
      />

      <div className="mt-10">
        <ProjectsExplorer projects={projects} />
      </div>
    </Container>
  );
}
