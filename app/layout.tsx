import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "A1 Rank | Digital Marketing Agency in Dubai",
    template: "%s | A1 Rank",
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_AE",
    url: SITE.url,
    title: "A1 Rank | Grow smarter. Rank higher.",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "A1 Rank | Grow smarter. Rank higher.",
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0C0A0B",
  colorScheme: "dark",
};

const organisation = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  description: SITE.description,
  logo: `${SITE.url}/logo-mark.svg`,
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  areaServed: "AE",
  sameAs: [SITE.instagramUrl],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-bold focus:text-a1-ink">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }} />
      </body>
    </html>
  );
}
