import { ImageResponse } from "next/og";
import { site } from "@/data/site";

// Neutral share card for the journal, so a shared link doesn't show the
// professional card (role, tagline) from the main site.
export const alt = `${site.name} — Journal`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function JournalOpengraphImage() {
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
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(1000px 400px at 15% -10%, rgba(255,255,255,0.12), transparent)",
          color: "#f5f5f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#a3a3a3", letterSpacing: "0.05em" }}>{site.name}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.05 }}>Journal</div>
          <div style={{ marginTop: 24, fontSize: 34, color: "#a3a3a3", maxWidth: 900 }}>
            Weekly recaps and the non-professional side of me.
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#737373" }}>{`${site.url.replace(/^https?:\/\//, "")}/journal`}</div>
      </div>
    ),
    { ...size },
  );
}
