import { Barlow_Condensed, Inter } from "next/font/google";

const displayFont = Barlow_Condensed({
  variable: "--chat-font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const bodyFont = Inter({
  variable: "--chat-font-body",
  subsets: ["latin"],
});

export default function ChatLayout({ children }) {
  return (
    <div
      className={`${displayFont.variable} ${bodyFont.variable}`}
      style={{
        "--chat-bg": "#171512",
        "--chat-surface": "#221f1a",
        "--chat-green": "#174d38",
        "--chat-green-bright": "#22785a",
        "--chat-maroon": "#4d1717",
        "--chat-maroon-bright": "#c73838",
        "--chat-text": "#e8e4d8",
        "--chat-muted": "#9a968a",
        background: "var(--chat-bg)",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
} 