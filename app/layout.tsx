import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "AI App", description: "Generated with Next.js + DeepSeek" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
