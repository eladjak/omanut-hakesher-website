import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "אומנות הקשר - זוגיות, תקשורת וצמיחה אישית";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FFFAF7 0%, #F5EDE8 40%, #E85D75 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(232, 93, 117, 0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(30, 58, 95, 0.1)",
          }}
        />

        {/* Hearts icon */}
        <div
          style={{
            display: "flex",
            fontSize: 72,
            marginBottom: 20,
          }}
        >
          💕
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#1E3A5F",
            marginBottom: 16,
            direction: "rtl",
          }}
        >
          אומנות הקשר
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 400,
            color: "#5a5a6e",
            marginBottom: 32,
            direction: "rtl",
          }}
        >
          זוגיות, תקשורת וצמיחה אישית
        </div>

        {/* Divider */}
        <div
          style={{
            width: 120,
            height: 4,
            background: "linear-gradient(90deg, #E85D75, #D4A853)",
            borderRadius: 2,
            marginBottom: 32,
          }}
        />

        {/* Description */}
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontWeight: 300,
            color: "#1a1a2e",
            textAlign: "center",
            maxWidth: 700,
            direction: "rtl",
            lineHeight: 1.6,
          }}
        >
          ליווי זוגות ויחידים בדרך לתקשורת עמוקה ומשמעותית
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "linear-gradient(90deg, #1E3A5F, #E85D75, #D4A853)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
