"use client";

import { useState } from "react";
import { CopyIcon, CheckIcon } from "@/components/Icons";

// Copies the email to the clipboard with a brief confirmation.
export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the mailto link is the fallback path. */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent"
      aria-live="polite"
    >
      {copied ? (
        <>
          <CheckIcon className="size-4 text-accent" />
          Copied!
        </>
      ) : (
        <>
          <CopyIcon className="size-4" />
          Copy email
        </>
      )}
    </button>
  );
}
