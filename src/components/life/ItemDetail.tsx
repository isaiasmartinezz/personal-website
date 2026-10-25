import { Tag } from "@/components/ui";
import { PhotoGrid } from "./PhotoGrid";
import { formatDate, formatDuration, price, stars } from "@/lib/life/format";
import { renderMarkdown } from "@/lib/life/markdown";
import { typeInfo } from "@/lib/life/registry";
import type { PublishedItem } from "@/lib/life/types";

function Facts({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-xl border border-border bg-surface p-5 text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-muted">{k}</dt>
          <dd className="font-medium">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

// One view per item type, switched on the discriminated union.
function TypeSection({ item }: { item: PublishedItem }) {
  switch (item.type) {
    case "journal":
      return <Facts rows={[["Week", item.data.weekNumber], ["Kind", item.data.kind]]} />;
    case "place":
      return (
        <>
          <Facts rows={[
            ["Cuisine", item.data.cuisine],
            ["Price", price(item.data.priceLevel)],
            ["Visited", item.data.visitDates.map(formatDate).join(", ")],
            ...(item.location ? [["Where", `${item.location.name}${item.location.city ? `, ${item.location.city}` : ""}`] as [string, string]] : []),
          ]} />
          {item.data.dishes.length > 0 && (
            <section><h2 className="font-serif text-xl font-semibold">Dishes</h2>
              <ul className="mt-2 list-disc pl-5 text-muted">{item.data.dishes.map((d) => <li key={d}>{d}</li>)}</ul></section>
          )}
        </>
      );
    case "film":
      return <Facts rows={[["Year", item.data.year], ["Director", item.data.director], ["Watched", formatDate(item.data.watchedDate)], ["Rewatch", item.data.rewatch ? "Yes" : "No"]]} />;
    case "trip":
      return (
        <>
          <Facts rows={[["Destination", item.data.destination], ["Dates", `${formatDate(item.data.startDate)} – ${formatDate(item.data.endDate)}`]]} />
          <section className="space-y-5">
            {item.data.days.map((day, i) => (
              <div key={i}>
                <h2 className="font-serif text-xl font-semibold">{day.label ?? `Day ${i + 1}`}</h2>
                <ul className="mt-2 space-y-1 text-muted">
                  {day.stops.map((s) => <li key={s.name}><span className="font-medium text-fg">{s.name}</span>{s.note ? ` — ${s.note}` : ""}</li>)}
                </ul>
              </div>
            ))}
          </section>
        </>
      );
    case "hike":
      return <Facts rows={[["Trail", item.data.trailName], ["Distance", `${item.data.distanceKm} km`], ["Elevation gain", `${item.data.elevationGainM} m`], ["Time", formatDuration(item.data.durationMin)]]} />;
    case "recipe":
      return (
        <>
          <Facts rows={[["Kind", item.data.kind], ["Servings", item.data.servings], ["Protein / serving", `${item.data.proteinPerServing} g`]]} />
          <section><h2 className="font-serif text-xl font-semibold">Ingredients</h2>
            <ul className="mt-2 list-disc pl-5 text-muted">{item.data.ingredients.map((g) => <li key={g.item}>{g.quantity ? `${g.quantity} ` : ""}{g.item}</li>)}</ul></section>
          <section><h2 className="font-serif text-xl font-semibold">Steps</h2>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted">{item.data.steps.map((s) => <li key={s}>{s}</li>)}</ol></section>
        </>
      );
    case "collection_entry":
      return <Facts rows={[["Collection", item.data.collection.replace("-", " ")], ["Status", item.data.status]]} />;
  }
}

export function ItemDetail({ item }: { item: PublishedItem }) {
  const info = typeInfo(item.type);
  return (
    <article className="space-y-8">
      <header>
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">{info.singular}</p>
        <h1 className="text-4xl font-semibold sm:text-5xl">{item.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-muted">
          <time dateTime={item.date}>{formatDate(item.date)}</time>
          {item.rating !== undefined && <span aria-label={`Rated ${item.rating} out of 5`}>{stars(item.rating)}{item.sourceRating ? ` (${item.sourceRating})` : ""}</span>}
        </div>
        {item.tags.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{item.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>}
      </header>
      <TypeSection item={item} />
      {item.body && <div className="life-prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(item.body) }} />}
      <PhotoGrid photos={item.photos} />
    </article>
  );
}
