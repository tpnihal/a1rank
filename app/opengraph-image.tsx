import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = "A1 Rank: digital marketing agency in Dubai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social share image for every page that does not set its own. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0C0A0B", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, display: "flex", background: "linear-gradient(135deg,#EF5245,#EC2563)" }} />
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 2 }}>A1 RANK</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>Grow smarter.</div>
          <div style={{ fontSize: 104, fontWeight: 800, lineHeight: 1.05, letterSpacing: -3, color: "#F04651" }}>Rank higher.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#B8ADB0" }}>
          <div>Digital marketing · Websites · SEO · AI automation</div>
          <div>{SITE.domain}</div>
        </div>
      </div>
    ),
    size,
  );
}
