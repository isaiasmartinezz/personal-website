import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "@/components/Icons";

// ---------------------------------------------------------------------------
// Small, reused UI primitives: chips, buttons, and a page header.
// ---------------------------------------------------------------------------

/** A small pill used for tech/topic tags. */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg hover:bg-accent-hover shadow-sm shadow-accent/20",
  secondary:
    "border border-border bg-surface text-fg hover:border-accent/40 hover:text-accent",
  ghost: "text-muted hover:text-accent",
};

/**
 * Link styled as a button. Automatically renders a plain <a> (new tab) for
 * external/`mailto:` hrefs and a Next <Link> for internal routes.
 */
export function LinkButton({
  href,
  children,
  variant = "primary",
  className,
  showExternalIcon = false,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  showExternalIcon?: boolean;
  ariaLabel?: string;
}) {
  const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:");
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
    buttonStyles[variant],
    className,
  );

  if (isExternal) {
    const isHttp = href.startsWith("http");
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={classes}
      >
        {children}
        {showExternalIcon && <ArrowUpRightIcon className="size-4" />}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={classes}>
      {children}
    </Link>
  );
}

/** Standard header for every page: small eyebrow label, title, and lead text. */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: React.ReactNode;
}) {
  return (
    <header className="max-w-3xl">
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl font-semibold sm:text-5xl">{title}</h1>
      {lead && (
        <p className="mt-5 text-lg leading-relaxed text-muted">{lead}</p>
      )}
    </header>
  );
}
