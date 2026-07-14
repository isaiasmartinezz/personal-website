import { cn } from "@/lib/utils";

// Centered, responsive content column used by every page and section.
export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-5xl px-5 sm:px-8", className)}>
      {children}
    </Tag>
  );
}
