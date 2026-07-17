import { LinkButton } from "@/components/ui";
import { BookOpenIcon } from "@/components/Icons";

export function ThesisDocumentCard({
  title,
  author,
  department,
  advisor,
  year,
  honors,
  pageCount,
  href,
}: {
  title: string;
  author: string;
  department: string;
  advisor: string;
  year: string;
  honors: string;
  pageCount: string;
  href: string;
}) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
      <div className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2">
        <BookOpenIcon className="size-7 text-accent" />
      </div>
      <div className="flex-1">
        <p className="font-serif text-lg font-semibold leading-snug text-fg">{title}</p>
        <p className="mt-1 text-sm text-muted">{author}</p>
        <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-subtle sm:flex sm:flex-wrap sm:gap-x-8">
          <div>
            <dt className="inline font-semibold">Department: </dt>
            <dd className="inline">{department}</dd>
          </div>
          <div>
            <dt className="inline font-semibold">Advisor: </dt>
            <dd className="inline">{advisor}</dd>
          </div>
          <div>
            <dt className="inline font-semibold">Year: </dt>
            <dd className="inline">{year}</dd>
          </div>
          <div>
            <dt className="inline font-semibold">Designation: </dt>
            <dd className="inline">{honors}</dd>
          </div>
          <div>
            <dt className="inline font-semibold">Length: </dt>
            <dd className="inline">{pageCount}</dd>
          </div>
        </dl>
      </div>
      <LinkButton href={href} variant="primary" className="shrink-0">
        <BookOpenIcon className="size-4" />
        Read Thesis
      </LinkButton>
    </div>
  );
}
