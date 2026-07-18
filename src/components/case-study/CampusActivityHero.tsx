import Image from "next/image";

// The project artwork stays the primary visual; the activity chips below it
// are a restrained "campus pulse" — a few temporary signals with a once-only
// ring animation (see .quest-ping in globals.css), not an overlay on the
// artwork itself. Reduced motion is handled entirely in CSS.
export function CampusActivityHero({
  image,
  imageAlt,
  caption,
  signals,
}: {
  image: string;
  imageAlt: string;
  caption: string;
  signals: string[];
}) {
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <Image src={image} alt={imageAlt} width={1600} height={900} priority className="h-auto w-full" />
      </div>

      <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
        {signals.map((label, i) => (
          <li
            key={label}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--quest-border)] bg-[color:var(--quest-soft)] px-3 py-1.5 text-xs font-medium text-fg"
          >
            <span
              className="quest-ping relative inline-flex size-1.5 shrink-0 rounded-full bg-[color:var(--quest)]"
              style={{ "--ping-delay": `${i * 350}ms` } as React.CSSProperties}
              aria-hidden="true"
            />
            {label}
          </li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="mx-auto mt-5 h-px max-w-md"
        style={{
          background: "linear-gradient(to right, transparent, var(--border) 20%, var(--border) 80%, transparent)",
        }}
      />

      <figcaption className="mx-auto mt-5 max-w-lg text-center text-sm leading-relaxed text-subtle">
        {caption}
      </figcaption>
    </figure>
  );
}
