import type { SiteConfig } from "@/lib/types";

// ---------------------------------------------------------------------------
// Site-wide configuration
// ---------------------------------------------------------------------------
// This is the first file to edit. It controls your name, tagline, contact
// info, social links, and the top navigation.
// ---------------------------------------------------------------------------

export const site: SiteConfig = {
  name: "Isaias Martinez",
  shortName: "Isaias Martinez",
  role: "Software Engineer & AI Builder · Stanford CS + Bioengineering",

  tagline:
    "Software engineer building full-stack apps and AI systems — with deep domain expertise in healthcare, security, and biomedical research.",

  // Used for <meta name="description"> and social share cards. ~150 chars.
  description:
    "Isaias Martinez — software engineer and AI builder at Stanford (CS M.S., Bioengineering B.S. Honors). Full-stack apps, LLMs, and data systems for healthcare and security.",

  // TODO: set this to your real deployed URL (used for canonical + sitemap + OG).
  url: "https://isaiasmartinez.dev",

  location: "Stanford, CA",

  email: "isaiasm@stanford.edu",

  socials: [
    { platform: "email", label: "Email", href: "mailto:isaiasm@stanford.edu" },
    { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/isaias--martinez/" },
    { platform: "github", label: "GitHub", href: "https://github.com/isaiasmartinezz" },
  ],

  // Top navigation. Order = display order.
  nav: [
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Education", href: "/education" },
    { label: "Publications", href: "/publications" },
    { label: "Contact", href: "/contact" },
  ],

  // TODO: drop your resume PDF at public/resume.pdf (or change this path).
  resumePath: "/resume.pdf",
};
