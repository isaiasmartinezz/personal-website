// ---------------------------------------------------------------------------
// Shared content types
// ---------------------------------------------------------------------------
// These describe the shape of everything in `src/data/*.ts`. You normally
// DON'T edit this file to change content — edit the data files instead. This
// exists so your editor autocompletes fields and warns you if an entry is
// missing something.
// ---------------------------------------------------------------------------

export type SocialPlatform =
  | "email"
  | "github"
  | "linkedin"
  | "scholar"
  | "twitter"
  | "blog"
  | "resume";

export interface SocialLink {
  platform: SocialPlatform;
  /** Accessible label, e.g. "GitHub". */
  label: string;
  /** Full URL, or `mailto:` for email. */
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  /** Full name, used in the header, footer, and metadata. */
  name: string;
  /** Short name for tight spaces (e.g. the logo). */
  shortName: string;
  /** Current role/title, e.g. "MS CS @ Stanford". */
  role: string;
  /** One-line tagline shown in the hero. */
  tagline: string;
  /** ~150-char description used for SEO meta + Open Graph. */
  description: string;
  /** Canonical production URL, no trailing slash. */
  url: string;
  location: string;
  email: string;
  socials: SocialLink[];
  /** Top-level navigation (the multi-page routes). */
  nav: NavItem[];
  /** Path to the resume PDF inside /public. */
  resumePath: string;
}

export interface QuickFact {
  label: string;
  value: string;
}

export interface Profile {
  /** Short, single-sentence hook for the home page — distinct from `bio` so
   * the home and about pages don't repeat the same paragraph. */
  homeTeaser: string;
  /** Bio paragraphs — each string is one <p>. Shown in full on /about only. */
  bio: string[];
  /** One sentence: what you're looking for right now. Shown on /about only. */
  lookingFor: string;
  /** 2–4 focus areas / interests. Shown on the home page only. */
  focusAreas: string[];
  quickFacts: QuickFact[];
  /** Real honors/recognition, shown only on /about. */
  recognition: string[];
  /** Photo path inside /public (leave the placeholder if you have none yet). */
  photo: string;
  photoAlt: string;
}

export type ExperienceType = "industry" | "research" | "teaching" | "other";

export interface ExperienceEntry {
  title: string;
  organization: string;
  location?: string;
  type: ExperienceType;
  /** Human dates, e.g. "Jun 2025". */
  start: string;
  /** "Present" for current roles. */
  end: string;
  summary?: string;
  /** 2–4 impact-focused bullets. */
  highlights: string[];
  tech?: string[];
  /** Optional link to the org or a related page. */
  href?: string;
}

export type ProjectCategory = "ML" | "Systems" | "Web" | "Research" | "Tools";

export type ProjectLinkType = "demo" | "code" | "paper" | "writeup" | "other";

export interface ProjectLink {
  label: string;
  href: string;
  type: ProjectLinkType;
}

export interface Project {
  /** URL-safe id; every project gets a page at /projects/<slug>. */
  slug: string;
  title: string;
  /** One or two sentences for the card. */
  summary: string;
  /** Longer body for the detail page's Overview section. */
  description?: string;
  category: ProjectCategory;
  /** Tech + topic tags; also power the filter on the Projects page. */
  tags: string[];
  /** Featured projects also appear on the home page (and the project filmstrip). */
  featured: boolean;
  year: string;
  /** Thumbnail path inside /public. Optional — a placeholder renders if omitted. */
  image?: string;
  imageAlt?: string;
  /** Optional video path inside /public, shown on the detail page instead of
   * the image (using `image` as the poster frame if both are set). */
  video?: string;
  links: ProjectLink[];
  /** Bullet highlights shown on the detail page. */
  highlights?: string[];
  role?: string;
}

export interface SkillGroup {
  name: string;
  skills: string[];
  /** Slugs of 1-2 real projects that best show this category in use (see projects.ts). */
  seenIn?: string[];
}

export interface EducationEntry {
  degree: string;
  field: string;
  institution: string;
  location?: string;
  start: string;
  end: string;
  gpa?: string;
  honors?: string[];
  thesis?: string;
  coursework?: string[];
}

export type PublicationType =
  | "conference"
  | "journal"
  | "workshop"
  | "preprint";

export interface Publication {
  title: string;
  /** Author list in order. Your own name is auto-bolded (matches site.name). */
  authors: string[];
  /** Venue + year string, e.g. "NeurIPS 2025". */
  venue: string;
  year: string;
  type?: PublicationType;
  links?: { label: string; href: string }[];
  abstract?: string;
  award?: string;
}
