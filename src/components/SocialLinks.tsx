import { site } from "@/data/site";
import { SocialIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";

// Renders the icon links from site.socials. Used in the footer and contact page.
export function SocialLinks({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const iconSize = size === "sm" ? "size-4" : "size-5";
  const boxSize = size === "sm" ? "size-8" : "size-10";

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {site.socials.map((s) => {
        const isHttp = s.href.startsWith("http");
        return (
          <li key={s.platform}>
            <a
              href={s.href}
              aria-label={s.label}
              title={s.label}
              {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={cn(
                "inline-flex items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:border-accent/40 hover:text-accent",
                boxSize,
              )}
            >
              <SocialIcon platform={s.platform} className={iconSize} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
