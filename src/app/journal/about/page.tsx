import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/ui";
import { getAboutPage } from "@/lib/journal";

export const metadata: Metadata = { title: "About me" };

export default function JournalAboutPage() {
  const about = getAboutPage();

  return (
    <Container className="py-16 sm:py-20">
      <PageHeader eyebrow="About" title={about.title} />
      <div className="journal-prose mt-10 max-w-2xl" dangerouslySetInnerHTML={{ __html: about.html }} />
    </Container>
  );
}
