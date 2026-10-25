import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LifeNav } from "@/components/life/LifeNav";
import { LIFE_URL } from "@/lib/life/config";
import { TYPES } from "@/lib/life/registry";

// The personal section: its own host, never indexed, never linked from the
// portfolio. Every field the root layout sets for the portfolio is overridden
// here (null = removed) so nothing about the portfolio leaks into these pages.
export const metadata: Metadata = {
  metadataBase: new URL(LIFE_URL),
  // absolute: the root layout's portfolio title template must not apply here.
  title: { absolute: "Life" },
  description: "A personal log.",
  applicationName: null,
  authors: null,
  creator: null,
  keywords: null,
  manifest: null,
  alternates: { canonical: null },
  openGraph: { title: "Life", description: "A personal log.", siteName: "Life", type: "website" },
  twitter: { card: "summary", title: "Life", description: "A personal log." },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

const navItems = TYPES.map((t) => ({ href: `/${t.segment}`, label: t.label }));

export default function LifeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-page/80 backdrop-blur-md">
        <Container className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3">
          <Link href="/" className="rounded-md font-serif text-lg font-semibold tracking-tight hover:text-accent">Life</Link>
          <nav aria-label="Primary" className="order-3 w-full md:order-none md:w-auto"><LifeNav items={navItems} /></nav>
          <ThemeToggle />
        </Container>
      </header>
      <main id="main" className="flex-1">{children}</main>
      <footer className="border-t border-border py-8 text-sm text-muted">
        <Container>Personal and unlisted. Not indexed by search engines.</Container>
      </footer>
    </>
  );
}
