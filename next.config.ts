import type { NextConfig } from "next";
import path from "node:path";
import { LIFE_DEV_HOST, LIFE_HOST } from "./src/lib/life/config";

// The personal section is served from its own host (life.isaiasmartinez.dev)
// out of src/app/(life)/life/. Requests on that host are rewritten to /life/*;
// /life/* on any other host is a 404 so it can't be reached from the main site.
const lifeHosts = [LIFE_HOST, LIFE_DEV_HOST];
const hostRe = `(${lifeHosts.map((h) => h.replace(/\./g, "\\.")).join("|")})(:\\d+)?`;
const lifeHost = [{ type: "host" as const, value: hostRe }];

// Paths on the life host that must NOT be rewritten under /life: Next internals,
// static files, and anything already under /life (rewrites chain, so the result
// of the "/" rule would otherwise be rewritten again).
const passthrough = "(?!_next/|favicon\\.ico|life-media/|life(?:/|$)).+";

const nextConfig: NextConfig = {
  // Pin the workspace root to this folder. Without it, Next can pick up an
  // unrelated lockfile elsewhere on the machine and infer the wrong root.
  turbopack: {
    root: path.resolve(__dirname),
  },
  async rewrites() {
    const isPreview = process.env.VERCEL_ENV === "preview";
    return {
      beforeFiles: [
        { source: "/", has: lifeHost, destination: "/life" },
        { source: `/:path(${passthrough})`, has: lifeHost, destination: "/life/:path" },
        // /life/* on any non-life host is not routable (except team-protected previews).
        ...(isPreview
          ? []
          : [{ source: "/life/:path*", missing: lifeHost, destination: "/__not-found" }]),
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/:path*",
        has: lifeHost,
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
};

export default nextConfig;
