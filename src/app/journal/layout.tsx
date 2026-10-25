import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { Container } from "@/components/Container";
import { ThemeToggle } from "@/components/ThemeToggle";

// The journal is deliberately unlisted: no links from the main site, not in the
// sitemap or command palette, and marked noindex/nofollow here and via an
// X-Robots-Tag header (next.config.ts) so search engines skip it even if the
// URL is shared. It is *not* password protected — anyone with the link can read it.
const description = "Weekly recaps and the non-professional side of me.";

export const metadata: Metadata = {
  title: { absolute: "Journal", template: "%s · Journal" },
  description,
  // The root layout canonicalizes every page to "/"; the journal shouldn't.
  alternates: {},
  openGraph: { type: "website", siteName: "Journal", title: "Journal", description },
  twitter: { card: "summary_large_image", title: "Journal", description },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

const links = [
  { label: "Posts", href: "/journal" },
  { label: "About me", href: "/journal/about" },
];

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-border">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link href="/journal" className="whitespace-nowrap font-serif text-lg font-semibold tracking-tight hover:text-accent">
            <span className="hidden sm:inline">
              {site.shortName} <span className="font-normal text-subtle">/ </span>
            </span>
            <span className="sm:font-normal sm:text-subtle">Journal</span>
          </Link>
          <nav aria-label="Journal" className="flex items-center gap-1 sm:gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle className="ml-1" />
          </nav>
        </Container>
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="mt-24 border-t border-border">
        <Container className="py-8 text-xs text-subtle">
          <p>© {new Date().getFullYear()} {site.name}. Written weekly, mostly.</p>
        </Container>
      </footer>
    </>
  );
}
