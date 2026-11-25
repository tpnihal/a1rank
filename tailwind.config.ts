import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", lg: "2rem" } },
    extend: {
      colors: {
        // Sampled from the original A1 Rank logo
        a1: {
          flame: "#EF5245", // gradient start
          coral: "#F04651", // primary coral red
          mid: "#EE4055",
          pink: "#EC2563", // gradient end
          blush: "#FCE4EA",
          black: "#020202",
          ink: "#0C0A0B",
          coal: "#141012",
          smoke: "#1D1719",
          paper: "#F8F4F5",
          ash: "#B8ADB0",
          stone: "#6A5F62",
        },
      },
      backgroundImage: {
        "a1-gradient": "linear-gradient(135deg, #EF5245 0%, #EC2563 100%)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Avenir Next", "Segoe UI", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      maxWidth: { site: "1240px" },
      boxShadow: {
        glow: "0 18px 50px -18px rgba(236, 37, 99, 0.65)",
        "glow-lg": "0 40px 120px -40px rgba(236, 37, 99, 0.6)",
      },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
        "marquee-rev": { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
        floaty: { "50%": { transform: "translateY(-10px)" } },
        pulsebar: { "0%,100%": { opacity: "0.35" }, "50%": { opacity: "1" } },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "marquee-rev": "marquee-rev 44s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        pulsebar: "pulsebar 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
