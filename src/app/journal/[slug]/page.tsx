import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { ArrowRightIcon } from "@/components/Icons";
import { formatJournalDate, getAllPosts, getPost } from "@/lib/journal";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.summary,
    openGraph: { title: post.title, description: post.summary, type: "article" },
  };
}

export default async function JournalPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Posts are sorted newest-first, so "newer" is the previous index.
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const newer = index > 0 ? posts[index - 1] : undefined;
  const older = index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined;

  return (
    <Container className="py-16 sm:py-20">
      <Link
        href="/journal"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <ArrowRightIcon className="size-4 rotate-180" />
        All posts
      </Link>

      <article className="mt-8 max-w-2xl">
        <p className="text-sm text-subtle">{formatJournalDate(post.date)}</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">{post.title}</h1>
        {post.summary && <p className="mt-4 text-lg leading-relaxed text-muted">{post.summary}</p>}
        <div className="journal-prose mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      {(newer || older) && (
        <nav aria-label="More posts" className="mt-16 grid max-w-2xl grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
          {older ? (
            <Link href={`/journal/${older.slug}`} className="group">
              <p className="text-xs uppercase tracking-widest text-subtle">Older</p>
              <p className="mt-1 font-serif text-lg font-semibold group-hover:text-accent">{older.title}</p>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link href={`/journal/${newer.slug}`} className="group sm:text-right">
              <p className="text-xs uppercase tracking-widest text-subtle">Newer</p>
              <p className="mt-1 font-serif text-lg font-semibold group-hover:text-accent">{newer.title}</p>
            </Link>
          )}
        </nav>
      )}
    </Container>
  );
}
