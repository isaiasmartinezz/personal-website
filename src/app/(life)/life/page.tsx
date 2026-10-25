import { Container } from "@/components/Container";
import { PageHeader } from "@/components/ui";
import { ItemCard } from "@/components/life/ItemCard";
import { SampleBanner } from "@/components/life/SampleBanner";
import { getAllItems } from "@/lib/life/load";
import { TYPES } from "@/lib/life/registry";
import Link from "next/link";

export default function LifeHome() {
  const items = getAllItems();
  const recent = items.slice(0, 6);
  const hasSample = items.some((i) => i.id.startsWith("fixture-"));
  return (
    <Container className="space-y-12 py-14">
      <PageHeader eyebrow="Life" title="A personal log" lead="Weekly notes, places, films, trips, hikes, recipes and collections." />
      {hasSample && <SampleBanner />}
      <section aria-label="Sections" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TYPES.map((t) => (
          <Link key={t.type} href={`/${t.segment}`} className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40">
            <h2 className="font-serif text-xl font-semibold">{t.label}</h2>
            <p className="mt-1 text-sm text-muted">{t.blurb}</p>
          </Link>
        ))}
      </section>
      <section aria-label="Recent">
        <h2 className="mb-4 font-serif text-2xl font-semibold">Recent</h2>
        <div className="grid gap-4 sm:grid-cols-2">{recent.map((i) => <ItemCard key={i.id} item={i} />)}</div>
      </section>
    </Container>
  );
}
