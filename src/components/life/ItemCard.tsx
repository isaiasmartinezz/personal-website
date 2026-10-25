import Link from "next/link";
import { Tag } from "@/components/ui";
import { formatDate, stars } from "@/lib/life/format";
import { typeInfo } from "@/lib/life/registry";
import type { PublishedItem } from "@/lib/life/types";

function subtitle(item: PublishedItem): string {
  switch (item.type) {
    case "journal": return `Week ${item.data.weekNumber} · ${item.data.kind}`;
    case "place": return `${item.data.cuisine}${item.location?.city ? ` · ${item.location.city}` : ""}`;
    case "film": return `${item.data.year} · ${item.data.director}`;
    case "trip": return item.data.destination;
    case "hike": return `${item.data.distanceKm} km · ${item.data.elevationGainM} m gain`;
    case "recipe": return `${item.data.kind} · ${item.data.proteinPerServing} g protein / serving`;
    case "collection_entry": return `${item.data.collection.replace("-", " ")} · ${item.data.status}`;
  }
}

export function ItemCard({ item }: { item: PublishedItem }) {
  const info = typeInfo(item.type);
  return (
    <Link href={`/${info.segment}/${item.slug}`} className="group block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">{info.singular}</p>
      <h3 className="mt-2 font-serif text-xl font-semibold group-hover:text-accent">{item.title}</h3>
      <p className="mt-1 text-sm text-muted">{subtitle(item)}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted">
        <time dateTime={item.date}>{formatDate(item.date)}</time>
        {item.rating !== undefined && <span aria-label={`Rated ${item.rating} out of 5`}>{stars(item.rating)}</span>}
      </div>
      {item.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">{item.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
      )}
    </Link>
  );
}
