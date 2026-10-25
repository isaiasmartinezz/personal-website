import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/ui";
import { formatJournalDate, getAllPosts } from "@/lib/journal";

export default function JournalHomePage() {
  const posts = getAllPosts();

  // Group by year, newest first (posts are already sorted newest-first).
  const byYear = new Map<string, typeof posts>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    byYear.set(year, [...(byYear.get(year) ?? []), post]);
  }

  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Journal"
        title="Weekly recaps"
        lead="What I've been up to, what I'm into, and whatever else doesn't belong on a resume."
      />

      {posts.length === 0 ? (
        <p className="mt-12 text-muted">Nothing here yet — the first recap is coming soon.</p>
      ) : (
        <div className="mt-12 max-w-2xl space-y-12">
          {[...byYear.entries()].map(([year, yearPosts]) => (
            <section key={year} aria-labelledby={`year-${year}`}>
              <h2 id={`year-${year}`} className="text-sm font-semibold uppercase tracking-widest text-subtle">
                {year}
              </h2>
              <ul className="mt-4 divide-y divide-border border-y border-border">
                {yearPosts.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/journal/${post.slug}`} className="group block py-5">
                      <p className="text-xs text-subtle">{formatJournalDate(post.date)}</p>
                      <h3 className="mt-1 font-serif text-xl font-semibold group-hover:text-accent">
                        {post.title}
                        {post.draft && (
                          <span className="ml-2 rounded-full border border-border px-2 py-0.5 align-middle font-sans text-xs font-medium text-subtle">
                            Draft
                          </span>
                        )}
                      </h3>
                      {post.summary && <p className="mt-1.5 text-sm leading-relaxed text-muted">{post.summary}</p>}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </Container>
  );
}
