import { ImageResponse } from "next/og";

export const alt = "Life";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function LifeOpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", color: "#f5f5f5", fontSize: 120, fontWeight: 700 }}>
        Life
      </div>
    ),
    size,
  );
}
