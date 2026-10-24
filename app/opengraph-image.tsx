import { ImageResponse } from "next/og";
import { profile, research } from "@/lib/data";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f3efe6",
          color: "#1c1a16",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#c8401b" }}>
          <div style={{ display: "flex", width: 56, height: 56, borderRadius: 14, background: "#1c1a16", color: "#f3efe6", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>MO</div>
          owais-portfolio-web.vercel.app
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 36, color: "#4a463e", marginTop: 12 }}>{`${profile.role} · Medical Image Super-Resolution`}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#4a463e", borderTop: "2px solid #1c1a16", paddingTop: 28 }}>
          {`${research.short} — SwinIR +3.22 dB over bicubic · 2,000 MRI slices · under review`}
        </div>
      </div>
    ),
    size,
  );
}
