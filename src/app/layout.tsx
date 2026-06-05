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
      {/* min-h-svh tracks the SMALL viewport — the visible area when browser chrome is shown
          (iOS Safari's URL bar in particular). Sizing to this guarantees layout fits even in
          the worst-case visible window, so a sticky bottom bar lands above the URL bar
          without any vh/dvh math gymnastics. */}
      <body className="flex min-h-svh flex-col">{children}</body>
    </html>
  );
}
