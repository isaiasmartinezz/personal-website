import type { Publication } from "@/lib/types";
import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { AwardIcon, ExternalLinkIcon } from "@/components/Icons";

// Renders one author, bolding the site owner so their name stands out.
function Authors({ authors }: { authors: string[] }) {
  return (
    <span>
      {authors.map((name, i) => {
        const isSelf = name.trim() === site.name.trim();
        return (
          <span key={i}>
            <span className={isSelf ? "font-semibold text-fg" : undefined}>
              {name}
            </span>
            {i < authors.length - 1 ? ", " : ""}
          </span>
        );
      })}
    </span>
  );
}

export function PublicationsList({ items }: { items: Publication[] }) {
  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border bg-surface p-8 text-center text-muted">
        Publications will appear here soon.
      </p>
    );
  }

  return (
    <ol className="space-y-6">
      {items.map((pub, i) => (
        <Reveal
          as="li"
          key={pub.title}
          delay={i * 60}
          className="rounded-xl border border-border bg-surface p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-base font-semibold leading-snug">{pub.title}</h2>
            {pub.type && (
              <span className="mt-0.5 shrink-0 rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-xs font-medium capitalize text-muted">
                {pub.type}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-muted">
            <Authors authors={pub.authors} />
          </p>

          <p className="mt-1 text-sm text-subtle">
            <span className="italic">{pub.venue}</span>
            {pub.venue && pub.year ? ", " : ""}
            {pub.year}
          </p>

          {pub.award && (
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              <AwardIcon className="size-4" />
              {pub.award}
            </p>
          )}

          {pub.abstract && (
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {pub.abstract}
            </p>
          )}

          {pub.links && pub.links.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4">
              {pub.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
                >
                  {link.label}
                  <ExternalLinkIcon className="size-3.5" />
                </a>
              ))}
            </div>
          )}
        </Reveal>
      ))}
    </ol>
  );
}
