"use client";

import { useState } from "react";
import { ArrowRightIcon } from "@/components/Icons";

// ---------------------------------------------------------------------------
// Accessible contact form. It POSTs to /api/contact, which currently just
// validates the payload and returns success. To actually deliver mail, wire an
// email provider inside src/app/api/contact/route.ts (instructions there).
// Until then this still works as a graceful UX; nothing is silently lost
// because the page also offers a direct mailto link.
// ---------------------------------------------------------------------------
type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl border border-accent/30 bg-accent/10 p-6 text-sm text-fg"
      >
        <p className="font-semibold">Thanks — your message is on its way.</p>
        <p className="mt-1 text-muted">I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-lg border border-border bg-page px-3.5 py-2.5 text-sm text-fg placeholder:text-subtle focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot: bots fill this hidden field; humans never see it. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClasses}
            placeholder="Ada Lovelace"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClasses}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClasses}
          placeholder="Hi Isaias — I'd love to talk about…"
        />
      </div>

      {status === "error" && error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg shadow-sm shadow-accent/20 transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
        {status !== "submitting" && <ArrowRightIcon className="size-4" />}
      </button>
    </form>
  );
}
