import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/ui";
import { ItemCard } from "@/components/life/ItemCard";
import { PlacesMapLoader } from "@/components/life/PlacesMapLoader";
import { SampleBanner } from "@/components/life/SampleBanner";
import { getItems } from "@/lib/life/load";
import { TYPES, typeBySegment } from "@/lib/life/registry";

export const dynamicParams = false;

export function generateStaticParams() {
  return TYPES.map((t) => ({ type: t.segment }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const info = typeBySegment((await params).type);
  return { title: { absolute: info ? `${info.label} · Life` : "Life" } };
}

export default async function LifeList({ params }: { params: Promise<{ type: string }> }) {
  const info = typeBySegment((await params).type);
  if (!info) notFound();
  const items = getItems(info.type);
  const points = info.type === "place"
    ? getItems("place").flatMap((p) => (p.location ? [{ slug: p.slug, title: p.title, lat: p.location.lat, lng: p.location.lng }] : []))
    : [];
  return (
    <Container className="space-y-8 py-14">
      <PageHeader eyebrow="Life" title={info.label} lead={info.blurb} />
      {items.some((i) => i.id.startsWith("fixture-")) && <SampleBanner />}
      {points.length > 0 && <PlacesMapLoader points={points} />}
      {items.length === 0 ? <p className="text-muted">Nothing here yet.</p> : (
        <div className="grid gap-4 sm:grid-cols-2">{items.map((i) => <ItemCard key={i.id} item={i} />)}</div>
      )}
    </Container>
  );
}
