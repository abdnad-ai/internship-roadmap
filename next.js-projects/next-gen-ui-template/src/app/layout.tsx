import type { Metadata } from "next";
import { Barlow_Condensed, Inter, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const displayFont = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const statFont = IBM_Plex_Mono({
  variable: "--font-stat",
  subsets: ["latin"],
  weight: ["500"],
});

const dashFont = Space_Grotesk({
  variable: "--font-dash",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Next Gen UI Template",
  description: "A premium, animated UI template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} ${statFont.variable} ${dashFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
} 