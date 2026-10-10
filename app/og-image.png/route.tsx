import { ImageResponse } from "next/og"

// Generated at build time and exported as /og-image.png (a route with a .png extension, so static
// hosting serves it with the right content type). Referenced from OG_IMAGE in lib/site.ts.
export const dynamic = "force-static"

const size = { width: 1200, height: 630 }

// Colors mirror the site's dark palette (oklch tokens in app/globals.css, converted to hex).
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #04060c 0%, #0c1222 60%, #161d3a 100%)",
          color: "#eef0f7",
        }}
      >
        <div style={{ fontSize: 28, color: "#8b9cff", letterSpacing: 2, marginBottom: 24 }}>hsanellouze.site</div>
        <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>Hsan Ellouze</div>
        <div style={{ fontSize: 40, color: "#b4bbd0", marginTop: 20 }}>Software Engineer — Full-stack · AI · DevOps</div>
        <div style={{ display: "flex", marginTop: 48 }}>
          <div
            style={{
              fontSize: 26,
              padding: "12px 24px",
              borderRadius: 12,
              border: "2px solid #5b6cf0",
              color: "#c7cdff",
            }}
          >
            Open to an end-of-studies internship — Feb 2027
          </div>
        </div>
      </div>
    ),
    size,
  )
}
