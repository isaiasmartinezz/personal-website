import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this folder. Without it, Next can pick up an
  // unrelated lockfile elsewhere on the machine and infer the wrong root.
  turbopack: {
    root: path.resolve(__dirname),
  },
  // The personal journal (/journal) is unlisted: tell crawlers to skip it at the
  // HTTP level too (page metadata already says noindex). Deliberately not in
  // robots.txt, which would publicly advertise the path.
  async headers() {
    return [
      {
        source: "/journal/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
};

export default nextConfig;
