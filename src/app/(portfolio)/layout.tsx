import { site } from "@/data/site";
import { PortfolioChrome } from "@/components/PortfolioChrome";

// A small hello for anyone curious enough to open devtools.
const githubUrl = site.socials.find((s) => s.platform === "github")?.href;
const consoleGreeting = `console.log(${JSON.stringify(
  `%c👋 Hey, curious engineer — thanks for peeking under the hood. Like what you see? Let's talk: ${site.email} · ${githubUrl}`,
)}, "font-size:13px;font-family:monospace;color:#71717a;font-weight:600;");`;

// Site-wide Person schema so search engines can render a richer result (and
// connect this domain to the linked GitHub/LinkedIn profiles) for name searches.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  email: site.email,
  address: { "@type": "PostalAddress", addressLocality: site.location },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Stanford University" },
  sameAs: site.socials
    .filter((s) => s.platform !== "email")
    .map((s) => s.href),
};

export default function PortfolioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: consoleGreeting }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <PortfolioChrome>{children}</PortfolioChrome>
    </>
  );
}
