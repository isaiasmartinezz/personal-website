import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/data/site";

// ---------------------------------------------------------------------------
// Contact endpoint
// ---------------------------------------------------------------------------
// Validates the submission, then emails it via Resend to site.email, with
// reply-to set to the visitor's address so you can just hit "reply".
//
// Sends from Resend's shared "onboarding@resend.dev" sender, which requires no
// domain setup but only delivers to the email address on your Resend account.
// To send from your own domain (e.g. contact@isaiasmartinez.dev) instead,
// verify a domain in the Resend dashboard and update the `from` address below.
// ---------------------------------------------------------------------------

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const company = String(payload.company ?? "").trim(); // honeypot

  // A filled honeypot means a bot — pretend success and drop it.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and message." },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { error: "Message is too long." },
      { status: 400 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: site.email,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `${message}\n\n—\n${name} <${email}>`,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try emailing directly instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
