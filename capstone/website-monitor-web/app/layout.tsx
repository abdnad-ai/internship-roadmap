import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "watchpost",
  description: "Watch the web for what matters.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
