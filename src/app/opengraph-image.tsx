import { ImageResponse } from "next/og";
import { site } from "@/data/site";

// Dynamically generated social share card (used for Open Graph + Twitter).
// Next automatically wires this into the page metadata as the OG/Twitter image.
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#020617",
          backgroundImage:
            "radial-gradient(1000px 400px at 15% -10%, rgba(59,130,246,0.35), transparent)",
          color: "#f1f5f9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "999px",
              background: "#3b82f6",
            }}
          />
          <div style={{ fontSize: 28, color: "#94a3b8", letterSpacing: "0.05em" }}>
            {site.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ marginTop: 20, fontSize: 40, color: "#93c5fd" }}>
            {site.role}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 30,
              color: "#94a3b8",
              maxWidth: 900,
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#64748b" }}>
          {site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size },
  );
}
