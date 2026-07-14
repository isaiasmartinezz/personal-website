// ---------------------------------------------------------------------------
// Inline SVG icons (no icon-library dependency → nothing to ship over the wire
// beyond the markup we use). All icons inherit `currentColor` and take a
// className so you can size/color them with Tailwind.
// ---------------------------------------------------------------------------
import type { SVGProps } from "react";
import type { SocialPlatform, ProjectLinkType } from "@/lib/types";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3 6 9 6 9-6" />
  </Base>
);

export const GithubIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M12 1.5A10.5 10.5 0 0 0 8.68 22c.53.1.72-.23.72-.5v-1.9c-2.92.64-3.54-1.25-3.54-1.25-.48-1.22-1.17-1.54-1.17-1.54-.96-.66.07-.64.07-.64 1.06.07 1.62 1.09 1.62 1.09.94 1.62 2.47 1.15 3.07.88.1-.68.37-1.15.67-1.41-2.33-.27-4.78-1.17-4.78-5.19 0-1.15.41-2.08 1.09-2.82-.11-.27-.47-1.34.1-2.79 0 0 .89-.29 2.91 1.08a10 10 0 0 1 5.3 0c2.02-1.37 2.9-1.08 2.9-1.08.58 1.45.22 2.52.11 2.79.68.74 1.09 1.67 1.09 2.82 0 4.03-2.46 4.91-4.8 5.17.38.33.71.97.71 1.96v2.9c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.5Z" />
  </svg>
);

export const LinkedinIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm6 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.46-2.2 2.96V21H9V9Z" />
  </svg>
);

export const ScholarIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 1.5 9 12 15l10.5-6L12 3Z" />
    <path d="M6 11v4.5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V11" />
    <path d="M22 9v5" />
  </Base>
);

export const TwitterIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M17.53 3H20.5l-6.49 7.41L21.75 21h-6.03l-4.72-6.18L5.6 21H2.63l6.94-7.93L2.25 3h6.18l4.27 5.64L17.53 3Zm-1.06 16.2h1.65L7.6 4.7H5.83l10.64 14.5Z" />
  </svg>
);

export const GlobeIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
  </Base>
);

export const FileTextIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5M9 13h6M9 17h6" />
  </Base>
);

export const ExternalLinkIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M15 3h6v6M21 3l-9 9" />
    <path d="M18 13.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5.5" />
  </Base>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const CodeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m16 18 6-6-6-6M8 6l-6 6 6 6M14 4l-4 16" />
  </Base>
);

export const PlayIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 5.5v13l10-6.5-10-6.5Z" />
  </Base>
);

export const BookOpenIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 6.5C10.5 5 8 4.5 5 4.5c-.6 0-1 .4-1 1V18c0 .6.4 1 1 1 3 0 5.5.5 7 2 1.5-1.5 4-2 7-2 .6 0 1-.4 1-1V5.5c0-.6-.4-1-1-1-3 0-5.5.5-7 2Z" />
    <path d="M12 6.5V21" />
  </Base>
);

export const SunIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Base>
);

export const MoonIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z" />
  </Base>
);

export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const MapPinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Base>
);

export const GraduationCapIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4 2 9l10 5 10-5-10-5Z" />
    <path d="M6 11.5V16c0 1.1 2.7 2.5 6 2.5s6-1.4 6-2.5v-4.5M20 9.5V15" />
  </Base>
);

export const SparkleIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v18M3 12h18M6.5 6.5l11 11M17.5 6.5l-11 11" opacity={0.5} />
    <path d="M12 5l1.6 5.4L19 12l-5.4 1.6L12 19l-1.6-5.4L5 12l5.4-1.6L12 5Z" />
  </Base>
);

export const CopyIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Base>
);

export const AwardIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="9" r="5" />
    <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
  </Base>
);

// Maps a social platform to its icon.
export function SocialIcon({
  platform,
  ...props
}: { platform: SocialPlatform } & IconProps) {
  switch (platform) {
    case "email":
      return <MailIcon {...props} />;
    case "github":
      return <GithubIcon {...props} />;
    case "linkedin":
      return <LinkedinIcon {...props} />;
    case "scholar":
      return <ScholarIcon {...props} />;
    case "twitter":
      return <TwitterIcon {...props} />;
    case "blog":
      return <GlobeIcon {...props} />;
    case "resume":
      return <FileTextIcon {...props} />;
    default:
      return <ExternalLinkIcon {...props} />;
  }
}

// Maps a project-link type to its icon.
export function ProjectLinkIcon({
  type,
  ...props
}: { type: ProjectLinkType } & IconProps) {
  switch (type) {
    case "demo":
      return <PlayIcon {...props} />;
    case "code":
      return <CodeIcon {...props} />;
    case "paper":
      return <BookOpenIcon {...props} />;
    case "writeup":
      return <FileTextIcon {...props} />;
    default:
      return <ExternalLinkIcon {...props} />;
  }
}
