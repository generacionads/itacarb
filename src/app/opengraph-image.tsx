import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#F9F8F6",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        padding: "72px 80px",
      }}
    >
      {/* Accent dot */}
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#C8553D",
          marginBottom: 32,
        }}
      />

      {/* Logo wordmark */}
      <div
        style={{
          fontSize: 120,
          fontWeight: 500,
          color: "#1a1a2e",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          fontFamily: "serif",
        }}
      >
        Ítacarb
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 24,
          fontWeight: 300,
          color: "#6b6b7b",
          letterSpacing: "0.02em",
          marginTop: 24,
          fontFamily: "serif",
        }}
      >
        Consultoría Estratégica de Marketing
      </div>
    </div>,
    { ...size }
  );
}
