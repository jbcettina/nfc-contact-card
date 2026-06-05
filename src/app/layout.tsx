import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name} · Contact Card`,
  description: `Save ${profile.name} to your contacts.`,
};

// viewport-fit=cover lets us read env(safe-area-inset-*) on iOS, so the card can avoid
// the home-indicator strip and stay clear of browser chrome.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {/* min-h-dvh tracks the DYNAMIC viewport, which excludes browser chrome like iOS Safari's
          bottom URL bar. Plain 100vh would let the card slide under that bar. */}
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
