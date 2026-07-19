"use client";

import { Analytics } from "@vercel/analytics/next";
import type { BeforeSendEvent } from "@vercel/analytics/next";

// Visiting the site with ?owner=1 once (see the inline script in layout.tsx)
// sets this flag in localStorage, so this browser's future visits are
// silently excluded from analytics — everyone else is unaffected.
const OWNER_FLAG = "isaias-owner-visit";

function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  try {
    if (localStorage.getItem(OWNER_FLAG) === "1") return null;
  } catch {
    // localStorage unavailable (e.g. private mode) — fail open, still tracked.
  }
  return event;
}

export function SiteAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
