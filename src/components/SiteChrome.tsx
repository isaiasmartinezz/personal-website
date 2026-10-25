"use client";

import { usePathname } from "next/navigation";

// The professional site's nav/footer wrap every page *except* the unlisted
// personal journal, which brings its own header and footer (see
// src/app/journal/layout.tsx). Keeping this in one place means the main
// site never needs to know the journal exists.
export function SiteChrome({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const isJournal = pathname === "/journal" || pathname.startsWith("/journal/");

  if (isJournal) return <>{children}</>;

  return (
    <>
      {header}
      <main id="main" className="flex-1">
        {children}
      </main>
      {footer}
    </>
  );
}
