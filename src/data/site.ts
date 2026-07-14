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
  role: "Bioengineering B.S. (Honors) · Computer Science M.S. @ Stanford",

  tagline:
    "Bioengineer and software developer building AI and data systems for healthcare, security, and biomedical research.",

  // Used for <meta name="description"> and social share cards. ~150 chars.
  description:
    "Isaias Martinez — Stanford Bioengineering (B.S., Honors) and Computer Science (M.S.). I build software, AI, and data systems across healthcare, security, and biomedical research.",

  // TODO: set this to your real deployed URL (used for canonical + sitemap + OG).
  url: "https://isaiasmartinez.dev",

  location: "Stanford, CA",

  email: "isaiasm@stanford.edu",

  socials: [
    { platform: "email", label: "Email", href: "mailto:isaiasm@stanford.edu" },
    { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/isaias--martinez/" },
    // TODO: add your GitHub handle if you'd like it shown:
    // { platform: "github", label: "GitHub", href: "https://github.com/<you>" },
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
