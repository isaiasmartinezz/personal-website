import type { Metadata, Viewport } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { site } from "@/data/site";
import { SiteAnalytics } from "@/components/SiteAnalytics";

// Shared shell for every host/section (portfolio and the personal "life"
// section): <html>, fonts, theme, analytics. Side-specific chrome and structured
// data live in that side's own layout:
//   src/app/(portfolio)/layout.tsx   and   src/app/(life)/life/layout.tsx

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

// Default (portfolio) metadata. It lives here, not in the (portfolio) layout, so
// the root-level opengraph-image file merges into openGraph/twitter exactly as
// before. The personal section's layout overrides every field below.
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
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
        >
          Skip to content
        </a>
        {children}
        <SiteAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
