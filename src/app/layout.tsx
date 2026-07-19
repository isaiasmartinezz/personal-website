import type { Metadata, Viewport } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { site } from "@/data/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteAnalytics } from "@/components/SiteAnalytics";

// Fonts: Inter (UI/body), Newsreader (serif headings), JetBrains Mono (code).
// next/font self-hosts these — zero layout shift, no external requests.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    site.name,
    "software engineer",
    "AI engineer",
    "full-stack developer",
    "bioengineering",
    "healthcare technology",
    "portfolio",
    "Stanford",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// Applied before first paint to prevent a flash of the wrong theme. Reads the
// saved preference, falling back to the OS setting.
const themeScript = `(function(){var e=document.documentElement;e.classList.add('js');try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d)){e.classList.add('dark');}}catch(_){}})();`;

// Visit the site once with ?owner=1 (from each of your own browsers/devices)
// to flag this browser as yours — SiteAnalytics then drops all future
// analytics events from it, so only real visitors get counted.
const ownerOptOutScript = `(function(){try{var p=new URLSearchParams(window.location.search);if(p.get('owner')==='1'){localStorage.setItem('isaias-owner-visit','1');}}catch(_){}})();`;

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: ownerOptOutScript }} />
        <script dangerouslySetInnerHTML={{ __html: consoleGreeting }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <SiteAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
