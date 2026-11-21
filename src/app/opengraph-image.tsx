import { ImageResponse } from "next/og";

export const alt = "P3ro — Fotografia gastronômica em Ribeirão Preto";
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
          background:
            "radial-gradient(900px 520px at 80% 0%, rgba(232,137,60,0.25), transparent 60%), #1A0F0A",
          color: "#F5E9DA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#E8893C",
              color: "#1A0F0A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            P3
          </div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>P3ro</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#E8893C",
            }}
          >
            Fotografia gastronômica
          </div>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
            Seu prato merece ser desejado antes da primeira garfada.
          </div>
          <div style={{ fontSize: 28, color: "#CDBBA6" }}>Ribeirão Preto e região</div>
        </div>
      </div>
    ),
    size
  );
}
