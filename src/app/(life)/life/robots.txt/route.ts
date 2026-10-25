// Life-host robots.txt. Indexing is blocked by meta tag and X-Robots-Tag header,
// not here: a Disallow would stop crawlers from ever seeing the noindex.
export const dynamic = "force-static";

export function GET() {
  return new Response("User-agent: *\nAllow: /\n", { headers: { "content-type": "text/plain; charset=utf-8" } });
}
