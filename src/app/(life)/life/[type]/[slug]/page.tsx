import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ItemDetail } from "@/components/life/ItemDetail";
import { SampleBanner } from "@/components/life/SampleBanner";
import { getAllItems, getItem } from "@/lib/life/load";
import { typeBySegment, typeInfo } from "@/lib/life/registry";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllItems().map((i) => ({ type: typeInfo(i.type).segment, slug: i.slug }));
}

type Props = { params: Promise<{ type: string; slug: string }> };

async function find({ params }: Props) {
  const { type, slug } = await params;
  const info = typeBySegment(type);
  return info ? { info, item: getItem(info.type, slug) } : null;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const found = await find(props);
  return { title: { absolute: found?.item ? `${found.item.title} · Life` : "Life" } };
}

export default async function LifeDetail(props: Props) {
  const found = await find(props);
  if (!found?.item) notFound();
  const { info, item } = found;
  return (
    <Container className="max-w-3xl space-y-8 py-14">
      <Link href={`/${info.segment}`} className="text-sm text-muted hover:text-accent">← {info.label}</Link>
      {item.id.startsWith("fixture-") && <SampleBanner />}
      <ItemDetail item={item} />
    </Container>
  );
}
