import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Contact endpoint
// ---------------------------------------------------------------------------
// Right now this validates the submission and returns success WITHOUT actually
// sending an email — so the form works end-to-end in the UI, but you won't
// receive anything until you connect a provider below.
//
// To deliver real email (recommended: Resend — generous free tier):
//   1. npm install resend
//   2. Add RESEND_API_KEY to your environment (Vercel → Project → Settings →
//      Environment Variables, and .env.local for local dev).
//   3. Uncomment the block marked "SEND EMAIL" and set the to/from addresses.
//
// Alternatives that need no backend code at all: swap the form's fetch() for a
// Formspree or Web3Forms endpoint and delete this route.
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

  // ----- SEND EMAIL (uncomment after installing + configuring Resend) -------
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "Portfolio <noreply@yourdomain.com>",
  //   to: "isaiasm@stanford.edu",
  //   replyTo: email,
  //   subject: `New message from ${name}`,
  //   text: message,
  // });
  // --------------------------------------------------------------------------

  // For now, log so you can confirm submissions during local development.
  console.log("[contact] new submission:", { name, email });

  return NextResponse.json({ ok: true });
}
