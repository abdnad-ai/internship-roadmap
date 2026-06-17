import "./globals.css";

export const metadata = {
  title: "Auth Forms",
  description: "Week 2 Day 3 login and register",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}