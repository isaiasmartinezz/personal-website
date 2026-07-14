import Link from "next/link";
import { site } from "@/data/site";
import { Container } from "@/components/Container";
import { SocialLinks } from "@/components/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <p className="font-serif text-lg font-semibold">{site.name}</p>
          <p className="mt-2 text-sm text-muted">{site.tagline}</p>
          <SocialLinks className="mt-4" size="sm" />
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p>
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            Next.js
          </a>{" "}
          &{" "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            Tailwind CSS
          </a>
          .
        </p>
      </Container>
    </footer>
  );
}
