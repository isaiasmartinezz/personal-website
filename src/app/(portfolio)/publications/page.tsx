import type { Metadata } from "next";
import { publications } from "@/data/publications";
import { site } from "@/data/site";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/ui";
import { PublicationsList } from "@/components/PublicationsList";

export const metadata: Metadata = {
  title: "Publications",
  description: `Publications and research by ${site.name}.`,
};

export default function PublicationsPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Research"
        title="Publications & Research"
        lead="Selected research output — my honors thesis and academic work. Papers and preprints will be added here as they come out."
      />
      <div className="mt-12 max-w-3xl">
        <PublicationsList items={publications} />
      </div>
    </Container>
  );
}
