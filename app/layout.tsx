import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { SanityLive } from "@/sanity/lib/live";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.shortName}`,
    default:  `${siteConfig.shortName} — Skor med känsla sedan generationer`,
  },
  description: siteConfig.description,
  keywords:    siteConfig.keywords,
  authors:     [{ name: siteConfig.name, url: siteConfig.url }],
  creator:     siteConfig.name,
  publisher:   siteConfig.name,
  alternates:  { canonical: siteConfig.url },
  openGraph: {
    siteName: siteConfig.name,
    locale:   "sv_SE",
    type:     "website",
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="scroll-smooth">
      <body
        className={`${manrope.variable} ${inter.variable} min-h-dvh flex flex-col antialiased`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {/* Site-wide structured data — appears on every page */}
        <LocalBusinessJsonLd />
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
