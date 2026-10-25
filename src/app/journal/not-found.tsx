import Link from "next/link";
import { Container } from "@/components/Container";

export default function JournalNotFound() {
  return (
    <Container className="py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-subtle">404</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold">Nothing here</h1>
      <p className="mt-4 text-muted">That post doesn&apos;t exist (or hasn&apos;t been published yet).</p>
      <Link href="/journal" className="mt-6 inline-block text-sm font-medium text-accent hover:text-accent-hover">
        Back to the journal
      </Link>
    </Container>
  );
}
