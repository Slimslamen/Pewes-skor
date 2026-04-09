import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { SanityLive } from "@/sanity/lib/live";
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
  title: "Pewes Skor — Skor med känsla sedan generationer",
  description:
    "Sedan generationer har Pewes Skor varit platsen där hantverk möter personlig service. Storgatan 11, Anderstorp.",
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
        style={{
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
